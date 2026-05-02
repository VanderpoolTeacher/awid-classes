function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d().+\-\s]{7,}$/;

function setError(form, name, message) {
  const errEl = form.querySelector(`[data-error-for="${name}"]`);
  const fieldEl = form.querySelector(`[name="${name}"]`)?.closest(".register__field");
  if (errEl) errEl.textContent = message || "";
  if (fieldEl) {
    fieldEl.classList.toggle("register__field--invalid", !!message);
  }
}

function clearErrors(form) {
  form.querySelectorAll("[data-error-for]").forEach(el => (el.textContent = ""));
  form.querySelectorAll(".register__field--invalid")
    .forEach(el => el.classList.remove("register__field--invalid"));
}

function validate(form) {
  let ok = true;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const phone = form.elements.phone.value.trim();

  if (!name) { setError(form, "name", "Please enter your name."); ok = false; }
  if (!email) { setError(form, "email", "Please enter your email."); ok = false; }
  else if (!EMAIL_RE.test(email)) { setError(form, "email", "That email address doesn't look right."); ok = false; }
  if (phone && !PHONE_RE.test(phone)) { setError(form, "phone", "That phone number doesn't look right."); ok = false; }

  return ok;
}

// TODO(awid-classes): wire to real submission endpoint.
// Easy paths: mailto fallback, Formspree, Google Forms POST, Netlify Forms.
async function submitRegistration(payload) {
  console.log("registration submitted:", payload);
  return { ok: true };
}

function showSuccess(form, classTitle) {
  const wrapper = form.parentElement;
  form.replaceWith(
    Object.assign(document.createElement("div"), {
      className: "register__success",
      innerHTML: `<strong>Thanks — we'll be in touch about ${escapeHtml(classTitle)}.</strong>
                  <p style="margin:8px 0 0;">A confirmation message has been logged for development purposes.</p>`
    })
  );
  // Scroll the message into view
  wrapper.scrollIntoView({ behavior: "smooth", block: "center" });
}

export function initForm() {
  const form = document.querySelector("[data-register-form]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);

    // Honeypot check — silently drop bot submissions.
    if (form.elements.website && form.elements.website.value.trim() !== "") {
      console.warn("Honeypot triggered — submission dropped.");
      showSuccess(form, form.dataset.classTitle); // pretend success
      return;
    }

    if (!validate(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting…";

    const payload = {
      classId: form.dataset.classId,
      classTitle: form.dataset.classTitle,
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      phone: form.elements.phone.value.trim(),
      notes: form.elements.notes.value.trim(),
      submittedAt: new Date().toISOString()
    };

    try {
      const result = await submitRegistration(payload);
      if (result?.ok) {
        showSuccess(form, form.dataset.classTitle);
      } else {
        setError(form, "form", "Something went wrong — please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit registration";
      }
    } catch (err) {
      console.error(err);
      setError(form, "form", "Something went wrong — please try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit registration";
    }
  });
}
