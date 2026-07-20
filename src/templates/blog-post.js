import React from "react"
import { Link, graphql } from "gatsby"
import typography from "../utils/typography"
import ReadNext from "../components/ReadNext"
import Subscribe from "../components/subscribe"
import SEO from "../components/seo"
import Layout from "../layouts/index.js"
import profilePic from "../images/kyle-round-small-pantheon.jpg"

const { rhythm, scale } = typography

function BlogPostRoute(props) {
  const post = props.data.markdownRemark

  let tags
  let tagsSection
  if (props.data.markdownRemark.fields.tagSlugs) {
    const tagsArray = props.data.markdownRemark.fields.tagSlugs
    tags = tagsArray.map((tag, i) => {
      const divider = i < tagsArray.length - 1 && <span>{" | "}</span>
      return (
        <span key={tag}>
          <Link to={tag}>{props.data.markdownRemark.frontmatter.tags[i]}</Link>
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
    <Layout location={props.location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        pathname={post.fields.slug}
        siteMetadata={props.data.site.siteMetadata}
        type="article"
        image={post.frontmatter.featured_image?.childImageSharp.fixed.src}
        datePublished={post.frontmatter.datePublished}
        tags={post.frontmatter.tags || []}
      />
      <h1 css={{ marginBottom: rhythm(1 / 4) }}>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 4),
          display: "block",
          marginBottom: post.frontmatter.topic ? rhythm(1 / 4) : undefined,
        }}
      >
        Posted {post.frontmatter.date}
      </p>
      {post.frontmatter.topic === "AI and agents" && (
        <p
          style={{
            ...scale(-1 / 5),
            marginBottom: rhythm(1),
          }}
        >
          Part of my essays on{" "}
          <Link to="/ai-agents/">AI agents and the future of software</Link>.
        </p>
      )}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {tagsSection}
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <ReadNext nextPost={post.frontmatter.readNext} />

      {/* <Subscribe /> */}
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
        <strong>{props.data.site.siteMetadata.author}</strong> lives and works
        in {props.data.site.siteMetadata.homeCity} building useful things.{` `}
        <a href="https://twitter.com/kylemathews">
          You should follow him on Twitter.
        </a>{" "}
        Co-founder at <a href="https://electric.ax">Electric</a>.
      </p>
    </Layout>
  )
}

export default BlogPostRoute

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        homeCity
        siteUrl
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        title
        description
        topic
        tags
        date(formatString: "MMMM DD, YYYY")
        datePublished: date
        featured_image {
          childImageSharp {
            fixed(height: 630, width: 1200) {
              src
            }
          }
        }
      }
    }
  }
`
