import React from "react"
import Link from "gatsby-link"
import DocumentTitle from "react-document-title"

class TagRoute extends React.Component {
  render() {
    //console.log(this.props)
    const posts = this.props.data.allMarkdownRemark.edges
    const title = this.props.data.site.siteMetadata.title
    const postLinks = posts.map(post => {
      return (
        <li key={post.node.slug}>
          <Link to={post.node.slug}>
            {post.node.frontmatter.title}
          </Link>
        </li>
      )
    })

    return (
      <DocumentTitle title={title}>
        <div>
          <h2>
            {this.props.data.allMarkdownRemark.totalCount}
            {" "}posts tagged with “{this.props.pathContext.tag}”
          </h2>
          <ul>{postLinks}</ul>
          <p>
            <Link to="/tags/">Browse all tags</Link>
          </p>
        </div>
      </DocumentTitle>
    )
  }
}

export default TagRoute

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark (
      limit: 1000,
      sortBy: {
        fields: [frontmatter___date]
        order: DESC
      },
      frontmatter: {
        tags: {
          in: [$tag]
        }
        draft: {
          ne: true
        }
      }
    ) {
      totalCount
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
