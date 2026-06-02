---
lesson: "01"
title: "Git & GitHub Basics — Tracking and Sharing Your Work"
course: "Applied AI in Design Thinking (Creative Problem Solving)"
duration: "45–60 minutes"
audience: "Beginners — no coding experience required"
prerequisites: "A computer with git installed and a free GitHub account."
created: "2026-06-01"
locked: true
changePolicy: "Once created, this lesson is locked. It may not be changed without an open, approved GitHub issue. Link the issue number in the commit that makes the change."
relatedConcepts:
  - "2026-05-29-042"  # Prompt log & change log
  - "2026-05-29-044"  # Work in folders and projects
  - "2026-05-29-053"  # HTML + GitHub Pages
  - "2026-05-29-009"  # Nothing online is private
  - "2026-05-29-052"  # Markdown
  - "2026-05-29-038"  # Process over product
---

# Lesson 01 — Git & GitHub Basics

> **How to read this lesson:** Every time we introduce a piece of technology, we use the
> same three-part pattern — **What it is → What it does → How it fits into the ecosystem.**
> Watch for that pattern; it is how you can size up *any* new tool you meet later.

---

## 1. Overview

You just watched a folder full of work — notes, a data file, a map — go from "only on my
laptop" to "saved with a history" to "live on the internet." The tools that made that happen
are **git** and **GitHub**.

This lesson explains what they are and walks through the exact steps we took, so you can do
the same with your own work. The goal isn't to make you a programmer. It's to give you a
**safety net and a sharing button** for anything you build: a save history you can rewind,
and a one-command way to publish.

**Why this matters for creative problem solving:** good work goes through many drafts. Git
lets you experiment fearlessly (you can always go back), and it keeps an honest record of
*how* a thing was built — which, as we say in this course, often matters more than the final
product itself.

---

## 2. Learning objectives

By the end of this lesson you will be able to:

1. Explain, in plain language, what git and GitHub are and how they differ.
2. Describe the four everyday moves: **stage → commit → push**, and **branch**.
3. Save a snapshot of your work with a clear message.
4. Send that work to GitHub and recognize when it goes live.
5. Spot two common beginner traps — a rejected push and deleting unmerged work — and respond
   calmly instead of forcing things.
6. Apply one privacy habit: never publish what shouldn't be public.

---

## 3. Key vocabulary

We use the **What → Does → Fits** pattern for the two technologies, then keep the smaller
terms short but ecosystem-aware.

### Git
- **What it is:** software that runs on your computer (version-control software).
- **What it does:** tracks every change to a set of files, so you can see what changed, when,
  and rewind to any earlier point.
- **How it fits:** git sits inside the **software development life cycle** as the memory of a
  project — the layer that records the history of a codebase (or any folder of files) so work
  is never lost and every change is accountable.

### GitHub
- **What it is:** a website / cloud service (a company, now owned by Microsoft).
- **What it does:** stores git projects online, lets multiple people share them, and can
  publish a project as a live website.
- **How it fits:** GitHub is the **shared, cloud home** for git projects. Git is the tool on
  your machine; GitHub is the place on the internet your machine talks to. *Git is the camera;
  GitHub is the photo album everyone can see.*

### The everyday terms
| Term | What it is | Where it fits |
|---|---|---|
| **Repository ("repo")** | A project folder that git is watching | The thing git tracks; lives both on your computer and on GitHub |
| **Commit** | A saved, labeled snapshot of your files | One entry in the project's history |
| **Branch** | A parallel workspace / safe lane | Lets you work without disturbing the main copy |
| **`main`** | The primary branch | The "official" version; on GitHub it's usually what gets published |
| **Staging** | A packing box you choose what goes into | Sits between your edits and a commit |
| **Remote / `origin`** | The cloud copy on GitHub | Git's nickname for "the version on GitHub" |
| **Push** | Sending your commits up to the remote | How local work reaches GitHub |
| **Pull / fetch** | Bringing the remote's changes down | How you stay in sync with others |
| **Merge** | Combining one branch into another | How finished work joins `main` |
| **Pull Request (PR)** | A request to merge a branch on GitHub | The review/discussion step before merging |
| **`.gitignore`** | A list of files git should ignore | Keeps private or junk files out of the repo |

---

## 4. The lesson

### Git's one big idea: a save history you can trust
Think of the "undo" button in a document — but for your whole project, forever, with a note on
every save explaining *why*. That's git. Each save point is a **commit**. You can line them up,
read the notes, and jump back to any of them.

### The three everyday moves
Almost everything you do day-to-day is three steps:

1. **Stage** (`git add`) — choose exactly which changes go into the next snapshot. (You pack a
   box; you decide what goes in.)
2. **Commit** (`git commit`) — save that box as a labeled snapshot in your history. *Still only
   on your computer.*
3. **Push** (`git push`) — send your snapshots up to GitHub so they're backed up and shareable.

### Branches: a safe lane for new work
A **branch** is a parallel copy where you can try things without touching the main version.
When the work is good, you **merge** it back into `main`. New work → new branch is the habit
that lets you experiment without fear.

### GitHub: backup, sharing, and publishing
Pushing to GitHub does three jobs at once: it **backs up** your work off your laptop, makes it
**shareable** with others, and — with a feature called **GitHub Pages** — can **publish** your
project as a live website. On this project, the `main` branch *is* the live site.

---

## 5. Worked example — exactly what we did

Here are the real commands from our session, in order, with what each one is for.

**Look before you touch.** See where you are and what's changed:
```bash
git status            # what's changed / what's new
git remote -v         # is a GitHub home connected?
git branch --show-current
```

**Make a safe lane for the new work:**
```bash
git switch -c feature/course-concept-inventory   # -c = create + switch
```

**Pack the box — only what belongs.** We named our folder specifically instead of grabbing
everything, so unrelated changes stayed out:
```bash
git add AWID-Creative-Problem-Solving/           # stage just our work
git status                                        # green = staged, ready
```

**Save the snapshot with a clear message:**
```bash
git commit -m "feat(course): add concept inventory & outline map"
```

**Send it to GitHub** (first push of a new branch uses `-u` to remember its home):
```bash
git push -u origin feature/course-concept-inventory
```

**Bring a finished branch into `main`, then publish:**
```bash
git switch main
git merge feature/1-overview-slideshow
git push origin main          # main is the live site, so this deploys
```

**Tidy up merged branches:**
```bash
git branch -d feature/1-overview-slideshow        # -d only deletes if merged (safe)
git push origin --delete feature/1-overview-slideshow
```

---

## 6. Hands-on activity

> **Goal:** take a folder of your own from "local only" to "live on GitHub," using the three
> everyday moves. (Process over product — we care that you can *do the steps*, not that the
> content is perfect.)

1. Create a folder with one file — e.g. `about-me.md` with a sentence or two about yourself.
2. Run `git status` and read what git says.
3. Make a branch: `git switch -c my-first-branch`.
4. Stage your file (`git add about-me.md`), then `git status` again — notice it turned green.
5. Commit it with a clear message: `git commit -m "add about-me page"`.
6. Push it to GitHub: `git push -u origin my-first-branch`.
7. On GitHub, open the Pull Request it offers, and merge it into `main`.
8. **Stretch:** turn on GitHub Pages in the repo settings and watch your file go live.

**Reflection:** write one sentence in a commit message that your future self would thank you
for. What makes a message *useful* versus useless?

---

## 7. Common pitfalls (the "tells")

These are the exact bumps we hit live. Hitting them is normal — the skill is responding calmly.

- **"Your push was rejected."** This usually means GitHub has work you don't have locally. Git
  is *protecting* shared history, not breaking. **Don't force it.** Instead: `git fetch`, look
  at what's different (`git log main..origin/main`), bring it in, then push.
- **Deleting unmerged work.** Lowercase `git branch -d` refuses to delete a branch whose work
  isn't safely merged. Capital `-D` forces it. Treat `-D` as a "yes, I looked and I'm sure"
  button — *look at what you'd lose first* (`git show <commit>`).
- **Stacked branches surprise you.** If branch B was made on top of branch A, merging B can
  drag A's work along too. Know what your branch is built on.
- **Committing the wrong thing.** `git add .` grabs *everything*. Name your files/folder to
  stay deliberate — it's how we kept unrelated changes out of our commit.

---

## 8. Discussion questions

1. Git keeps an honest history of *how* something was made. Where else in life or work would a
   trustworthy "how it was built" record be valuable?
2. The push got rejected to protect work someone else had pushed. How is that "annoying"
   safety feature actually a kindness to your collaborators?
3. We chose **not** to force our version over GitHub's. When is "stop and look" better than
   "make it work right now"?
4. A branch is a place to fail safely. How might fearless experimentation change the *kind* of
   ideas you're willing to try?

---

## 9. Check for understanding

1. In one sentence each: what is git, and what is GitHub? How do they differ?
2. Put these in order and say what each does: *push, commit, stage.*
3. Your commit is made but teammates can't see it. What step is missing?
4. You try to push and it's rejected because the remote has new work. What's the safe next move
   — and what should you **not** do?
5. What's the difference between `git branch -d` and `git branch -D`, and why does that
   difference exist?
6. Name one kind of file you should keep **out** of a public repo, and the tool that does it.

*(Answer key lives in the instructor notes below.)*

---

## 10. Key takeaways

- **Git = local history** (a trustworthy undo for your whole project). **GitHub = the shared
  cloud home** (backup, sharing, publishing).
- The daily rhythm is **stage → commit → push**; **branch** to work safely.
- Rejections and refusals are usually **safety features** — fetch, look, then act. Don't force.
- **Be deliberate about what you publish.** A public repo is public forever; keep private
  things out with `.gitignore`.
- The *process* leaves a record. That record is part of the value, not just overhead.

---

## Instructor notes

> **Framing:** Open by demoing a real before/after (local folder → live site), then unpack the
> vocabulary. Beginners absorb the concepts far better *after* seeing the payoff once.

**Pacing:** Sections 1–5 are roughly 25–30 min; the hands-on (Section 6) is 15–20 min; wrap
with discussion + check for understanding.

**Teaching tips**
- Reinforce the **What → Does → Fits** pattern out loud the first few times so learners start
  doing it themselves with new tools.
- The privacy beat is a high-value, memorable moment — tie it back to *"nothing online is
  private, and it never disappears"* (concept `2026-05-29-009`). Let it land.
- Normalize the rejected push. Beginners panic at red text; model calm: "git is talking to us,
  let's read it."
- Avoid the terminal-vs-app debate here; commands are shown for clarity but learners can use a
  GitHub Desktop client for the same steps.

**Check-for-understanding answer key**
1. Git is local version-control software (tracks your file history); GitHub is a cloud service
   that hosts git projects online for backup, sharing, and publishing. Git = your machine;
   GitHub = the internet.
2. **Stage** (choose what goes in the snapshot) → **commit** (save the labeled snapshot
   locally) → **push** (send snapshots to GitHub).
3. `git push`.
4. Safe move: `git fetch`, inspect the difference, integrate the remote work, then push. Do
   **not** force-push (`--force`) — it can erase others' work.
5. `-d` deletes a branch only if its work is already merged (safe); `-D` forces deletion even
   if not merged. The difference exists to stop you from accidentally throwing away unmerged
   work.
6. Anything private/sensitive (e.g., raw transcripts with people's names, passwords, personal
   data); `.gitignore` keeps them out.

**Common misconceptions to watch for**
- "Commit = saved to GitHub." (No — commit is local; push sends it up.)
- "Branches are advanced/scary." (No — they're the *safe* way to work.)
- "If GitHub rejects me, I did something wrong." (No — it's usually protecting shared work.)
