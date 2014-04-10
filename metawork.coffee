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

    # Calculate the "Read this next" article
    calculateReadNext(files)

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

calculateReadNext = (files) ->
  addReadNext = (file, title = null) ->
    if title
      file.meta.readNext = _.find(files, (f) -> f.meta.title is title)
    else
      file.meta.readNext = files[_.random(0, files.length - 1)]

  for file in files
    if file.meta.tags?
      neighbors = []
      for otherFile in files
        if otherFile.meta.draft then continue
        unless file is otherFile
          inCommon = _.intersection(otherFile.meta.tags, file.meta.tags).length
          if inCommon > 0
             neighbors.push { title: otherFile.meta.title, count: inCommon }
      max = _.max neighbors, (neighbor) -> return neighbor.count
      neighbors = _.filter neighbors, (neighbor) -> neighbor.count is max.count
      if neighbors.length is 0
        addReadNext(file)
      else
        title = neighbors[_.random(0, neighbors.length - 1)].title
        addReadNext(file, title)
    else
      addReadNext(file)

  #tagGroups = []
  #for i in [0..8]
    #tagGroups.push _.groupBy files, (file) ->
      #if file.meta.tags?[i]?
        #file.meta.tags[i]
      #else
        #"none"

  #tagGroups = _.reduce tagGroups, ((memo, tagGroup) ->
    #for k,v of tagGroup
      ##if _.some(v, (post) -> post.meta.title is "My educational philosophy")
        ##console.log k
        ##console.log "=============it's here!!!"
      #if k is "none" then continue
      #if k of memo
        #memo[k] = memo[k].concat v
      #else
        #memo[k] = v
    #return memo
  #), {}
  #cy = new cytoscape()
  #for group, members of tagGroups
    ##console.log group, members.length
    ##if _.some(members, (post) -> post.meta.title is "My educational philosophy")
      ##console.log "=============it's here!!!"
    #for member in members
      #cy.add({
        #group: 'nodes'
        #data:
          #id: member.meta.title
      #})
    #for member in members
      #for target in members
        #unless target.meta.title is member.meta.title
          #cy.add({
            #group: 'edges'
            #data:
              #id: _.uniqueId(group)
              #source: member.meta.title
              #target: target.meta.title
          #})

  ##console.log cy
  ##console.log cy.elements().neighborhood()['0']._private
  #title = 'My educational philosophy'
  #neighbors = _.values(cy.elements().edgesTo("node[id='#{ title }']")._private.ids).map( (id) -> id._private.data)
  ##console.log neighbors
  #topNeighbors = _.countBy neighbors, (edge) ->
    #if edge.source is title
      #return edge.target
    #else
      #return edge.source

  #console.log topNeighbors
  ##console.log cy.elements().edgesWith("node[id='Content Recommendation']")

generateHomePage = (files) ->
  homepage = new gutil.File({
    base: path.join(__dirname, './content/'),
    cwd: __dirname,
    path: path.join(__dirname, './content/index.html')
  })
  homepage['meta'] = { layout: 'post' }

  content = ""
  for file in files
    if file.meta.draft
      continue
    date = moment(file.meta.date)
    url = path.dirname(file.relative) + "/"
    content += "<a href='#{ url }'>#{ date.format('YYYY MM DD') } #{ file.meta.title }</a><br>"

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
