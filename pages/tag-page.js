import React from 'react'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import get from 'lodash/get'
import DefaultSiteWrapper from '../components/DefaultSiteWrapper'

class TagRoute extends React.Component {
  render () {
    const posts = this.props.data.allMarkdown.edges
    const title = get(this.props, 'data.config.siteMetadata.title')
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
        <DefaultSiteWrapper {...this.props}>
          <h1>
            {this.props.data.allMarkdown.totalCount}
            {' '}posts tagged with “{this.props.pathContext.tag}”
          </h1>
          <ul>{postLinks}</ul>
          <p>
            <Link to="/tags/">Browse all tags</Link>
          </p>
        </DefaultSiteWrapper>
      </DocumentTitle>
    )
  }
}

export default TagRoute

export const routeQuery = `
  {
    config {
      siteMetadata {
        title
      }
    }
    allMarkdown(first: 1000, tag: "<%= tag %>") {
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

