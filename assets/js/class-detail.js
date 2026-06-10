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
  const priceDisplay = cls.price === 0 ? "Free" : `$${cls.price}`;
  const startsRow = cls.schedule.startDate
    ? `<div class="class-rail__row"><dt>Starts</dt><dd>${formatStartDate(cls.schedule.startDate)}</dd></div>`
    : "";
  const classImageBlock = cls.heroImage
    ? `<img class="class-body__image" src="${escapeHtml(cls.heroImage)}"
            alt="${escapeHtml(cls.title)}" onerror="this.remove()">`
    : "";
  const sponsorBlock = cls.sponsor
    ? `<div class="class-rail__sponsor">
         <a href="https://actualreality.tech/" target="_blank" rel="noopener noreferrer">
           <img src="assets/img/ART-logo-sponsored-by.png"
                alt="Your access is sponsored by ${escapeHtml(cls.sponsor)}">
         </a>
         <p class="class-rail__sponsor-url">
           <a href="https://actualreality.tech/" target="_blank" rel="noopener noreferrer">actualreality.tech</a>
         </p>
       </div>`
    : "";

  container.innerHTML = `
    <section class="class-hero" aria-labelledby="class-title">
      <div class="class-hero__inner">
        <p class="class-hero__audience">${escapeHtml(cls.audience)}</p>
        <h1 id="class-title">${escapeHtml(cls.title)}</h1>
        <p class="class-hero__short">${escapeHtml(cls.shortDescription)}</p>
      </div>
    </section>

    <section class="container">
      <div class="class-body">
        <div class="class-body__main">
          <h2>About this class</h2>
          ${classImageBlock}
          <p>${escapeHtml(cls.longDescription)}</p>

          <h2>What you'll learn</h2>
          <ul>${objectiveItems}</ul>

          <h2>Prerequisites &amp; what to bring</h2>
          <p>${escapeHtml(cls.prerequisites)}</p>
        </div>

        <aside class="class-rail" aria-label="Class details">
          <div class="class-rail__price">${priceDisplay}</div>
          ${sponsorBlock}
          <dl>
            ${startsRow}
            <div class="class-rail__row"><dt>Schedule</dt><dd>${escapeHtml(cls.schedule.days)}</dd></div>
            <div class="class-rail__row"><dt>Time</dt><dd>${escapeHtml(cls.schedule.time)}</dd></div>
            <div class="class-rail__row"><dt>Location</dt><dd>${escapeHtml(cls.location)}</dd></div>
            <div class="class-rail__row"><dt>Seats left</dt><dd>${isFull ? "Full" : cls.seatsRemaining}</dd></div>
          </dl>
          <div class="class-rail__instructor">
            <strong>${escapeHtml(cls.instructor.name)}</strong>
            <p style="margin-top:4px;font-size:14px;">${escapeHtml(cls.instructor.bio)}</p>
          </div>
          ${isFull
            ? `<a class="btn btn--primary class-rail__cta"
                 href="#register"
                 aria-disabled="true" tabindex="-1" onclick="event.preventDefault()">
                Class full
              </a>`
            : cls.eventbriteUrl
              ? `<a class="btn btn--primary class-rail__cta"
                   href="${escapeHtml(cls.eventbriteUrl)}"
                   target="_blank" rel="noopener noreferrer">
                  Register on Eventbrite ↗
                </a>`
              : `<a class="btn btn--primary class-rail__cta" href="#register">
                  Register
                </a>`}
        </aside>
      </div>
    </section>

    <section id="register" class="register" aria-labelledby="register-heading">
      <div class="container">
        <h2 id="register-heading">Register for ${escapeHtml(cls.title)}</h2>
        ${isFull
          ? '<p>This class is currently full. Email <a href="mailto:mvanderpool.edu@gmail.com">mvanderpool.edu@gmail.com</a> to be notified about the next session.</p>'
          : cls.eventbriteUrl
            ? `
        <p>Registration for this class is handled on Eventbrite, where you'll get confirmation and reminder emails.</p>
        <a class="btn btn--primary"
           href="${escapeHtml(cls.eventbriteUrl)}"
           target="_blank" rel="noopener noreferrer">
          Register on Eventbrite ↗
        </a>
        `
            : `
        <form class="register__form" data-register-form
              data-class-id="${escapeHtml(cls.id)}"
              data-class-title="${escapeHtml(cls.title)}"
              novalidate>
          <div class="register__field">
            <label for="reg-name">Name <span aria-hidden="true">*</span><span class="sr-only">required</span></label>
            <input id="reg-name" name="name" type="text" required autocomplete="name">
            <div class="register__error" data-error-for="name"></div>
          </div>
          <div class="register__field">
            <label for="reg-email">Email <span aria-hidden="true">*</span><span class="sr-only">required</span></label>
            <input id="reg-email" name="email" type="email" required autocomplete="email">
            <div class="register__error" data-error-for="email"></div>
          </div>
          <div class="register__field">
            <label for="reg-phone">Phone (optional)</label>
            <input id="reg-phone" name="phone" type="tel" autocomplete="tel">
            <div class="register__error" data-error-for="phone"></div>
          </div>
          <div class="register__field">
            <label for="reg-notes">Notes / questions (optional)</label>
            <textarea id="reg-notes" name="notes" rows="4"></textarea>
          </div>
          <div class="register__honeypot" aria-hidden="true">
            <label for="reg-website">Leave this field blank</label>
            <input id="reg-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>
          <button type="submit" class="btn btn--primary register__submit">Submit registration</button>
          <p class="register__error" data-error-for="form"></p>
        </form>
        `}
      </div>
    </section>
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

init().then(() => {
  const hasForm = document.querySelector("[data-register-form]");
  if (!hasForm) return;
  return import("./form.js").then(({ initForm }) => initForm());
}).catch(err => console.error(err));
