import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import DefaultSiteWrapper from '../components/DefaultSiteWrapper'
import get from 'lodash/get'
import typography from '../blog-typography'
const rhythm = typography.rhythm
const profilePic = require('./kyle-round-small-pantheon.jpg')

class BlogIndexRoute extends React.Component {
  render () {
    //const config = this.props.config
    const posts = this.props.data.allMarkdown.edges
    const title = get(this.props, 'data.config.siteMetadata.title')

    const pageLinks = posts.map((post) => {
      if (post.node.frontmatter.draft !== true) {
        return (
          <li
            key={post.node.path}
          >
            <Link
              style={{
                textDecoration: 'none',
              }}
              to={post.node.path}
            >
              {post.node.frontmatter.title}
            </Link>
          </li>
        )
      }
    })

    return (
      <DocumentTitle title={title}>
        <DefaultSiteWrapper {...this.props}>
          <div>
            <p
              style={{
                marginBottom: rhythm(2.5),
              }}
            >
              <img
                src={profilePic}
                style={{
                  float: 'left',
                  marginRight: rhythm(1/4),
                  marginBottom: 0,
                  width: rhythm(2),
                  height: rhythm(2),
                }}
              />
              Written by <strong>{this.props.data.config.siteMetadata.author}</strong> who lives and works
              in San Francisco building useful things. You should <a href="https://twitter.com/kylemathews">follow him on Twitter</a>
            </p>
            <ul>
              {pageLinks}
            </ul>
          </div>
        </DefaultSiteWrapper>
      </DocumentTitle>
    )
  }
}

export default BlogIndexRoute

export const routeQuery = `
  {
    config {
      siteMetadata {
        title
        author
      }
    }
    allMarkdown(first: 2000) {
      totalCount
      edges {
        node {
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
