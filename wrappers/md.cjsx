React = require 'react'
require '../css/zenburn.css'
moment = require 'moment'
DocumentTitle = require 'react-document-title'
DisqusThread = require 'react-disqus-thread'

ReadNext = require '../components/ReadNext'
{rhythm} = require 'blog-typography'
{config} = require 'config'

module.exports = React.createClass
  displayName: "MarkdownWrapper"

  render: ->
    post = @props.route.page.data

    <DocumentTitle title="#{post.title} | Kyle Mathews">
      <div className="markdown">
        <h1
          style={{
            marginTop: 0
          }}
        >
          {post.title}
        </h1>
        <div dangerouslySetInnerHTML={{__html: post.body}}/>
        <em
          style={{
            display: 'block'
            marginBottom: rhythm(2)
          }}
        >
          Posted {moment(post.date).format('MMMM D, YYYY')}
        </em>
        <hr
          style={{
            marginBottom: rhythm(2)
          }}
        />
        <ReadNext post={post} {...@props}/>
        <p
          style={{
            marginBottom: rhythm(6)
          }}
        >
          <img
            src="/kyle-round-small-pantheon.jpg"
            style={{
              float: 'left'
              marginRight: rhythm(1/4)
              marginBottom: 0
              width: rhythm(2)
              height: rhythm(2)
            }}
          />
          <strong>{config.authorName}</strong> lives and works in San Francisco building useful things. <a href="https://twitter.com/kylemathews">You should follow him on Twitter</a>
        </p>
        <DisqusThread
          shortname="kylemathews"
          title={post.title}
          url={"http://bricolage.io#{@props.route.page.path}"}
        />
      </div>
    </DocumentTitle>
