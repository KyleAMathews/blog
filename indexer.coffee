through = require 'through'
path = require 'path'
_ = require 'underscore'
gutil = require 'gulp-util'
moment = require 'moment'
Feed = require('feed')

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
    # Add home page
    homepage = new gutil.File({
      base: path.join(__dirname, './content/'),
      cwd: __dirname,
      path: path.join(__dirname, './content/index.html')
    })
    homepage._contents = Buffer(generateHomePage(files))
    homepage['meta'] = { layout: 'post' }

    # Add atom feeds.
    atom = new gutil.File({
      base: path.join(__dirname, './content/'),
      cwd: __dirname,
      path: path.join(__dirname, './content/atom.xml')
    })
    feed = new Feed({
      title:       'Bricolage',
      description: 'Feed for blog of Kyle Mathews',
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

    # Add styleguide
    styleguide = new gutil.File({
      base: path.join(__dirname, './content/'),
      cwd: __dirname,
      path: path.join(__dirname, './content/styleguide/index.html')
    })
    styleguide._contents = Buffer("")
    styleguide['meta'] = { layout: 'styleguide' }

    # Add to files array our custom files.
    files.push homepage
    files.push atom
    files.push styleguide

    for file in files
      @emit 'data', file

    @emit 'end'

  return through(fileStreamHandler, endStream)

generateHomePage = (files) ->
  homepage = ""

  for file in files
    if file.meta.draft
      continue
    date = moment(file.meta.date)
    url = path.dirname(file.relative) + "/"
    homepage += "<a href='#{ url }'>#{ date.format('YYYY MM DD') } #{ file.meta.title }</a><br>"

  return homepage
