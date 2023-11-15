---
title: "Build Notes: Creating a Local Lirst Vite/React/ElectricSQL Starter"
date: "2023-11-15"
---

I was thinking last night about [the new starter I released](https://github.com/KyleAMathews/vite-react-router-electric-sql-starter) — that in the past, I'd do a short Twitter thread dumping out the various observations I made to myself during the project. But now, with Twitter but a shadow of its former self (at least when it comes to tech discussions), it seems less enticing to do that. So back to the original blogging platform pre-micro-blogging (who remembers that term haha).

So here's my blogged Tweet thread:

- The DX felt impeccable. I like React.js as much as I did back at the beginning. Vite has HMR at faster than the speed of thought. React Router is subtle and smooth and anticipates all my needs. And ElectricSQL really completes the story.
- I chatted yesterday with a systems programmer type person who's also lately doing some frontend work. I remarked that frontend feels a bit like designing/playing a game as you're creating interactions and visual layouts and constantly clicking around on things to test stuff. Adds some fun to the problem solving that I miss when I'm doing more backend/systems work.
- I love programming from my schema out. Design the schema and then figure out everything else. ElectricSQL's database-centric approach means you first design your tables and then start writing UI code.
- Without ElectricSQL that'd be somewhat tedious as you create the tables & then have to write a bunch of glue API code, etc. — often I just skip that and do everything in the browser until patterns are settled. But because sync engines let you skip the API entirely, you just define your tables and that's it. You have a client library in your frontend code that you can immediately start reading/writing.
- A huge benefit of ElectricSQL's use of Postgres and SQLite is there's already a lot of great tooling and docs out there I can rely on. Googling/ChatGPT answered all my random questions with ease. As they like to put it, ElectricSQL isn't a new database, it's just a sync engine. 
- There's been [great quantities of ink spilled on the benefits of local-first/sync engines](/some-notes-on-local-first-development/) e.g. super fast UIs as all writes happen locally, built-in real-time cross-tab/browser/device sync, easy multiplayer, etc. But it is still pretty remarkable to feel. I mostly focused on figuring out the DX story for the starter but it was still really fun to open the app in another browser at one point and see all the changes syncing seamlessly in the background. I like free stuff. I didn't _need_ real-time sync per se but it's really nice to have for free.
- The starter is more-or-less the Vite react-ts starter w/ React Router & ElectricSQL added. I also ported the React Router tutorial app to use ElectricSQL — which was good practice puzzling over how to reconcile normal server-centric Form handling with local-first.
- It was interesting puzzling through the data access layer — ElectricSQL's query hook, `useLiveQuery` is very nice and exactly what you want but writing mutations felt a bit odd. I poked around at [TanStack Mutations](https://tanstack.com/query/v4/docs/react/guides/mutations) and really liked their mutation hook — especially how they systematize handling side effects — which I find always one of the trickiest and most important parts of your app to get right. I don't think their hook makes sense as is in a local-first context as it's focused on consuming server APIs but a port for local-first would be sweet. I might tackle that soon.

There you go. I might do more of these.
