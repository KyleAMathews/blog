React = require 'react'
Router = require 'react-router'
{RouteHandler, Link} = Router
{Container, Grid, Breakpoint, Span} = require 'react-responsive-grid'
DocumentTitle = require 'react-document-title'
require '../css/styles.css'

{rhythm, fontSizeToMS} = require 'blog-typography'
{config} = require 'config'

module.exports = React.createClass
  render: ->
    if @props.location.pathname is "/"
      header = (
        <h1
          style={{
            fontSize: fontSizeToMS(2.5).fontSize
            lineHeight: fontSizeToMS(2.5).lineHeight
            marginBottom: rhythm(1.5)
          }}
        >
          <Link
            style={{
              textDecoration: 'none'
              color: 'inherit'
            }}
            to="/"
          >
            {config.blogTitle}
          </Link>
        </h1>
      )
    else
      header = (
        <h3>
          <Link
            style={{
              textDecoration: 'none'
              color: 'inherit'
            }}
            to="/"
          >
            {config.blogTitle}
          </Link>
        </h3>
      )

    <DocumentTitle title="Kyle Mathews">
      <Container
        style={{
          maxWidth: rhythm(24)
          padding: "#{rhythm(2)} #{rhythm(1/2)}"
        }}
      >
        {header}
        {this.props.children}
      </Container>
    </DocumentTitle>
