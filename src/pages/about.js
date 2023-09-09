import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/index.js"

export default function About({ location }) {
  return (
    <Layout location={location}>
      <h1>Welcome Internet</h1>
      <p>
        Welcome to my humble abode on the internet where weary travelers may
        come and rest for a season.
      </p>
      <p>
        I'm the creator of the open source project{" "}
        <a href="https://www.gatsbyjs.org">Gatsby</a> and co-founder and
        ex-CEO/CTO of <a href="https://gatsbyjs.com">Gatsby Inc.</a> A company
        my co-founder <a href="https://twitter.com/calcsam">Sam Bhagwat</a> and
        I started to drive the Gatsby vision. Seven years after founding the
        open source project, <a href="https://www.netlify.com/">Netlify</a>{" "}
        bought the company and project in 2023.
      </p>
      <p>
        I'm exploring different areas while looking for my next big thing. In
        the meantime, I'm also taking on advising and consulting roles so please
        reach out if you think I can help — mathews.kyle@gmail.com
      </p>
      <p>
        I'm currently residing in Seattle with my lovely wife{" "}
        <a href="https://twitter.com/shannonb_ux">Shannon</a> and toddler son.
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
