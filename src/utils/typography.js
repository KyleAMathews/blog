const Typography = require("typography")
const CodePlugin = require("typography-plugin-code").default

let theme = {
  baseFontSize: `18px`,
  headerFontFamily: [`Comic Sans MS`, `Cooper Hewitt`, `sans-serif`],
  bodyFontFamily: [`Comic Sans MS`, `Cooper Hewitt`, `sans-serif`],
  bodyWeight: 300,
  plugins: [new CodePlugin()],
  baseLineHeight: 1.45,
  blockMarginBottom: 0.75,
  overrideThemeStyles: ({ rhythm }) => ({
    body: {
      // border: `${rhythm(3 / 4)} solid #c5484d`,
    },
    a: {
      color: `#3A69A8`,
    },
    blockquote: {
      marginLeft: 0,
      paddingLeft: rhythm(5 / 8),
      borderLeft: `${rhythm(3 / 8)} solid #CDE7B0`,
    },
    "blockquote > *": {
      fontStyle: `italic`,
    },
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
  }),
}

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles()
}

module.exports = typography
