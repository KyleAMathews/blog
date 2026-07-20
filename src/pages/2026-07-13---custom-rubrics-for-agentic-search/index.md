---
title: "Custom Rubrics for Agentic Search"
subtitle: "Or how I'm now using AI to find better food"
date: "2026-07-13T12:00:00.000Z"
description: "Platform search fails niche users because it optimizes for the majority. Custom rubrics—private criteria applied by AI—let you find what you actually want by reading the signals businesses can't fake."
topic: "AI and agents"
---

_[My rubrics are on GitHub](https://github.com/KyleAMathews/scratch-food-rubrics) — try them with your favorite agent. [Example output](https://gisthost.github.io/?58aa770da42135b981647c4de01cbd86)._

I moved from the Bay Area to Salt Lake City a couple years ago, and restaurant and bakery reviews stopped helping. In the Bay Area, reviews discriminated on quality, uniqueness, whether the kitchen was doing something interesting. A 4.5 meant something. Here, everything that isn't actively terrible sits at 4.5+. An incredible restaurant gets ranked the same as a place reheating Sysco lava cakes.

I've slowly learned which places I love here. But on a recent short weekend trip to an unfamiliar city, the same frustration returned: how do I find a restaurant I'll love? I don't have two years to build up local knowledge. I have 45 minutes and a phone.

That's when the idea for a custom AI search guided by my own rubric occurred to me. I could encode my preferences and have AI find restaurants that match. After 20 minutes chatting with Claude, I'd found 2 great restaurants and ordered from one (and the food _was_ fantastic). Since then I've been refining the restaurant rubric and added a similar bakery one and been studying up on rubrics and what makes them work so well.

The trick is identifying where your taste differs from the mainstream and finding ways to identify from reviews who's genuinely making food you want to eat.

Art historians solved a version of this problem a century ago. Giovanni Morelli attributed unsigned paintings by studying earlobes, fingernails, the curve of a hand — details so minor that copyists didn't bother to fake them. The master's unconscious habits showed through. Reviews work the same way: businesses can control their marketing, but they can't control what customers notice.

## What I Built

My bakery and restaurant rubric took about 20 iterations, tested against places I'd lived and knew well. Once it started highlighting my favorite spots _and_ surfacing places I'd never seen before but looked great, I knew it was working.

It's a skill I run in a coding agent (Claude Code, Codex, or similar). I give it an area, and it pulls every restaurant or bakery from OpenStreetMap (popularity-neutral — no ranking), then spawns subagents to score each one against my rubric. The subagents read menus, reviews, and websites, looking for specific signals. Results come back organized by occasion — e.g. for restaurants: best meal, something new, great casual — plus rare dishes worth a detour.

The trick to making the rubric work was finding the hidden dimension that matters. For me, the question is _ambition_. Does the kitchen try to make things from scratch, or are they running a business that happens to serve food? That single question predicts two things I want: uniqueness (they're not serving the same reheated items as everyone else) and caring (someone who makes their own pasta probably cares about quality in ways that don't show up in star ratings).

The scoring works on two axes:

- **S (scratch):** Production intensity. How much is made on-site from raw materials? Scored 0-100 based on production signals, input sourcing, menu coherence, operator format.
- **I (interestingness):** Novelty to a frequent buyer. Does the menu change? Is this cuisine rare in this market? High ambition?

**R (rating) as filter only:** Star ratings estimate first-visit satisfaction. They're blind to repeat-visit novelty and corrupted by the problems above. Use R as a floor (is this place good enough to bother?), never as the ranking criterion.

**Decision rule:** Filter to {R ≥ 4.0 and S ≥ 60}, rank by the geometric mean of S and I. (Geometric mean penalizes imbalance — a place can't compensate for being boring by being very scratch, or vice versa.)

The specific signals I look for — involuntary tells, the Morellian details reviewers surface without intending to:

**Boasts as confessions.** Businesses advertise what they think are selling points. "Fresh baked all day!" confesses par-bake (scratch bakeries sell out). "Over 100 items!" confesses breadth no single kitchen can scratch-produce. "Supplying the city's best restaurants!" confesses wholesale standardization pressure.

**The dog that didn't bark.** Across 500 reviews of a genuine scratch bakery, _someone_ would mention sell-out times, limited quantities, seasonal items. If nobody mentions it, that absence is data.

**Register-independent signals.** Physical descriptors like "shattering layers, open crumb, blistered crust" survive regardless of how the business markets itself. "Artisan, handcrafted, traditional" is gaming-confounded — a par-bake cafe can say "fresh baked" (technically true; they baked the frozen dough). Observable physics beat marketing vocabulary.

For this specific domain, I also learned that retrieval matters as much as scoring. Search is ranked by popularity, so it hides exactly what I'm looking for. The fix was to enumerate the entire area from a popularity-neutral source (OpenStreetMap returns every tagged venue, unranked) and _then_ filter. Whole cuisines appeared that keyword search had never surfaced.

## Why Commercial Search Fails

The problem isn't that Yelp and Google are bad at their jobs. They're excellent — at the wrong job.

Platform search optimizes for aggregate behavior. What do most people click, rate highly, return to? Sensible if you're serving millions of users, but it structurally fails anyone whose preferences diverge from the mean. The niche user — the one who'd actually pay more for quality — gets noise.

Star ratings became targets. Businesses optimize for them — soliciting reviews at the right moment, managing responses, occasionally buying fake ones outright. The public metric stops measuring what you care about because everyone's optimizing against it.

Custom rubrics sidestep this. They're private — producers don't know your criteria, so they can't game them. You're reading involuntary tells, not optimized signals.

The hidden attributes problem compounds this. The thing that actually matters — scratch cooking vs. par-bake, where ingredients are sourced, how the kitchen operates — is invisible in photos, menus, and metadata. A gorgeous croissant case can be 100% frozen Bridor dough finished on-site. Photos carry zero information about production method.

So you're searching a corrupted signal space for attributes the search can't see.

## What Rubrics Do

A rubric is a scoring framework that breaks quality into explicit dimensions — structured criteria that make evaluation consistent and teachable. The same structure works anywhere you make repeated evaluations: hiring, code review, choosing a restaurant.

Custom rubrics do two things:

**Surface.** Expose hidden attributes that standard discovery methods miss. Once you have criteria for "scratch production signals," you start seeing them everywhere — in menus, in reviews, in what a business chooses to advertise. The rubric shapes what you (and AI) see.

**Filter.** Reduce 200 options to 10 that clear your quality bars. You can't evaluate everything, so you need principled exclusion. The rubric doesn't pick the winner — it compresses the search space so choosing becomes tractable.

Rubrics encode criteria explicit enough that AI can apply them. Reading 500 reviews to find production signals is possible. Nobody does it. AI makes it tractable — you can extract patterns from examples, apply criteria systematically across a candidate pool, and surface signals from unstructured text that your rubric specifies.

This is Meehl's insight from 1954: statistical prediction consistently outperforms clinical judgment. Simple actuarial models beat expert intuition across dozens of domains, and the finding has held for 70 years. Browsing Yelp is clinical judgment — reading holistically, forming impressions, making gut calls. An AI applying your rubric is statistical prediction. More consistent, and it can process far more.

## Rubric-Friendly Domains

Robin Hogarth distinguishes _kind_ from _wicked_ learning environments. Kind environments have stable rules and quick feedback — chess, weather prediction, restaurant quality. Wicked environments have shifting rules and delayed feedback — political forecasting, venture capital. Rubrics work in kind environments because the patterns hold still long enough to learn.

Restaurant and bakery search is kind. Scratch production has specific signatures; par-bake has others. You eat and know. The patterns are stable.

Rubrics aren't precise enough to pick the winner — they get you to the shortlist. You take it from there.

**Other domains worth trying:** Healthcare providers, contractors, and financial advisors — quality can't be verified even after purchase, so rubrics encode what to look for. Code reviews — maintainability and architectural fit are hidden from generic linters; team-specific rubrics catch what checklists miss. Local services face the same fake-review problem as restaurants. Hiring — resume signals are gamed, but rubrics help you filter to a shortlist.

**Where rubrics don't help:** Stock picking, political prediction, creative evaluation. These are wicked environments where the rules shift faster than you can learn them. Custom rubrics face the same limits as generic ones.

The feedback loop still requires you. AI extracts and applies criteria; you try the recommended places and report back. Did this high-scorer deliver? Did that low-scorer surprise you? The anomalies reveal missing criteria. Your experienced utility — what you actually enjoyed — is the feedback signal that improves the rubric.

## Building Your Own Rubric

**Start from examples you know.** Think of 3-5 examples you've loved and 3-5 that disappointed. Not theorizing about what you want — actual examples from experience. This is your calibration set.

**Use AI to extract shared patterns.** Feed your examples to AI and ask it to search their menus, reviews, and websites for hidden dimensions that distinguish the loved from the disappointing. Don't start with "I want authentic" — that's too abstract. Let AI surface observable differences you might not have noticed: maybe the loved restaurants all have short menus, the good contractors all show in-progress photos, or the best hotels are all owner-operated.

**Encode observables, not claims.** Criteria need to be checkable from what's actually available — menus, reviews, websites, photos. "High quality" isn't checkable. "Menu changes seasonally, names specific farms, reviews mention 'sells out by noon'" is checkable.

**Identify the domain's suppression vectors.** Each domain has specific ways quality degrades. For bakeries, it's par-bake economics — frozen partially-baked dough finished on-site, visually indistinguishable from scratch. For restaurants, it's breadth without depth — menus that span cuisines no single kitchen can master. For contractors, it's subcontracting chains that dilute accountability. For healthcare providers, it's patient volume pressure that compresses visit times. Ask: what's the par-bake equivalent in your domain?

**Iterate against your calibration set.** The first rubric will be wrong. Run it repeatedly against examples you already know well — does it rank your favorites high and your disappointments low? Cross-check scores against your normal way of evaluating (reading reviews, checking menus). When the rubric disagrees with your judgment, that's data: a missing criterion, a mis-weighted one, or a signal you hadn't articulated yet. Keep refining until the rubric reliably recovers your known preferences.

4-7 criteria works best. 3-5 levels per criterion. Describe what's present, not what's absent.

What makes a great bakery partly resists codification. Scratch doesn't mean good — a place can make everything from raw ingredients and still execute poorly. The rubric gets you to scratch kitchens; whether the croissant is actually delicious is something you judge when you bite into it.

---

I'm happy with how the bakery and restaurant rubrics turned out — and now have a long list of new places to try 😎. I also made a hotel rubric that helped us book a great place for an upcoming trip in about 5 minutes.

There's a product idea here: custom search engines where the AI applies your rubric, not the platform's ranking. Yelp for people who care about scratch cooking. Zillow for people who prioritize walkability over square footage. The infrastructure exists — retrieval, LLM evaluation, structured output. What's missing is the interface for encoding and sharing rubrics.

Try out my rubrics and let me know what you think. And I'd love to hear about any you make.
