const Typography = require('typography')
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
theme.baseLineHeight = 1.45
theme.overrideThemeStyles = () => ({
  'h1,h2,h3,h4,h5,h6': {
    lineHeight: 1,
  },
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
  typography.injectStyles()
}

module.exports = typography
