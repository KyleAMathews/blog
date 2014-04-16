prompt = require 'prompt'
mkdirp = require('mkdirp')
moment = require 'moment'
_str = require 'underscore.string'
yaml = require 'js-yaml'
fs = require 'fs'

prompt.start()

prompt.get(['title'], (err, result) ->
  dir = "./content/#{ moment().format('YYYY-MM-DD') }---#{ _str.slugify(result.title) }"
  mkdirp.sync(dir)

  postFileStr = "---\n"

  # Create index.md w/ header matter and draft set to true
  frontmatter =
    title: result.title
    date: moment().toJSON()
    layout: 'post'
    draft: true

  postFileStr += yaml.safeDump(frontmatter)
  postFileStr += "---\n"

  fs.writeFileSync("#{ dir }/index.md", postFileStr, encoding: 'utf-8')

  console.log dir

)
