---
title: Content Recommendation
tags:
  - memetracker
  - content recommendation
date: "2008-10-14T00:26:11.000Z"
draft: true
layout: post
---

New Note 66

Each one of us wakes up everyday with a problem. A problem we must solve in order to have a successful day. The problem is finding the right information. Without the right information, we can't choose a good breakfast, catch the bus to work, find a restaurant, call a client, buy the right stock, cook chicken noodle soup, help a child with homework or complete any of the other billion and one tasks we do daily. If the information we know is either of bad quality or missing important pieces then we are poor employees, poor parents, poor friends, and live a life far short of its potential. If we know something we can do something. On the flip side, if we don't know something then we are unable to do something. If we don't know the bus time or bus number, we can't ride it to work. If we don't know a client's number, then we can't call them. If we don't know a restaurant's number then we're unable to eat there. This is a vitally important point. We can't do what we don't know. If we know little we do little.

Knowing and understanding things is a topic I've thought about deeply for a long time. Specifically about mechanisms we use on the individual, community and society-wide basis for identifying and propagating the most interesting and relevant news. This past summer, I worked on building an open-source memetracker for the Drupal social publishing platform as part of Google Summer of Code. Memetrackers are one technique used for creating automated news sites similar to Google News and Techmeme (see my original proposal to Google Summer of Code for more details). In this blog post I want to take a more holistic approach for examining the question of what exactly is content recommendation and why do we need it. Finally, I'll use my analysis to make a recommendation for creating a general purpose content recommendation engine that can be implemented in Drupal (and other online systems).

We need information to live. We need content recommendation because we can't, by ourselves, get all the information we need. How much harder would all of our lives be if each of us, individually, had to figure out the bus schedule in our city? Probably billions of man-hours are saved yearly just because one of the employees of each bus company is responsible for creating a bus schedule and posting it online or in a booklet. In a similar fashion, think how useful are books. If you were a bit curious about astronomy and wanted to learn some think how difficult it'd be, unaided, to start to grasp what astronomy is all about. Books are so convenient. An expert in the field spends several months of their life distilling the most important important information for a beginner like you. One lazy Saturday afternoon with that book and you will know more about the subject then months of stumbling about trying to understand. And how did we find information before Google? Google (and other search engines) are critical for finding that very small needle of information in the very large haystack that is the internet.

In short, we need help finding the right information; we need content recommendation. As my examples show there are times we need help because information is scare, there are times we need help because there is too much information and we need help filtering out the unneeded information so we're left with a managable and digestable chunk. And at times, the right content is already available, we just need someone to point it out.

What kind of content recommendation tools do we already use? I already mentioned a few, books and Google. In addition we use airfare searching sites, we read magazines, we ask librarians, we watch TV, we follow blogs, we talk to friends, we go to conferences, we join community groups, we join trade groups, we attend debates, and the list goes on and on. All of these are an effort to find information that is most relevant and most interesting for our particular needs.

From thinking about all this, I've concluded that all content recommendation is the result of a process comprised of the following steps: filtering, organization, and display.

If our starting point is all the information in the universe and our ending goal is useful and relevant information a filter is something which removes information, an organizer is something that sorts information into categories, and a displayer is set of decisions on how to display the filtered and organized information specifically the choice of what information to emphesize (and not) and what information you'll make easily accessible and what information you will not.

Consider the following two examples of content recommendation. I've broken down two content recommendation processes into their individual steps of filtering, organizing, and displaying information. The first process is the one used by my [Drupal memetracker module][0] I wrote this summer. The second is the steps used by a typical US local newspaper.

**The Color Key**:

Current state (size and type) of content

_Filters_ remove content

_Organizers_ sort content or place content into categories

_Displays_ are the final decision about what content you emphasize and make easily accessible. . . and what content you don't

### Memetracker Filter Flowchart:

Every last bit of content in the Universe

1\. Filter: What content sources will be imported into memetracker?

All content imported from choosen content sources since the sources were added

2\. Filter: Was the content written in the past 48 hours?

All content from online sources that was written in the past 48 hours

3\. Organize: Cluster content by meme

4\. Organize: Sort memes by size, age, and other factors

All content from online sources that was written in the past 48 hours now organized by meme

5\. Filter: Is the meme one of the top 15?

6\. All content from online sources that was written in the past 48 hours that are part of the top 15 memes

7\. Display: Show headlines with related articles hidden

### Local Newspaper Filter Flowchart:

Every last bit of content in the Universe

1\. Filter: Is the content local news?

All local news from since last publication of newspaper

2\. Filter: Will the content be interesting to the locals?

All local news from last publication of the newspaper that reporters/editors think will be interesting

3\. Filter: What part of the news story should we include?

4\. Organize: Categorize stories (politics, sports, etc.)

All interesting local news now organized by story.

5\. Display: Print most important stories "above the fold"

give examples of how the following filter/organize/display content - new york times, a book, a memetracker (interlinking and link popularity), a personalized social news recommnder (like findory)

First filter by far the most important -- determains charecter of filter, what this filter is -- newspaper we show only local news. this memetracker is about soil erosion news in the midwestern states in the united states. Take filter from infinite possiblities to very finite. Further filtering, organizing, and display is merely a polishing process

Call these filters -- organizing and display is secondary. They're just aids to understanding filtered data but once data is gone it is gone and can't be recreated by the consumer of the filtered content.

Every choice of how and when to filter, organize,

and display is a reflection of the filter creator's

bias and has implications for what the consumer

of the now filtered content will understand,

belive, and do.

Initial filter follows leader intent from making it stick

Filter = remove content

organize = sort content or place content in categories

display = what content you emphesize and make easily assible. . . and what content you don't

A small Drupal note. This model fits very well into the views paradigm. I suggest that all content recommendation modules be consolidated within the views framework. For example, memetracker would be an organizer, you could filter by how many days you wanted, sort by interestingness of memes etc.

visual of steps of filtering and organizing and displaying news


[0]: /drupal-memetracker-module-my-google-summer-of-code-application
