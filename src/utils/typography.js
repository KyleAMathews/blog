const Typography = require("typography")
let theme = require("typography-theme-de-young").default
const CodePlugin = require("typography-plugin-code").default

theme.plugins = [new CodePlugin()]
theme.baseLineHeight = 1.4
theme.blockMarginBottom = 0.75
theme.overrideThemeStyles = ({ rhythm }) => ({
  "blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4": {
    marginTop: 0,
  },
  "li > p": {
    marginBottom: rhythm(1 / 2),
  },
  "p code": {
    fontSize: "75%",
  },
  "tt,code": {
    fontSize: "85%",
  },
  pre: {
    lineHeight: 1.22,
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles()
}

module.exports = typography
