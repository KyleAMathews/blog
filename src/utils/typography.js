const Typography = require("typography")
const CodePlugin = require("typography-plugin-code").default

let theme = {
  baseFontSize: `18px`,
  headerFontFamily: [`Cooper Hewitt`, `sans-serif`],
  bodyFontFamily: [`Cooper Hewitt`, `sans-serif`],
  plugins: [new CodePlugin()],
  baseLineHeight: 1.45,
  blockMarginBottom: 0.85,
  overrideThemeStyles: ({ rhythm }) => ({
    a: {
      color: `#3A69A8`,
    },
    blockquote: {
      marginLeft: 0,
      paddingLeft: rhythm(5 / 8),
      borderLeft: `${rhythm(3 / 8)} solid #CDE7B0`,
    },
    "blockquote strong": {
      color: `hsla(0,0%,0%,0.64)`,
    },
    "blockquote > *": {
      fontStyle: `italic`,
    },
    "blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4": {
      marginTop: 0,
    },
    ".gatsby-resp-image-wrapper + em": {
      display: `block`,
      marginTop: rhythm(1/8),
    },
    "h3,h4,h5,h6": {
      fontWeight: `normal`,
    },
    "video": {
      marginBottom: rhythm(1 / 2),
    },
    ".toc": {
      marginBottom: rhythm(1 / 2),
      paddingLeft: rhythm(5 / 8),
      borderLeft: `${rhythm(1 / 8)} solid #CDE7B0`,
      fontSize: "85%",
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
