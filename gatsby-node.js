const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const select = require(`unist-util-select`)
const precache = require(`sw-precache`)
const fs = require(`fs`)

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
              slug
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
          path: edge.node.slug, // required
          component: blogPost,
          context: {
            slug: edge.node.slug,
          },
        })
      })

      // Add temp app-shell path (this will get moved to plugin)
      pages.push({
        path: `/app-shell-fallback/`,
        component: path.resolve(`pages/template-app-shell.js`),
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
    const parsedFilePath = path.parse(file.absolutePath)
    const slug = `/${parsedFilePath.dir.split('---')[1]}/`
    file.slug = slug
    const markdownNode = select(file, `MarkdownRemark`)[0]
    if (markdownNode) {
      markdownNode.slug = slug
      if (markdownNode.frontmatter.tags) {
        markdownNode.frontmatter.tagSlugs = markdownNode.frontmatter.tags.map(
          (tag) => `/tags/${_.kebabCase(tag)}/`
        )
      }
    }
  })
  return files
}

exports.postBuild = () => {
  return new Promise((resolve, reject) => {
    const manifest = {
      "name": "Bricolage",
      "short_name": "Bricolage",
      "icons": [{
          "src": "1cbe35120ae20cf7acd4d7098b7f9b15-quality=50&pngCompressionLevel=9&width=295.png",
          "sizes": "295x295",
          "type": "image/png",
        },
      ],
      "start_url": "/",
      "background_color": "#48a896",
      "theme_color": "#48a896",
      "display": "standalone",
    }
    fs.writeFileSync(`./public/manifest.json`, JSON.stringify(manifest))

    const rootDir = `public`

    const options = {
      staticFileGlobs: [
        `${rootDir}/**/*.{js,woff2}`,
        `${rootDir}/index.html`,
        `${rootDir}/manifest.json`,
        `${rootDir}/app-shell-fallback/index.html`,
      ],
      stripPrefix: rootDir,
      navigateFallback: '/app-shell-fallback/',
      cacheId: `kyle-blog`,
      dontCacheBustUrlsMatching: /(.*.woff2|.*.js)/,
      runtimeCaching: [
        {
          urlPattern: /.*.png/,
          handler: 'fastest',
        },
        {
          urlPattern: /.*.jpg/,
          handler: 'fastest',
        },
        {
          urlPattern: /.*.jpeg/,
          handler: 'fastest',
        },
      ],
      skipWaiting: false,
    }

    precache.write(`public/sw.js`, options, (err) => {

      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })


}
