---
title: Eduglu Alpha 6 released
tags:
  - drupal
  - eduglu
date: "2010-09-24T18:56:43.000Z"
layout: post
---

Time for another Eduglu release! [Download Alpha 6 at eduglu.com][0]

There's been lots of progress made since Alpha 5\. Along with the usual assortment of bug fixes and tweaks, major new features include:

* A new Quiz feature based on the [Drupal quiz module][1]. The Drupal quiz module has an extensive feature list and is widely used in the Drupal community. This is just the start of Eduglu's quiz integration but it's already provided a powerful boost to Eduglu's capabilities.

The quiz feature isn't enabled by default so to make it available to groups on your Eduglu install, enable this feature at admin/build/features.

* A searchable group membership directory. Group members can now easily browse/search the faces/names of their fellow group members

![Screenshot of Eduglu membership directory](./membership_directory.png)

* Group admin tools for managing members. It's now easy to add and remove members from your groups as well as to promote and demote members to be group admin status.

![Screenshot of Eduglu group memberes admin tool](./group-members-admin-tool.png)

If you have feedback or find bugs, join us in the Drupal.org issue queue at drupal.org/project/eduglu and at the community.eduglu.org site.

If you're upgrading from an earlier version of Eduglu:

* Run updates at update.php
* Revert all features at admin/build/features
* Clear all caches at admin/settings/performance


[0]: http://eduglu.com/content/eduglu-alpha-6
[1]: http://drupal.org/project/quiz
