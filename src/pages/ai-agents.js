import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import SEO from "../components/seo"
import Layout from "../layouts/index.js"
import typography from "../utils/typography"

const { rhythm } = typography

const title = "AI Agents and the Future of Software"
const description =
  "Essays by Kyle Mathews on AI agents, the future of programming, LLMs, custom rubrics, and the substrate where human judgment accumulates."

export default function AIAgentsPage({ location }) {
  const { site, allMarkdownRemark } = useStaticQuery(graphql`
    query AIAgentsPageMetadata {
      site {
        siteMetadata {
          title
          author
          siteUrl
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: { topic: { eq: "AI and agents" }, draft: { ne: true } }
        }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            title
            description
            date(formatString: "MMMM D, YYYY")
          }
        }
      }
    }
  `)
  const essays = allMarkdownRemark.nodes.map((post) => ({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    path: post.fields.slug,
  }))
  const url = `${site.siteMetadata.siteUrl}/ai-agents/`
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    name: title,
    description,
    url,
    author: {
      "@type": "Person",
      name: site.siteMetadata.author,
      url: `${site.siteMetadata.siteUrl}/about/`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: essays.map((essay, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: essay.title,
        url: `${site.siteMetadata.siteUrl}${essay.path}`,
      })),
    },
  }

  return (
    <Layout location={location}>
      <SEO
        title={title}
        description={description}
        pathname="/ai-agents/"
        siteMetadata={site.siteMetadata}
        structuredData={structuredData}
      />
      <h1>{title}</h1>
      <p>
        I write about how AI changes software, work, and search—and about what
        remains valuable as model capabilities improve. These essays form a path
        through that argument, from the big picture to concrete ways of working
        with models.
      </p>
      <p>
        Start with <Link to="/apps-after-agents/">Apps After Agents</Link> for
        the core thesis: models are replaceable, while the judgment that
        accumulates around them is the durable substrate.
      </p>

      <div css={{ marginTop: rhythm(2) }}>
        {essays.map((essay) => (
          <article key={essay.path} css={{ marginBottom: rhythm(1.5) }}>
            <h2 css={{ marginBottom: rhythm(1 / 4) }}>
              <Link to={essay.path}>{essay.title}</Link>
            </h2>
            <small
              css={{
                color: "#666",
                display: "block",
                marginBottom: rhythm(1 / 4),
              }}
            >
              {essay.date}
            </small>
            <p css={{ marginBottom: 0 }}>{essay.description}</p>
          </article>
        ))}
      </div>
    </Layout>
  )
}
