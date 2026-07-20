import { GoogleAuth } from "google-auth-library"
import os from "node:os"
import path from "node:path"

const siteUrl = "sc-domain:bricolage.io"
const analyticsProperty = "properties/399294615"
const credentialPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS ||
  path.join(
    os.homedir(),
    ".config",
    "bricolage-seo",
    "search-console-reader.json"
  )

const auth = new GoogleAuth({
  keyFilename: credentialPath,
  scopes: [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
  ],
})
const client = await auth.getClient()

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

function daysBefore(date, days) {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() - days)
  return result
}

async function querySearchAnalytics(startDate, endDate, dimensions = []) {
  const encodedSite = encodeURIComponent(siteUrl)
  const response = await client.request({
    url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
    method: "POST",
    data: {
      startDate,
      endDate,
      dimensions,
      dataState: "final",
      rowLimit: dimensions.length > 0 ? 100 : 1,
    },
  })

  return response.data.rows || []
}

async function totalsForRange(startDate, endDate) {
  const [row = {}] = await querySearchAnalytics(startDate, endDate)
  return {
    startDate,
    endDate,
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }
}

async function comparison(days, finalDate) {
  const currentStart = daysBefore(finalDate, days - 1)
  const previousEnd = daysBefore(currentStart, 1)
  const previousStart = daysBefore(previousEnd, days - 1)

  return {
    days,
    current: await totalsForRange(
      formatDate(currentStart),
      formatDate(finalDate)
    ),
    previous: await totalsForRange(
      formatDate(previousStart),
      formatDate(previousEnd)
    ),
  }
}

function parseAnalyticsReport(report) {
  const dimensionNames = report.dimensionHeaders?.map(({ name }) => name) || []
  const metricNames = report.metricHeaders?.map(({ name }) => name) || []

  return (report.rows || []).map((row) => ({
    ...Object.fromEntries(
      dimensionNames.map((name, index) => [
        name,
        row.dimensionValues?.[index]?.value || "",
      ])
    ),
    ...Object.fromEntries(
      metricNames.map((name, index) => [
        name,
        Number(row.metricValues?.[index]?.value || 0),
      ])
    ),
  }))
}

async function queryAnalytics(
  startDate,
  endDate,
  dimensions = [],
  metrics = [],
  orderBys = [],
  limit = 100
) {
  const response = await client.request({
    url: `https://analyticsdata.googleapis.com/v1beta/${analyticsProperty}:runReport`,
    method: "POST",
    data: {
      dateRanges: [{ startDate, endDate }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      orderBys,
      limit,
    },
  })

  return parseAnalyticsReport(response.data)
}

const analyticsMetrics = [
  "sessions",
  "totalUsers",
  "newUsers",
  "screenPageViews",
  "engagementRate",
  "averageSessionDuration",
]
const aiReferrerPattern =
  /chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai/i

async function analyticsTotalsForRange(startDate, endDate) {
  const [totals = {}] = await queryAnalytics(
    startDate,
    endDate,
    [],
    analyticsMetrics,
    [],
    1
  )

  return { startDate, endDate, ...totals }
}

async function analyticsComparison(days, finalDate) {
  const currentStart = daysBefore(finalDate, days - 1)
  const previousEnd = daysBefore(currentStart, 1)
  const previousStart = daysBefore(previousEnd, days - 1)

  return {
    days,
    current: await analyticsTotalsForRange(
      formatDate(currentStart),
      formatDate(finalDate)
    ),
    previous: await analyticsTotalsForRange(
      formatDate(previousStart),
      formatDate(previousEnd)
    ),
  }
}

const today = new Date()
today.setUTCHours(0, 0, 0, 0)

// Search Console data commonly trails the current date. Ending three days ago
// keeps the weekly comparisons on finalized rather than preliminary data.
const finalDate = daysBefore(today, 3)
const current28Start = daysBefore(finalDate, 27)
const analyticsFinalDate = daysBefore(today, 1)
const analytics28Start = daysBefore(analyticsFinalDate, 27)
const encodedSite = encodeURIComponent(siteUrl)

const [
  sevenDay,
  twentyEightDay,
  pages,
  queries,
  sitemaps,
  analyticsSevenDay,
  analyticsTwentyEightDay,
  analyticsPages,
  analyticsSources,
] = await Promise.all([
  comparison(7, finalDate),
  comparison(28, finalDate),
  querySearchAnalytics(formatDate(current28Start), formatDate(finalDate), [
    "page",
  ]),
  querySearchAnalytics(formatDate(current28Start), formatDate(finalDate), [
    "query",
  ]),
  client.request({
    url: `https://www.googleapis.com/webmasters/v3/sites/${encodedSite}/sitemaps`,
  }),
  analyticsComparison(7, analyticsFinalDate),
  analyticsComparison(28, analyticsFinalDate),
  queryAnalytics(
    formatDate(analytics28Start),
    formatDate(analyticsFinalDate),
    ["pagePath"],
    ["screenPageViews", "sessions", "totalUsers", "averageSessionDuration"],
    [{ metric: { metricName: "screenPageViews" }, desc: true }]
  ),
  queryAnalytics(
    formatDate(analytics28Start),
    formatDate(analyticsFinalDate),
    ["sessionSourceMedium"],
    ["sessions", "totalUsers", "engagementRate"],
    [{ metric: { metricName: "sessions" }, desc: true }]
  ),
])

console.log(
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      siteUrl,
      comparisons: {
        sevenDay,
        twentyEightDay,
      },
      topPagesLast28Days: pages,
      topQueriesLast28Days: queries,
      sitemaps: sitemaps.data.sitemap || [],
      analytics: {
        property: analyticsProperty,
        comparisons: {
          sevenDay: analyticsSevenDay,
          twentyEightDay: analyticsTwentyEightDay,
        },
        topPagesLast28Days: analyticsPages,
        topSourcesLast28Days: analyticsSources,
        aiReferrersLast28Days: analyticsSources.filter(
          ({ sessionSourceMedium }) =>
            aiReferrerPattern.test(sessionSourceMedium)
        ),
      },
    },
    null,
    2
  )
)
