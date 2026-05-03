const DATA_URL = "assets/data/classes.json";

function formatStartDate(iso) {
  // Parse YYYY-MM-DD as local-date noon to avoid UTC->local off-by-one.
  const [y, m, day] = iso.split("-").map(Number);
  const d = new Date(y, m - 1, day, 12, 0, 0);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderCard(cls) {
  const isFull = cls.seatsRemaining <= 0;
  const a = document.createElement("a");
  a.className = "card";
  a.href = `class.html?id=${encodeURIComponent(cls.id)}`;

  const eyebrow = cls.price === 0 ? "FREE" : `$${cls.price}`;
  const scheduleSnippet = cls.schedule.startDate
    ? `${escapeHtml(cls.schedule.days)} · starts ${formatStartDate(cls.schedule.startDate)}`
    : escapeHtml(cls.schedule.days);

  const previewLOs = cls.learningObjectives
    .slice(0, 4)
    .map(lo => `<li>${escapeHtml(lo)}</li>`)
    .join("");

  a.innerHTML = `
    <div class="card__image" aria-hidden="true">
      ${escapeHtml(cls.title)}
    </div>
    <div class="card__body">
      <div class="label">${eyebrow}${isFull ? '<span class="card__full-tag">Full</span>' : ""}</div>
      <h3 class="card__title">${escapeHtml(cls.title)}</h3>
      <p class="card__for">For ${escapeHtml(cls.audience)}.</p>
      <p class="card__lead">You'll learn to</p>
      <ul class="card__los">${previewLOs}</ul>
      <p class="card__meta">${scheduleSnippet}</p>
    </div>
  `;
  return a;
}

async function init() {
  const grid = document.querySelector("[data-catalog]");
  if (!grid) return;
  try {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const classes = await res.json();
    grid.innerHTML = "";
    if (!classes.length) {
      grid.innerHTML = `<p class="catalog__message">No classes scheduled right now — check back soon.</p>`;
      return;
    }
    classes.forEach(cls => grid.appendChild(renderCard(cls)));
  } catch (err) {
    console.error("Failed to load classes:", err);
    grid.innerHTML = `<p class="catalog__message">We couldn't load the class catalog. Please refresh or try again later.</p>`;
  }
}

init();
