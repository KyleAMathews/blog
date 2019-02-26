import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import "typeface-cooper-hewitt"

import "../css/prism-coy.css"
import typography from "../utils/typography"
const rhythm = typography.rhythm
const scale = typography.scale

class Wrapper extends React.Component {
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
          css={{
            textDecoration: "none",
            boxShadow: "none",
            color: "inherit",
          }}
          to="/"
        >
          <h1
            css={{
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
          css={{
            textDecoration: "none",
            boxShadow: "none",
            color: "inherit",
          }}
          to="/"
        >
          <h3
            css={{
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
        css={{
          minHeight: `100vh`,
          borderTop: `${rhythm(3 / 4)} solid #c5484d`,
          "@media (min-width: 420px)": {
            border: `${rhythm(3 / 4)} solid #c5484d`,
          },
        }}
      >
        <div
          css={{
            padding: `${rhythm(2)} ${rhythm(3 / 4)}`,
            "@media (min-width: 420px)": {
              padding: `${rhythm(3)} ${rhythm(3 / 4)}`,
            },
            maxWidth: rhythm(22),
            margin: `0 auto`,
          }}
        >
          <Helmet defaultTitle="Bricolage" titleTemplate="Bricolage | %s" />
          <div>{header}</div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Wrapper
