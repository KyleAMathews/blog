React = require 'react'
Typography = require 'typography'
prune = require 'underscore.string/prune'

typography = new Typography()
{TypographyStyle} = typography

module.exports = React.createClass
  getDefaultProps: ->
    body: ""

  render: ->
    if @props.page
      description = prune(@props.page.data?.body.replace(/<[^>]*>/g, ''), 200)
      if @props.page.path is "/"
        title = "Kyle Mathews"
      else
        title = @props.page.data.title + " | Kyle Mathews"

    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name='viewport' content='user-scalable=no width=device-width, initial-scale=1.0 maximum-scale=1.0'/>
        <title>{title}</title>
        <meta name="description" content={description}/>

        <meta property="twitter:account_id" content="10907062"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@kylemathews"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>

        <meta property="og:title" content={title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content="http://bricolage.io#{@props.page.path}"/>
        <meta property="og:description" content={description}/>
        <meta property="og:site_name" content="Bricolage — a blog by Kyle Mathews"/>
        <meta property="fb:admins" content="17830631"/>
        <link rel="shortcut icon" href={@props.favicon}/>
        <TypographyStyle/>
        <style dangerouslySetInnerHTML={{__html: """
          body {
            color: rgb(66,66,66);
          }
          h1,h2,h3,h4,h5,h6 {
            color: rgb(44,44,44);
          }
          a {
            color: rgb(42,93,173);
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        """}}/>
      </head>
      <body className="landing-page">
        <div id="react-mount" dangerouslySetInnerHTML={{__html: @props.body}} />
        <script src="/bundle.js"/>
      </body>
    </html>
