Typography = require 'typography'
React = require 'react'

#theme = require('typography-theme-moraga').default
#theme = require('typography-theme-irving').default
#theme = require('typography-theme-alton').default
theme = require('typography-theme-de-young').default
theme.baseLineHeight = 1.6
codePlugin = require('typography-plugin-code').default
theme.plugins = [
  new codePlugin(),
]
#theme.bodyFontFamily = ['Alegreya']
#theme.headerFontFamily = ['League Spartan']
#theme.headerWeight = 900
#theme.boldWeight = 900
theme.overrideThemeStyles = () -> ({
  'tt,code': {
    fontSize: '70%',
  },
  pre: {
    fontSize: '1em',
  },
})
#theme = require('typography-theme-moraga').default
#theme['@media only screen and (max-width: 768px)'].blockquote.marginLeft = "-21px"

typography = new Typography(theme)

# Hot reload typography in development.
if process.env.NODE_ENV isnt 'production'
  ReactDOM = require 'react-dom/server'
  typography.injectStyles()

module.exports = typography
