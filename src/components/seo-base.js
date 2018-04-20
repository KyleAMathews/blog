import React from "react"
import Helmet from "react-helmet"
import { StaticQuery } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
      query SEOBase {
        site {
          siteMetadata {
            title
            description
            siteUrl
            twitter
          }
        }
      }
    `}
    render={data => {
      console.log(data)
      const { title, description, siteUrl, twitter } = data.site.siteMetadata

      return (
        <Helmet defaultTitle={title} titleTemplate={`${title} | %s`}>
          {/* General tags */}
          <meta name="description" content={description} />

          {/* OpenGraph tags */}
          <meta property="og:url" content={siteUrl} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:creator" content={twitter} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
        </Helmet>
      )
    }}
  />
)
