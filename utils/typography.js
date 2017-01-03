const Typography = require('typography')
const React = require('react')
const theme = require('typography-theme-de-young').default
const CodePlugin = require('typography-plugin-code').default

//theme = require('typography-theme-moraga').default
//theme = require('typography-theme-irving').default
//theme = require('typography-theme-alton').default


//#theme.bodyFontFamily = ['Alegreya']
//theme.headerFontFamily = ['League Spartan']
//theme.headerWeight = 900
//theme.boldWeight = 900

theme.plugins = [
  new CodePlugin(),
]
theme.baseLineHeight = 1.6
theme.overrideThemeStyles = () => ({
  'tt,code': {
    fontSize: '70%',
  },
  pre: {
    lineHeight: 1.22,
  },
})
//theme = require('typography-theme-moraga').default
//theme['@media only screen and (max-width: 768px)'].blockquote.marginLeft = "-21px"

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  const ReactDOM = require('react-dom/server')
  typography.injectStyles()
}

module.exports = typography
