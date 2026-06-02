const container = document.querySelector("[data-slides]");
const counter = document.querySelector("[data-slides-counter]");

let slides = [];
let currentIndex = 0;

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html !== undefined) node.innerHTML = html;
  return node;
}

function buildSlide(contentBuilder) {
  const slide = el("section", "slide");
  const inner = el("div", "slide__inner");
  contentBuilder(inner);
  slide.appendChild(inner);
  return slide;
}

function buildTitleSlide() {
  return buildSlide((inner) => {
    const img = el("img", "slide__image");
    img.src = "assets/img/logo-and-wordmark.png";
    img.alt = "Anthony Wayne Innovation & Design";
    inner.appendChild(img);
    inner.appendChild(el("h1", "slide__title", "AWID Classes"));
    inner.appendChild(el("p", "slide__lede", "Hands-on classes in AI, design, and tech."));
  });
}

function buildAboutSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "About AWID"));
    inner.appendChild(el("h2", "slide__title", "Closing the gap between ideas and impact"));
    inner.appendChild(el("p", "slide__lede",
      "AWID runs hands-on workshops in AI, design, and technology for students, makers, " +
      "and small businesses across Northwest Ohio."));
  });
}

function buildSponsorSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "Sponsor"));
    const img = el("img", "slide__image");
    img.src = "assets/img/ART-logo-sponsored-by.png";
    img.alt = "Your access is sponsored by Actual Reality Technologies";
    inner.appendChild(img);
    inner.appendChild(el("p", "slide__meta", "actualreality.tech"));
  });
}

function buildClosingSlide() {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "Join us"));
    inner.appendChild(el("h2", "slide__title", "Browse classes &amp; register"));
    const link = el("a", "slide__cta", "mvanderpool.com/aw-innovation-and-design");
    link.href = "https://mvanderpool.com/aw-innovation-and-design";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    inner.appendChild(link);
    const email = el("p", "slide__meta");
    email.innerHTML = '<a href="mailto:mvanderpool.edu@gmail.com">mvanderpool.edu@gmail.com</a>';
    inner.appendChild(email);
  });
}

const COURSE_ORDER = [
  "intro-design-tech-ai",
  "intro-career-in-tech",
  "ai-infused-game-design",
  "applied-ai-design-thinking",
];

function buildCourseSlide(course) {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", escapeHtml(course.audience || "Class")));
    inner.appendChild(el("h2", "slide__title", escapeHtml(course.title)));
    inner.appendChild(el("p", "slide__lede", escapeHtml(course.shortDescription)));

    const sched = course.schedule || {};
    const schedBits = [];
    if (sched.startDate) schedBits.push(formatDate(sched.startDate));
    if (sched.days) schedBits.push(sched.days);
    if (sched.time) schedBits.push(sched.time);
    if (schedBits.length) {
      inner.appendChild(el("p", "slide__meta", schedBits.map(escapeHtml).join(" \u00B7 ")));
    }

    const objectives = (course.learningObjectives || []).slice(0, 5);
    if (objectives.length) {
      const ul = el("ul", "slide__list");
      for (const obj of objectives) {
        ul.appendChild(el("li", "", escapeHtml(obj)));
      }
      inner.appendChild(ul);
    }
  });
}

function buildPlaceholderCourseSlide(id) {
  return buildSlide((inner) => {
    inner.appendChild(el("p", "slide__eyebrow", "Course"));
    inner.appendChild(el("h2", "slide__title", "Course data unavailable"));
    inner.appendChild(el("p", "slide__lede", `Could not load ${id}. Refresh to retry.`));
  });
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setSlide(index, opts = {}) {
  if (slides.length === 0) return;
  const clamped = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((s, i) => s.classList.toggle("is-active", i === clamped));
  currentIndex = clamped;
  counter.textContent = `${clamped + 1} / ${slides.length}`;
  if (!opts.fromHash) {
    const newHash = `#${clamped + 1}`;
    if (location.hash !== newHash) {
      history.replaceState(null, "", newHash);
    }
  }
}

function startingIndexFromHash() {
  const n = parseInt(location.hash.replace("#", ""), 10);
  if (Number.isFinite(n) && n >= 1 && n <= slides.length) return n - 1;
  return 0;
}

async function loadCourses() {
  const res = await fetch("assets/data/classes.json", { cache: "no-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function renderDeck() {
  let courses = [];
  try {
    courses = await loadCourses();
    if (!Array.isArray(courses)) throw new TypeError("classes.json is not an array");
  } catch (err) {
    console.error("slides: failed to load classes.json", err);
    courses = [];
  }
  const byId = new Map(courses.map((c) => [c.id, c]));

  const courseSlides = COURSE_ORDER.map((id) => {
    const course = byId.get(id);
    if (!course) {
      console.warn(`slides: course not found in classes.json: ${id}`);
      return buildPlaceholderCourseSlide(id);
    }
    return buildCourseSlide(course);
  });

  slides = [
    buildTitleSlide(),
    buildAboutSlide(),
    buildSponsorSlide(),
    ...courseSlides,
    buildClosingSlide(),
  ];
  container.replaceChildren(...slides);
  setSlide(startingIndexFromHash(), { fromHash: true });
}

renderDeck();

function next() { setSlide(currentIndex + 1); }
function prev() { setSlide(currentIndex - 1); }
function first() { setSlide(0); }
function last() { setSlide(slides.length - 1); }

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else {
    document.documentElement.requestFullscreen?.();
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case " ":
    case "PageDown":
      e.preventDefault();
      next();
      break;
    case "ArrowLeft":
    case "PageUp":
      e.preventDefault();
      prev();
      break;
    case "Home":
      e.preventDefault();
      first();
      break;
    case "End":
      e.preventDefault();
      last();
      break;
    case "f":
    case "F":
      e.preventDefault();
      toggleFullscreen();
      break;
  }
});

window.addEventListener("hashchange", () => {
  setSlide(startingIndexFromHash(), { fromHash: true });
});

container.addEventListener("click", (e) => {
  // Allow links inside slides to work normally
  if (e.target.closest("a")) return;
  const half = window.innerWidth / 2;
  if (e.clientX >= half) next(); else prev();
});
