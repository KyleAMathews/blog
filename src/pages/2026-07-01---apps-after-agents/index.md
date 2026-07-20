---
title: "Apps After Agents"
date: "2026-07-01T12:00:00.000Z"
description: "Models are commodity. Substrate is differentiation. The question isn't how smart your agents are — it's where the crystallized judgment lives."
topic: "AI and agents"
---

## The Bitter Lesson Has Limits

For seventy years, hand-crafted AI approaches lost to scaling. Chess programs with elaborate opening books lost to search. Speech recognition with linguistic features lost to neural networks. Go masters lost to systems that learned from self-play. Rich Sutton codified this as [the Bitter Lesson](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) in 2019: general methods that leverage computation beat domain-specific knowledge, every time.

The model capability-maximalists extend this to everything. Sam Altman describes agents that will handle any task autonomously. Dario Amodei predicts most white-collar jobs will be automated within a few years. Now they're building loops to prove it: software factories, agent orchestration, loopcraft. The word makes it sound simple: iterate, retry, ship. But what does the loop verify against? When does it need human intervention?

But Satya Nadella — whose company has invested $13 billion in OpenAI and runs the Azure infrastructure behind their models — is betting against this. In June 2026, he wrote: ["A frontier without an ecosystem is not stable."](https://x.com/satyanadella/article/2066182223213293753) His thesis: "The real opportunity is not in picking the best model but instead in building a learning loop on top of models where human capital and token capital compound." The loop becomes the new IP. Models are swappable; the learning persists. (His incentives align: commoditize the model layer he doesn't own, monetize the enterprise loop he does. But the argument stands on its own.)

The maximalists say software is dead. I don't think so — for two reasons. First, agents can't automate everything. Some work resists automation no matter how capable the models get. Second, even where agents _could_ handle a task, people still want apps. Designed interfaces that anticipate needs beat formulating queries.

Both arguments rest on what Nadella calls the "learning loop" — but the loop needs somewhere for learning to accumulate. I'll call this the **substrate** — the accumulated decisions, documented conventions, test suites, and exception history that loops read from and write to. The loop is the process; the substrate is what persists.

Think of substrate as a new form of system of record — a superset of the others. Traditional systems capture structured data: CRM for customers, ERP for operations, version control for code. But much of what matters has always lived in people's heads: why this decision was made, what we tried that didn't work, which edge cases to watch for. Substrate captures this tacit knowledge explicitly. Information that was scattered or implicit — in hallway conversations, tribal memory, different tools — can migrate to the substrate where agents can read it and act on it.

Models are commodity. Substrate — specifically about what makes you different — is the moat. The question isn't how smart your agents are. It's where _your_ crystallized judgment lives.

## Camera and Engine

But where does that crystallized judgment come from? Watch a coding agent work. There are two distinct modes — Venkatesh Rao [calls them](https://contraptions.venkateshrao.com/p/a-camera-not-an-engine-ii) **camera mode** and **engine mode**.

In camera mode, the agent explores. It reads files, greps for patterns, builds a mental map of the codebase, asks clarifying questions. It's accumulating context faster than it's taking action.

In engine mode, the agent executes. It has a plan, it writes code, it runs tests, it iterates toward a solution. It's taking action faster than it's accumulating new context.

**Engine mode** is exploitation. You have a model of the world, you execute against it, you maximize throughput. In frictionless domains — where the map matches the territory, errors are recoverable, feedback is accurate — this works brilliantly. The tradeoff: engines produce outputs faster than they gather feedback, so they can't self-correct when the map is wrong.

**Camera mode** is exploration. You're sampling the environment, accumulating context, producing surplus information. Cameras take more actions to accomplish the same task — but they're self-correcting. They work when you don't trust the map — when surprising detail lurks, when errors compound, when feedback loops are delayed or absent.

As Sreeram Kannan puts it: "Intelligence is a unit of information driving a unit of energy." Camera mode is high intelligence — more information driving less energy, mindful and adaptive. Engine mode is low intelligence — less information driving more energy, fast and productive but potentially dangerous. Both are useful; the question is which fits the territory.

Exploration produces judgment — about invariants, edge cases, what works and what doesn't. That judgment gets written down: tests, types, documented conventions. Once it's crystallized, future sessions can execute. Yesterday's exploration enables today's execution.

Here's what happens when engines run in camera territory: **psychotic productivity**. The agent executes at full speed through a domain it doesn't understand, generating outputs faster than anyone can evaluate them, creating invisible externalities. Picture a coding agent confidently refactoring a module it doesn't realize has undocumented invariants — the tests pass, the types check, and six weeks later the system fails in production in ways no one connects back to the refactor. Rao's phrase is precise — not just "ineffective" but _psychotic_: disconnected from reality while producing confidently.

**Mode blindness** — not knowing which mode you're in — is the failure mode. The capability-maximalists are mode-blind: they assume everything is engine territory, that smart enough agents will handle any domain. But identifying the boundary between engine and camera territory is where the hard problem lives.

## Agents Are Automation

Agents are automation. That's not a metaphor — it's a category. What tractors did to farming, what robots did to manufacturing, what spreadsheets did to bookkeeping, agents are doing to knowledge work: taking tasks that required human judgment and making them executable by machine.

This means we don't have to speculate how agents will play out in software. We have 150 years of data on what automation does and doesn't absorb.

The pattern is consistent across every wave: **routine work gets automated; non-routine work resists**. In the US, agriculture's share of the workforce went from 41% in 1900 to 2% today — but the remaining 2% aren't doing what the 41% did. They're doing crop planning, pest diagnosis, equipment decisions — judgment calls that tractors couldn't absorb. ATMs automated most routine teller duties, yet teller employment initially grew through the 2000s — automation reduced per-branch costs, enabling more branches. The tellers who remained did relationship management, fraud detection, problem resolution. Every wave shifts the boundary between routine and non-routine, creates new categories of work, restructures rather than simply replaces.

Agents are automation for knowledge work.

## Engine Territory and Camera Territory

The pattern from automation history maps onto the camera/engine frame:

**Engine territory** — the routine work that gets automated. Agents handle this well:

- Implementing within established structure
- Exploring known solution spaces
- Boilerplate, scaffolding, repetitive transformations
- Tasks where verification is cheap (tests pass, types check, code compiles)
- Domains where errors are recoverable and feedback is accurate

This is where you let agents execute. This is where the Bitter Lesson applies. This is the bulk of the work.

**Camera territory** — the non-routine work that resists automation:

- Architecture and global design
- Recognizing when the frame itself is wrong
- Judgment calls in ambiguous situations
- Detecting surprising detail that wasn't in the training distribution
- The smaller fraction that shapes whether the bulk is even pointed in the right direction

Which is why substrate can't be absorbed by capability: **boundary detection is itself camera-mode work**.

You can't automate "knowing when to not automate." How do you recognize you've entered camera territory? The map no longer matches the terrain. Surprising detail has appeared. The routine task has become non-routine. But noticing these signals is itself non-routine work — it requires exactly the kind of exploratory, feedback-rich, context-aware cognition that camera mode provides. If this were routine, it would be automatable, and the maximalists would win. It isn't. This recursion is permanent, not a gap waiting to close.

This is the [frame problem](https://en.wikipedia.org/wiki/Frame_problem) from classical AI in new clothes. The substrate is the information boundary where unpredictable reality enters — user behavior, market shifts, edge cases no training run anticipated. Scaling handles what's in the distribution. Substrate is where the Bitter Lesson meets what it can't compute. Like Gödel's incompleteness: no formal system proves all truths from within. No model, however scaled, simulates the world that keeps changing outside it.

## Automation Failure Patterns

If agents are automation for knowledge work, we can expect the same failure patterns that appeared in previous automation waves — and design around them.

The Boeing 737 MAX and Air France 447 crashes both stemmed from automation failures — not because the automation was incapable, but because humans couldn't tell when it had left its competence zone. Knight Capital lost $440 million in 45 minutes when an algorithm executed without bounds. Mode confusion, absent circuit breakers, edge case blindness — structural properties of automation, not capability gaps.

This is the [Bainbridge paradox](https://en.wikipedia.org/wiki/Ironies_of_Automation): capable automation fails precisely because humans have disengaged from the feedback loop. As agents get better at the engine work, humans disengage. But camera territory still requires human engagement — and the skill of recognizing camera territory degrades through disuse. A [2025 Microsoft-CMU study](https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking/) found that knowledge workers relying heavily on AI assistants reported reduced critical-thinking effort and increased cognitive offloading. The more effective the agents, the more they may undermine the capabilities they augment.

The substrate addresses each failure mode — and this expands what substrate means. It's not just where learning accumulates. It's also safeguard architecture: redundant verification, explicit state that makes mode visible, exception history that surfaces edge cases, bounded authority that limits blast radius. In code, this looks like tests, types, and rate limits. In organizations, it looks like checklists, approval workflows, and incident reviews. Defense in depth, graceful degradation, bounded authority. The more autonomous agents become, the more substrate they need — not less.

## Why Apps Survive

That's the supply-side argument: agents can't absorb camera territory. But there's a demand-side argument too: even where agents _could_ handle everything, users don't want to operate through prompts in a chat interface.

We learned this already with CLIs — powerful, composable, but requiring users to hold a mental model of the system and formulate precise queries. GUIs won because they shifted cognitive load from the user to the interface. Chat shifts it back. Bret Victor diagnosed this two decades ago in ["Magic Ink"](https://worrydream.com/MagicInk/): every interaction the user has to initiate is a failure of the software to anticipate what they need. Chat reproduces this failure. Requiring users to formulate queries still makes them operate machinery.

In 1997, Shneiderman and Maes [debated](https://dl.acm.org/doi/10.1145/267505.267514) direct manipulation vs intelligent agents. The answer isn't either/or — it's apps that embed agents. The surface is still designed, anticipatory, direct. The agents work underneath, grounded in substrate. Users don't formulate queries; they interact with interfaces that already know what matters. Apps will be permeated with agents but look more-or-less the same on top.

This is why "software is dead" is wrong on both counts. Supply: agents can't absorb the non-routine. Demand: even where they could, users won't operate through prompts. Apps — rich, anticipatory surfaces backed by crystallized judgment — persist.

## Where Decisions Compound

Nadella's framing: the future enterprise runs on two forms of capital — "human capital" and "token capital." The system that compounds both is "a hill climbing machine" that, "unlike most assets, compounds."

The key test: "Can you switch out a 'generalist' model without losing the 'company veteran' expertise built into your learning system?" If yes, you own the substrate. If no, you're renting it.

This reframes the build-versus-buy question entirely.

**The old calculation** was cost and time. Building meant expensive dev time plus ongoing maintenance. Buying meant cheaper upfront, faster to deploy. You built custom if you needed something that didn't exist; you bought if standard solutions worked. The economics favored buying for most things because coding was expensive and slow.

**The new economics**: Coding is cheap now. AI writes most of it. The cost/time arguments have shifted dramatically. You _can_ build more things. The question becomes: **what's worth owning?**

And the answer is: own what lets you accumulate strategic decisions. The rest can stay SaaS.

**Two types of software emerge:**

1. **Commodity software (SaaS OK):** Processes everyone does similarly. Email, calendar, basic productivity. The crystallized judgment here is the vendor's, aggregated across customers — and that's fine. You're happy to lean on commoditized best practices.

2. **Differentiating software (build internal or use open source):** Processes that _are_ your competitive advantage. The crystallized judgment must be yours, not shared with competitors. The substrate is your IP. This is where your decisions need to compound.

The question isn't "is SaaS extracting my data" (it always has). It's: **am I accumulating the decisions that matter?**

## What Changes

If this frame is right:

**Apps are interfaces to substrate.** The app isn't the UI alone. The app isn't the model. The app is the interface to accumulated decisions about this domain, this user, this process — the environment that loops traverse and reshape. Models are commodity input. Your substrate — the judgment about what makes you different — is the moat.

**The routine/non-routine split persists, but the boundary shifts.** Each agent capability gain pushes the boundary, converts some camera territory to engine territory. But new camera territory keeps emerging as agents take on more complex work — there's no end state where everything is engine.

**Boundary detection is the high-value skill.** Knowing when the routine task has become non-routine. Knowing when the map no longer matches the territory. Knowing when surprising detail has appeared. This is camera-mode work that can't be delegated to engines.

**Ownership of substrate is ownership of competitive advantage.** Models are swappable. The crystallized judgment — exception history, encoded decisions, documented conventions, traces of what worked — this persists and compounds.

**The Bainbridge paradox requires active mitigation.** You can't let humans completely disengage from the work the agents do. The backup system — human judgment when automation fails — requires maintenance. Progressive delegation, not complete handoff.

## Open Questions

The frame doesn't resolve everything.

**The aggregator advantage.** SaaS providers see patterns across many organizations. When does aggregate learning beat private learning? For commodity processes, aggregation wins — you want the best practices discovered across thousands of customers. For differentiating processes, privacy wins — you don't want your competitors learning from your decisions. But the boundary between commodity and differentiating isn't always obvious — and firms routinely misjudge what they're actually good at.

**Learning leakage.** Even internal software often depends on external models. Every API call, every fine-tuning run, every usage pattern leaks information. How much of your crystallized judgment flows outward?

**The shape of the substrate.** This essay is conceptual, not engineering. It argues that substrate matters without fully specifying what it looks like in practice. Structured data in databases? Unstructured markdown files like CLAUDE.md? Vector embeddings? Some hybrid? The coding agents example points toward documentation, tests, and conventions — but the general architecture for "systems of record" that capture company learnings remains an open design problem.

---

In sum: The substrate is where decisions crystallize and compound. Agents execute in stable domains; camera-mode work — what to attend to, where the edges are — stays with humans. Apps after agents are interfaces to accumulated judgment, with agents working underneath. The crystallized judgment, not the capability, is the moat.
