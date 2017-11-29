const Typography = require("typography");
let theme = require("typography-theme-de-young").default;
const CodePlugin = require("typography-plugin-code").default;

theme.plugins = [new CodePlugin()];
theme.baseLineHeight = 1.4;
theme.blockMarginBottom = 0.75;
theme.overrideThemeStyles = ({ rhythm }) => ({
  "blockquote > h1, blockquote > h2, blockquote > h3, blockquote > h4": {
    marginTop: 0
  },
  "li > p": {
    marginBottom: rhythm(1 / 2)
  },
  "p code": {
    fontSize: "75%"
  },
  "tt,code": {
    fontSize: "85%"
  },
  pre: {
    lineHeight: 1.22
  }
});

//theme = require('typography-theme-doelger').default
const typography = new Typography(theme);

//import ReactDOM from 'react-dom/server'
//import React from 'react'
//import { GoogleFont } from 'react-typography'

//// Hot reload typography in development.
//if (process.env.NODE_ENV !== 'production') {
//typography.injectStyles()
//if (typeof document !== 'undefined') {
//const googleFonts = ReactDOM.renderToStaticMarkup(
//React.createFactory(GoogleFont)({ typography })
//)
//const head = document.getElementsByTagName('head')[0]
//head.insertAdjacentHTML('beforeend', googleFonts)
//}
//}

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

module.exports = typography;
