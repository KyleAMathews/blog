import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"

import Layout from "../layouts/index.js"
import typography from "../utils/typography"
import profilePic from "../images/kyle-round-small-pantheon.jpg"

const rhythm = typography.rhythm

class BlogIndexRoute extends React.Component {
  render() {
    // console.log(this.props)
    const posts = this.props.data.allMarkdownRemark.edges
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <p
          style={{
            marginBottom: rhythm(1.5),
          }}
        >
          <img
            src={profilePic}
            alt="Kyle's profile pic"
            style={{
              borderRadius: `100%`,
              float: "left",
              marginRight: rhythm(1 / 4),
              marginBottom: 0,
              width: rhythm(2),
              height: rhythm(2),
            }}
          />
          Written by <strong>{this.props.data.site.siteMetadata.author}</strong>{" "}
          who lives and works in San Francisco building really useful things.
          You should{" "}
          <a href="https://twitter.com/kylemathews">follow him on Twitter</a>
        </p>
        <ul
          style={{
            marginBottom: 0,
          }}
        >
          {posts.map(post => (
            <li key={post.node.fields.slug}>
              <Link
                style={{
                  textDecoration: "none",
                }}
                to={post.node.fields.slug}
              >
                {post.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndexRoute

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        author
        homeCity
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
