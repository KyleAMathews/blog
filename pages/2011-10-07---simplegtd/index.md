---
title: SimpleGTD
tags:
  - gtd
date: "2011-10-07T18:59:39.000Z"
layout: post
---

I'm starting work soon on building a new open source [Getting Things Done][0] web app that I'm tentatively calling [SimpleGTD][1]. I've tried a good chunk of the GTD apps out there and have been dissatisfied with each of them for one reason or another.

## Motivations

I have a few reasons for starting this project.

First is I really like the GTD system. When it's running well, I really do feel more organized and able to focus on my priorities. But I've never been able to find a system that was maintainable long-term. I've tried many that worked for a time but each gradually required more and more effort to maintain until eventually I had to quit using them. I've thought a fair bit about why they've failed and I believe I can create an app that will actually work long-term.

My second motivation is there's a number of really cool technologies I'd like to learn or practice with including Node.js, Coffeescript, Backbone.js, ElasticSearch, Responsive Design, AppCache, and LocalStorage--each of which I'll be using to build SimpleGTD. It's really hard to learn new skills outside of the context of working toward a concrete goal so a nice compact project like this is gold.

My third motivation is to keep my startup "muscles" strong. For a variety of reasons, I'm not interested in doing another startup right now. But I will in the future. I plan to offer hosting and support for SimpleGTD app (for those not wanting to host it themselves). Doing the marketing, handling payments, support issues, etc. will allow me to practice all the parts of running a "real" company without the stress of caring whether my micro-business actually succeeds.

I have a number of similar side projects planned or in progress that I'll also be treating as micro-businesses. I'm building these projects primarily for myself but it'll be fun to also put them out in the wild and see what happens.

## Key design principles

### Fast

[To quote Fred Wilson][2], "Speed is more than a feature. Speed is the most important feature. If your application is slow, people won't use it."

More than any other flaw, lack of speed is the reason I eventually have quit the software GTD apps I've tried. Paper is really fast. Compared to a piece of paper or sticky note sitting on your desk, it's cumbersome to have to load a desktop or web app just to view your tasks.

To compete with paper, any software-based GTD system must load instantly and quickly show you exactly what you want.

Other actions, such as navigating, adding, and editing projects and actions must also be fast. My plan is that all movement within the application can be done via the keyboard, ala GMail.

To meet my speed standards, I'm going to use a variety of techniques. First all code and data will be stored locally using AppCache and LocalStorage. The app will load first from LocalStorage and only then sync with the server. This should solve much of the slow-start problem.

Second, I'll build the app as a single-page app. All communication with the server will happen asynchronously. This means viewing a project page or adding a new task won't require reloading the page so navigation within the app will be fast.

### Simple

A big problem I've had with other systems I've tried is they're too complex for my tastes. They try too hard. I don't want to implement [every idea David Allen has ever come up with][3]. All I want my GTD app to do is add projects, add action items to these projects, and easily choose and sort the actions that I'll be working on the next day or two.

Paper-like simplicity is my goal here, not Microsoft Project.

### Built for the 21st century

This is the 21st century. Almost everyone now is carrying around a smartphone in their pocket 24/7\. No one prints off todos anymore. You should be able to select your action items for the day on your computer, walk out the door, open the app on your phone and instantly see what needs to be done.

## Built to forgive and protect

The above ideas are fairly standard. My last idea is a bit more unique.

Keeping task lists is a hard discipline and [almost everyone fails at times][4]. Our tasks lists seem to quickly disintegrate into a disorganized, unwieldy mess without the occasional superhuman effort to clean things up. I'd like SimpleGTD to help us avoid that superhuman effort.

I think this is one reason I like paper. When a list of tasks on paper gets too overwhelming, you can just throw it away or bury it under other paper. Most GTD/Task software is less forgiving in this respect. If you add a project or task it's there forever until you explicitly delete it.

The problem is our brains has a selective membrane of sorts for commitments. It requires little force to insert a commitment but quite a bit of force to remove it. We're addicted to being "productive" and the rewards that come from completing tasks. With each added task, we imagine the praise we'll get once we accomplish it. Each new task is a shot of dopamine. Deleting a task or project kills the hope for that future reward.

In my past forays with GTD software, I would cheerful add tasks and projects much faster than I could finish them. They would accumulate and accumulate until I dreaded even looking at the software with its long list of uncompleted tasks.

What we have is a garbage collection problem. We accumulate projects and tasks don't throw out the ones we've abandoned. The garbage piles up higher and higher until eventually we have to abandon the house altogether and start a new one.

Like people portrayed on the TV show [Hoarders][5], we find it difficult to throw away commitments.

I think the weekly review is what's supposed to corral this problem but I've never been able to do one consistently -- most likely because I dread having to decide what projects/tasks to abandon.

So what we need is to have the software help us to delete projects/tasks that we can't accomplish. As I've proven many-a-time, I can't manually keep my tasks lists in check. What we need I think is a Roomba-like garbage collector that detects dying projects and cleans them up for us.

But how to detect those projects/tasks that have gone stale--those projects/tasks that we've effectively abandoned but haven't yet told our consciousness? How can the software pick up on our unconscious cues that a task or project should be removed?

The best way I've thought of so far is to track how often we look at something. If we're actually working on a project or task, we'll be viewing or editing it fairly often. When we start to abandon a project or task, we stop looking at it. The software will track each time a project or task is viewed. If enough time passes since the last time you viewed the project, it'll be garbage collected and removed from active view. For tasks, they'll be removed from the active task list. For projects, they'll be moved to the someday/maybe list. And for projects already in the someday/maybe list, eventually they'll be moved into an archived list.

On timing, my thinking is tasks get garbage collected after 24 hours, projects after two months, and someday/maybe projects after six months.

So if you want a task or project to disappear, just ignore it and it'll eventually go away. Which follows our natural pattern. If we don't want to do something, we stop thinking about and eventually forget it. Most software has the annoying property of never forgetting.

At the start of the week, your active todos list should be white and empty, waiting for you to select the weeks tasks. If you load up a number of tasks at the beginning of the week but an emergency comes up, those tasks will silently disappear letting you focus on the emergency. If you're heavily focused for a few months on a couple projects at work, all our other projects will kindly hide themselves in someday/maybe. If we abandon the GTD-ship in despair, when we come back, all our projects will be waiting in storage and easily reactivated.

## Moving forward

I'm really excited about my plans. It should be a fun project technically and is software I could really use right now.

### How you can get involved

I'd appreciate feedback on my ideas. If you've tried and failed with GTD in the past, why did you fail? How did the system you used (software or otherwise) help/hinder you? Did my analysis, that failure comes from an overload of low-priority projects/tasks, resonate with you? Am I missing anything obvious here?

Once I get a usable prototype built, I'd love beta testers. Please contact me if you're interested in getting early access.


[0]: http://en.wikipedia.org/wiki/Getting_Things_Done
[1]: https://github.com/KyleAMathews/makersgtd
[2]: http://thinkvitamin.com/web-apps/fred-wilsons-10-golden-principles-of-successful-web-apps/
[3]: http://www.dragosroua.com/staying-gtd-over-the-hype/
[4]: https://plus.google.com/114723964985237592593/posts/hsVEEpov6Ti
[5]: http://www.aetv.com/hoarders/about/
