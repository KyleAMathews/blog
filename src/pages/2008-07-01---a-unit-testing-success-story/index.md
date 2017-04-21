---
title: A unit testing success story
tags:
  - drupal
  - google summer of code
  - unit testing
date: "2008-07-01T21:46:58.000Z"
layout: post
---

This summer I was accepted to [Google Summer of Code][0] to [build a memetracker application][1] for [Drupal][2].

I want the [Memetracker module][3] to facilitate online conversations amongst distributed communities. For my dream to become reality, Memetracker will need help from many talented developers. This summer I'll be setting a solid foundation for future development of the memetracker module. One important thing I'll be doing is writing unit tests for all the functions of the memetracker. Unit tests, I'm convinced, is one thing Memetracker needs in order to ensure its long term success.

Unit tests are at the heart of [Test Driven Development (TDD)][4]. TDD and unit tests when used have been shown to improve the quality of code and reduce bugs and regressions (see this [excellent post][5] by [Robert Douglass][6] for a full introduction to unit testing).

My brother [Ben][7] is a software engineer and has long preached to me the benefits of unit tests and TDD. When I started programming Memetracker, I agreed in principle with the benefits of unit tests but as I wanted to see something working more than write boring test code, I just dived into the coding without writing any unit tests. But as the lines of code accumulated and the complexity grew, weird bugs started cropping up and having a solid coverage of unit tests as a safety net started sounding better and better.

So I stopped coding and spent a day studying unit testing and [SimpleTest][8] (the testing framework Drupal uses). There was a painful learning curve to wrap my head around the concepts but just a few days of coding with unit tests has made me a convert.

A quick example of how SimpleTest has helped me improve the quality of my code.

Memetracker tries to present to readers the most interesting memes (conversations around a topic) to readers on a web page. To learn which memes are interesting, Memetracker records the articles people click on from the memebrowsing page. By counting clicks, memetracker can calculate an interestingness score for the different memes and from that score, determine which memes to display and in what order.

When a person clicks on a article, that information is sent from the browser to the memetracker module. In memetracker.module is a function, memetracker_set_click(), which saves the click information to a table in the database.

I wanted to make sure this function works correctly so I wrote a unit test which sent a fake click to the memetracker_set_click function and then tested that the click was actually saved to the database.

So I wrote the test. . . and it worked!

[![click_test](./2625633427_4fa80978a2_o.png)][9]

But wait a second -- I thought -- it shouldn't of worked. To save the click data a memetracker object has to be loaded which then does the actual saving of the click information. But when I wrote the unit test, I had made up an id for the memetracker object. All information for different memetracker objects are stored in the database (one website can have multiple memetrackers). If a memetracker didn't exist in the database, it shouldn't be loaded.

I had already written some code to validate that a memetracker object existed before loading but somehow that validation wasn't working. I looked at the validation code and quickly found the problem. Problem solved, and to ensure this didn't happen again I wrote a new unit test to ensure my validation code works correctly in the future.

Unit tests are valuable for any coding project longer than a few lines. Once you get past the learning curve, writing new tests are easy. And it's a great feeling after making changes to run my tests and know in seconds everything is still working as it should.

To learn more about unit testing, read [Angie Bryon's (webchick)][10] great blog post about how [unit tests let you to refactor without fear][11]. The Lullabot crew had a [recent podcast][12] on the wonders of unit testing. And lastly, there's some great documentation being collected [here][13].

Happy unit testing!


[0]: http://en.wikipedia.org/wiki/Google_Summer_of_Code
[1]: /blog/2008/04/21/ive-been-accepted-to-google-summer-of-code
[2]: http://drupal.org
[3]: http://drupal.org/project/memetracker
[4]: http://en.wikipedia.org/wiki/Test-driven_development
[5]: http://www.lullabot.com/articles/introduction-unit-testing
[6]: http://robshouse.net/
[7]: http://www.linkedin.com/in/benjaminmathews
[8]: http://drupal.org/project/simpletest
[9]: http://www.flickr.com/photos/82268668@N00/2625633427/ "click_test by kylenumber5, on Flickr"
[10]: http://www.lullabot.com/about/angiebyron
[11]: http://www.lullabot.com/articles/drupal-module-developer-guide-simpletest
[12]: http://www.lullabot.com/audiocast/podcast-59-simpletest
[13]: http://groups.drupal.org/node/11020
