---
title: Hosting static sites with Docker and Nginx
date: "2014-04-24T22:12:03.284Z"
layout: post
readNext___file: ../2011-10-28---building-your-own-tools/index.md
tags:
  - docker
  - open source
  - node.js
  - gulp.js
---

For most of its life, this blog has run on Drupal. But as I no longer do Drupal
development, maintaining (and even using) Drupal feels like more and more of a burden.
So like the other [cool kids on the internet](https://twitter.com/paulg/status/402205795552489472)
I decided to convert my site to a static website. Easy to host, zero security updates, and completely customizable.

I evaluated quite a few of the [popular static site frameworks](http://staticgen.com/) out there e.g.
[Jekyll](http://jekyllrb.com/) and [Docpad](http://docpad.org/) but none of them
really attracted me. It seemed the problem of generating an HTML site was small enough
that with [GulpJS](http://gulpjs.com), a number of [NPM modules](https://github.com/KyleAMathews/blog/blob/master/package.json),
and some glue code I could easily build my own static site generator.

And as hoped, building a custom static site generator turned out to be straightforward.
Props to GulpJS and the vast treasure-trove of Node.js modules in the [NPM repository](https://www.npmjs.org/).
You can see the meat of the logic for generating this site [at the blog's repo](https://github.com/KyleAMathews/blog/blob/master/gulpfile.coffee#L23-L78).

The next task was how to host the site. I briefly considered using Amazon S3, which is
a very attractive option as it's very fast and essentially infinitely scalable, but decided against
it as I wanted a chance to play around with two other software tools, [Docker](http://docker.io) and [Nginx](http://nginx.org/).

## Building applications with Docker

Docker has really captured my and many other developers' imaginations. Its primary
attraction to me is the utter simplicity it enables in packaging and deploying server applications.
Coming from years of writing complicated [Chef](http://www.getchef.com/) or [Ansible](http://www.ansible.com/home)
scripts, being able to bundle each applications' dependencies together is a breath of
fresh air. [Global variables (and packages) are bad](http://c2.com/cgi/wiki?GlobalVariablesAreBad).
Docker lets you completely ignore the *global state* of the server that's running
your application. It's truly a "Write once, run anywhere" system. If it works on
your laptop, it'll work in production no matter where or what it's installed with.

This changes how you think about the boundaries of your application.
Consider my case of hosting this static website. Typically you'd think of this blog
as the collection of HTML, CSS, and images that make up the site.

What you think your application is affects how you deploy it. If your application is a bundle of files then
"deploying" means placing these files inside a software system that understands HTTP and can serve files, e.g. Apache or Nginx.

Compare this to how I'm using Docker for this blog. Instead of using a global Nginx instance
to serve my blog, I create a Docker image with Nginx *and* my blog's files. Which makes the resulting "blog application"
an atomic unit that I can build, test, and run anywhere as many times as I want.

This is a much more preferable outcome. Instead of a messy collection of files as my outcome,
with Docker, I have a neat tidy Docker image. Now to to run a very high-performance blog, all I
need to do is type `docker run blog` and off it goes.

This makes some fun and useful things quite easy. E.g. while writing this post, I was curious how well
my blog would hold up under load testing. I didn't want to use the container running the live
version of this blog for the testing as that would fill my access logs with useless entries.
So instead, I ran an additional instance of my Docker blog image on the
same server but listening on a different port. I used this twin
version of my blog to do the load testing and threw it away once the testing was finished. Setting up
a parallel version of this blog would be much more difficult with a global installation of Nginx.

## Docker layers

Docker has an additional innovation which I love. Docker lets you create base images
which your application can build on. Since all static sites need about the same Nginx configuration,
I created a [Nginx Docker image](https://github.com/KyleAMathews/docker-nginx)
I can use (and anyone else) as a base whenever building a new static website.

By encapsulating the Nginx configuration in an image, the Dockerfile (Docker's DSL
for defining image builds) [for this blog](https://github.com/KyleAMathews/blog/blob/master/Dockerfile) is incredibly simple. Three lines in fact.

````bash
FROM kyma/docker-nginx
ADD public/ /var/www
CMD 'nginx'
````

The first line tells Docker to use my Nginx image as the base, the second says to add
the site's files within the image at /var/www, and the third says to run Nginx when
a new container is started.

There's tons of similar base images available on the public Docker image index for building [Ruby](https://index.docker.io/search?q=ruby),
[Python](https://index.docker.io/search?q=python), [Go](https://index.docker.io/search?q=go), etc. applications.
But it's also trivial to create base images for your specific needs. For example, this is
a [base image I wrote with the tools I commonly use to build web frontends](https://github.com/KyleAMathews/docker-nodejs-base/blob/master/Dockerfile).
I've used it now for several side projects of mine.
