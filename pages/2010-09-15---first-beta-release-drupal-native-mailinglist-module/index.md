---
title: First beta release for Drupal-native mailinglist module
tags:
  - drupal
  - eduglu
  - og mailinglist
date: "2010-09-15T22:49:54.000Z"
layout: post
---

Today I rolled out the first beta for my [Drupal module, OG Mailinglist][0], which provides native mailinglist functionality to Drupal similar to [Mailman][1] or [Google Groups][2].

OG Mailinglist provides complete email integration for Organic Group-based Drupal sites. Many people find it easier to participate in online conversations through email rather than having to visit a website continually. OG Mailinglist provides this email integration for your site. [My company][3] is supporting the development of this module as part of our development of [Eduglu, a Drupal-based social learning platform][3].

OG Mailinglist was started as a student project at BYU for the site I built there, [http://island.byu.edu][4]. Since its creation, OG Mailinglist has successfully supported 1000s of discussions.

### Features

OG Mailinglist has a rich array of features. Current features include:

* Full integration with Organic Groups.
* Each group has its own email address.
* You can create and reply to posts via email as well as through the web site.
* Full HTML Digests. They are loosely modeled after Google Group's digest emails and are very readable.
* Emails include the list-id header to make filtering easy in your email client.
* Low latency. Emails arriving at your site are resent immediately instead of waiting for the next cron run. Other group members will typically receive your email within one minute of you sending it. This can greatly speed up group conversations on time sensitive issues.

### Requirements

Installing and configuring this module requires root access and fairly advanced sysadmin skills. Right now, there is instructions for integrating with Exim4 and Qmail. There's already efforts at way to support Postfix, so [please join in on this issue if you have Postfix expertise][5].

OG Mailinglist has come a long long way since the project started 1.5 years ago but there's still [plenty of bugs to share][6]. So please pitch in and help make this module even more awesome.


[0]: http://drupal.org/project/og_mailinglist
[1]: http://www.gnu.org/software/mailman/index.html
[2]: http://groups.google.com
[3]: http://eduglu.com
[4]: http://island.byu.edu
[5]: http://drupal.org/node/771704
[6]: http://drupal.org/project/issues/og_mailinglist
