---
title: "Essential Until It Wasn't"
date: "2026-07-03T12:00:00.000Z"
description: "Every generation of programmers believed their ground was solid. Assembly, C, manual memory management — each felt essential until the boundary moved. Now AI is moving it again."
topic: "AI and agents"
---

What we call programming today is not the same activity it was two years ago. The daily work, the skills that matter, the texture of the craft — all changed. And yet people talk about it as if "programming" names a fixed thing that AI tools either threaten or enhance. But "programming" has never rested on solid ground.

## Solid Ground

Consider how long each era of "solid ground" lasted:

| Era                              | Main Skills Required                                 | Years     | Duration (years) |
| -------------------------------- | ---------------------------------------------------- | --------- | ---------------- |
| Machine code                     | Memorizing opcodes, manual register allocation       | 1945–1960 | ~15              |
| Assembly                         | Hardware-specific idioms, memory addressing by hand  | 1960–1975 | ~15              |
| C and early high-level languages | Pointers, manual memory management                   | 1975–2000 | ~25              |
| Pre-garbage collection           | Tracking allocations, avoiding leaks                 | 1975–1995 | ~20              |
| Pre-StackOverflow / modern IDEs  | Memorizing APIs, keeping references at your desk     | 1950s–2008 | ~60              |
| Pre-AI                           | Implementation-level reasoning, writing code by hand | 1945–2024 | ~80              |

Each row felt permanent to the people in it. Assembly programmers who memorized instruction sets thought that knowledge was the craft. C programmers who tracked memory allocations believed pointer arithmetic was what separated real programmers from pretenders.

Today's ground felt just as solid: writing code character-by-character, debugging manually, tracing state by hand. It was easy to believe this was the irreducible core. Every previous generation believed the same thing about their ground.

## Brooks and the Boundary

In 1986, Fred Brooks published "No Silver Bullet."

His central distinction: **essential complexity** versus **accidental complexity**. Essential complexity is inherent to the problem you're solving — the irreducible difficulty of specifying what a system should do, how components should interact, what happens when things fail. Accidental complexity is everything else — the incidental friction of the tools, languages, and environments you happen to be using.

Brooks' argument was that no tool would ever deliver order-of-magnitude improvements because the essential complexity dominates. You can shave off accidental complexity — better languages, better debuggers, better IDEs — but you can't touch the hard part. The hard part is thinking.

## The Moving Boundary

Brooks' distinction is useful — but the boundary moves. Every time capabilities change, the line shifts.

What counts as "essential" in one era becomes "accidental" in the next — not because the work disappears, but because tools absorb it. The work gets done; humans just stop doing it.

Here's where the boundary has been:

```
┌──────────────────────────────────────────┐
│ System Design / Architecture             │ ← essential
├──────────────────────────────────────────┤
│ Specification / Intent                    │ ← essential
├──────────────────────────────────────────┤
│ Algorithm Design                         │ ← essential
├──────────────────────────────────────────┤
│ Implementation Logic                     │ ← LINE IS HERE
├──────────────────────────────────────────┤
│ API Knowledge / Library Familiarity      │ ← accidental
├──────────────────────────────────────────┤
│ Memory Management                        │ ← accidental
├──────────────────────────────────────────┤
│ Register Allocation / Memory Addressing  │ ← accidental
├──────────────────────────────────────────┤
│ Opcodes / Machine Instructions           │ ← accidental
└──────────────────────────────────────────┘
```

Look at the bottom of that stack. Nobody mourns the loss of opcode memorization now. Nobody argues anymore that "real programmers" allocate registers by hand. Those fights happened — older engineers did complain that high-level languages were making people soft — but the fights are over. The boundary moved, and everyone adjusted.

Memory management was more recent. When Java introduced garbage collection at scale in the mid-90s, many C programmers insisted that automatic memory management would breed a generation of developers who didn't understand what was happening underneath. They had a point — and it didn't matter. The boundary moved. The next generation of programmers built real systems without ever manually tracking allocations.

The same pattern repeated with API memorization. Before StackOverflow and intelligent IDEs, a programmer's value partially resided in knowing obscure API details from memory. Then between searchable answers and autocomplete that surfaces signatures on demand, that knowledge became instantly accessible. The boundary moved again. What was once essential became accidental.

Now AI is doing the same thing by moving the boundary up past implementation-level reasoning. Writing code character-by-character, debugging by manually tracing state, holding syntax in your head — all the things that felt like the craft's irreducible core — are becoming accidental complexity. The work still happens. Humans just stop doing it.

## The Sound the Fault Makes

Every time this boundary moves, some of us say the same thing: "They're not real programmers."

Assembly programmers said it about FORTRAN programmers. C programmers said it about Java programmers. And now it's being said about people who write software by directing AI.

This complaint is not evidence that the craft is dying. It's the sound the fault makes when it shifts — essential becoming accidental, solid ground suddenly twenty feet from where it was.

These complaints point to a true loss. But what's being lost is a particular adaptation, not the craft itself. Their specific mastery — the patience, the precision, the tolerance for tedious debugging — was an adaptation to engaging with complexity that was essential _at the time_ and has since become accidental. The mastery was real. Its relevance was temporary.

## The Unbundling

Here's what the boundary shift does to practitioners: it unbundles traits that used to feel like one thing.

The old craft selected for a bundle of traits that couldn't be separated. Patience with syntax, tolerance for debugging, comfort with manual state-tracing — these were bundled together with curiosity about systems, taste in design, and the ability to hold complexity in your head. You couldn't engage with architecture without first doing the implementation work. You couldn't think about system design without first suffering through syntax. The bundle was the price of entry.

When the boundary moves, the bundle splits. The implementation-specific traits — patience with syntax, tolerance for tedium — become adaptations to a craft that's already gone. The architecture-level traits — curiosity, taste, systems thinking — persist.

This is why the current moment feels disorienting. The traits that got you through the door in 2020 are not the traits that matter most in 2026. Not because you were wrong to develop them, but because the boundary moved underneath you.

## What Remains Essential

Peter Naur, in his 1985 paper "Programming as Theory Building," argued that the essence of programming was never the code. The code is an artifact. The essence is the _theory_ — the programmer's mental model of what the system does, why it does it that way, and how the pieces relate. The code expresses the theory, but the theory lives in the programmer's head.

Brooks' conceptual integrity points in the same direction: the quality of a system depends on whether it reflects a coherent vision, "one mind or very few." Not one set of hands typing — one mind understanding. But that core was obscured.

When the old craft spent 80% of its time on implementation — syntax, debugging, API lookup, manual state-tracing — the theory-building work happened in the remaining 20%. The essential work was real, but it was buried under complexity that consumed most of the practitioner's attention.

The boundary shift strips away the implementation layer. What's left is what was always essential: specification, architecture, understanding why the system is what it is, holding the theory in your head and evaluating whether it's correct.

## Dijkstra's Revenge

Edsger Dijkstra spent decades arguing that programming was fundamentally about specification and proof — that the hard part was getting the logic right, and the coding was just transcription.

AI vindicates Dijkstra. Remove the coding, and what's left is exactly what he said mattered: specifying precisely what you want.

"But spec-writing is just as hard as code-writing. By the time you've specified everything precisely enough to direct an AI, you've done the same logical work you would have done writing the code yourself."

Yes. That's the point. The difficulty didn't decrease. It moved.

## The Liminal Period

This transition isn't painless. For most programmers, ownership lived in the implementation layer — this function I wrote, this PR I pushed. That ownership is dissolving before new forms have taken its place. Every previous transition had this liminal gap. It closes eventually.

## The Pattern and Its Prediction

If you accept that the essential/accidental boundary has moved repeatedly throughout programming's history — and that each move was mourned by practitioners adapted to the old boundary — then you have to accept one more thing.

The current boundary — implementation-level reasoning becoming accidental — is not the final boundary. Whatever we currently believe is irreducibly essential will, at some point, become accidental too. Architecture? System design? Specification itself? We don't know where or when, but the pattern suggests we're probably wrong about having found the permanent floor.

The craft changes form. The heart of programming — understanding systems, building things that work, solving real problems — persists. The specific skills that implement that heart change with each transition.

Solid ground. Earthquake. Your map no longer matches the territory. That's the pattern. It's been the pattern for sixty years.

Right now we're still scrambling — putting out fires, rebuilding after the LLM earthquake. Aftershocks keep rumbling. Another big one could be coming.

---

## Recipe: How to See a Moving Boundary

_This essay was written with AI. What follows is the recipe — the structural moves that produced it, in case you want to apply them to your own thinking._

1. **Find the distinction everyone treats as fixed.** Brooks' essential/accidental. "Real" versus "not real." Whatever boundary defines legitimate practice in your domain.

2. **Ask what capability change would move it.** What tool, what technology, what shift in the environment would convert one side of the boundary to the other?

3. **Look for historical precedent.** Has this boundary moved before? What did people say when it did? If you can find the old complaints, you'll recognize the current ones.

4. **Listen for the sound the fault makes.** "They're not real X" is diagnostic. When you hear gatekeeping based on specific techniques rather than outcomes, you're hearing a boundary shift in progress.

5. **Identify what's bundled.** Which traits are specific to the current boundary, and which carry forward? The bundle will split.

6. **Name what remains essential.** After the boundary moves, what's left? The still irreducible core of essential complexity — just now less obscured by the complexity that used to surround it.

The move works for any craft watching technology absorb what used to be human work. Find the boundary. Notice it's moving. Ask what persists.
