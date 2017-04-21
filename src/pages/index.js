import React from "react"
import DocumentTitle from "react-document-title"
import Link from "gatsby-link"

import typography from "../utils/typography"
const rhythm = typography.rhythm
const profilePic = require("../images/kyle-round-small-pantheon.jpg")

class BlogIndexRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <DocumentTitle title={siteTitle}>
        <div>
          <p
            style={{
              marginBottom: rhythm(1.5),
            }}
          >
            <img
              src={profilePic}
              style={{
                borderRadius: `100%`,
                float: "left",
                marginRight: rhythm(1 / 4),
                marginBottom: 0,
                width: rhythm(2),
                height: rhythm(2),
              }}
            />
            Written by
            {" "}
            <strong>{this.props.data.site.siteMetadata.author}</strong>
            {" "}
            who lives and works
            in San Francisco building really useful things. You should
            {" "}
            <a href="https://twitter.com/kylemathews">follow him on Twitter</a>
          </p>
          <ul
            style={{
              marginBottom: 0,
            }}
          >
            {posts.map(post => (
              <li key={post.node.slug}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={post.node.slug}
                >
                  {post.node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DocumentTitle>
    )
  }
}

export default BlogIndexRoute

export const pageQuery = `
  {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000,
      sortBy: {
        fields: [frontmatter___date]
        order: DESC
      },
      frontmatter: {
        draft: {
          ne: true
        }
      }
    ) {
      edges {
        node {
          slug
          frontmatter {
            title
          }
        }
      }
    }
  }
`
