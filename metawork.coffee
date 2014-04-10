through = require 'through'
path = require 'path'
_ = require 'underscore'
gutil = require 'gulp-util'
moment = require 'moment'
Feed = require('feed')
cytoscape = require('cytoscape')

module.exports = (site, options) ->

  files = []

  fileStreamHandler = (file) ->
    files.push file

  endStream = ->
    # Sort files by start date
    files = files.sort((post1, post2) ->
      date1 = moment(post1.meta.date)
      date2 = moment(post2.meta.date)
      if date1.isBefore(date2) then 1 else -1
    )

    # Copy body HTML to meta
    for file in files
      file.meta.body = file._contents.toString()

    # Add home page
    homepage = generateHomePage(files)

    # Add atom feeds.
    atom = generateAtomFeed(files)

    # Add styleguide
    styleguide = generateStyleGuide()

    # Add our custom files to the files array.
    files.push homepage
    files.push atom
    files.push styleguide

    for file in files
      @emit 'data', file

    @emit 'end'

  return through(fileStreamHandler, endStream)

generateHomePage = (files) ->
  homepage = new gutil.File({
    base: path.join(__dirname, './content/'),
    cwd: __dirname,
    path: path.join(__dirname, './content/index.html')
  })
  homepage['meta'] = {
    layout: 'frontpage'
    posts: _.map(files, (file) -> file.meta)
  }

  groupedByYear = _.groupBy files, (file) ->
    moment(file.meta.date).format('YYYY')
  pairs = _.pairs groupedByYear
  pairs = _.sortBy pairs, (pair) -> return pair[0]
  pairs.reverse()
  content = ""
  for [year, files] in pairs
    content += "<h3>#{year}</h3><ul>"
    for file in files
      if file.meta.draft
        continue
      url = path.dirname(file.relative) + "/"
      content += "<li><a href='#{ url }'>#{ file.meta.title }</a></li>"
    content += "</ul>"

  homepage._contents = Buffer(content)

  return homepage

generateAtomFeed = (files) ->
  atom = new gutil.File({
    base: path.join(__dirname, './content/'),
    cwd: __dirname,
    path: path.join(__dirname, './content/atom.xml')
  })
  feed = new Feed({
    title:       'Bricolage',
    description: 'A blog by Kyle Mathews',
    link:        'http://bricolage.io/',
    copyright:   'All rights reserved 2014, Kyle Mathews',
    author: {
        name:    'Kyle Mathews',
        email:   'mathews.kyle@gmail.com',
    }
  })
  for file in files.slice(0,10)
    unless file.meta.title? then continue
    feed.addItem({
      title: file.meta.title
      link: "http://bricolage.io/#{path.dirname(file.relative)}"
      date: moment(file.meta.date).toDate()
      content: file._contents.toString()
      author: [{
        name: "Kyle Mathews"
        email: "mathews.kyle@gmail.com"
        link: "http://bricolage.io"
      }]
    })

  feed.addContributor({
    name: 'Kyle Mathews'
    email: 'mathews.kyle@gmail.com'
    link: 'http://bricolage.io'
  })
  atom._contents = Buffer(feed.render('atom-1.0'))

  return atom

generateStyleGuide = ->
  styleguide = new gutil.File({
    base: path.join(__dirname, './content/'),
    cwd: __dirname,
    path: path.join(__dirname, './content/styleguide/index.html')
  })
  styleguide._contents = Buffer("")
  styleguide['meta'] = { layout: 'styleguide' }

  return styleguide
