---
title: Working full-time on Gatsby
tags:
  - open source
  - gatsby
  - typography.js
date: "2016-08-12T17:52:44.000Z"
draft: false
---

After several years of working on a startup, I've recently quit. The
reasons are quite boring—poor product traction and we ran out of money—
so I won't go into that here. But the exciting part is that I'm now free
to work more on some of my open source projects! Two in particular,
[Gatsby.js](https://github.com/gatsbyjs/gatsby) and
[Typography.js](https://github.com/kyleamathews/typography.js).

*Gatsby.js* is a React.js static site generator that marries ease of
use with modern web technologies. *Typography.js* is a toolkit for
building websites with beautiful typography. This site uses both
Gatsby.js & Typography.js!

I'm looking for both direct sponsorship and consulting/contracting
opportunities for these projects. [Please contact
me](mailto:mathews.kyle@gmail.com) if you're thinking about using
Gatsby/Typography.js in a major way or have interesting and/or
high-value projects you'd like help on. Web agencies and larger
companies looking for new web toolchains would be great fits.

Both these projects are very exciting and meaningful to me. I've been
building websites and web apps for a long time now and they both are a
compilation of a decade+ of thought about and experimentation into what
is the perfect toolset for building for the web.

Both projects were also, interestingly, by-products of working on my startup
RelateRocket. Gatsby started when I needed to create a website for
RelateRocket and wanted to avoid using anything other than React.js.
Typography.js started when we were thinking about building a product
that'd automatically create personalized landing pages for sales reps to
send and I started thinking about how to easily/quickly emulate the
typography and other design choices from our customers' websites. It is satisfying that although the startup didn't succeed, 
something of value has risen, phoenix-like, from the ashes.

Now that my full attention is on Gatsby, I have a number of ideas
I'm working on that I'm really excited about.

* **Service workers & offline support**. Service workers are perhaps the
  most exciting technology that's come to the web in the past several
years. It makes possible (finally) sophisticated client caching plus
true offline support. I'm adding excellent on-by-default support to
Gatsby for Service Workers and a great offline experience.
* **Code splitting**. A great website loads really fast. Code splitting
  is a technique for ensuring that every page loads with *only* the code
that's necessary for that page.
* **Themes & Plugins**. Wordpress & Jekyll are both great examples of
  open source communities with robust theme & plugins ecosystems. I'd
love something like that to develop around Gatsby.
* **Website & Documentation/Tutorials**. Somewhat ironically for a
  website building tool, Gatsby doesn't yet have a website. This will be
fixed, plus I'll be writing high-quality documentation and tutorials.
* **Pull instead of Push**. This last idea is a bit abstract but super
  powerful. Currently, data in Gatsby (like pretty much every static site
generator) is *pushed* into templates to be rendered into HTML. This is
a simple pattern and works great for many use cases. But when you start
working on more complex sites, you really start to miss the flexibility
of building a database-driven site. With a database, all your data is
available to query against in any fashion that you'd like. Whatever bits
of data you need to assemble a page, you can *pull* in. You want to
create author pages showing their bio & last 5 posts? It's just a query
away. I want this same flexibility for Gatsby. I want to be able to
query my markdown files and treat them as a database of sorts. I've hit
on what I think is an excellent way to do this and am prototyping the
code. Expect to hear more on this soon. Ping me if you'd like an early
demo. It's using [GraphQL](http://graphql.org) under the hood and the
collocated queries pattern developed by
[Relay](https://facebook.github.io/relay/). I couldn't be more excited
about this feature. It'll open up so many useful and powerful options.

The web is an incredible place. I'm so happy I get to help build it. If
Gatsby or Typography.js excite you, I'd love you to join in helping
design & document & build them.

Also a quick endnote. I noticed while writing this that my [first blog
post](https://bricolage.io/first-post/) was a bit over 10 years ago!
Happy anniversary blog! :-)
