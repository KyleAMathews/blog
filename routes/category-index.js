import React from 'react'
import DocumentTitle from 'react-document-title'
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import Bio from 'components/Bio'
import { graphql } from 'gatsby-helpers'

class CategoryIndexRoute extends React.Component {
  render () {
    const postEdge = this.props.allMarkdown
    const config = this.props.config

    const pageLinks = postEdge.edges.map((post) => (
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
      <DocumentTitle title={`Posts tagged with ${postEdge.tag} | ${config.siteTitle}`}>
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
              Written by <strong>{config.authorName}</strong> who lives and works
              in San Francisco building useful things.
              <a href="https://twitter.com/kylemathews">You should follow him on Twitter</a>
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

export const provideRoutes = (cb) => {
  const _ = require('lodash')
  graphql.execute(`
    {
      allMarkdown {
        edges {
          node {
            id
            tags
          }
        }
      }
    }
    `, (err, blogPosts) => {
      if (err) { return cb(err) }

      // Create array of all tags
      let tags = []
      _.each(blogposts.edges, (post) => tags.concat(post.node.tags))
      tags = _.uniq(tags)

      cb(null, tags.map((tag) => ({
        tag: tag,
        path: _.kebabCase(tag),
      })))
    })
}

export default graphql.createContainer(CategoryIndexRoute, (tag) => (`
  {
    config {
      siteTitle
      authorName
    }
    allMarkdown(filterByField: { field: 'tag', filter: "${post.tag}" }) {
      filter
      edges {
        node {
          title
          path
        }
      }
    }
  }
`))

