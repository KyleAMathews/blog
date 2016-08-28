Typography = require 'typography'
ReactDOM = require 'react-dom/server'
React = require 'react'

#theme = require('typography-theme-moraga').default
#theme = require('typography-theme-irving').default
#theme = require('typography-theme-alton').default
theme = require('typography-theme-de-young').default
codePlugin = require('typography-plugin-code').default
theme.plugins = [
  new codePlugin(),
]
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
{GoogleFont} = require('typography-react')

# Hot reload typography in development.
if process.env.NODE_ENV isnt 'production'
  typography.injectStyles()
  if typeof document isnt 'undefined'
    googleFonts = ReactDOM.renderToStaticMarkup(React.createFactory(GoogleFont)({typography: typography}))
    head = document.getElementsByTagName('head')[0]
    head.insertAdjacentHTML('beforeend', googleFonts)

module.exports = typography
