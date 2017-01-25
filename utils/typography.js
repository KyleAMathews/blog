const Typography = require('typography')
const theme = require('typography-theme-de-young').default
const CodePlugin = require('typography-plugin-code').default

theme.plugins = [
  new CodePlugin(),
]
theme.baseLineHeight = 1.43
theme.blockMarginBottom = 0.75
theme.overrideThemeStyles = ({ rhythm }) => ({
  h1: {
    color: `hsla(0,0%,0%,0.75)`,
  },
  h2: {
    color: `hsla(0,0%,0%,0.775)`,
  },
  h3: {
    color: `hsla(0,0%,0%,0.85)`,
  },
  'h1,h2,h3,h4,h5,h6': {
    lineHeight: 1,
  },
  'h1,h2,h3,h4': {
    lineHeight: 1,
    marginTop: rhythm(1),
    marginBottom: rhythm(1/2),
  },
  'h4,h5,h6': {
    textTransformation: `uppercase`,
  },
  'blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4': {
    marginTop: 0,
  },
  ul: {
    marginTop: rhythm(1/2),
  },
  'li > p': {
    marginBottom: rhythm(1/2),
  },
  'p code': {
    fontSize: '78%',
  },
  'tt,code': {
    fontSize: '85%',
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
