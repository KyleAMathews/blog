---
title: "LocalFirst.fm Podcast with Johannes Schickling"
date: "2024-03-13T16:37:55.483Z"
---

_Johannes invited me on his LocalFirst.fm podcast and we had a great chat talking about all things Sync Engine / LocalFirst._

_I thought the discussion flowed really well and so I'm adding it to the blog here as a good update on my thinking around this area since [my blog post last fall](https://bricolage.io/some-notes-on-local-first-development/)._

[Show notes](https://www.localfirst.fm/5)

<iframe width="560" height="315" src="https://www.youtube.com/embed/RP7DB4w94do?si=ei-47JQNScqAlazr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Transcript

**Johannes:** Hey, Kyle, welcome to the show. How are you doing?

**Kyle:** Doing great. Glad to be here.

**Johannes:** Thank you so much for coming on. You're another fellow early Local First-er, so I'm very curious to hear about your background and then hear about what led you to Local First.

**Kyle:** I've been doing web development of various sorts for like the last 15 plus years, seen a lot along that way, like the whole jQuery era, did Backbone.js for those who read history books and, you know, early React, GraphQL.

I actually started with Drupal. Funny fact, Drupal was big back in 2000, still widely used, but people are like a little more expansive about their view of Drupal back then. I then switched to kind of JavaScript, single page apps, like really early 2010-ish. And yeah, I've been kind of writing that ever since.

Then of course Gatsby which I launched in 2015 and became the first proper production-ready React metaframework, and then rode the whole React wave for a long time.

But in general, my interest is what are the tools we use to build software? Because I think software is very important and the quality of the tools that we use determine the quality of the software that results. We shape our tools and then the tools shape everything else. I think there's really high leverage to continually pondering that question. Because if we can genuinely move to a genuinely better tool, then there's enormous effects that result from that. Not just in our actual day-to-day life as engineers, but as software creators there's a lot, a lot of people whose lives are affected by software.

I've seen many genuinely better tools emerged in my software career. I think React was a massive step forward. I think GraphQL was a smaller step forward, but also a genuine step forward. And I feel local first is another sort of massive leap forward in how we build software. And I think it's something that in the coming years, more and more software will be kind of built in this fashion.

**Johannes:** I definitely agree. I mean, I'm also definitely a connoisseur of good tools, but luckily there's a lot of good tools in many different areas of development overall. Like you just, you can also look at other language ecosystems. I'm definitely very interested and inspired by all the good stuff that's happening in the Rust ecosystem, but also super cool ideas that you find in other ecosystems, such as like the Elixir ecosystem with live views, et cetera. So there's like a lot of great tools and great ideas in all of those places, but I'm curious which sort of problems have you experienced in the past that has led you to local first in particular, and where you now see a different approach, how to deal with those with local first?

**Kyle:** In client server development. There's basically three problems. There's the UI, like how do we construct a UI? How do we do interactivity, charting stuff? So there's a lot different areas within like the UI. And then there's backend problems. There's a lot complicated computing bits. There's like, how do you run infrastructure at scale? How do you make things efficient? So you're not spending enormous amounts of money, security. There's endless domains of problems in the backend. And then there's the middle bits, which is state transfer. Like, how do you move bytes back and forth? Because generally the clients can't hold all the data. So you have to say, I need part of the data to be pulled over. And generally things are changing. So then, how do you get that data from the server to the client and so on? And so there's a lot of problems around moving state back and forth.

And so I think Local First is interesting because I feel like the front end and the backend, there's been just enormous number of innovations on both sides. All the investment and React and Svelte and Solid and Vue and like Vite and Webpack. And there's just been enormous investment that's gone into making the front end experience dramatically better. Plus all the libraries. NPM has millions of libraries or something like that. Each of those things is just enormous effort from individuals or groups all across the world. And it's made the UI world a dramatically better place.

It's just remarkable to me how much faster it is to build amazing stuff versus 15 years ago. The first like big JavaScript dashboard I built, it took me like six months to ship the first version, partly because I wasn't a very good programmer, but partly because there was just like no guidance anywhere. Now there's endless starters, tutorials, etc. React is such a compact, simple abstraction. Everything is dramatically better. And that's because of all the innovation and work in the frontend.

In the backend too, the cloud giants are pouring tons of research into stuff. And there's like 100s of individual cloud services where take what was before three months of programming and now it's like two hours to implement an API and off you go. So there's been lots of innovations too in the backend.

But yeah, the state transfer bit, like the, you know, moving bits back and forth hasn't really gotten as much investment. Partly, I think it's like it's not always a problem. Often it's pretty simple. If you're just building a dashboard, you're like, get me the data for the dashboard, render the data. It's not a very complicated problem oftentimes.

But I think what we're seeing is that where like the best teams, the best apps are investing disproportionately their time in sync engines compared to everyone else, because that's where the best teams see an advantage where they can like build something significantly better than other people.

And so what I think you're seeing now is like the best apps in the industry, you know, like the Figmas, the Linears, Superhumans, et cetera. They're pointing now towards some sort of innovation in state transfer.

Like, how do you load your app extremely fast because everything's cached locally? How do you have real time sync between, you know, different people so you can build like rich collaborative experiences? How do you, you know, save locally and then sync to the server so you're not like doing little spinners all the time when you save stuff? So it's like always fluid and fast. And they're all kind of arriving at the same idea, which is: hey, this whole REST API thing, you know, posting things back and forth, pushing bytes around manually doesn't cut it anymore to build like really complicated, amazing apps. You need a higher abstraction. You need something more sophisticated for handling that state transfer. And that's to me the whole idea behind local first and sync engines. It's the component that handles that state transfer back and forth between the client and server.

**Johannes:** That's super interesting. So you mentioned the term sync engine that that might be not familiar with everyone in the audience. So could you elaborate a little bit what a sync engine is and how that might relate to the approaches that you've mentioned before?

**Kyle:** I feel like it's the best term for uniting a number of emerging tools and their approaches. The basic idea is that REST API, GraphQL, TRPC, whatever. They're all based around getting data to render a page or widgets. And so you're like, hey, API, give me the data from my widgets and then I render it. So it's an imperative step, kind of like the client manually telling the server, give me that thing.

With sync engines, it's a move from an imperative to declarative. So instead of saying, give me that data, it's like for this page, I _declare_ I need this data and then the sync engine makes it so. You often run into the problem imperative state transfer where getting data is easy, but subscribing to updates is hard. Everyone notices there's a massive gulf in difficulty between those two things. And so what's cool about sync engines is that because state transfer is a declarative step, there's actually no additional complexity to get a subscription. It's the same thing. You're just saying, I need this data and then the data shows up. It's a new abstraction for how data arrives on the client.

Where, yeah, again, you're going from imperative to just describing the shape of data that you need to show up on your site for a particular page.

Another good analogy, it's very similar to the shift from jQuery to React, where jQuery, you're like, get this DOM element and tweak the text or get this DOM element, remove the child, construct two other children, drop it in. You're like a little kid playing with like blocks or something. You're fiddling all the time, which is actually fun. I actually enjoyed it. It was a fun little challenge, but it's a huge waste of time. Where now we've moved to React and React is more like, I want the DOM to look like this and it just happens somehow. Like React does a bunch of weird magic under the hood and it efficiently somehow shifts everything around without tearing and voila, it's there. You're like, cool, it's there.

And that's just a lot less to think about when you want something to be so and don't really care about the complicated details. That's a lot less to think about. Which is the value of abstraction. Because we have a finite number of things we can think about. So if we drop two, then we can replace it with two other things instead. So if you drop a lot of thinking about state transfer, then you have more time to think about other things.

**Johannes:** So you've now explained a little bit the benefits of a sync engine and that it simplifies a lot of things. But for someone who's now like curious, how does this actually work? Can you explain what a sync engine does and how it does it?

**Kyle:** I'll use an example for the one that I've used the most, ElectricSQL. So ElectricSQL is Postgres based and you have your tables and basically you declare in the client the shape of data you want pulled over. The shape is defined with basically a SQL query. So you're just like, I want this table and rows that match this criteria. And then the sync engine takes that and then says, OK, I will send you initial set of data and then any updates that I see from then on that match that shape, up it'll go.

**Johannes:** That makes sense. So and this would be one particular example, one particular technology for when your starting point is an existing Postgres database. So is that the way how I should think about it? That like I have my like traditional way of how I'm dealing with data in a more global state, for example, Postgres. And then I'll just slap a sync engine on top of it, connect my clients to it and off I go.

**Kyle:** In theory, in practice, all these tools and this whole space is pretty new still. So I think that's the sort of the platonic ideal that everyone's working towards where you slap a sync engine on and off you go. And that does actually work in some cases. But all these tools have some limitations that you have live with and that they're working to lift. But there's understandably a decent bit of complexity to e.g. taking 30 year old Postgres and tossing a new abstraction onto it. But long as you live within the existing limitations then, yes, then it is actually plug-n-play.

I've been building like a number of sort of toy stuff both to play with this local first, sync engine approach. And it is like very simple. You just add a db, add some tables and then ElectricSQL creates a client side library, very Prisma-esque. Actually, they're still using, I think, Prisma under the hood to generate the client. And then you just immediately just start reading and writing from like the client SQLite. So because they use Postgres in the back end and then SQLite in the client. It's very straightforward. Just like write a query and the data's there. Do an insert. Off it goes. So I can't promise it'll work for everything but if your app can live within the current restrictions, it is very much a magical experience.

**Johannes:** That sounds great. And I think there is a lot of different approaches how a sync system could work. We've also learned a bit about Automerge in previous episodes. But I'm curious to hear more about your experiences building apps with the stack that you've mentioned. Can you tell a bit more about the apps that you've tried those new approaches?

**Kyle:** Yeah, I mean, these apps have been developed for personal use. So, they’re not anything earth-shattering. The most kind of complicated one is one I’m just actually finishing up with my wife. It’s a kitchen AI. So basically, you can take a photo of different ingredients in your kitchen, and then the AI will convert those into ingredients in an inventory system. You can set things like the fill level, the expiration date, and so on.

Then, when you want to go do a recipe, you can upload it by copying and pasting the recipe into the app. It parses out all of the ingredients. What’s interesting is that recipes describe ingredients slightly differently. So, doing just a naive matching won't actually work. That's why I'm using embeddings to do more fuzzy semantic matching between the ingredients in the kitchen and the recipe ingredients. It then tells you what ingredients you have, what you need to buy, and also alerts you if you’re running low on something or if an item has expired and should be replaced.

Moreover, it’s a one-click process to create a shopping list that we send off to Trello. Another cool feature is that we assign each ingredient to enum sections of the grocery store, like meat, seafood, dairy, produce, and canned goods. This way, when you go to the store, you have a neat list of items sorted by sections. It’s pretty fun to use and build.

But yeah, the actual process of building it involves a lot of local-first and ElectricSQL stuff, like defining my schema. It's very data-centric, marking a big shift in how I approach building apps now versus before. Previously, the backend and database setup was annoyingly complicated, so I would delay it until after prototyping. I would just keep all the data in memory in the browser, build the UI, try a bunch of stuff, and have a little JavaScript phase with objects and whatever.

But now, it’s so easy with ElectricSQL to set up the database and have everything syncing that the very first thing I do is write my create table statements. This is a huge improvement because having a fully typed database from the start is very nice. You get a lot of power for free, like type checking and foreign key constraints, which are nice things databases give you from day one of prototyping.

Normally, during prototyping, I’m just blowing away the database and restarting, but that’s like 30 seconds to do. It’s also quite fun to use ChatGPT for generating SQL. I describe all the data I need, and it spits out the create table statements. It’s very productive to have a full-blown typed database-backed SQL first reactive system while prototyping.

Yeah, it’s both a very productive prototyping system, and what’s genius is that your prototype is immediately your production system too. As soon as I’m done, I don’t have to fix a bunch of data problems because it’s been good from the get-go. I just ship it, and it works perfectly. I’m not like, ‘Oh, no, I have all this crap data now in my production system because I took shortcuts to work on my prototype.’ You have all the database guarantees from the get-go.

**Johannes:** 
I love that story. I think this is so powerful. And the analogy you’ve provided before in terms of going from jQuery where you have to do everything manually to react, freeing you up to no longer having to do all of this manually. Now, that really makes sense to me because now you could like you’ve mentioned a few of like the new like AI aspects of this or that the app is an app just for you and your wife. And that’s totally fine.

Like you’re basically now freed up by so much data wrangling or before you would need to like maybe set up a GraphQL endpoint, a REST endpoint, and you’d spend so much time just to have all the data moving stuff taken care of. And if that now just works in the same way as React automatically working and keeping your views up to date. And now if we elevate to the next level of muscles hierarchy of needs for app development and we have the data automatically taken care of, now you can focus actually on what makes the app fun and unique. So that makes a lot of sense.

And I love your anecdotes there of that. You no longer need to think about this like it’s kind of like stage one. Everything is crap in prototyping mode. And then at some point you need to make it real in production mode. But with React, you also don’t really distinguish too much about like, oh, am I now writing this for production or for prototyping? You’re just doing it right. And it’s easy from the get go.

And if you get the same thing for data, that’s super powerful. So I love that.

**Kyle:** Yeah, that's actually a good general question, like the power or quality of some part of your stack if the prototyping is the same as production? Like ideally there's no difference. Just another random tool I've been using lately is SST. I don't know if you've played with that, but they have their live development Lambda function, and it's like killer because you develop against an actual Lambda and they intercept the call to the Lambda function and send it to your laptop. So you have real debugging logs but everything is actually running in the cloud and still going to real S3 buckets and everything. So the development environment is the same as your production environment. Going from dev to production with SST is super easy because there is no difference. Like it's the same stack. Then React, it's like if your components are good for development, they're going to be efficient in production. And yeah, the same with ElectricSQL because if it works in dev, it's going to work in production. Which is awesome.

**Johannes:** That's great. I would love to hear a bit more about the details of how you've built this app. And particularly you've mentioned that you design your tables and your schemas, and you've mentioned that you're using Postgres more for like a server aspect and SQLite for the client state. Do you sign one schema and that applies to both Postgres and SQLite equally? Do you distinguish between those?

**Kyle:** Yeah, yeah. You create a table in Postgres and "electrify" it and then their sync engine automatically sets up that table for you in SQLite in the client and also like does migrations and all the other complicated bits. You can do local only tables, but I've never needed to. There could definitely be stuff that's very specific to a client, but generally speaking, I want all the data synced all around. Because again, one of the cool things about all this is that, you know, your desktop, if you have a phone running the app and you have a desktop running the app, they're always in sync. So you pull out a phone and it's got the data. In my mind, all data should be synced all the time.

**Johannes:** So the kitchen app that you've been describing, that sounds super cool, but it sounds you've been building a few different local first apps to really give this a try and get started with that local first paradigm. So which other apps have you been building?

**Kyle:** 
Yeah, another app that I'm pretty pleased with and I think is another good example of the benefit of this sync engine approach is this very simple one page, one view app. I have a Garmin watch for tracking exercise, running, biking, etc. And they have a bunch of charts and stuff that pre-designed for you. But I was, hey, I want to look at it from a different way. But basically I wanted a pure volume based view of my exercise. So because they emphasize intensity or mileage. And I'm just, I just care how long I'm running or how long I'm biking, etc. And so I was, hey, they have an API. I'll just pull the data, analyze it, create a chart. You know, off we go.

So the cool thing about it is (using Electric SQL again) all of your activities are cached locally. So when you load it up, it's instantaneous — despite there being many MBs of activity data. It doesn't have to load a whole bunch of data off the server, so it just runs a quick local SQL query and presents the charts.

Also when you load the app, it hits a Lambda function to sync in any new activities from Garmin into the system. And what's fun about that is, again, just how simple it was, because all the function does is hit the Garmin API and then writes out new data into Postgres, which is, OK, that's fine. But the next step, normally is how do you tell the front end that the new data is available? There's normally a bunch of other stuff you have to do. But what's great with sync engines is there is no other step because the sync engine will just say, "oh, there is a new Garmin activity pushed into the database. I'm going to push it to the client because it's subscribed to it and it's active". So it just shows up.

That's again, it's an illustration of you have this sync engine. It's not just reactive in the client. We talk a lot about client reactivity and there's a lot of libraries that do that. But this is global reactivity, the whole system is reactive, any change anywhere gets pushed to every other node that cares about that. And that's just a really powerful leap forward, not just for the client/server, but even server to server communication.

I thought a lot about microservices, one big problem with microservices is they get very chatty because they're always polling, "hey, any new updates, any new updates, any new updates??", you know? And then anytime they want to do something, they're, "oh, wait, I got to go get some data there, get some data there". But with a sync engine, each microservice can just say this is the data I care about and it'll have a local SQLite database it can query against whenever it wants. And every bit of data is up to date within a fraction of a second. That just would dramatically speed up a lot of microservices wor and dramatically reduce the chattiness going on in between different services. So I think there's a lot of power in global reactivity powered by sync engine.

**Johannes:** Yeah, I love that analogy. I think this was really like what blew my mind about React in the like when I saw it the first the first time, not just that it made my life simpler by not having to take care of like all of the DOM children, like appending, creating, etc. So it made everything simpler. But also having all of that just work automatically without me having to even like tell it like, hey, now update that reactivity for the views, but also for like the local state. But applying that now for global data, I think that is really a killer feature of local first that I think is not well understood by a lot of app developers.

**Kyle:** It’s just so funny because it’s the water we live in, you know? When you’re building stuff, you just spend a lot of time moving data around and checking it and updating it. And it’s just endless little problems. I remember Gatsby Cloud, we would ship an update, which used a slightly less efficient query or upped the number of calls, internal API calls. And then all of a sudden, our Postgres database would red line, and we were like, 'oh, no'. It was just a constant headache because when everything’s constantly asking for stuff, there’s just enormous inefficiencies. I remember that was a big thing where people early on with React, people were, 'Oh, my jQuery calls are so efficient, you know, and React is doing all this extra work and whatever, but pretty soon everyone kind of realized, 'Well, yes, React does do extra work to accomplish the same goal, but it’s only actually more work if every single jQuery operation was optimal, you’d actually thought through the algorithm, you know, in detail for every single one, because in practice, everyone was just doing lazy, weird shortcuts. You’re like, 'I just got to ship this feature, so I’m just going to blow the DOM away to make this update or whatever.' We were doing all sorts of weird, crappy things to update the DOM, which, yeah, it was often just very janky, very slow all the time. So, React was like, 'Yeah, there’s an overhead to doing automatically, but it'll be a consistent overhead' so everything is consistently a little bit slower than optimal instead of sometimes optimal, sometimes wildly not optimal.

And so the same thing with moving data around, it’s like, you know, people are, 'Oh, yeah, my data fetching is so clean and so good'. But, you know, you have one engineer who just accidentally grabs five megabytes of data from the API and, whoops. And then all of a sudden, the whole thing falls to pieces where, again, with sort of more of a higher level abstraction like a sync engine, this just can’t happen because you can put in checks for like you can only ask for max of 300 kilobytes in a batch or something like that. Whatever. I mean, there’s all sorts of smarter things that the system can do for you.

All types of new abstractions face the same challenges or complaints like, 'Hey, I do it really well and you’re doing it poorly in all these cases and whatever.' But if the abstraction is good enough, it eventually pretty quickly becomes better in most cases and often better in all cases. And even if it’s not better in all cases, taken as a whole, it just eliminates a lot of really suboptimal problems. It’s like memory management. That’s another great example, like people are, 'I manage memory so well, these GCs, there’s lots of overhead, blah, blah, blah.' And then 30 years of CVEs of security issues, it is very, very hard to build fast, efficient data loading and keeping it up to date and whatever.

After spending all this time building local first stuff, even very good apps built with great teams, like e.g. Vercel's dashboards. They’re pushing React server components, all that stuff. But you click around their dashboard and there’s endless little loading states. But if they had a sync engine, they would know that the next view has all the data and it’s up to date and they wouldn’t have to put in a loading indicator while they go back to the server to ask, 'Hey, did anything change? Did anything change?'

I’m sure they have a local cache, but what they’re doing is always asking again on every click, 'Hey, has anything changed since the last time this person was here?'

And that that fundamental uncertainty you have with an imperative approach, just because you just can’t know if the data is up to date. There’s no way of knowing for sure, because there’s no system that’s reliably telling you that, 'Yes, the data is up to date for this next view.' You have to check and that check takes some amount of time, which adds glitchiness into your UI. And there’s just no way of getting away from that without a sync engine that can provide the guarantee.

**Johannes:** I think it's really interesting. You've used the term thinking about your app data first, maybe as opposed to view first or, or React first.

**Kyle:** Yeah, I think that's a big mental shift that I've also observed in my own app development. And I think this has been a really powerful step because it intuitively makes sense that if you don't have the data then you can't render it. And so thus you render a loader or a skeleton, et cetera. Whereas if you think about your app navigation, routing, user experience overall more in a data first way to think about, okay, I'm currently here. This is all data that I need. But also I think a step ahead of like, oh, what if I would go to this other route here? Maybe I should already have the bare essentials in terms of the data for that, that if I'm going there, it's immediately available. And then you think about your data more. Maybe you think about it as a graph or like a collection of documents, however you want to think about the data, how it fits your app's use case.

But once you start thinking about your app data first, I think it's so much easier to build a really high quality, fast user experience then. And it's also so much easier to make that available offline. I'm not sure whether you need Vercel's dashboard, which is gorgeous, but has a bunch of loaders, loading spinners. I don't think you need that necessarily to work offline. But another way to think about it is if it works offline, then it's crazy fast when "online". And I think their dashboard would be a lot better if it was a lot faster. So I would completely agree with thinking about your app development workflows as data first, as opposed to React or Vue first.

**Johannes:** So we've been talking a lot about the all the good things now that you've experienced with local first, but I'm sure you've also experienced like some pain points, some challenges in regards to that new approach of building software or in regards to the technologies you've been using. Tell me a bit about that. Which sort of challenges have you been experiencing here?

**Kyle:** Yeah, there's definitely a few. There is some learning curve. It's not entirely the same as what was before. There's a lot of things that cross over. So it's not like a huge step. But you're going to have to spend some time learning stuff.

I think there's also at this current point of immaturity in the market, there's not like a clear market leader who's very good and mature that lots of people use. So, you know, like in sort of app development, we're like, hey, Next.js, like that's sort of the obvious choice because a billion people use it and it kind of covers everything and whatever. So you both have the, I have to evaluate a bunch of tools step to get into this world.

And then you'll need to learn a specific tool in depth because some things are just different, you'll encounter things no one's done before. Almost nobody's done it before. So you're gonna have to really learn stuff to do those. So that's definitely a bit of an overhead in this approach.

And another result of the immaturity is like, there's just things that don't work yet. Local first tech can feel like magic, but they're not actually magic. They actually are an engineered products and there's stuff that they just don't do yet that you'd rather like them to do. And so it's a process of learning those limitations and working within them. Figuring out what they can or can't do is part of sort of the evaluation process and building process.

So far for my toy apps, it hasn't been an issue, but there's definitely things that I just can't build with this stack right now. But the teams behind these sync engines, they know about issues and things are rapidly getting better.

A lot of stuff with Sync Engines really is just the same as before. It's just building an app. Except now, you just declare the data you need and the data's there.

And on the backend, I'd write a query and now you just write the same query, but it runs locally.

And the day to day, just like building views and stuff, it's extremely similar.

And I mean, this overall tradeoff is the same as for most early technologies, if you're early to those technologies, you're betting you get some some superpowers and you probably acquire those new superpowers earlier than most others, but you also got to pay a higher price than most others.

I think the biggest problem is I'm doing something and then like, bam, I hit some problem and then I'm stalled for a day while I either figure it out or figure out a work around.

So if you're using boring technology, it may be tedious and hard or whatever, but it's sort of like a known tedium.

You're like, this is going to take me like one week, where with a new technology, it's either going to take you an hour or two weeks, you know?

So it is a lot more uncertainty on what's going to happen.

And you might run into stuff that just like absolute blockers where, again, with the old stuff, it's kind of like every single possible work around has been figured out for every possible thing.

It's just a matter of finding that obscure forum post from like five years ago where they're like, "oh, I spent five days on this, but here's the fix".

And you're like, freak, like we have a kinship.

You and I know we two people are the only ones ever run into this problem before.

But thank you.

You wrote it down for me so I don't have to figure it out myself.

So, so yeah, the new technology, most of the problems you run into, you are the very first person to run into it, which is fun.

But yeah, it's you're going to have to be like a pioneer, sort of a more robust.

I don't know if Europeans talk about pioneers, but anyways, like American pioneer, you're kind of like, going off into the wilderness and got an axe on our shoulder and, you know, whatever.

We're just going to like make it happen.

You kind of have to adopt that that mindset when you're kind of into new technology.

**Johannes:** Yeah, that's very relatable for me.

I've always considered myself to be kind of like a technical pioneer.

So what you've just mentioned in terms of, yeah, sometimes like it's a gamble and sometimes like the sort of promise of everything will be simpler and easier in the future that plays out.

And you can't believe like how the thing that just took so much effort and so much work in the past is now so easy or you run into a wall where in theory it would have worked, but you run into some edge case that you're the first one running into and it might be fixed with the next release of whatever you're using, but you still have run into it.

But luckily you've run into it and then the next person is no longer running into it, depending on how quickly someone releases.

**Kyle:**  Yeah, there's sort of a sense of community service you get, or at least it's helpful to get with new technologies.

When you encounter a bug you just go "I'm going to pay down the cost for everyone else a bit."

**Johannes** So another observation here, I think it's really interesting that the use cases you've mentioned, your ambitions for those apps were not to like take it to market and like roll it out to millions of users.

It was, I think, like part of the fun that you built a software that's just for you and you can make it as fancy or ugly as you want, like no one's going to complain.

And you know, like the little quirks of it and that it took you less effort to make that happen, to build the thing you wanted to build and like spend less time with like all of the boilerplatey things.

That's great.

And I think that that is totally fine.

Like no one's going to take that away from you.

**Kyle:** I think what's still a little bit less proven is like how do you really, if you were to take that app now and say, "I do want to scale it to millions of users", et cetera, I think that's another aspect of where we are still pretty early.

And on our pioneering journey, we have not yet figured out what are all the traps and how to resolve them.

But I think from first principles, I think this approach should actually work out.

I don't see any like showstoppers for sort of scale to millions in a lot of ways again, too.

No apps do scale untouched to a million.

What happens is people build it and it falls apart and then they like rebuild it several times and get to millions.

So what I actually think is actually pretty interesting about this and like promising is like there is a story here, prototype to millions with like no changes to your basic architecture, which I don't think anything else can make that claim.

Because you can horizontally scale sync engines without any issues because you just have sticky connections from clients to a particular sync engine and it's managing the state for each user.

Postgres is easy to vertically and horizontally scale.

What's interesting is Postgres actually has a lot less demand in this world because far fewer queries are reaching it.

So it's actually like you don't have to scale Postgres nearly as fast as you kind of typically expect to.

You know, with this approach, people even do sort of normal API stuff because you can still just call Lambda and do whatever and write to Postgres.

Can I talk about the Garmin example?

You can write locally like I want to do this sort of our sort of event sourcing style where you're like the client says I want this to happen and then a back end serverless function picks up the job and then kind of writes it back and then it gets synced back to the client.

Anyway, so that again, that approach is also extremely scalable because it's all serverless and stateless and you can have as many workers, you know, spinning up to handle stuff.

But yeah, we're not there.

This is all very, that's all very potential.

But I think what's extremely promising is like, you know, what are the different stages?

What are the three major stages?

It's like how efficient is a tool of prototyping, how easy is to go from prototype to production and then how easy is it to scale?

So those are like three distinct problems.

So problem one, prototyping, I think both of our experiences, it's a lot easier to prototype with a stack like this that's data centric.

You have like a full type safe client from the get go and a lot of boilerplate is gone.

And again, going from prototype to production is extremely easy.

Like I've done lots of side projects in the past that always stalled out when it got time to deploy it because I knew I'd have to rewrite so many things and do all this crap for production that I didn't have to do while prototyping.

Like, "oh, no, where am I going to store my state?"

With ElectricSQL, these decisions are taken care of.

And I now have a go live checklist. It's like five things and it takes me less than an hour to go through it.

So it's extremely fast to go from prototype to production and then, as we talked about production scaling — it's a little less proven but in theory, like I think the architecture is like a very scale free and it's just a matter of engineering time to get there.

**Johannes:** I mean, I do think that I fully agree with the way how you delineated that into those like three steps.

But I would even say that the scaling part, I think, has been proven by quite a couple of companies by now, whether it's like thinking about Replicache, Rosicorp has built with Replicache and Reflect, et cetera.

I think they have a couple of customers that are really going at scale and the entire system, I think, is quite inherently scalable and the it doesn't change the simplicity of the system, which is which is the beauty.

And a lot of a lot of the parts of the system can still be considered stateless, which makes it a lot easier to reason about.

**Kyle:** Linear had a really great talk about how they scaled their sync engine.

And it's it's pretty fascinating, like all the things that they did.

But yeah, to your point, people have gone down that path.

So innovation goes through this process where first we ask, "is this thing even possible?" And someone discovers it's yes, possible.

And then typically several groups pioneer ways to build the technology out.

And the new discovery evolves to a product where that new raw technology is encapsulated in a form that anybody can use.

So the fact that multiple independent teams have successfully gone down this path shows it's only a matter of time before we're seeing widespread productization of sync engines.

**Johannes:** So you've been going through this journey, I guess, over the last year or so of like learning about Local First and step by step building your own apps with Local First.

What would be your advice to an app developer who's curious about Local First but has not yet taken their own first steps?

What would be your advice to them?

**Kyle:** My general advice on any technology is just to dive right in.

I mean, there's lots of stuff you can read about it.

So by all means, listen to cool podcasts.

There's lots of blog posts.

Yeah, so there's definitely lots you can read and listen to and watch and stuff, but there's no better way to feel it, to understand it and to really feel it than just to start building some stuff.

All the different tools have starters and they're very approachable.

They're not particularly hard to use and take a day or two and build something.

Because it's really just seeing it in action, just seeing data syncing between tabs to really feel, to know, that however you're used to doing data syncing, you can just forget about it.

We get numb to all the stuff we do.

So you really just have to really feel the difference of Local First, you just have to build something and then you're just like, "where's all the normal stuff I do?". You just feel these voids in your soul.

You're like, where's all the missing stuff?

You know, where's all those things I normally do?

And you slowly realize, "oh, they're just gone."

And then after you've done a few projects, you just start to forget about it.

It's like this bad, weird dream of spending all that time on all those things that are now gone.

But yeah, you can't really appreciate that until you've actually built something.

**Johannes:** Let's see whether in five years from now, we look back into the days where we haven't been building with Local First and we see it just crystal clear as that analogy you've given before with going from jQuery to React and React freed up, freed us up from having to think about how to render the views in the correct way.

And now we get the same thing for data.

**Kyle:** yeah, talking to younger developers, like sometimes I mentioned jQuery and I'm like, oh, wait, they probably don't even really know what jQuery is.

It'd be really amazing if the same thing happened to REST APIs where we'll tell stores to younger generations about, how we used to have to write an HTTP method and with a path name that you sort of made up and sort of meant something.

And you have to remember to write the same name everywhere.

And use the right method, "it's not a POST, it's a PUT."

And hopefully you have no typos.

And they'll be like, "that's like a lot of tedious, fragile, annoying code to write".

And you'll be like, "yeah, it sucked".

And then, Copilot V10 will just introspects on my whole data system and write out super efficient code for me.

I'm very big on getting rid of work we don't have to do.

And I think there's a lot left in programming that we really shouldn't have to do.

**Johannes:** Let's leave it here.

Anything you want to share with the audience?

**Kyle:** Have fun, build cool stuff.

**Johannes:** That sounds great.

Kyle, thank you so much for coming on the podcast.

**Kyle:** This was a lot of fun.

**Johannes:** Yeah, it was a lot of fun.
