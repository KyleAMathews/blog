import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import typography from "../utils/typography"
import ReadNext from "../components/ReadNext"
import Layout from "../layouts/index.js"
import profilePic from "../images/kyle-round-small-pantheon.jpg"

const { rhythm, scale } = typography

class BlogPostRoute extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    //console.log(post)

    let tags
    let tagsSection
    if (this.props.data.markdownRemark.fields.tagSlugs) {
      const tagsArray = this.props.data.markdownRemark.fields.tagSlugs
      tags = tagsArray.map((tag, i) => {
        const divider = i < tagsArray.length - 1 && <span>{" | "}</span>
        return (
          <span key={tag}>
            <Link to={tag}>
              {this.props.data.markdownRemark.frontmatter.tags[i]}
            </Link>
            {divider}
          </span>
        )
      })
      tagsSection = (
        <em
          style={{
            ...scale(-1 / 5),
            display: "block",
            marginBottom: rhythm(1),
          }}
        >
          Tagged with {tags}
        </em>
      )
    }

    return (
      <Layout location={this.props.location}>
        <Helmet>
          <title>{post.frontmatter.title}</title>
          <meta property="description" content={post.excerpt} />
          <meta property="og:title" content={post.frontmatter.title} />
          <meta property="og:description" content={post.excerpt} />
      </Helmet>
      {post.frontmatter.featured_image && (
        <Helmet>
          <meta property="og:image" content={`https://bricolage.io${post.frontmatter.featured_image.childImageSharp.fixed.src}`} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={`https://bricolage.io${post.frontmatter.featured_image.childImageSharp.fixed.src}`} />
        </Helmet>
        )}
        <h1 css={{ marginBottom: rhythm(1 / 4) }}>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 4),
            display: "block",
          }}
        >
          Posted {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {tagsSection}
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <ReadNext nextPost={post.frontmatter.readNext} />
        <p
          style={{
            marginBottom: 0,
          }}
        >
          <img
            src={profilePic}
            alt="Kyle's profile pic"
            style={{
              borderRadius: `100%`,
              float: "left",
              marginRight: rhythm(1 / 4),
              marginBottom: 0,
              width: rhythm(2),
              height: rhythm(2),
            }}
          />
          <strong>{this.props.data.site.siteMetadata.author}</strong> lives and
          works in {this.props.data.site.siteMetadata.homeCity} building useful
          things.{` `}
          <a href="https://twitter.com/kylemathews">
            You should follow him on Twitter.
          </a>{" "}
          Currently exploring what's next and{" "}
          <Link to="/about">open to consulting</Link>.
        </p>
      </Layout>
    )
  }
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        author
        homeCity
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        featured_image {
          childImageSharp {
            fixed(height:630, width: 1200) {
              src
            }
          }
        }
      }
    }
  }
`
