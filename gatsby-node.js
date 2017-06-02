const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const precache = require(`sw-precache`)
const fs = require(`fs-extra`)
const webpackLodashPlugin = require("lodash-webpack-plugin")

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

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
              fields {
                slug
              }
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
<<<<<<< HEAD
        createPage({
=======
        upsertPage({
>>>>>>> origin/master
          path: edge.node.fields.slug, // required
          component: blogPost,
          context: {
            slug: edge.node.fields.slug,
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
        createPage({
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
<<<<<<< HEAD
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
=======
exports.onNodeCreate = ({ node, boundActionCreators, getNode }) => {
  const { addFieldToNode } = boundActionCreators
>>>>>>> origin/master

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split("---")[1]}/`
<<<<<<< HEAD
    createNodeField({ node, fieldName: `slug`, fieldValue: slug })
=======
    addFieldToNode({ node, fieldName: `slug`, fieldValue: slug })
>>>>>>> origin/master
  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === "undefined"
  ) {
    const fileNode = getNode(node.parent)
<<<<<<< HEAD
    createNodeField({
=======
    addFieldToNode({
>>>>>>> origin/master
      node,
      fieldName: `slug`,
      fieldValue: fileNode.fields.slug,
    })
    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
<<<<<<< HEAD
      createNodeField({ node, fieldName: `tagSlugs`, fieldValue: tagSlugs })
=======
      addFieldToNode({ node, fieldName: `tagSlugs`, fieldValue: tagSlugs })
>>>>>>> origin/master
    }
  }
}

// Add Lodash plugin
exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === `build-javascript`) {
    config.plugin(`Lodash`, webpackLodashPlugin, null)
  }

  return
}
