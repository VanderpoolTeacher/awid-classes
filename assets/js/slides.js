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

function renderDeck() {
  slides = [
    buildTitleSlide(),
    buildAboutSlide(),
    buildSponsorSlide(),
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

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen?.();
  } else {
    document.documentElement.requestFullscreen?.();
  }
}
