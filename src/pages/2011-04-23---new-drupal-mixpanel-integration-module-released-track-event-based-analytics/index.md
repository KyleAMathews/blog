---
title: New Drupal-Mixpanel integration module released to track event-based analytics
tags:
  - drupal
date: "2011-04-23T00:23:01.000Z"
layout: post
---

As part of my work with my ([now defunct][0]) startup Eduglu, I wrote a Drupal module that integrates with the popular analytics service Mixpanel.

Web analytics help you understand what visitors do on your website and what is working and what is not. Mixpanel makes it easy to record what is happening on your site and provides powerful tools to make sense of all the data you collect. Mixpanel, combined with custom event tracking, helps answer questions like, which students are most active on the site? What material pages are most visited? And how engaged are students? In non-learning settings, Mixpanel can be used to answer questions like does anyone use this feature? Which features are most popular to new users? Which features are most popular with power users? And many more. Using Mixpanel gives you a wealth of new information about what's happening on your site.

Screenshot of their data analysis tool:

![](./mixpanel-screenshot.png)

The Mixpanel module works well and has been used in production environments now for several months but there's still a lot I'd like to add. Right now, the module records events from many of the core subsystems and popular contrib modules. Events such as when a user account is created, a node created, a comment created, someone joins a group, etc. It defines a simple API for other modules to set default information about a user, such as their role, if they're a paying customer or not, their campaign source, etc. This information can be used for segmenting data during analysis.

In the future I'd like to add Views 3 integration with their API so you'd be able to easily pull data from their API to create custom analytics dashboards on your site, [Mixpanel Platform][1] integration, integrate with their [Funnel analysis tool][2], automatic integration with the coming [Onboarding module][3], and provide out-of-the-box integration with more core and contrib modules.

So please come over and help. Mixpanel is the easiest-to-use event-based analytics solution out there and quite affordable to boot. Add to that the Mixpanel platform and coming integration with Views and you have a powerful analytics package to offer to your clients or to build custom analytics for users of your Drupal-based web application.

Download or clone at [http://drupal.org/project/mixpanel][4]


[0]: /eduglu-enters-deadpool
[1]: http://mixpanel.com/platform/
[2]: http://blog.mixpanel.com/introduction-to-analytics-funnel-analysis
[3]: http://groups.drupal.org/node/99289
[4]: http://drupal.org/project/mixpanel
