import React from "react"
import { Link } from "gatsby"
import "typeface-alegreya"
import "typeface-alegreya-sans"
import "../css/prism-coy.css"

import SEOBase from "../components/seo-base"
import typography from "../utils/typography"
const rhythm = typography.rhythm
const scale = typography.scale

class Layout extends React.Component {
  render() {
    let header
    // Check if the location is either the front page or a tags page.
    // If so, use a big header, otherwise use a smaller one.
    if (
      ["/", "/tags/"].indexOf(this.props.location.pathname) !== -1 ||
      this.props.location.pathname.indexOf("/tags/") !== -1
    ) {
      header = (
        <Link
          style={{
            textDecoration: "none",
            boxShadow: "none",
            color: "inherit",
          }}
          to="/"
        >
          <h1
            style={{
              ...scale(1.5),
              marginBottom: rhythm(1),
              marginTop: 0,
            }}
          >
            Bricolage
          </h1>
        </Link>
      )
    } else {
      header = (
        <Link
          style={{
            textDecoration: "none",
            boxShadow: "none",
            color: "inherit",
          }}
          to="/"
        >
          <h3
            style={{
              marginTop: 0,
            }}
          >
            Bricolage
          </h3>
        </Link>
      )
    }
    return (
      <div
        style={{
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          maxWidth: rhythm(22),
          margin: `0 auto`,
        }}
      >
        <SEOBase />
        <div>{header}</div>
        {this.props.children}
      </div>
    )
  }
}

export default Layout
