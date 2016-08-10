import React from 'react'
import DocumentTitle from 'react-document-title'
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import Bio from 'components/Bio'
import { graphql } from 'gatsby-helpers'

class BlogPostRoute extends React.Component {
  render () {
    const config = this.props.config
    const post = this.props.markdown

    return (
      <DocumentTitle title={`${post.title} | ${config.siteTitle}`}>
        <DefaultSiteWrapper>
          <div>
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.bodyHTML }} />
            <em
              style={{
                display: 'block',
                marginBottom: rhythm(2),
              }}
            >
              Posted {post.createdAt.formatted}
            </em>
            <hr
              style={{
                marginBottom: rhythm(2),
              }}
            />
            <ReadNext post={post} />
            <Bio />
          </div>
        </DefaultSiteWrapper>
      </DocumentTitle>
    )
  }
}

export const provideRoutes = (cb) => {
  graphql.execute(`
    {
      allMarkdown {
        edges {
          node {
            id
            path
          }
        }
      }
    }
    `, (err, blogPosts) => {
      if (err) { return cb(err) }
      cb(null, blogPosts.edges.map((post) => ({
        ...post.node
      }))
    })
}

export default graphql.createContainer(BlogPostRoute, (post) => (`
  {
    config {
      siteTitle
    }
    markdown(path: "${post.path}") {
      id
      title
      bodyHTML
      createdAt {
        formated(formatString: "MMMM D, YYYY")
      }
      ${ReadNext.getFragment('blogPostRoute')}
    }
  }
`))
