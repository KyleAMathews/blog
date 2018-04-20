import React from "react"
import { StaticQuery } from "gatsby"
const profilePic = require("../images/kyle-round-small-pantheon.jpg")
import typography from "../utils/typography"
const rhythm = typography.rhythm

export default () => (
  <StaticQuery
    query={graphql`
      query Bio {
        site {
          siteMetadata {
            author
            homeCity
          }
        }
      }
    `}
    render={data => (
      <p
        style={{
          marginBottom: 0,
        }}
      >
        <img
          src={profilePic}
          style={{
            borderRadius: `100%`,
            float: "left",
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <strong>{data.site.siteMetadata.author}</strong> lives and works in{" "}
        {data.site.siteMetadata.homeCity} building useful things.{" "}
        <a href="https://twitter.com/kylemathews">
          You should follow him on Twitter
        </a>
      </p>
    )}
  />
)
