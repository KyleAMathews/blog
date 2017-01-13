const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const select = require(`unist-util-select`)
const parseFilepath = require('parse-filepath')

exports.createPages = ({ args }) => {
  const { graphql } = args

  return new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve('pages/template-blog-post.js')
    const tagPages = path.resolve('pages/template-tag-page.js')
    graphql(`
      {
        allMarkdownRemark(limit: 1000, frontmatter: { draft: { ne: true }}) {
          edges {
            node {
              path
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `)
    .then((result) => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // Create blog posts pages.
      _.each(result.data.allMarkdownRemark.edges, (edge) => {
        pages.push({
          path: edge.node.path, // required
          component: blogPost,
          context: {
            path: edge.node.path,
          },
        })
      })

      // Tag pages.
      let tags = []
      _.each(result.data.allMarkdownRemark.edges, (edge) => {
        if (_.get(edge, 'node.frontmatter.tags')) {
          tags = tags.concat(edge.node.frontmatter.tags)
        }
      })
      tags = _.uniq(tags)
      tags.forEach((tag) => {
        const tagPath = `/tags/${_.kebabCase(tag)}/`
        pages.push({
          path: tagPath,
          component: tagPages,
          context: {
            tag,
          },
        })
      })

      resolve(pages)
    })
  })
}

//exports.postBuild = require('./post-build')

// Add custom url pathname for blog posts.
exports.modifyAST = ({ args }) => {
  const { ast } = args
  const files = select(ast, 'File')
  files.forEach((file) => {
    const parsedFilePath = parseFilepath(file.sourceFile)
    file.customUrlPathname = `/${parsedFilePath.dirname.split('---')[1]}/`
    const markdownNode = select(file, `MarkdownRemark`)[0]
    if (markdownNode) {
      markdownNode.path = `/${parsedFilePath.dirname.split('---')[1]}/`
    }
  })
  return files
}
