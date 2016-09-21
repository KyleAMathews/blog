import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import get from 'lodash/get'

class TagRoute extends React.Component {
  render () {
    const posts = this.props.data.allMarkdown.edges
    const title = get(this.props, 'data.site.siteMetadata.title')
    const postLinks = posts.map((post) => {
      if (post.node.frontmatter.draft !== true) {
        return (
          <li key={post.node.path}>
            <Link
              to={post.node.path}
            >
              {post.node.frontmatter.title}
            </Link>
          </li>
        )
      } else {
        return null
      }
    })

    return (
      <DocumentTitle title={title}>
        <div>
          <h1>
            {this.props.data.allMarkdown.totalCount}
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
    allMarkdown(first: 1000, tag: $tag) {
      totalCount
      edges {
        node {
          id
          path
          frontmatter {
            title
            draft
          }
        }
      }
    }
  }
`
