import React from 'react'
import DocumentTitle from 'react-document-title'
import { rhythm } from 'utils/typography'
import Bio from 'components/Bio'
import { graphql } from 'gatsby-helpers'
import { Link } from 'react-router'

const profilePic = require('./kyle-round-small-pantheon.jpg')

class BlogIndexRoute extends React.Component {
  render () {
    const config = this.props.config
    const posts = this.props.allMarkdown

    const pageLinks = posts.edges.map((post) => (
      <li
        key={post.node.path}
        style={{
          marginBottom: rhythm(1/4),
        }}
      >
        <Link
          style={{
            textDecoration: 'none',
          }}
          to={post.node.path}
        >
          {post.node.title}
        </Link>
      </li>
    ))

    return (
      <DocumentTitle title={`${config.siteTitle}`}>
        <DefaultSiteWrapper>
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
              Written by <strong>{config.authorName}</strong> who lives and works in San Francisco building useful things. <a href="https://twitter.com/kylemathews">You should follow him on Twitter</a>
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

export default graphql.createContainer(BlogIndexRoute, () => (`
  {
    config {
      siteTitle
      authorName
    }
    allMarkdown(first: 9999, sortBy: "createdAt") {
      edges {
        node {
          id
          path
          title
        }
      }
    }
  }
`))
