const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const precache = require(`sw-precache`)
const fs = require(`fs-extra`)
const webpackLodashPlugin = require("lodash-webpack-plugin")

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { upsertPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve("src/pages/template-blog-post.js")
    const tagPages = path.resolve("src/pages/template-tag-page.js")
    graphql(
      `
      {
        allMarkdownRemark(limit: 1000, frontmatter: { draft: { ne: true }}) {
          edges {
            node {
              slug
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
        resolve()
        // reject(result.errors);
      }

      // Create blog posts pages.
      _.each(result.data.allMarkdownRemark.edges, edge => {
        upsertPage({
          path: edge.node.slug, // required
          component: blogPost,
          context: {
            slug: edge.node.slug,
          },
        })
      })

      // Tag pages.
      let tags = []
      _.each(result.data.allMarkdownRemark.edges, edge => {
        if (_.get(edge, "node.frontmatter.tags")) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      tags = _.uniq(tags)
      tags.forEach(tag => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`
        upsertPage({
          path: tagPath,
          component: tagPages,
          context: {
            tag,
          },
        })
      })

      resolve()
    })
  })
}

//exports.postBuild = require('./post-build')

// Add custom url pathname for blog posts.
exports.onNodeCreate = ({ node, boundActionCreators, getNode }) => {
  const { updateNode } = boundActionCreators

  if (node.type === `File` && typeof node.slug === "undefined") {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split("---")[1]}/`
    node.slug = slug
    updateNode(node)
  } else if (
    node.type === `MarkdownRemark` &&
    typeof node.slug === "undefined"
  ) {
    const fileNode = getNode(node.parent)
    node.slug = fileNode.slug
    if (node.frontmatter.tags) {
      node.frontmatter.tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
    }
    updateNode(node)
  }
}

exports.postBuild = () => {
  fs.copySync(`./src/images/logo.png`, `./public/logo.png`)
}

// Add Lodash plugin
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === `build-javascript`) {
    config.plugin(`Lodash`, webpackLodashPlugin, null)
  }

  return
}
