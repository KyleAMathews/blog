import React from 'react'
import DocumentTitle from 'react-document-title'
import { Link } from 'react-router'
import get from 'lodash/get'
import typography from '../blog-typography'
const rhythm = typography.rhythm
const profilePic = require('../images/kyle-round-small-pantheon.jpg')

class BlogIndexRoute extends React.Component {
  render () {
    const posts = this.props.data.allMarkdown.edges
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

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
      <DocumentTitle title={siteTitle}>
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
            Written by <strong>{this.props.data.site.siteMetadata.author}</strong> who lives and works
            in San Francisco building useful things. You should <a href="https://twitter.com/kylemathews">follow him on Twitter</a>
          </p>
          <ul>
            {pageLinks}
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
    allMarkdown(first: 2000) {
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
