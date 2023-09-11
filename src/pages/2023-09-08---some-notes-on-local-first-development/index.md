---
title: Some notes on Local-First Development
date: "2023-09-08T06:37:26.000Z"
---

A few months ago in June, I attended [a local-first meetup in Berlin](https://www.youtube.com/results?search_query=Local-First+Meetup+Berlin+%231). An intellectual crackle filled the air as we watched demos of new libraries and products. Many of us had been independently playing around with local-first development ideas for a while — in my case, over a decade — and the in-person meetup gave us the chance to trade notes late into the night. 

![Picture of Berlin Local-First meetup](./berlin-meetup.jpg)


In the months since, I’ve continued to tinker with these technologies and collected some point-in-time notes on significant developments and what might happen in the years to come.

### Table of Contents
```toc
# This code block gets replaced with the TOC
exclude: Table of Contents
```

## What’s Happening?

I see “local-first” as a movement amongst application developers for moving data reads and writes to an embedded database in each client — as seen with products like Figma or Linear. The technology at the heart of this movement is "sync engines", which facilitate data exchange between clients and backends.

The benefits are multiple:

* Simplified state management for developers
* Built-in support for real-time sync, offline usage, and multiplayer collaborative features
* Faster (60 FPS) CRUD
* More robust applications for end-users

I’ve been particularly interested in recent developments in sync engines, many powered by [Conflict-free Replicated Data Types (CRDTs)](https://en.wikipedia.org/wiki/Conflict-free_replicated_data_type). They are the key technology that makes local-first practical.

The key questions I’ve been thinking about and discuss in this post are:

* Why is local-first happening now?
* Will most rich client apps use local-first?
* What approaches are people exploring now?
* Should you adopt local-first now?

If you’re looking for a more general introduction to local-first, I’d start with this post: [Building data-centric apps with a reactive relational database](https://riffle.systems/essays/prelude/) and this talk: [Why Local First?](https://www.youtube.com/watch?v=jxuXGeMJsBU&t=1s) There’s additional suggested readings at the end of the post.

(There are also a lot of interesting implications of local-first development in the realm of privacy, decentralization, data control and so on, but I’ll leave it to others more well-versed in these topics to flesh them out.) 

I believe local-first will be the next large paradigm shift for rich client apps that’ll dominate our attention as it works its way through the application world over the next 5-10 years.

## Why is Local-First Happening Now?

I’ve read about and played with local-first type ideas for a decade or so but only now does it seem to be gaining steam with many young startups rushing to productize its ideas.

Figma, Superhuman, and Linear are good examples of pioneering startups in the local-first paradigm — they have gotten a lot of attention recently for their fast, multiplayer UX — and all rely on local-first ideas and bespoke sync engines.

Many builders now see local-first as a key way to differentiate their applications.

Why is this happening now?

My general model for change in the tech world is that a given bounded community of practice can only adopt one large shift in practices at a time. While local-first ideas have been floating around for decades, they haven’t come to the forefront for practitioners, who have been focused on more important and urgent changes.

Inter-product competition forces companies to stay up to date with the latest practices ([Red Queen hypothesis](https://en.wikipedia.org/wiki/Red_Queen_hypothesis)). New companies adopt or invent new practices to give them an edge in the market. Linear needs local-first to compete successfully with Jira.

A simplified timeline of these practice shifts for building web apps is:

* 2000s: the rise of Rails / Django 
* 2010s: the shift to SPAs powered by APIs (REST, GraphQL, etc) in the 2010s, spurred on by the release of React.js in 2013

We’re now in the late stages of the shift to SPAs so the time seems ripe for a new major shift.

So while it's always been possible to build local-first, it's only now that demand for local-first tooling has grown enough to drive the growth of multiple open-source and devtool startups around local-first ideas.

There's also this sense that the Cloud has gotten too complicated. Local-First is one the many refactors people are exploring to attempt to simplify our application stack.

## Will Most Rich Client Apps Use Local-First?

I’ve chatted with a number of developers who — frustrated at maintaining the homegrown bespoke sync systems they wrote — are replacing it with new local-first tooling. The tooling feels a lot better and having standard primitives make it easier to build great experiences.

Local-first is clearly developing into an ecosystem similar to authentication services but for handling data and features that need to be real-time / collaborative / offline.

The key question here is whether local-first will remain a niche technology or if it'll gradually wholesale replace the current API approach for rich client apps.

It’s still early but I’m confident that at a minimum, we’ll see multiple companies in local-first in the coming years with $10-100m ARR along with several thriving open-source ecosystems.

And if local-first becomes the new default paradigm for how data is handled in rich client applications, it will be much larger and reshape many parts of the Cloud ecosystem.

There'll be many issues to solve before this can happen. I'll next look in detail at one of the first issues that people encounter when trying local-first, CRUD.


### CRUD with CRDT-based Sync Engines

To fully replace client-server APIs, sync engines need robust support for fine-grained access control and complex write validation.

The most basic use case for an API is _state transfer_ from the server to the client. The client wants to show information about an object so reads the necessary data through the API.

Local-first tools all handle this perfectly. They ensure the latest object data is synced correctly to the client db for querying from the UI.

But while reads are generally easy, support for complex writes is still immature in local-first tools — clients tend to have unrestricted write access and updates are immediately synced to other clients. While this is generally fine for e.g. text collaboration or a multiplayer drawing surface, this wouldn’t work for typical ecommerce / SaaS / CRUD-heavy applications.

Local-first tools need somewhere to put arbitrary business logic written in code, because real-world systems start out elegant and simple and, over time, accumulate more and more chunks of logic. 

A data property might normally be limited to 20 but Acme Corp paid $50k to get a limit of 100. Or write access needs restricted for sensitive information like account balances. Or validating writes against third parties, like a calendar booking system that needs to ask an external calendar API if a time slot is open. These inevitable chunks of code and logic live in the API.

Local-first sync engines using e.g. CRDTs work well to drive consistency _within_ a system but real-world systems also need an authoritative server which can enforce consistency within _external_ constraints and systems. 

Or as Aaron Boodman, a [Replicache](https://replicache.dev/) co-founder, put it: “CRDTs converge, but to where?”


### Patterns for Complex Writes with CRDTs

I asked Anselm Eickhoff and James Arthur (founders of [Jazz](https://jazz.tools/) and [ElectricSQL](https://electric-sql.com/) respectively, both CRDT-based tools) about how they suggest handling writes that need an authoritative server.

They both responded that you can emulate API request/response patterns through a distributed state machine running on a replicated object.

E.g. a client wants to update the user name. So it creates the following object:

```json
{
   "machine": "updateUserName",
   "state": "requestUpdate",
   "request": {
     "name": "Fred",
     "id": 123,
     "timestamp": 1694122496
   },
  "response": {}
}

// User 123
{
  "name": "Bob",
  "id": 123
}
```

The server is listening for new objects like this so upon receiving it, the server validates the request and updates the state machine object along with the name on the user object (which again are synced back to clients):

```json
{
   "machine": "updateUserName",
   "state": "finished",
   "request": {
     "name": "Fred",
     "id": 123,
     "timestamp": 1694122496
   }
  "response": {
    "error": false,
    "timestamp": 1694122996
  }
}

// User 123
{
  "name": "Fred",
  "id": 123
}
```

This has the interesting and useful implication that in-flight requests are synced to other clients and it’s trivial for the server to emit progress updates. E.g. an app that supports a team of users uploading images for some nifty AI enhancements. The client can emit progress updates on the upload and the server as it works through enhancements.

In other words, requests/responses have the same multiplayer, offline, real-time sync properties as the rest of the app.

This pattern can be wrapped up in a fairly standard looking mutation function e.g. `const {res, error} = await updateName({ name: "fred" })`

Jazz also lets you restrict writes to certain object fields to a specific role. Sensitive information would be marked read-only for clients who would need to request the server to update them.


### Local-First DX is Still Being Explored

Beyond the question of _can_ you build any application with local-first tools, there’s still the question of whether devs will _want_ to.

* Do advantages make it worth learning a new stack and migrating applications?
* There’s a lot of missing gaps still — what will a full production DX for a local-first toolchain look like?
* How complex will it feel to build a simple app?
* Is there enough demand to fund all the new libraries and products that’ll need to be built?

The success of Figma, Superhuman, and Linear suggest these issues will get solved in time.


## What Approaches are People Exploring Now?

I’m grouping approaches I see into three broad categories.

### 1. Replicated Data Structures

These projects provide support for replicated data structures. They are convenient building blocks for any sort of real-time or multiplayer project. They typically give you APIs similar to native Javascript maps and arrays but which guarantee state updates are replicated to other clients and to the server.

It feels like magic when you can build a simple application and and see changes instantly replicate between devices with no additional work.

Most replicated data structures rely on CRDT algorithms to merge concurrent and offline edits from multiple clients.

There’s a number of open source and hosted projects offering replicated data structures, including the granddaddy in this space, Firebase, plus many newer ones.

These services are great for making parts of an app real-time / multiplayer. E.g. a drawing surface, a chat room, a notification system, presence, etc. They’re very simple to get started with and the shared data structures approach offers a much better DX than manually passing events through with websockets or push messaging services.

Open source projects:

* [Yjs](https://yjs.dev/)
* [Automerge](https://automerge.org/)
* [Jazz](https://jazz.tools/)
* [Evolu](https://www.evolu.dev/)

Hosted services:

* [Firebase](https://firebase.google.com/)
* [Liveblocks](https://liveblocks.io/)
* [Partykit](https://www.partykit.io/)
* [Triplit](https://www.triplit.dev/)
* [Reflect](https://reflect.net/)
* [Instant](https://www.instantdb.com/)
* [Ditto](https://www.ditto.live/)

### 2. Replicated Database Tables

An approach several projects are taking is to sync from Postgres to a client db (generally SQLite). You pick tables (or materialized views) to sync to the client and then they get loaded along with real-time updates as writes land in Postgres.

SQLite in the browser is one big advantage of this approach as it gives you the rich, familiar querying power of SQL in the client.

Given Postgres’ widespread usage and central position in most application architectures, this is a great way to start with local-first. Instead of syncing data in and out of replicated data structures, you can read and write directly to Postgres as normal, confident that clients will be in sync.

I’ve built a number of job queues and notification systems over the years and they’ve all struggled with their version of the Byzantine Generals problem. Clients would miss an update (usually due to being offline), and then users would complain about zombie jobs that never finished. In contrast, replicated database tables mean the background process can simply write updates to Postgres, confident all connected clients will get the update.

#### Postgres to SQLite:
* [ElectricSQL](https://electric-sql.com/)
* [Powersync](https://www.powersync.co/)
* [SQLedge](https://github.com/zknill/sqledge)

ElectricSQL also supports syncing client writes back to Postgres and other clients.

#### Some Related Database Syncing Tools:

* SQLite to SQLite
    * [SQLSync](https://github.com/orbitinghail/sqlsync)
    * [VLCN](https://vlcn.io/)
    * [Mycelite](https://mycelial.com/)

* MongoDB to SQLite
    * [Relm](https://realm.io/)

### 3. Replication as a Protocol

The startup [Replicache](https://replicache.dev/) has a unique “replication as a protocol” approach. Replicache is a client JS library along with a replication protocol — which lets you integrate arbitrary backends, provided you follow the spec. It’s more upfront work, as the sync engine is “some assembly required”, but as Replicache is mostly your own code, it gives the most flexibility and power of any local-first tool I’ve seen to date. The startup behind Replicache is also building Reflect, a hosted backend for Replicache.


## Should You Adopt Local-First Now?

It depends on your use case and risk tolerance.

For the right people and teams, this is an incredibly exciting time to jump in and start using and contributing to a new, powerful way to build applications. These new tools make it dramatically easier for you to build realtime, multiplayer, and offline applications — which will improve much of our day-to-day software.

For almost any **real-time use case**, I’d choose *replicated data structures* over raw web sockets as they give you a much simpler DX and robust guarantees that clients will get updates.

For **multiplayer and offline**, again you’ll almost certainly want to pick an open source *replicated data structure* or hosted service. There’s a lot of difficult problems that they help solve.

The *Replicated Database* approach also works for the real-time, multiplayer, offline use cases. It should be especially useful for data-heavy applications and ones with many background processing writing into Postgres.

But in general, I’d still be wary of using local-first outside realtime / multiplayer / offline use cases. Local-first is definitely still bleeding-edge. You will hit unexpected problems. A good community has rapidly developed, but there’ll still be some stretches on the road where you’ll have to solve novel problems.

So: first, ask if you really need local-first and second, see if it makes sense to isolate the local-first parts and architect the rest of the app for now in a more conventional fashion.

To help you ask questions and start experimenting, all the major tools have plenty of examples and demos to play with and active Discord channels where you can ask questions. There’s also a general Local-First community website and Discord that holds regular meetups — https://localfirstweb.dev/

---

Some additional reading on local-first: 

* [https://www.inkandswitch.com/local-first/](https://www.inkandswitch.com/local-first/)
* [https://tantaman.com/2022-08-23-why-sqlite-why-now.html](https://tantaman.com/2022-08-23-why-sqlite-why-now.html)
* [https://tonsky.me/blog/the-web-after-tomorrow/](https://tonsky.me/blog/the-web-after-tomorrow/)
* [https://www.youtube.com/watch?v=aJh2VVEDWw4](https://www.youtube.com/watch?v=aJh2VVEDWw4)
* [https://www.powersync.co/blog/sqlite-persistence-on-the-web](https://www.powersync.co/blog/sqlite-persistence-on-the-web)
* [https://www.youtube.com/watch?v=Wo2m3jaJixU](https://www.youtube.com/watch?v=Wo2m3jaJixU)
* [https://www.wired.com/story/the-cloud-is-a-prison-can-the-local-first-software-movement-set-us-free/](https://www.wired.com/story/the-cloud-is-a-prison-can-the-local-first-software-movement-set-us-free/)
* [https://stopa.io/post/296](https://stopa.io/post/296)
* [https://www.figma.com/blog/how-figmas-multiplayer-technology-works/](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)
* [https://electric-sql.com/blog/2023/02/09/developing-local-first-software](https://electric-sql.com/blog/2023/02/09/developing-local-first-software)
* [https://electric-sql.com/blog/2022/12/16/evolution-state-transfer](https://electric-sql.com/blog/2022/12/16/evolution-state-transfer)
* [https://electric-sql.com/docs/reference/alternatives](https://electric-sql.com/docs/reference/alternatives)
* [Linear's CTO thread on DX advantages of Local-First](https://twitter.com/artman/status/1558081796914483201)
* [Building an offline realtime sync engine](https://gist.github.com/pesterhazy/3e039677f2e314cb77ffe3497ebca07b)
* [Twitter thread with local-first use cases](https://twitter.com/samwillis/status/1694328387601362966)

_Thanks to Sam Bhagwat, Shannon Soper, Johannes Schickling, Pekka Enberg, Anselm Eickhoff, and James Arthur for reading drafts of this post_
