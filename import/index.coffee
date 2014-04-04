mysql = require('mysql')
_ = require 'underscore'
_str = require 'underscore.string'
yaml = require 'js-yaml'
moment = require 'moment'
linkify = require("html-linkify")
md = require 'html-md'
fs = require 'fs'
cheerio = require 'cheerio'
path = require 'path'
request = require 'request'
tidy = require('htmltidy').tidy
marked = require 'marked'
async = require 'async'

connection = mysql.createConnection({
  host     : process.env.HOST
  user     : process.env.USER
  password : process.env.PASSWORD
  port     : process.env.PORT
  database : process.env.DATABASE
})

connection.connect()

query = "SELECT n.nid, \
                n.title, \
                nr.body, \
                n.created, \
                n.status, \
                ua.dst as url, \
                GROUP_CONCAT( td.name SEPARATOR '|' ) AS 'tags' \
           FROM node_revisions AS nr, \
                node AS n \
           INNER JOIN url_alias AS ua ON ua.src = CONCAT('node/', n.nid)
           LEFT OUTER JOIN term_node AS tn ON tn.nid = n.nid \
           LEFT OUTER JOIN term_data AS td ON tn.tid = td.tid \
          WHERE (n.type = 'blog' OR n.type = 'story' OR n.type = 'article') \
            AND n.vid = nr.vid \
       GROUP BY n.nid"

connection.query(query, (err, rows, fields) ->
#fs.readFile('/tmp/rows.json', (err, rows) ->
  if err then throw err
  #rows = JSON.parse(rows)
  #rows = [rows[10]]
  #console.log rows
  #fs.writeFileSync('/tmp/rows.json', JSON.stringify(rows))

  # TODO
  # linkify links (how to do it without double-linking?)
  # fetch images and rewrite links to be relative and create gulp task to optimze/resize/move images to public
  async.eachSeries(rows, (row, cb) ->
    # Convert tags into an array.
    row.tags = row.tags.split('|') if row.tags?

    # Convert date into a moment object
    row.created = moment.utc(row.created * 1000)

    # Convert old internal links.
    row.body = row.body.replace(/http:\/\/kyle.mathews2000.com\/blog\/\d{4}\/\d{2}\/\d{2}\/([a-zA-Z-\d]+)/g, "/$1")

    # Turn line breaks into <br>
    row.body = row.body.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')

    # Download images
    $ = cheerio.load(row.body)
    #if $('img').length > 0
      #$('img').each (i, el) ->
        #link = el.attribs.src
        #destPath = "#{ directory }/#{ path.basename(link) }"
        #console.log "downloading #{ link } to #{ destPath }"
        #request(link).on('error', (err) -> console.log err).pipe(fs.createWriteStream(destPath))

    # Rewrite image links to point to local relative path.
    if $('img').length > 0
      $('img').each (i, el) ->
        link = path.basename(el.attribs.src)
        el.attribs.src = "./#{ link }"

    row.body = $.html()

    # Convert body html to markdown
    console.log '==== nothing done yet'
    console.log row.body
    row.body = md(row.body)
    html = marked(row.body)
    html = _str.unescapeHTML(html)
    console.log '==== HTML->md->html->unescaped'
    console.log html
    # Cleanup HTML
    console.log '==== before tidy'
    console.log html
    tidy html, { indent: true, wrap: 0 }, (err, cleanhtml) ->
      console.log '==== HTML tidied'
      console.log cleanhtml
      row.body = md(cleanhtml)


      # Remove blog + date from URL.
      row.url = row.url.replace(/blog\/\d{4}\/\d{2}\/\d{2}\/([a-zA-Z-\d]+)/g, "$1")

      # Create directory for post w/ format YEAR-MONTH-DAY---sluggified-title-of-post
      directory = "../content/#{ row.created.format('YYYY-MM-DD') }---#{ row.url }"
      #fs.mkdirSync(directory)
      #console.log("../content/#{ row.created.format('YYYY-MM-DD') }---#{ _str.slugify(row.title) }")

      ## Generate the markdown file

      # Use JSON version of date.
      row.date = row.created.toJSON()
      delete row.created

      # The body doesn't go in the frontmatter.
      console.log row.body
      body = row.body
      delete row.body

      # Remove Drupalisms
      if row.status is 0
        row.draft = true
      delete row.status
      delete row.nid
      delete row.url

      # Uncategorized is so Wordpress.
      if row.tags?[0] is "Uncategorized"
        delete row.tags
      row.layout = "post"

      output = "---\n"
      output += yaml.safeDump(row)
      output += "---\n\n"
      output += body

      console.log output
      fs.writeFileSync("#{ directory }/index.md", output)
      cb()
  )

  #console.log(rows)
)

connection.end()
