import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'

class TagRoute extends React.Component {
  render () {
    console.log(this.props)
    const posts = this.props.data.allMarkdownRemark.edges
    const title = this.props.data.site.siteMetadata.title
    const postLinks = posts.map((post) => {
      return (
        <li key={post.node.path}>
          <Link
            to={post.node.path}
          >
            {post.node.frontmatter.title}
          </Link>
        </li>
      )
    })

    return (
      <DocumentTitle title={title}>
        <div>
          <h1>
            {this.props.data.allMarkdownRemark.totalCount}
            {' '}posts tagged with “{this.props.pathContext.tag}”
          </h1>
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

export const pageQuery = `
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark (
      first: 1000,
      sortBy: {
        fields: [frontmatter___date]
        order: DESC
      },
      frontmatter: {
        draft: {
          ne: true
        }
        tags: {
          in: [$tag]
        }
      }
    ) {
      totalCount
      edges {
        node {
          path
          frontmatter {
            title
          }
        }
      }
    }
  }
`
