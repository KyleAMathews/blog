const React = require("react")
const { Link, graphql } = require("gatsby")

const { scale } = require("../utils/typography")

class Component extends React.Component {
  render() {
    //console.log(this.props)
    let { nextPost } = this.props
    if (nextPost && nextPost.children && nextPost.children[0]) {
      nextPost = nextPost.children[0]
    }

    if (!nextPost) {
      return null
    } else {
      return (
        <div>
          <h6
            style={{
              ...scale(-0.5),
              margin: 0,
              letterSpacing: -0.25,
            }}
          >
            READ THIS NEXT:
          </h6>
          <h3
            style={{
              margin: 0,
            }}
          >
            <Link to={nextPost.fields.slug}>{nextPost.frontmatter.title}</Link>
          </h3>
          <p>{nextPost.excerpt}</p>
          <hr />
        </div>
      )
    }
  }
}

export default Component

export const query = graphql`
  fragment ReadNext on MarkdownRemark {
    fields {
      slug
    }
    excerpt(pruneLength: 200)
    frontmatter {
      title
    }
  }
`
