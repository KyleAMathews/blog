---
title: "Typefaces: The easiest way to self-host open-source fonts"
tags:
  - open source
date: "2017-01-31"
readNext: /gatsby-open-source-work/
---

Once upon a time, I thought self-hosting web fonts was intimidating. It
seemed nice but the complexities were too much.  I needed to create a
bunch of weird files (eot?), write weird css syntax (bullet proof
what?), etc. Much easier to drop a little Google Fonts `<link>` in my
html's `<head>` and call it a day.

But as time went on, I found some really nice advantages to hosting your
fonts.

* Self-hosting is *significantly faster*. Loading a typeface from Google
Fonts or other hosted font service adds *an extra (blocking) network
request*. [In my
testing](https://github.com/reactiflux/reactiflux.com/pull/21), I've
found replacing Google Fonts with a self-hosted font can improve a
site's speedindex by ~300 miliseconds on desktop and 1+ seconds on 3g.
This is a big deal. YMMV on exact numbers but directionally, self-hosting
is faster *and* importantly opens the door for further optimizations.
* Your *fonts load offline*. It's annoying to start working on a web
project on the train or airplane and see your interface screwed up
because you can't access Google fonts. I remember once being in this
situation and doing everything possible to avoid reloading a project as
I knew I'd lose the fonts and be forced to stop working.
* *Go beyond Google Fonts*. Some of my favorite typefaces aren't on
Google Fonts like [Clear Sans](https://01.org/clear-SANS), [Cooper
Hewitt](https://www.cooperhewitt.org/open-source-at-cooper-hewitt/cooper-hewitt-the-typeface-by-chester-jenkins/),
and
[Aleo](https://www.behance.net/gallery/8018673/ALEO-Free-Font-Family).

*Cool typefaces not on Google Fonts*

![Clear Sans typeface](clear-sans.png)

![Cooper Hewitt typeface](cooper-hewitt.png)

![Aleo typeface](aleo.png)

## The awakening

Last fall, a client asked me to use some commercial typefaces for a
[Gatsby](https://github.com/gatsbyjs/gatsby) site I was building. After
reading up on the process, I realized that
[webpack](https://webpack.js.org) actually did most of the work.  You
simply present it a css file pointing at the various font files and the
css and files will all get included in your final site build. No
problemo.

It then occurred to me how nice it'd be if you could install typefaces
through NPM. The last 4-5 years of my life have seen the steady
accumulation of more and more package.json files with longer and longer
lists of NPM package dependencies for my various node and web projects.
Which I absolutely love. Compared to the bad ol' days of checking in
dependencies of dubious origin (or worse, having to follow a generally
out-of-date INSTALL.md), managing everything with NPM is beautiful.

With typefaces as NPM packages, you could do something like `npm install
--save typeface-open-sans` which would install a package containing both
the font-face css and font files and then in your project's entry file
add `require('typeface-open-sans)` and... you're done.

Perhaps if self-hosting fonts wasn't so annoying I'd do it more...

So I wrote a quick and dirty script to create packages for the typefaces
used on this blog
([Alegreya](http://www.huertatipografica.com/en/fonts/alegreya-ht-pro)
and [Alegreya
Sans](http://www.huertatipografica.com/en/fonts/alegreya-sans-ht))
and... it worked! I added a few more typefaces for some other projects
and things were looking really good.

Then I put the project aside for several months as I was focusing on
making some major feature additions to Gatsby (blog post coming soon)
but last week, jumped back to this for several days and upgraded my
Google Fonts package creator script and added a Font Squirrel package
creator script as well and this morning published ~825 new typeface
packages to NPM.

I'm super excited about this. I really enjoy finding [high-leverage
ways](/gatsby-open-source-work/) to dramatically improve our various
web-dev workflows. When something becomes 10x faster or easier, this
frees us to build new and better things.

Building for the web involves navigating dozens of interconnected
workflows. The last few years have seen workflow after workflow get
automated. And the exciting thing is that each new automation enables
workflows up and down-stream from it to be automated as well.  So just
as Typefaces builds on previous automations such as Webpack and NPM, now
that we have automated this part of our workflow (self-hosting), it
opens the door for [automating futher font-loading
optimizations](https://www.zachleat.com/web/comprehensive-webfonts/).

Let me know what you think and please [come over to
Github](/gatsby-open-source-work/) to check out the project (and help
out if you'd like).

And if you're using Google Fonts & webpack, save your users some time
(or stop driving them away) by swapping in Typefaces.

https://github.com/KyleAMathews/typefaces
