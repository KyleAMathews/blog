---
title: I deleted /bin
date: "2008-05-17T15:12:59.000Z"
draft: true
layout: post
---

I was stupid tonight. I recently converted an old computer of mine into a Linux server. A file / web / whatever server. I picked up a 250 GB hard drive to hold the Linux web server files and other stuff and planned to convert the original 80 GB hard drive so to be able to back up the files on my laptop there.

I tried to delete /bin but not remembering the hard drives path was /media/backup I deleted /bin instead of /media/backup/bin. The server's programs not the unneeded directory from the old hard drive. For those familiar with the Linux Enviorment, the closest equivalent is deleting the Program Files directory in Windows.

My current plan is the follow the [advice I found on the Ubuntu forums][0] and boot the computer off a live cd, mount the hard drive, and then copy the /bin from the cd to the hard drive. Hopefully that'll work.


[0]: http://www.ubuntuforums.org/showthread.php?t=330252&highlight=deleted+%2Fbin