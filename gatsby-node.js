import _ from 'lodash'
import Promise from 'bluebird'
import path from 'path'
import { GraphQLString, GraphQLObjectType } from 'graphql'

exports.rewritePath = (parsedFilePath, metadata) => {
  if (parsedFilePath.ext === 'md') {
    return `/${parsedFilePath.dirname.split('---')[1]}/`
  }
}

exports.createPages = ({ graphql }) => (
  new Promise((resolve, reject) => {
    const pages = []
    const blogPost = path.resolve('page-templates/blog-post.js')
    const tagPages = path.resolve('page-templates/tag-page.js')
    graphql(`
      {
        allMarkdown(first: 1000) {
          edges {
            node {
              path
              frontmatter {
                tags
                draft
              }
            }
          }
        }
      }
    `)
    .then(result => {
      if (result.errors) {
        console.log(result.errors)
        reject(result.errors)
      }

      // Create blog posts pages.
      _.each(result.data.allMarkdown.edges, (edge) => {
        if (edge.node.frontmatter.draft !== true) {
          pages.push({
            path: edge.node.path, // required
            component: blogPost,
          })
        }
      })

      // Tag pages.
      let tags = []
      _.each(result.data.allMarkdown.edges, (edge) => {
        if (edge.node.frontmatter.draft !== true && edge.node.frontmatter.tags) {
          tags = tags.concat(edge.node.frontmatter.tags.map((tag) => tag.toLowerCase()))
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
)

exports.postBuild = require('./post-build')

exports.modifyGraphQLFields = ({ types }) => {
  types.test = {
    type: new GraphQLObjectType({
      name: 'test',
      description: 'just testing',
      fields: () => ({
        hello: {
          type: GraphQLString,
        },
      }),
    }),
    resolve (root, args) {
      return { hello: 'world' }
    },
  }

  return types
}
