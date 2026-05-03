# AWID Classes

Static promotional and registration site for **Anthony Wayne Innovation & Design (AWID)** classes and workshops. Hosted on GitHub Pages.

Parent brand: <https://mvanderpool.com/aw-innovation-and-design>

## Local development

No build step. Serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>.

## Adding or updating a class

1. Open `assets/data/classes.json`.
2. Add a new entry using the schema below, or edit an existing one.
3. (Optional) Drop a hero image at `assets/img/classes/<id>.jpg` matching the entry's `id`.
4. Reload the page — the catalog and detail pages pick up changes immediately.

### Class schema

```json
{
  "id": "url-slug-no-spaces",
  "title": "Class title",
  "shortDescription": "One-line summary used on the catalog card.",
  "longDescription": "Full paragraph(s) for the detail page.",
  "audience": "All ages | Grades 6-12 | Adults | Small business owners | …",
  "schedule": {
    "startDate": "2026-06-04",
    "days": "Wed evenings",
    "sessions": 6,
    "time": "6:00–7:30 PM"
  },
  "price": 149,
  "location": "The Loft 419, downtown Toledo (hybrid options available)",
  "instructor": {
    "name": "Michael Vanderpool",
    "bio": "Short bio paragraph."
  },
  "prerequisites": "None — bring a laptop if you have one.",
  "capacity": 12,
  "seatsRemaining": 12,
  "heroImage": "assets/img/classes/<id>.jpg",
  "learningObjectives": [
    "Bullet 1",
    "Bullet 2",
    "Bullet 3"
  ]
}
```

Setting `seatsRemaining` to `0` shows a "Full" tag on the card, replaces the form with a contact prompt, and disables the Register button.

## Project structure

```
.
├── index.html              Home (hero + catalog + about strip)
├── class.html              Class detail (loads via ?id=…)
├── about.html              About AWID
├── 404.html                Branded 404
├── .nojekyll               GitHub Pages: skip Jekyll
├── assets/
│   ├── css/styles.css      Single stylesheet
│   ├── js/
│   │   ├── catalog.js      Renders class cards on home
│   │   ├── class-detail.js Renders detail page from ?id=…
│   │   └── form.js         Registration form (currently stubbed)
│   ├── img/
│   │   ├── logo-wordmark-awidc.png
│   │   └── classes/        Hero images, named by class id
│   └── data/classes.json   Source of truth for all classes
└── docs/superpowers/       Spec and implementation plan
```

## Registration form

The form on each class page is currently **stubbed** — it validates inputs and shows a confirmation, but submissions are only logged to the browser console. To wire up a real backend, edit `submitRegistration` in `assets/js/form.js`. The function is the only place that needs to change for any of: mailto fallback, Formspree, Google Forms POST, or Netlify Forms.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo's **Settings → Pages**, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Wait ~1 minute for the first build.
4. The site will be live at `https://<username>.github.io/<repo>/`.
5. To attach a custom domain, add a `CNAME` file with the domain name and configure DNS per GitHub's docs.
