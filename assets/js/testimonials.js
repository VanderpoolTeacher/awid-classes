const DATA_URL = "assets/data/testimonials.json";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderTestimonial(t) {
  const fig = document.createElement("figure");
  fig.className = "testimonial";

  const paragraphs = String(t.quote)
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => `<p>${escapeHtml(p)}</p>`)
    .join("");

  const attribution = t.attribution
    ? `<figcaption class="testimonial__attribution">— ${escapeHtml(t.attribution)}</figcaption>`
    : "";

  fig.innerHTML = `
    <blockquote class="testimonial__quote">${paragraphs}</blockquote>
    ${attribution}
  `;
  return fig;
}

async function init() {
  const list = document.querySelector("[data-testimonials]");
  if (!list) return;
  const section = document.getElementById("testimonials");
  try {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const testimonials = await res.json();
    if (!Array.isArray(testimonials) || !testimonials.length) {
      // Nothing to show — leave the section hidden.
      return;
    }
    list.innerHTML = "";
    testimonials.forEach(t => list.appendChild(renderTestimonial(t)));
    if (section) section.hidden = false;
  } catch (err) {
    console.error("Failed to load testimonials:", err);
    // Leave the section hidden on error rather than showing an empty shell.
  }
}

init();
