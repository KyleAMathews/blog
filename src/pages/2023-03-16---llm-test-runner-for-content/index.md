---
title: LLM Test Runners for Content
date: "2023-03-16T18:47:56.000Z"
---

I wrote, maintained, and thought a lot about documentation for [Gatsby](https://www.gatsbyjs.com). One thing that always bothered me is we couldn’t write tests for our docs. Automated tests are ubiquitous in software engineering because they help ensure that all critical behavior works as designed e.g. `expect(add(2, 2)).toEqual(4)`. Tests are especially helpful when more people who edit the code as many people won’t fully understand every part of the codebase. Without tests, it’s easy to break behaviors while making unrelated changes.

Documentation has this same problem. It might start correct but then over time, errors drift into the docs as it continues to be maintained and updated by many hands.

But with LLMs, it looks like we can finally write tests for documentation. One of [OpenAI’s demos for their recent GPT-4 launch](https://www.youtube.com/live/outcGtbnMuQ?feature=share&t=1147) showed them pasting a large chunk of the tax code and then asking it a complex question.

Following this pattern, we can write tests for documentation. E.g. for an open source library’s README.md, we could ask it how to install the package and how to write a “hello world” implementation and assert against the responses. Potentially we could even write tests to run against the returned code. “LLM, write a server that processes user input and checks for these errors”. TDD for docs would be possible. What 10 questions should this new doc answer? Write the tests and keep improving the doc until the tests pass.

This would be useful for any form of informative text. Perhaps you have code that generates a wide variety of emails. You could write tests to ensure recipients can understand the key information for each email variant.

With LLMs, text is both now a compile target _and_ source code.

