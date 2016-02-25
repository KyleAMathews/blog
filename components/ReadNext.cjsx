React = require 'react'
Router = require 'react-router'
{Link} = Router
prune = require 'underscore.string/prune'
includes = require 'underscore.string/include'
find = require 'lodash/find'

{rhythm, fontSizeToMS} = require 'blog-typography'

module.exports = React.createClass

  render: ->
    readNext = @props.post.readNext
    if readNext?
      nextPost = find @props.route.pages, (page) -> includes page.path, readNext.slice(1, -1)
    unless nextPost
      return <noscript />

    # Create prunned version of the body.
    html = nextPost.data.body
    body = prune(html.replace(/<[^>]*>/g, ''), 200)

    <div>
      <h6
        style={{
          margin: 0
          fontSize: fontSizeToMS(-1).fontSize
          lineHeight: fontSizeToMS(-1).lineHeight
          letterSpacing: -0.5
        }}
      >
        READ THIS NEXT:
      </h6>
      <h3
        style={{
          marginBottom: rhythm(1/4)
        }}
      >
        <Link
          to={{
            pathname: nextPost.path
            query:
              readNext: true
          }}
        >
          {nextPost.data.title}
        </Link>
      </h3>
      <p>{body}</p>
      <hr />
    </div>

