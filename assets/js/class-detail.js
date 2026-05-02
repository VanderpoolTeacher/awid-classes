const DATA_URL = "assets/data/classes.json";

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatStartDate(iso) {
  // Parse YYYY-MM-DD as local-date noon to avoid UTC->local off-by-one.
  const [y, m, day] = iso.split("-").map(Number);
  const d = new Date(y, m - 1, day, 12, 0, 0);
  return d.toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric", year: "numeric"
  });
}

function renderNotFound(container, idHint) {
  container.innerHTML = `
    <section class="class-not-found">
      <h1>Class not found</h1>
      <p>We couldn't find a class with id <code>${escapeHtml(idHint || "")}</code>.</p>
      <p><a class="btn btn--primary" href="index.html#catalog">Back to all classes</a></p>
    </section>
  `;
}

function renderClass(container, cls) {
  document.getElementById("page-title").textContent = `${cls.title} — AWID`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", cls.shortDescription);

  const isFull = cls.seatsRemaining <= 0;
  const objectiveItems = cls.learningObjectives
    .map(o => `<li>${escapeHtml(o)}</li>`).join("");

  container.innerHTML = `
    <section class="class-hero" aria-labelledby="class-title">
      <div class="class-hero__inner">
        <p class="class-hero__audience">${escapeHtml(cls.audience)} · ${cls.schedule.sessions} sessions</p>
        <h1 id="class-title">${escapeHtml(cls.title)}</h1>
        <p class="class-hero__short">${escapeHtml(cls.shortDescription)}</p>
      </div>
    </section>

    <section class="container">
      <div class="class-body">
        <div class="class-body__main">
          <h2>About this class</h2>
          <p>${escapeHtml(cls.longDescription)}</p>

          <h2>What you'll learn</h2>
          <ul>${objectiveItems}</ul>

          <h2>Prerequisites &amp; what to bring</h2>
          <p>${escapeHtml(cls.prerequisites)}</p>
        </div>

        <aside class="class-rail" aria-label="Class details">
          <div class="class-rail__price">$${cls.price}</div>
          <dl>
            <div class="class-rail__row"><dt>Starts</dt><dd>${formatStartDate(cls.schedule.startDate)}</dd></div>
            <div class="class-rail__row"><dt>Schedule</dt><dd>${escapeHtml(cls.schedule.days)}</dd></div>
            <div class="class-rail__row"><dt>Time</dt><dd>${escapeHtml(cls.schedule.time)}</dd></div>
            <div class="class-rail__row"><dt>Sessions</dt><dd>${cls.schedule.sessions}</dd></div>
            <div class="class-rail__row"><dt>Location</dt><dd>${escapeHtml(cls.location)}</dd></div>
            <div class="class-rail__row"><dt>Seats left</dt><dd>${isFull ? "Full" : cls.seatsRemaining}</dd></div>
          </dl>
          <div class="class-rail__instructor">
            <strong>${escapeHtml(cls.instructor.name)}</strong>
            <p style="margin-top:4px;font-size:14px;">${escapeHtml(cls.instructor.bio)}</p>
          </div>
          <a class="btn btn--primary class-rail__cta"
             href="#register"
             ${isFull ? 'aria-disabled="true" tabindex="-1" onclick="event.preventDefault()"' : ""}>
            ${isFull ? "Class full" : "Register"}
          </a>
        </aside>
      </div>
    </section>

    <!-- Registration form added in next task -->
    <div id="register-anchor" data-class-id="${escapeHtml(cls.id)}" data-class-title="${escapeHtml(cls.title)}" data-is-full="${isFull}"></div>
  `;
}

async function init() {
  const container = document.querySelector("[data-class-detail]");
  if (!container) return;
  const id = getQueryId();
  if (!id) {
    renderNotFound(container, "");
    return;
  }
  try {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const classes = await res.json();
    const cls = classes.find(c => c.id === id);
    if (!cls) {
      renderNotFound(container, id);
      return;
    }
    renderClass(container, cls);
  } catch (err) {
    console.error("Failed to load class:", err);
    container.innerHTML = `
      <section class="class-not-found">
        <h1>Couldn't load this class</h1>
        <p>Please refresh the page or try again later.</p>
        <p><a class="btn btn--primary" href="index.html#catalog">Back to all classes</a></p>
      </section>`;
  }
}

init();
