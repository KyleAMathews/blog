import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../layouts/index.js"

class TagsPageRoute extends React.Component {
  render() {
    const title = this.props.data.site.siteMetadata.title
    const allTags = this.props.data.allMarkdownRemark.group

    return (
      <Layout location={this.props.location}>
        <Helmet title={title} />
        <div>
          <h1>Tags</h1>
          <ul>
            {allTags.map(tag => (
              <li key={tag.fieldValue}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to={`/tags/${kebabCase(tag.fieldValue)}/`}
                >
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

export default TagsPageRoute

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
