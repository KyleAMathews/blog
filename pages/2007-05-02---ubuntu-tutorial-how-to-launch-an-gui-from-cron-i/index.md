---
title: "Ubuntu Tutorial: How to launch a GUI from cron in Ubuntu"
tags:
  - linux
  - ubuntu
date: "2007-05-02T04:07:15.000Z"
layout: post
readNext___file: ../2014-04-18---hosting-static-sites-with-docker-and-nginx/index.md
---

On Sunday, I spent a good half-hour with Google learning how to launch a GUI application in Ubuntu using cron. I wanted to write a brief post here explaining the process so as to help another weary Googler more quickly on their way.

My situation is this: I use a nifty little flashcard-like study program called [Mnemosyne][0]. I use it to study foreign languages and for school. Ideally I should run it daily -- but I often forget, which slows my learning. So I decided to create a cron job which would run the program every day at 7 AM.

Using the [normal crontab syntax][1] I made this entry:

````bash
0 7 * * * mnemosyne
````

This, I thought, would run mnemosyne once a day at 7 AM. Unfortunately I was wrong. After much searching around I found the [solution on the Ubuntu forums][2] (always a great resource). My problem was that because cron doesn't run in the X session (The program that controls all GUIs in Linux), when you try to run a GUI program, cron doesn't know where to start it. To tell cron where to start the GUI, I changed my crontab entry as follows:  

````bash
0 7 * * * export DISPLAY=:0 && /usr/bin/mnemosyne
````

And finally success!

The [post on the Ubuntu Forums][2] I found explains all this and more and gives a number of examples.

Also, for those wanting a more general tutorial on crontab syntax, [see the crontab article on wikipedia.][1]


[0]: http://mnemosyne-proj.sourceforge.net/
[1]: http://en.wikipedia.org/wiki/Crontab
[2]: http://ubuntuforums.org/showthread.php?t=185993
