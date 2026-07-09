import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../../layouts/index.js"
import typography from "../../utils/typography"

const rhythm = typography.rhythm

class BlogAllRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location}>
        <Helmet title={`Archive | ${siteTitle}`} />
        <h1>Archive</h1>
        <p css={{ marginBottom: rhythm(1.5) }}>
          Older posts from before August 2016. <Link to="/blog">Back to recent posts</Link>.
        </p>
        <div>
          {posts.map((post) => (
            <article
              key={post.node.fields.slug}
              css={{
                marginBottom: rhythm(1.5),
              }}
            >
              <h3
                css={{
                  marginBottom: rhythm(1/8),
                }}
              >
                <Link
                  css={{
                    textDecoration: "none",
                  }}
                  to={post.node.fields.slug}
                >
                  {post.node.frontmatter.title}
                </Link>
              </h3>
              <small css={{ color: "#666", display: "block", marginBottom: rhythm(1/4) }}>
                {post.node.frontmatter.date}
              </small>
              {post.node.frontmatter.description && (
                <p
                  css={{
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                >
                  {post.node.frontmatter.description}
                </p>
              )}
            </article>
          ))}
        </div>
      </Layout>
    )
  }
}

export default BlogAllRoute

export const pageQuery = graphql`
  query BlogAllQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          draft: { ne: true }
          date: { lt: "2016-08-12" }
        }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            description
          }
        }
      }
    }
  }
`
