import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router'
import typography from 'utils/typography'
const { rhythm, scale } = typography
const profilePic = require('../images/kyle-round-small-pantheon.jpg')
import ReadNext from '../components/ReadNext'
const DisqusThread = require('react-disqus-thread')
//import { query } from '../components/ReadNext'
const query = `
readNext___file {
  children {
    ... on MarkdownRemark {
      path
      excerpt(pruneLength: 200)
      frontmatter {
        title
      }
    }
  }
}
`

class BlogPostRoute extends React.Component {
  render () {
    const post = this.props.data.markdownRemark
    //console.log(post)

    let tags
    let tagsSection
    if (this.props.data.markdownRemark.frontmatter.tagSlugs) {
      const tagsArray = this.props.data.markdownRemark.frontmatter.tagSlugs
      tags = tagsArray.map((tag, i) => {
        const divider = i < tagsArray.length - 1 && <span>{' | '}</span>
        return (
          <span key={tag}>
            <Link
              to={tag}
            >
              {this.props.data.markdownRemark.frontmatter.tags[i]}
            </Link>
            {divider}
          </span>
        )
      })
      tagsSection = (
        <em
          style={{
            ...scale(-1/5),
            display: 'block',
            marginBottom: rhythm(1),
          }}
        >
          Tagged with {tags}
        </em>
      )
    }

    return (
      <div>
        <Helmet
          title={`${post.frontmatter.title}`}
          meta={[
            {name: "description", content: post.excerpt},
          ]}
        />
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {tagsSection}
        <p
          style={{
            ...scale(-1/5),
            display: 'block',
            marginBottom: rhythm(1),
          }}
        >
          Posted {post.frontmatter.date}
        </p>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ReadNext nextPost={post.frontmatter.readNext} />
        <p
          style={{
            marginBottom: rhythm(6),
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
          <strong>{this.props.data.site.siteMetadata.author}</strong> lives and works in San Francisco building useful things. <a href="https://twitter.com/kylemathews">You should follow him on Twitter</a>
        </p>
        <DisqusThread
          shortname="kylemathews"
          title={post.title}
          url={`https://bricolage.io${this.props.location.pathname}`}
        />
      </div>
    )
  }
}

export default BlogPostRoute

export const pageQuery = `
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        author
      }
    }
    markdownRemark(path: { eq: $path }) {
      html
      excerpt
      frontmatter {
        title
        tags
        tagSlugs
        date(formatString: "MMMM DD, YYYY")
        readNext: ${query}
      }
    }
  }
`
