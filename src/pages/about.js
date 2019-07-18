import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
import Layout from "../layouts/index.js"

export default ({ location }) => {
  return (
    <Layout location={location}>
      <h1>Welcome Internet</h1>
      <p>
        Welcome to my humble abode on the internet where weary travelers may
        come and rest for a season.
      </p>
      <p>
        I'm the creator of the open source project{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a> and co-founder and CEO of{" "}
        <a href="https://gatsbyjs.com">Gatsby Inc.</a> A company my co-founder{" "}
        <a href="https://twitter.com/calcsam">Sam Bhagwat</a> and I started to
        drive the Gatsby vision.
      </p>
      <p>
        I've lived in the bay area since college — I'm currently residing in
        Berkeley with my lovely wife{" "}
        <a href="https://twitter.com/shannonb_ux">Shannon</a>.
      </p>
      <p>
        I tried founding two startups before Gatsby. I've done a fair bit of
        interesting contracting and consulting. My only institutional work of
        note is a few years I spent early on at{" "}
        <Link to="/new-beginnings/">
          Pantheon leading the frontend product work.
        </Link>
      </p>
      <p>
        I grew up in a{" "}
        <a href="https://www.cityoftoledo.org/">
          little town on the Oregon coast with lots of trees
        </a>
        . After high school, I served a two year mission in the Philippines for{" "}
        <a href="https://lds.org">
          The Church of Jesus Christ of Latter-Day Saints.
        </a>
        Then I attended <a href="https://byu.edu">BYU</a> and graduated with a
        degree in Information Systems.
      </p>
      <p>Life is good.</p>
    </Layout>
  )
}
