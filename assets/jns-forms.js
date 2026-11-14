(() => {
  "use strict";
  const API_URL = "https://zywjccmcawufzpmpulcx.supabase.co/functions/v1/jns-api";
  // This is a publishable key intended for browser use. Never put a Supabase secret/service-role key here.
  const PUBLISHABLE_KEY = "sb_publishable_lXEk_vP9iYa2GTTYBG0Ckg_Qc16wvKS";

  const value = (form, name) => {
    const field = form.elements.namedItem(name);
    return field ? String(field.value ?? "").trim() : "";
  };

  async function submit(form) {
    const status = form.querySelector(".formstatus");
    const button = form.querySelector('button[type="submit"]');
    if (!form.reportValidity()) return;
    const kind = form.dataset.jnsForm;
    const consent = Boolean(form.elements.namedItem("consent")?.checked);
    const common = {
      consent,
      website: value(form, "website"),
    };
    let payload;
    if (kind === "enquiry") {
      payload = {
        action: "submit_enquiry",
        full_name: value(form, "full_name"),
        phone: value(form, "phone"),
        email: value(form, "email"),
        area: value(form, "area"),
        service_needed: value(form, "service_needed"),
        preferred_schedule: value(form, "preferred_schedule"),
        preferred_contact: value(form, "preferred_contact"),
        ...common,
      };
    } else if (kind === "job") {
      const experience = value(form, "experience_years");
      payload = {
        action: "submit_job_application",
        full_name: value(form, "full_name"),
        phone: value(form, "phone"),
        email: value(form, "email"),
        city: value(form, "city"),
        position_applied: value(form, "position_applied"),
        qualification: value(form, "qualification"),
        experience_years: experience === "" ? null : Number(experience),
        languages_spoken: value(form, "languages_spoken"),
        preferred_availability: value(form, "preferred_availability"),
        ...common,
      };
    } else {
      return;
    }

    if (button) {
      button.disabled = true;
      button.dataset.originalText = button.textContent || "Submit";
      button.textContent = "Submitting…";
    }
    if (status) status.textContent = "Sending your details securely to JNS…";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": PUBLISHABLE_KEY,
        },
        body: JSON.stringify(payload),
      });
      let result = {};
      try { result = await response.json(); } catch { /* handled below */ }
      if (!response.ok || result.ok !== true) {
        throw new Error(result.error || "We could not submit the form. Please call or email JNS.");
      }
      // Send only a generic success event to Tag Manager. Never send enquiry fields or patient details.
      if (kind === "enquiry") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: "jns_enquiry_success" });
      }
      if (status) status.textContent = result.message || "Thank you. JNS has received your submission.";
      form.reset();
    } catch (error) {
      if (status) status.textContent = error instanceof Error ? error.message : "Submission failed. Please contact JNS directly.";
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.originalText || "Submit";
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form[data-jns-form]").forEach(form => {
      form.addEventListener("submit", event => {
        event.preventDefault();
        void submit(form);
      });
    });
  });
})();
