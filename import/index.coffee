mysql = require('mysql')
_str = require 'underscore.string'
yaml = require 'js-yaml'
moment = require 'moment'
linkify = require("html-linkify")
md = require 'html-md'
fs = require 'fs'

connection = mysql.createConnection({
  host     : process.env.HOST
  user     : process.env.USER
  password : process.env.PASSWORD
  port     : process.env.PORT
  database : process.env.DATABASE
})

#connection.connect()

query = "SELECT n.nid, \
                n.title, \
                nr.body, \
                n.created, \
                n.status, \
                GROUP_CONCAT( td.name SEPARATOR '|' ) AS 'tags' \
           FROM node_revisions AS nr, \
                node AS n \
           LEFT OUTER JOIN term_node AS tn ON tn.nid = n.nid \
           LEFT OUTER JOIN term_data AS td ON tn.tid = td.tid \
          WHERE (n.type = 'blog' OR n.type = 'story' OR n.type = 'article') \
            AND n.vid = nr.vid \
       GROUP BY n.nid"

#connection.query(query, (err, rows, fields) ->
fs.readFile('/tmp/rows.json', (err, rows) ->
  if err then throw err
  rows = JSON.parse(rows)
  #rows = [rows[10]]
  #console.log rows
  #fs.writeFileSync('/tmp/rows.json', JSON.stringify(rows))

  # TODO
  # linkify links (how to do it without double-linking?)
  # fetch images and rewrite links to be relative
  for row in rows
    # Convert tags into an array.
    row.tags = row.tags.split('|') if row.tags?

    # Convert date into a moment object
    row.created = moment.utc(row.created * 1000)

    # Convert old internal links.
    row.body = row.body.replace(/http:\/\/kyle.mathews2000.com\/blog\/\d{4}\/\d{2}\/\d{2}\/([a-zA-Z-\d]+)/g, "/$1")

    # Turn line breaks into <br>
    row.body = row.body.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')

    # Convert body html to markdown
    row.body = md(row.body)

    # Create directory for post w/ format YEAR-MONTH-DAY---sluggified-title-of-post
    directory = "../content/#{ row.created.format('YYYY-MM-DD') }---#{ _str.slugify(row.title) }"
    #fs.mkdirSync(directory)
    #console.log("../content/#{ row.created.format('YYYY-MM-DD') }---#{ _str.slugify(row.title) }")


    ## Generate the markdown file

    # Use JSON version of date.
    row.date = row.created.toJSON()
    delete row.created

    # The body doesn't go in the frontmatter.
    body = row.body
    delete row.body

    # Remove Drupalisms
    if row.status is 0
      row.draft = true
    delete row.status
    delete row.nid

    # Uncategorized is so Wordpress.
    if row.tags?[0] is "Uncategorized"
      delete row.tags
    row.layout = "post"

    output = "---\n"
    output += yaml.safeDump(row)
    output += "---\n\n"
    output += body

    #console.log output
    fs.writeFileSync("#{ directory }/index.md", output)

  #console.log(rows)
)

connection.end()
