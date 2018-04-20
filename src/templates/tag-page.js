import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"

import Layout from "../layouts"

class TagRoute extends React.Component {
  render() {
    //console.log(this.props)
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => {
      return (
        <li key={post.node.fields.slug}>
          <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
        </li>
      )
    })

    return (
      <Layout location={this.props.location}>
        <h2>
          {this.props.data.allMarkdownRemark.totalCount} posts tagged with “{
            this.props.pageContext.tag
          }”
        </h2>
        <ul>{postLinks}</ul>
        <p>
          <Link to="/tags/">Browse all tags</Link>
        </p>
      </Layout>
    )
  }
}

export default TagRoute

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
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
