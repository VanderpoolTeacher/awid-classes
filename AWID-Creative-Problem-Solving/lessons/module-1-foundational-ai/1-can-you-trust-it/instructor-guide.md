---
part: "instructor-guide"
module: "1"
title: "Can You Trust It? — Instructor Guide"
derivedFrom: "./lesson.md"
audience: "Facilitator / instructor"
totalTime: "40–55 minutes"
---

# Instructor Guide — Can You Trust It?

## Why this lesson exists
This lesson teaches the most consequential habit in applied AI: **trust, then verify.** A
prediction machine can be confidently, professionally wrong, and the cost of believing it can be
severe. The lesson assumes learners already see AI as a fast pattern-predictor rather than magic;
if they don't yet, establish that first. Let the stakes land *before* teaching the fix.

## Learning objectives
1. **Explain** what a hallucination is and why a confident AI can still be wrong. *(Understand)*
2. **Distinguish** trustworthy output from output that must be verified; **recognize** bias and
   common tells. *(Analyze)*
3. **Demonstrate** a verification check against a trusted source. *(Apply)*
4. **Evaluate** whether a given output is trustworthy enough to use, and justify it. *(Evaluate)*

## Materials & setup
- A chatbot open on the projector for live demos.
- Web access to verify claims in front of the group.
- The student **activity handout** printed or linked.
- *Optional:* a prepared example of a confident-but-false AI answer to show if a live demo
  behaves.

## Timing at a glance
| Segment | Time |
|---|---|
| Opening story + the question | 5 min |
| The lesson (confident ≠ correct → why → tells → bias → verify → stakes) | 18–22 min |
| Live demo: ask for sources, then search for them | 4–6 min |
| Activity (handout) | 15 min |
| Discussion + wrap-up callback | 8–10 min |

## Facilitation walk-through
### 1. Open with the story
Tell the fabricated-legal-cases story. Don't rush to the moral — let the room feel the stakes
("his career is on the line"). Then pose the question: *can you trust it, and how do you check?*

### 2. Teach the through-line
- **Confident ≠ correct** — fluency is the talent, not truth.
- **Why it fabricates** — predicts plausible-looking text; fills gaps with fabrication.
- **The tells** — fabricated specifics, too-convenient answers, image artifacts; the "ask it to
  check itself" trick is a filter, not proof.
- **Bias (the quiet risk)** — inherited skew; "confident" ≠ "fair."
- **Verify on the back end** — check claims; constrain inputs to trusted documents.
- **Match effort to stakes** — the judgment they carry forward.

### 3. Live demo (highest impact)
Ask the chatbot for three sources on a topic, then **search for each one on screen.** Watching a
"real-looking" citation fail to exist teaches hallucination faster than any explanation.

### 4. Activity
Hand out the worksheet. Circulate. Part 1 (fake sources) is the must-do; protect time for it.

### 5. Wrap up with the callback
Return to the lawyer: the AI wasn't malicious — it predicted text that *looked* right, he
skipped the back-end check, and the stakes were high. One verification step would have saved him.
Close on the four takeaways.

## Check-for-understanding — answer key
1. A hallucination is AI stating something false as if true (invented facts/sources/quotes),
   because it predicts the most plausible-*looking* answer and fills gaps with fabrication.
2. Any two: fabricated/unfindable citations; too-perfect or too-convenient specifics; image
   artifacts (extra fingers, garbled text, wrong details).
3. Verify the sources exist and say what they claim — search each one independently before use.
4. Hallucination = an outright false statement (loud, checkable). Bias = a systematic skew from
   training data (quiet, often invisible unless you look for it).
5. Low stakes, e.g. brainstorming (light check). High stakes, e.g. a public claim/citation/number
   with your name on it (verify against trusted sources first).

## Common misconceptions to watch for
- "If it sounds professional, it's probably right." (Fluency is not evidence.)
- "Hallucination means the AI is broken." (It's expected behavior of a prediction machine.)
- "Asking AI to check itself proves it's right." (It's a filter; a human verifies.)

## Closing thought
The goal isn't fear or cynicism — it's a calm, professional habit: treat AI like a brilliant
intern whose work you proofread before your name goes on it.

## If you have less time
Keep the opening story, the live "fake sources" demo, and Part 1 of the activity. Those three
carry the lesson.
