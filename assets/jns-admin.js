import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zywjccmcawufzpmpulcx.supabase.co";
// Public publishable key only. No database password, service_role or secret key belongs in browser code.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_lXEk_vP9iYa2GTTYBG0Ckg_Qc16wvKS";
const API_URL = `${SUPABASE_URL}/functions/v1/jns-api`;
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

const $ = (id) => document.getElementById(id);
const loginPanel = $("login-panel");
const dashboardPanel = $("dashboard-panel");
const loginForm = $("login-form");
const loginStatus = $("login-status");
const dashboardStatus = $("dashboard-status");
const recordsList = $("records-list");
const refreshButton = $("refresh-button");
const logoutButton = $("logout-button");
const tabs = { enquiries: $("tab-enquiries"), applications: $("tab-applications") };
let currentTab = "enquiries";
let records = { enquiries: [], applications: [] };

function setStatus(target, message, isError = false) {
  target.textContent = message;
  target.style.color = isError ? "#a12626" : "#243f59";
}
function node(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined && text !== null) el.textContent = String(text);
  if (className) el.className = className;
  return el;
}
function addField(parent, label, value) {
  const p = node("p");
  const strong = node("b", `${label}: `);
  p.append(strong, document.createTextNode(value || "—"));
  parent.append(p);
}
function statusOptions(kind, current) {
  const choices = kind === "enquiries"
    ? ["new", "contacted", "closed"]
    : ["new", "reviewing", "shortlisted", "not_selected", "hired"];
  const select = document.createElement("select");
  select.setAttribute("aria-label", "Update record status");
  for (const value of choices) {
    const option = node("option", value.replaceAll("_", " "));
    option.value = value;
    option.selected = value === current;
    select.append(option);
  }
  return select;
}
async function invokeAdmin(payload) {
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session?.access_token) throw new Error("Session expired. Please sign in again.");
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_PUBLISHABLE_KEY,
      "Authorization": `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(payload),
  });
  let result = {};
  try { result = await response.json(); } catch { /* show safe fallback below */ }
  if (response.status === 401 || response.status === 403) {
    throw new Error(result.error || "This account is not authorised for JNS admin access.");
  }
  if (!response.ok || result.ok !== true) throw new Error(result.error || "The request could not be completed.");
  return result;
}
function renderRecords() {
  recordsList.replaceChildren();
  const list = records[currentTab] || [];
  if (!list.length) {
    recordsList.append(node("div", "No submissions yet.", "admin-empty"));
    return;
  }
  for (const item of list) {
    const card = node("article", undefined, "admin-card");
    card.append(node("h3", item.full_name || "Unnamed submission"));
    const date = item.created_at ? new Date(item.created_at).toLocaleString() : "Date unavailable";
    card.append(node("div", `${currentTab === "enquiries" ? "Enquiry" : "Application"} · ${date}`, "admin-meta"));
    const grid = node("div", undefined, "admin-grid");
    addField(grid, "Phone", item.phone);
    addField(grid, "Email", item.email);
    if (currentTab === "enquiries") {
      addField(grid, "Service", item.service_needed);
      addField(grid, "Area", item.area);
      addField(grid, "Preferred schedule", item.preferred_schedule);
      addField(grid, "Contact method", item.preferred_contact);
    } else {
      addField(grid, "Role", item.position_applied);
      addField(grid, "Qualification", item.qualification);
      addField(grid, "Experience (years)", item.experience_years);
      addField(grid, "Languages", item.languages_spoken);
      addField(grid, "Availability", item.preferred_availability);
      addField(grid, "City", item.city);
    }
    card.append(grid);
    const foot = node("div", undefined, "admin-card-foot");
    foot.append(node("span", "Status"));
    const select = statusOptions(currentTab, item.status);
    const save = node("button", "Save status", "btn btn-gold");
    save.type = "button";
    save.addEventListener("click", async () => {
      save.disabled = true;
      setStatus(dashboardStatus, "Saving status…");
      try {
        const action = currentTab === "enquiries" ? "admin_update_enquiry" : "admin_update_job";
        await invokeAdmin({ action, id: item.id, status: select.value });
        item.status = select.value;
        setStatus(dashboardStatus, "Status updated.");
      } catch (error) {
        setStatus(dashboardStatus, error instanceof Error ? error.message : "Update failed.", true);
      } finally {
        save.disabled = false;
      }
    });
    foot.append(select, save);
    card.append(foot);
    recordsList.append(card);
  }
}
function setTab(tab) {
  currentTab = tab;
  for (const [key, button] of Object.entries(tabs)) button.setAttribute("aria-pressed", String(key === tab));
  renderRecords();
}
async function loadRecords() {
  refreshButton.disabled = true;
  setStatus(dashboardStatus, "Loading secure records…");
  try {
    const result = await invokeAdmin({ action: "admin_list" });
    records.enquiries = Array.isArray(result.enquiries) ? result.enquiries : [];
    records.applications = Array.isArray(result.applications) ? result.applications : [];
    $("enquiry-count").textContent = String(records.enquiries.length);
    $("application-count").textContent = String(records.applications.length);
    setStatus(dashboardStatus, `Loaded ${records.enquiries.length} enquiries and ${records.applications.length} applications. Access role: ${result.role}.`);
    renderRecords();
  } catch (error) {
    setStatus(dashboardStatus, error instanceof Error ? error.message : "Could not load records.", true);
    if (/sign in|session expired|authorised|admin access required/i.test(error instanceof Error ? error.message : "")) {
      setStatus(loginStatus, error instanceof Error ? error.message : "Admin access required.", true);
      await signOut(false);
    }
  } finally {
    refreshButton.disabled = false;
  }
}
function showSignedIn(email) {
  loginPanel.classList.add("admin-hidden");
  dashboardPanel.classList.remove("admin-hidden");
  refreshButton.disabled = false;
  logoutButton.classList.remove("admin-hidden");
  $("signed-in-label").textContent = `Signed in as ${email || "authorised JNS user"}`;
}
function showSignedOut() {
  loginPanel.classList.remove("admin-hidden");
  dashboardPanel.classList.add("admin-hidden");
  refreshButton.disabled = true;
  logoutButton.classList.add("admin-hidden");
  records = { enquiries: [], applications: [] };
  recordsList.replaceChildren();
  $("enquiry-count").textContent = "0";
  $("application-count").textContent = "0";
}
async function signOut(showMessage = true) {
  await supabase.auth.signOut();
  showSignedOut();
  if (showMessage) setStatus(loginStatus, "You have signed out.");
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!loginForm.reportValidity()) return;
  const button = $("login-button");
  button.disabled = true;
  setStatus(loginStatus, "Checking sign-in…");
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: $("admin-email").value.trim(),
      password: $("admin-password").value,
    });
    if (error) throw error;
    $("admin-password").value = "";
    showSignedIn(data.user?.email);
    // The auth state listener loads records after the session is established.
  } catch (error) {
    setStatus(loginStatus, error instanceof Error ? error.message : "Sign in failed.", true);
  } finally {
    button.disabled = false;
  }
});
refreshButton.addEventListener("click", () => void loadRecords());
logoutButton.addEventListener("click", () => void signOut());
tabs.enquiries.addEventListener("click", () => setTab("enquiries"));
tabs.applications.addEventListener("click", () => setTab("applications"));

supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    showSignedIn(session.user.email);
    void loadRecords();
  } else {
    showSignedOut();
  }
});
