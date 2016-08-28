import _ from 'lodash'

exports.rewritePath = (parsedFilePath, metadata) => {
  if (parsedFilePath.ext === "md") {
    return `/${parsedFilePath.dirname.split('---')[1]}/`
  }
}

exports.createRoutes = (graphql, cb) => {
  const paths = []
  const blogPost = '/Users/kylemathews/programs/blog/pages/blog-post.js'
  const tagPages = '/Users/kylemathews/programs/blog/pages/tag-page.js'
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
      cb(result.errors)
    }

    // Create blog posts routes.
    _.each(result.data.allMarkdown.edges, (edge) => {
      if (edge.node.frontmatter.draft !== true) {
        paths.push({
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
      const path = `/tags/${_.kebabCase(tag)}/`
      paths.push({
        path,
        component: tagPages,
        tag,
      })
    })

    // Add individual pages.
    //const tagsPages = '/Users/kylemathews/programs/blog/pages/tags-page.js'
    //const indexPage = '/Users/kylemathews/programs/blog/pages/index.js'
    //paths.push({
      //path: '/tags/',
      //component: tagsPages,
    //})
    //paths.push({
      //path: '/',
      //component: indexPage,
    //})
    cb(null, paths)
  })
}

exports.postBuild = require('./post-build')
