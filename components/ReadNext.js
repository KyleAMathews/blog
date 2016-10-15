const React = require('react')
const { Link } = require('react-router')

const { rhythm, scale } = require('blog-typography')

const Component = React.createClass({
  render () {
    const { nextPost } = this.props
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
            <Link
              to={nextPost.path}
            >
              {nextPost.frontmatter.title}
            </Link>
          </h3>
          <p>{nextPost.excerpt}</p>
          <hr />
        </div>
      )
    }
  }
})

export default Component

export const query = `
readNext {
	id
	excerpt(pruneLength: 200)
	frontmatter {
		title
	}
}
`

