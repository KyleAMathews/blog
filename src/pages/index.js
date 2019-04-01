import React from "react"
import { Link } from "gatsby"
import { scale, rhythm } from "../utils/typography"

const NoStyleLink = props => (
  <Link css={{ color: `inherit`, textDecoration: `none` }} {...props} />
)

const whitish = `#deeaf3`

export default () => {
  return (
    <div
      css={{
        display: `flex`,
        height: `100vh`,
        background: whitish,
      }}
    >
      <div
        css={{
          position: `absolute`,
          left: `33.333%`,
          width: rhythm(1),
          height: `22vh`,
          zIndex: 10,
          background: whitish,
          borderBottomRightRadius: `34px 41%`,
        }}
      />
      <div
        css={{
          position: `absolute`,
          left: `33.33%`,
          bottom: 0,
          width: rhythm(1),
          height: `24vh`,
          zIndex: 10,
          background: whitish,
          borderTopLeftRadius: `34px 41%`,
        }}
      />
      <div
        css={{
          display: `flex`,
          position: `absolute`,
          margin: rhythm(3 / 4),
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: `center`,
          alignItems: `center`,
          background: `#c5484d`,
        }}
      >
        <h1
          css={{
            width: `80%`,
            color: whitish,
            fontWeight: 600,
            fontSize: scale(5 / 5).fontSize,
            lineHeight: 1.1,
            "@media (min-width: 420px)": {
              fontSize: scale(7 / 5).fontSize,
            },
            "@media (min-width: 768px)": {
              fontSize: scale(10 / 5).fontSize,
            },
          }}
        >
          <span css={{ fontWeight: 400 }}>Welcome to the</span> Personal
          Internet Domicile{` `}
          <span css={{ fontWeight: 400 }}>of Kyle Mathews</span>
        </h1>
      </div>
      <div
        css={{
          color: whitish,
          position: `absolute`,
          top: rhythm(1.5),
          zIndex: 10,
          transform: `rotate(90deg)`,
          transformOrigin: `left top 0`,
          left: rhythm(2.5),
          fontSize: scale(2 / 5).fontSize,
          lineHeight: scale(2 / 5).lineHeight,
          "@media (min-width: 420px)": {
            left: rhythm(1.5),
            transform: `none`,
          },
        }}
      >
        <NoStyleLink to="/">bricolage</NoStyleLink>
      </div>
      <div
        css={{
          color: whitish,
          position: `absolute`,
          right: rhythm(1.5),
          top: rhythm(1.5),
          zIndex: 10,
          fontSize: scale(2 / 5).fontSize,
          lineHeight: scale(2 / 5).lineHeight,
        }}
      >
        <NoStyleLink to="/blog/">blog</NoStyleLink>,{" "}
        <NoStyleLink to="/about/">about</NoStyleLink>
      </div>
    </div>
  )
}
