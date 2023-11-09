---
title: Announcing trpc-crdt
date: "2023-11-10T18:59:39.000Z"
---

Since [my last blog post on local-first](https://bricolage.io/some-notes-on-local-first-development/) and CRDTs two months ago, I’ve continued to explore the possibilities around systems that colocate code with subsets of data, interconnected by sync engines.

I’ve been working on a set of libraries that let you run RPC calls to server functions over different CRDT libraries — powered by the wonderful [tRPC library](https://trpc.io/).

Now available on NPM:



* `trpc-yjs` for [Yjs](https://yjs.dev/)
* `trpc-electric-sql` for [ElectricSQL](https://electric-sql.com/)

I’m working with members of the [Jazz](https://jazz.tools/) and [Automerge](https://automerge.org/) communities to finish up libraries for those systems. Other CRDT library maintainers, please jump in!

All code can be found at https://github.com/KyleAMathews/trpc-crdt


## Why build applications with CRDTs?

These libraries probably only make sense if you’re already building an application with CRDTs, so let me quickly recap the argument for “why CRDTs”.

CRDTs enable local-first style development — local-first is a software architecture which shifts reads/writes to an embedded database in each client. Local writes are replicated between clients by a Sync Engine.

The benefits are multiple:



* Simplified state management for developers
* Built-in support for real-time sync, offline usage, and multiplayer collaborative features
* Faster (60 FPS) CRUD
* More robust applications for end-users

Ok, so CRDTs are nice — but why trpc-crdt?

Given CRDTs/local-first are so client-centric, I’ll first make the, probably obvious, arguments for why running code on a server is often necessary. Followed by my explanation of the, perhaps not so obvious, rationale for using a CRDT as the transport layer for RPC calls from client to servers (at least when building an application with a CRDT).


## Sometimes you just need a server

In [my last blog post on local-first](https://bricolage.io/some-notes-on-local-first-development/), I wrote that while local-first tech allows far more reads and writes to happen on the client, you still often need to run code on a server.

This can happen because:



* An optimistic client mutation isn't safe — CRDTs make optimistic client mutations far safer than normal but an authoritative server is still often needed for:
    * mutations that need complex or secure validation (e.g. money transfer)
    * mutations that include writes to external systems that must be completed in the same transaction e.g. writes to a 3rd party API
    * mutations to complex data that's not easily expressed in CRDTs
* Only the server can run the code as the code:
    * needs more compute resources than the client has
    * is an ongoing background processes
    * is written in a language other than JS (WASM is changing this)

In the post, I wrote about a pattern to solve this with a [“distributed state machine” running across client and server](https://bricolage.io/some-notes-on-local-first-development/#using-a-distributed-state-machine-to-handle-complex-writes) — where the server is just another node in the network but with super powers. I outlined the mechanics and suggested the pattern could be wrapped up in a simple RPC library.


## But why do server authoritative calls over a CRDT?

About now, you might be wondering “why do this distributed state machine thing when we already have perfectly good ways to run code on a server e.g. REST/GraphQL) APIs?”

They work, but there are some interesting advantages to keeping everything in CRDT-land:



* No need for client-side state invalidation/refetching after server writes. The server handling the mutation writes mutations directly to the CRDT meaning all server mutations are pushed immediately to all clients. Data across your component tree will be updated simultaneously along with your UI — this solves neatly a major pain point with normal API mutations!
* RPC calls get all the benefits of of CRDTs:
    * server calls over CRDTs are resilient to network glitches with guaranteed exactly-once delivery. No need to add retry logic to your calls.
    * RPC calls are now replicated (if you choose) in real-time to other users of the application
* Simplify your architecture. If you're using CRDTs extensively in your applications, RPC calls over CRDT helps keep your architecture simple and consistent.
* A free audit log! Which may or may not be useful but it can be handy or even essential to see a log of all mutations.
* Easy real-time updates for long-running requests e.g. the server can simply update a progress percentage or what step the request is on. If some requests are of interest to a wider audience e.g. in group collaboration, running requests over CRDT means you get free real-time job notifications.


## Exploring tRPC

A few weeks ago, I set off to see how to build this. While looking around, I kept thinking that [tRPC](https://trpc.io) was very close to what I wanted API wise. TRPC has simple patterns for defining server functions and automatically generates a nice typed client for calling the functions.

Looking closer, I discovered their [transport layer is pluggable](https://trpc.io/docs/client/links)! They have built-in HTTP/WebSocket plugins and with a quick prototype later, I had my own plugin running API calls over Yjs!

TRPC over Yjs looks like this:

```ts
// Server
const appRouter = router({
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), id: z.string() }))
    .mutation(async (opts) => {
      const {
        input,
        ctx: { users, response },
      } = opts
      const user = { ..input }
      // Set the new user on the Y.Map users.
      users.set(user.id, user)
    })
})

// Client
await trpc.userCreate.mutate({ id: 1, name: `Kyle` })
Users.get(1) // The new user is now available on the Users map in the client
```

See the [GitHub repo for installation and usage instructions and example code](https://github.com/KyleAMathews/trpc-crdt). I’m quite pleased with the experience using them while building some simple applications. It’s a straightforward RPC experience but with CRDT superpowers.

I’d love to hear what y’all think.


## Afterthought: What about syncing data between servers on the backend?

During this experience, I keep thinking about how this idea of colocated data connected with sync engines might change how we build backend applications. Just as local-first and sync engines are suggesting changes to frontend architectures, it seems they could also push a rethink of backends.

It’s interesting to think about building Gatsby Cloud and how much time we spent building internal APIs, writing/debugging caching logic, scaling (and scaling some more) Postgres/Redis, debugging p99 spikes from internal API call swarms, etc. — all work to just get fresh-ish data out of the db into the right function at the right time. All of that could be replaced by queries to a local sqlite db with data automatically kept up to date by a sync engine.

Fly.io wrote up a good blog post on their explorations on this topic on how replicated data lets them avoid writing internal APIs — [https://fly.io/blog/skip-the-api/](https://fly.io/blog/skip-the-api/)

The HN discussion on the article was _very_ hostile to the idea — [https://news.ycombinator.com/item?id=37497345](https://news.ycombinator.com/item?id=37497345) — e.g. a popular comment:

> “If you give access to your DB directly, your API effectively becomes your API with all the contract obligations of the API. Suddenly you don't completely control your schema: you can't freely change it, you need to add things there for your clients only. I've seen it done multiple times and it always ends poorly. You save some time now by removing the need to build an API, but later you end up spending much more time trying to decouple your internal representation from the schema you made public.”


Schema evolution in distributed systems are hard in general — so I’m very sympathetic to the objections — APIs do help solve this problem by decoupling the internal and external schema so the two can evolve separately.

This is a vivid problem when building with synced colocated databases in each client as it converts clients into full-blown nodes within the distributed system — each with their own copy of the schema. [Ink & Switch](https://www.inkandswitch.com/) has done some interesting explorations around solving schema evolution with their [Cambria library and “edit lens”](https://dl.acm.org/doi/pdf/10.1145/3447865.3457963). [ElectricSQL’s “shape” API](https://electric-sql.com/docs/usage/data-access/shapes) is also interesting in that it lets you only expose subsets of a schema to consumers. But this area definitely still needs more work.


## Discussion Questions:



1. Is making RPC calls over a CRDT actually a good idea? For high-volume calls and/or those with large inputs — it perhaps doesn’t make sense to store them all in a CRDT. You also lose the depth of HTTP tooling / infra. You could make normal HTTP API calls and then write responses back from the server through the CRDT and get many of the same benefits. The tradeoff you'd lose from not using CRDTs is auditability, offline support, guaranteed delivery, easy visibility of requests in collaborative settings. All of which people do build into HTTP APIs but you get for free with the CRDT approach.
2. There are a lot of ways of setting this up in the CRDT depending on how visible/private you want the tRPC calls to be. You can go from extremes where “everyone can see everyone’s calls” to “a user can only see their calls”. Both are useful depending on what you’re going for.
3. The Sync Engine in this sort of system becomes _the_ SPOF / bottleneck. To be broadly usable for running entire apps, It has to handle terabytes of data at really high throughput and really low latency and be ~bug free — database-level quality. There aren’t any yet at this level of quality (though some great teams are pushing hard to make sync engines amazing).
