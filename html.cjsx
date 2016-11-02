React = require 'react'
prune = require 'underscore.string/prune'

{GoogleFont, TypographyStyle} = require('react-typography')
typography = require './blog-typography'
{prefixLink} = require 'gatsby-helpers'
HTMLScripts = require 'html-scripts'
HTMLStyles = require 'html-styles'

try
  chunkManifest = require './public/chunk-manifest.json'

module.exports = React.createClass
  getDefaultProps: ->
    body: ""

  render: ->
    if @props.page
      description = prune(@props.page.data?.body.replace(/<[^>]*>/g, ''), 200)
      if @props.page?.path is "/"
        title = "Kyle Mathews"
      else if @props.page?.data?.title?
        title = @props.page.data.title + " | Kyle Mathews"
      else
        title = "Kyle Mathews"
    # TODO unwind DocumentTitle

    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
        <title>{title}</title>
        <meta name="description" content={description}/>

        <meta property="twitter:account_id" content="10907062"/>
        <meta name="twitter:card" content="summary"/>
        <meta name="twitter:site" content="@kylemathews"/>
        <meta name="twitter:title" content={title}/>
        <meta name="twitter:description" content={description}/>

        <meta property="og:title" content={title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:url" content="http://bricolage.io#{@props.page?.path}"/>
        <meta property="og:description" content={description}/>
        <meta property="og:site_name" content="Bricolage — a blog by Kyle Mathews"/>
        <meta property="fb:admins" content="17830631"/>
        <link rel="shortcut icon" href={@props.favicon}/>
        <link rel="alternate" type="application/atom+xml" href="/atom.xml" />
        <TypographyStyle typography={typography} />
        <HTMLStyles />
        {@props.headComponents}
      </head>
      <body className="landing-page">
        <div id="react-mount" dangerouslySetInnerHTML={{__html: @props.body}} />
        <HTMLScripts scripts={@props.scripts} />
        <script dangerouslySetInnerHTML={{__html: """
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-774017-3', 'auto');
            ga('send', 'pageview');
          """}}
        />

      </body>
    </html>
