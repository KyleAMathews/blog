import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/index.js"

export default function About({ location }) {
  return (
    <Layout location={location}>
      <h1>Welcome Internet</h1>
      <p>
        Welcome to my humble abode on the internet.
      </p>
      <p>
        I'm co-founder at <a href="https://electric.ax">Electric</a>,
        building sync for apps and agents.
      </p>
      <p>
        Previously, I created the open source project{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a> and was co-founder and
        CEO/CTO of <a href="https://gatsbyjs.com">Gatsby Inc.</a> A company
        my co-founder <a href="https://twitter.com/calcsam">Sam Bhagwat</a> and
        I started to drive the Gatsby vision. Seven years after founding the
        open source project, <a href="https://www.netlify.com/">Netlify</a>{" "}
        bought the company and project in 2023.
      </p>
      <p>
        I'm currently residing in Salt Lake City with my lovely wife{" "}
        <a href="https://twitter.com/shannonb_ux">Shannon</a> and two children.
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
