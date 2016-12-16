---
title: Chatroom Feature for Drupal 6.x built with Node.js and Backbone.js
tags:
  - drupal
  - backbone.js
  - node.js
date: "2011-10-12T19:47:34.000Z"
layout: post
---

Recently, for fun and learning, I built a group chatroom feature for Drupal 6.x. I've been learning and using [Node.js][0] and [Backbone.js][1] the past few months and building a chatroom seemed like a great project to stretch my skills.

I've recently pronounced it "finished" and the [code is available on Github][2]. There are a few obscure bugs left but by and large, it's plenty stable for those wanting a chatroom on Drupal 6.x.

The feature should work with any site using Spaces and Organic Groups. The demo site I setup, for example, is using a default installation of [Open Atrium.][3]

## Technology stack

The chatroom is built using a now fairly standard set of technologies. For the backend, I used Node.js, [Redis][4], and MySQL. I used [Socket.io][5] for sending the chat messages between clients and the server. I used [Brunch][6] to build the frontend. Brunch bundles together a number of really nice tools for building single-page Javascript apps including [Coffeescript][7], [Backbone.js][1], [Underscore.js][8], [Stitch][9], and [Eco][10].

## A few conclusions

Backbone.js rocks. It makes creating highly interactive, responsive interfaces almost trivial while keeping your code neatly organized. It's a very neat round-up of the best patterns for creating Javascript applications.

Hand-rolling a way to securely connect Drupal and Node.js was a pain--probably the hardest part of building the feature. Use the [Node.js Integration module][11] if you're on Drupal 7\.

Redis is really impressive. It has one of the shallowest learning curve of any technology I've used. I was up and running with it in perhaps 15 minutes. Add that it's incredibly fast and you have a very handy tool to add to your toolset.

Note: the demo site that was linked from here is now off-line.


[0]: http://nodejs.org
[1]: http://backbonejs.org/
[2]: https://github.com/KyleAMathews/Eduglu-Chatroom
[3]: http://openatrium.com/
[4]: http://redis.io
[5]: http://socket.io
[6]: http://brunchwithcoffee.com
[7]: http://jashkenas.github.com/coffee-script/
[8]: http://documentcloud.github.com/underscore/
[9]: https://github.com/sstephenson/stitch
[10]: https://github.com/sstephenson/eco
[11]: http://drupal.org/project/nodejs
