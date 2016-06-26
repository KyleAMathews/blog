Typography = require 'typography'
ReactDOM = require 'react-dom/server'
React = require 'react'

theme = require('typography/dist/themes/Yrsa').default

typography = new Typography(theme)
{ GoogleFont } = typography

# Hot reload typography in development.
if process.env.NODE_ENV isnt 'production'
  typography.injectStyles()
  if typeof document isnt 'undefined'
    googleFonts = ReactDOM.renderToStaticMarkup(React.createFactory(GoogleFont)())
    head = document.getElementsByTagName('head')[0]
    head.insertAdjacentHTML('beforeend', googleFonts)

module.exports = typography
