---
lesson: "03"
module: "1"
title: "Module 1 — Can You Trust It? Hallucination, Bias, and Checking AI's Work"
course: "Applied AI in Design Thinking (Creative Problem Solving)"
duration: "40–55 minutes"
audience: "Beginners — no prior experience needed"
prerequisites: "None — just a chatbot to experiment with."
created: "2026-06-01"
locked: true
changePolicy: "Once created, this lesson is locked. It may not be changed without an open, approved GitHub issue. Link the issue number in the commit that makes the change."
relatedConcepts:
  - "2026-05-29-007"  # Hallucination — "it will lie to you"
  - "2026-05-29-008"  # Verify everything (do the work on the back end)
  - "2026-05-29-020"  # Bias in (image) generation
  - "2026-05-29-021"  # The "tells" of AI & forensic detection
---

# Lesson 03 — Module 1: Can You Trust It?

> **How to read this lesson:** Every time we introduce a piece of technology, we use the
> same three-part pattern — **What it is → What it does → How it fits into the ecosystem.**

---

## 1. Overview

A lawyer needs to file a brief, and he's short on time. So he asks an AI to write up a summary
of past cases that support his argument. Out it comes — polished, confident, with real-looking
case names, citations, and quotes. It reads beautifully. He files it.

There's just one problem: **the cases don't exist.** The AI made them up — names, rulings,
quotes, all of it — and wrapped them in language so professional that nobody blinked. The judge
checks. The cases aren't real. Now the lawyer's credibility — maybe his career — is on the line.

Here's the key idea to hold onto: AI is a fast prediction machine — it produces text that's
*likely-sounding*, not guaranteed-true. It's not magic; it's code making very fast guesses about
what comes next. This lesson is the flip side of that coin. A machine that predicts *likely-sounding* answers will
sometimes produce things that sound perfect and are completely false — confidently. So the
question for this lesson is the one that matters most in real work: **can you trust it, and how
do you check?**

---

## 2. Learning objectives

By the end of this lesson you will be able to:

1. **Explain** what an AI "hallucination" is and why a confident AI can still be wrong.
   *(Understand)*
2. **Distinguish** AI output you can rely on from output you must verify, and **recognize**
   bias and common "tells." *(Analyze)*
3. **Demonstrate** a verification check — confirm an AI claim against a trusted source.
   *(Apply)*
4. **Evaluate** whether a given AI output is trustworthy enough to use, and justify the call.
   *(Evaluate)*

---

## 3. Key vocabulary

We use the **What → Does → Fits** pattern for the main ideas, then a quick table for the rest.

### Hallucination
- **What it is:** when AI states something false as if it were true — invented facts, sources,
  quotes, even entire court cases.
- **What it does:** fills a gap with the most *plausible-sounding* text, not the *true* text —
  and presents it with full confidence.
- **How it fits:** it's the direct downside of how AI works. A prediction machine predicts what
  an answer should *look* like; "looks right" is not "is right."

### Verification
- **What it is:** the habit of checking an AI claim against a trusted, independent source before
  you rely on it.
- **What it does:** catches the fabrications and errors before they reach your audience.
- **How it fits:** it's the human's job in the loop. The work moves from *writing* to
  *checking* — done on the back end, before you publish or submit.

### Bias
- **What it is:** skew in AI output that reflects skew in its training data.
- **What it does:** quietly over- or under-represents people, viewpoints, or details — e.g.,
  early image tools that couldn't produce a balanced classroom.
- **How it fits:** another reason "confident" ≠ "correct or fair." The output can only reflect
  the data it learned from.

| Term | What it is | Where it fits |
|---|---|---|
| **The "tells"** | Signs that output may be fake/wrong | Fabricated citations, too-perfect specifics; in images: extra fingers, garbled text, wrong details |
| **Forensic pass** | Asking AI to hunt its own flaws | A check, not a guarantee — you still confirm |
| **Trusted source** | An independent, reliable reference | What you verify *against* |
| **Stakes** | How costly a wrong answer would be | Decides how hard you must verify |

---

## 4. The lesson

### Confident does not mean correct
The single most important thing to internalize: **AI is often most convincing exactly when it's
wrong.** It was built to produce fluent, confident, natural-sounding text. Fluency is its
talent — not truth. So a fabricated answer doesn't look shaky or uncertain. It looks great.

### Why it makes things up
AI works by predicting what comes next, based on patterns in the data it learned from. When it
doesn't "know" something, it doesn't stop and say so — it predicts the most *plausible-looking* answer and
hands it over. Ask for sources and it can invent citations that look real. Ask for case law and
it can produce cases that never happened. This isn't lying on purpose; it's a prediction machine
filling a gap with something that fits the pattern.

### The "tells"
Wrong output often leaves fingerprints:
- **Fabricated specifics** — exact-looking citations, statistics, names, or quotes that you
  can't find anywhere else.
- **Too convenient** — an answer that fits your wish a little too perfectly.
- **In images** — extra fingers, melted text, ears or hands that aren't quite right, details
  that fall apart when you zoom in.

You can even ask the AI to do a **forensic pass** — "look at this and tell me everything that
might be fabricated or wrong." It's a useful *check*, not a guarantee. You still confirm.

### Bias is the quieter problem
Hallucination is loud (a fake case). **Bias** is quiet. Because AI learns from human data, it
inherits human skew. Early image generators famously couldn't produce a balanced classroom —
ask for "a classroom" and everyone looked the same; ask for "diverse" and it overcorrected. The
model can only reflect the data it was fed. "Confident" doesn't mean "fair," either.

### The fix: verify on the back end
Here's the discipline that separates people who get burned from people who don't: **never
publish, submit, or act on AI output without checking it against a trusted source.** Do the work
on the back end — *after* the draft, *before* it goes out. Two practical moves:
- **Check the claims.** Do those sources exist? Do the numbers hold up? Click through.
- **Constrain the inputs.** Feeding AI a finite set of trusted documents (instead of "the whole
  internet") gives it less room to invent.

### Match your effort to the stakes
You don't verify everything to the same depth. Brainstorming names for a bake sale? Low stakes —
relax. A legal brief, a medical claim, a number in a funding proposal, anything with your name
on it going public? High stakes — verify hard. **Judging the stakes is the skill.**

---

## 5. Worked example

- **The fabricated cases.** AI writes a flawless legal summary citing cases that don't exist —
  the opening story. The lesson: the more professional it looks, the more it can fool you.
- **The fabrication pass.** Someone has AI generate a long research piece, then asks a second
  AI to list everything in it that's invented or unverifiable. The list is long — names,
  settings, events that were never real. Useful as a *filter*, not a final word.
- **The image tells.** A generated promo image keeps the logo right but turns a street sign into
  garbled non-English text — an obvious "tell" a sharp viewer would catch.

---

## 6. Hands-on activity

> **Goal:** catch AI being confidently wrong, and practice the verification habit. (Process over
> product — the point is to *check*, not to get a clean answer.)

1. Ask a chatbot: *"Give me three sources (with authors and titles) about [a topic you know a
   little about]."* Then **try to find each source** online. How many are real?
2. Ask it a specific factual question that has a checkable answer (a date, a population, a
   quote). **Verify it** against a trusted site.
3. Paste something it wrote and ask: *"List anything in here that might be fabricated or that you
   can't verify."* Read its own list.
4. Generate an image of a detailed scene and **zoom in** — hunt for the tells.

**Reflection (one sentence):** *"I will verify hard when ____, and I can relax when ____."*

---

## 7. Common pitfalls (the "tells")

- **Trusting fluency.** Polished, confident writing feels true. It isn't evidence of truth.
- **Accepting invented sources.** If you can't find it independently, treat it as fabricated
  until proven otherwise.
- **Verifying only the scary stuff.** Quiet errors (a slightly wrong number, a subtle bias) do
  real damage too.
- **Treating the forensic pass as proof.** AI checking AI is a filter, not a guarantee — a
  human still confirms.

---

## 8. Discussion questions

1. Why is AI often *most* convincing when it's wrong? What does that do to how carefully we read?
2. Where in your work would a confident-but-false answer be most costly? How would you guard it?
3. Bias is quieter than hallucination. How might it slip past you — and who could it harm?
4. "Match your effort to the stakes." How do you decide what counts as high stakes?

---

## 9. Check for understanding

1. In one sentence, what is an AI "hallucination," and why does it happen?
2. Name two "tells" that suggest AI output might be fabricated or wrong.
3. You ask AI for sources and it gives you three. What's your next move before you use them?
4. How is **bias** different from **hallucination**, and why is it harder to catch?
5. Give one example of low-stakes output and one example of high-stakes output, and say how your
   verification should differ.

*(Answer key is in the instructor notes below.)*

---

## 10. Key takeaways

- Recall the fabricated legal cases: they sounded perfect *because* AI is built for fluency, not
  truth. **Confident ≠ correct.**
- **Hallucination** = plausible-sounding fabrication, delivered with confidence.
- Watch for the **tells**; reflect on **bias** as the quieter risk.
- **Verify on the back end** against trusted sources, and **match your effort to the stakes.**

---

## Instructor notes

> **Framing:** This lesson delivers a hard truth about how AI works: a prediction machine can be
> confidently, professionally wrong. (It assumes learners already see AI as a fast
> pattern-predictor, not magic — if they don't, establish that first.) The fabricated-cases story
> is the emotional hook — let the stakes land before teaching the fix.

**Pacing:** Sections 1–4 ≈ 20–25 min; activity ≈ 15 min; discussion + wrap-up ≈ 10 min.

**Teaching tips**
- Do the **fake sources** demo live — ask for sources, then search for them on screen. Watching a
  "real" citation fail to exist is the lesson.
- Keep the tone non-cynical: the goal isn't "don't use AI," it's "trust, then verify."
- Land the **stakes** idea explicitly — it's the judgment learners carry forward.

**Check-for-understanding answer key**
1. A hallucination is AI stating something false as if true (invented facts/sources/quotes). It
   happens because AI predicts the most plausible-*looking* answer, not the true one, and fills
   gaps with fabrication.
2. Any two: fabricated/unfindable citations; too-perfect or too-convenient specifics; image
   artifacts (extra fingers, garbled text, wrong details).
3. Verify the sources exist and say what they claim — search for each one independently before
   relying on them.
4. Hallucination = an outright false statement (loud, checkable). Bias = a systematic skew
   inherited from training data (quiet, often invisible unless you look for it).
5. Example low stakes: brainstorming ideas (light check). High stakes: a public claim, citation,
   or number with your name on it (verify against trusted sources before use).

**Common misconceptions to watch for**
- "If it sounds professional, it's probably right." (Fluency is not evidence.)
- "Hallucination means the AI is broken." (It's expected behavior of a prediction machine.)
- "Asking AI to check itself proves it's correct." (It's a filter; a human verifies.)
