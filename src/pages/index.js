import React from "react"
import Helmet from "react-helmet"
import { Link } from "gatsby"

import Bio from "../components/bio"
import typography from "../utils/typography"
const rhythm = typography.rhythm
import Layout from "../layouts"

class BlogIndexRoute extends React.Component {
  render() {
    // console.log(this.props)
    const posts = this.props.data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location}>
        <Bio />
        <ul
          style={{
            marginBottom: 0,
            marginTop: rhythm(1.5),
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
