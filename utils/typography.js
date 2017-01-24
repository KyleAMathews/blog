const Typography = require('typography')
const theme = require('typography-theme-de-young').default
const CodePlugin = require('typography-plugin-code').default

theme.plugins = [
  new CodePlugin(),
]
theme.baseLineHeight = 1.45
theme.blockMarginBottom = 0.66
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

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

module.exports = typography
