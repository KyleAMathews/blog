#Feed = require('feed')
#filter = require 'lodash/filter'
#sortBy = require 'lodash/sortBy'
#moment = require 'moment'
#MarkdownIt = require 'markdown-it'
#fs = require 'fs'
#frontmatter = require 'front-matter'

#md = MarkdownIt({
  #html: true
  #linkify: true
  #typographer: true
#})

#module.exports = (pages, callback) ->
  #generateAtomFeed(pages)
  #callback()

#generateAtomFeed = (pages) ->
  #feed = new Feed({
    #title:       'Bricolage',
    #description: 'A blog by Kyle Mathews',
    #link:        'https://bricolage.io/',
    #id:        'https://bricolage.io/',
    #copyright:   'All rights reserved 2016, Kyle Mathews',
    #author: {
      #name:    'Kyle Mathews',
      #email:   'mathews.kyle@gmail.com',
    #}
  #})

  ## Sort by date.
  #pages = sortBy(pages, (page) -> page.data?.date).reverse()

  #for page in filter(pages, (f) ->
    #f.data?.title? and not f.data?.draft
  #).slice(0,10)
    #feed.addItem({
      #title: page.data.title
      #id: "https://bricolage.io#{page.path}"
      #link: "https://bricolage.io#{page.path}"
      #date: moment(page.data.date).toDate()
      #content: md.render(
        #frontmatter(
          #fs.readFileSync(
            #"#{__dirname}/pages/#{page.requirePath}",
            #'utf-8'
          #)
        #).body
      #)
      #author: [{
        #name: "Kyle Mathews"
        #email: "mathews.kyle@gmail.com"
        #link: "https://bricolage.io"
      #}]
    #})

  #feed.addContributor({
    #name: 'Kyle Mathews'
    #email: 'mathews.kyle@gmail.com'
    #link: 'https://bricolage.io'
  #})

  #fs.writeFileSync "#{__dirname}/public/atom.xml", feed.render('atom-1.0')
