const data = {
  events: [
    {
      date: "06 Jul",
      title: "Leadership sync",
      time: "10:15 AM - 11:00 AM",
      location: "Boardroom A",
      attendees: ["KA", "NA", "YA"],
      color: "blue"
    },
    {
      date: "09 Jul",
      title: "Benefits briefing",
      time: "1:00 PM - 2:30 PM",
      location: "Online",
      attendees: ["EM", "AD", "JO"],
      color: "green"
    },
    {
      date: "14 Jul",
      title: "Operations review",
      time: "9:00 AM - 10:30 AM",
      location: "Conference 2",
      attendees: ["YA", "BO", "MA"],
      color: "orange"
    }
  ],
  progress: [
    { label: "Work consistency", value: 90, color: "var(--success)" },
    { label: "Team response", value: 85, color: "var(--danger)" },
    { label: "Problem solving", value: 80, color: "var(--warning)" }
  ],
  birthdays: [
    { name: "Nabila Humairah", role: "Executive Secretary", initials: "NH", avatar: "pink" },
    { name: "Dany Kurniawan", role: "Senior UI Designer", initials: "DK", avatar: "orange" },
    { name: "Septiana Puspita", role: "Office Supervisor", initials: "SP", avatar: "green" },
    { name: "Aditya Suazi", role: "Lead UX Designer", initials: "AS", avatar: "blue" },
    { name: "Vebbyana Agusti", role: "Corporate Strategy", initials: "VA", avatar: "pink" }
  ],
  joiners: [
    { name: "Akosua Mensah", role: "HR Coordinator", initials: "AM", avatar: "green", date: "08", month: "Jul 2026" },
    { name: "Kojo Appiah", role: "Backend Engineer", initials: "KA", avatar: "blue", date: "12", month: "Jul 2026" },
    { name: "Maya Boateng", role: "Procurement Analyst", initials: "MB", avatar: "orange", date: "18", month: "Jul 2026" },
    { name: "Eli Amankwah", role: "Support Specialist", initials: "EA", avatar: "pink", date: "22", month: "Jul 2026" }
  ],
  leaves: [
    { name: "Ama Owusu", role: "Finance Analyst", initials: "AO", avatar: "pink", date: "02", month: "Jul 2026" },
    { name: "Bismark Tetteh", role: "Facilities Lead", initials: "BT", avatar: "orange", date: "03", month: "Jul 2026" },
    { name: "Joy Nyarko", role: "People Partner", initials: "JN", avatar: "green", date: "04", month: "Jul 2026" },
    { name: "Kwame Adjei", role: "IT Support", initials: "KA", avatar: "blue", date: "06", month: "Jul 2026" }
  ],
  quickLinks: [
    { label: "Employee handbook", detail: "Policies and benefits", icon: "book" },
    { label: "IT help desk", detail: "Tickets and requests", icon: "support" },
    { label: "Resource library", detail: "Forms and templates", icon: "folder" }
  ],
  approvals: [
    { title: "Laptop replacement", meta: "Due today - IT request", status: "Urgent", tone: "danger" },
    { title: "Leave request", meta: "Ama Owusu - 3 days", status: "Review", tone: "warning" },
    { title: "Policy update", meta: "HR draft acknowledgement", status: "Ready", tone: "success" }
  ],
  announcements: [
    { title: "Quarterly town hall", meta: "Required acknowledgement by July 5", tone: "warning" },
    { title: "New hybrid work policy", meta: "Published by HR", tone: "success" },
    { title: "Security reminder", meta: "MFA enrollment closes Friday", tone: "danger" }
  ]
};

const routes = {
  dashboard: {
    title: "Dashboard",
    eyebrow: "Company workspace",
    copy: ""
  },
  announcements: {
    title: "Announcements",
    eyebrow: "Company updates",
    copy: "Browse targeted updates, required acknowledgements, and archived company news."
  },
  people: {
    title: "People Directory",
    eyebrow: "Find colleagues",
    copy: "Search employees by department, location, role, manager, or contact detail."
  },
  resources: {
    title: "Resources",
    eyebrow: "Documents and forms",
    copy: "Find policies, forms, templates, and versioned documents relevant to your role."
  },
  requests: {
    title: "Requests",
    eyebrow: "Service catalog",
    copy: "Submit internal requests, track status, add comments, and review workflow history."
  },
  approvals: {
    title: "Approvals",
    eyebrow: "Manager queue",
    copy: "Review pending decisions, request changes, delegate, approve, or reject work items."
  },
  tasks: {
    title: "Tasks",
    eyebrow: "Assigned work",
    copy: "Track assigned tasks from workflows, announcements, resources, and follow-ups."
  },
  "department-hr": {
    title: "HR Department",
    eyebrow: "Department workspace",
    copy: "View HR announcements, contacts, approved shortcuts, and employee resources."
  },
  "department-it": {
    title: "IT Department",
    eyebrow: "Department workspace",
    copy: "Access IT resources, support contacts, service requests, and system notices."
  },
  "department-ops": {
    title: "Operations",
    eyebrow: "Department workspace",
    copy: "Review operational notices, resources, contacts, and internal process updates."
  },
  admin: {
    title: "Admin",
    eyebrow: "System management",
    copy: "Manage users, roles, departments, workflows, content, integrations, and audit logs."
  },
  settings: {
    title: "Settings",
    eyebrow: "Account preferences",
    copy: "Manage your profile, notification preferences, theme, and accessibility settings."
  }
};

const iconPaths = {
  book: "M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2zm2 2v10.2A3.8 3.8 0 0 1 7 16h10V7a1 1 0 0 0-1-1z",
  support: "M12 3a8 8 0 0 0-8 8v4a3 3 0 0 0 3 3h1v-7H6a6 6 0 0 1 12 0h-2v7h1a3 3 0 0 0 3-3v-4a8 8 0 0 0-8-8zm-2 15h4v2h-4z",
  folder: "M3 6h7l2 2h9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
};

const root = document.documentElement;
const savedTheme = localStorage.getItem("portal-theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || systemTheme);

renderEvents();
renderProgress();
renderPeople("birthday-list", data.birthdays, "wish");
renderPeople("joiner-list", data.joiners, "date");
renderPeople("leave-list", data.leaves, "date");
renderCalendar();
renderQuickLinks();
renderApprovals();
renderAnnouncements();
bindInteractions();

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("portal-theme", theme);
  const toggle = document.querySelector("#theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

function renderEvents() {
  const target = document.querySelector("#events-list");
  target.innerHTML = data.events.map((event) => `
    <article class="event-card" tabindex="0" aria-label="${event.title}, ${event.date}, ${event.time}">
      <div class="event-strip"></div>
      <div class="event-body">
        <div class="event-top">
          <div>
            <div class="event-date">${event.date}</div>
            <div class="event-title">${event.title}</div>
          </div>
          <div class="avatar-stack" aria-label="${event.attendees.length} attendees">
            ${event.attendees.map((initials, index) => avatar(initials, ["blue", "green", "orange"][index] || "pink")).join("")}
          </div>
        </div>
        <div class="event-meta">
          <span>${svg("M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5l4 2-.9 1.8L11 13V7z")} ${event.time}</span>
          <span>${svg("M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z")} ${event.location}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderProgress() {
  const target = document.querySelector("#progress-list");
  target.innerHTML = data.progress.map((item) => `
    <article class="progress-card">
      <div class="progress-ring" style="--value:${item.value};--ring-color:${item.color}" role="img" aria-label="${item.label}: ${item.value} percent">
        ${item.value}%
      </div>
      <strong>${item.label}</strong>
    </article>
  `).join("");
}

function renderPeople(targetId, people, mode) {
  const target = document.querySelector(`#${targetId}`);
  target.innerHTML = people.map((person) => `
    <article class="person-row">
      ${avatar(person.initials, person.avatar)}
      <div>
        <h3>${person.name}</h3>
        <p>${person.role}</p>
      </div>
      ${mode === "wish"
        ? `<button class="person-action" type="button" data-wish="${person.name}">Send wish</button>`
        : `<div class="person-date">${person.date}<small>${person.month}</small></div>`}
    </article>
  `).join("");
}

function renderCalendar() {
  const target = document.querySelector("#calendar-grid");
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const eventDays = new Set([3, 6, 9, 14, 22, 28]);
  const blanks = Array.from({ length: 3 }, (_, index) => `<span class="calendar-day is-muted" aria-hidden="true">${28 + index}</span>`);
  const days = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    const classes = ["calendar-day"];
    if (day === 1) classes.push("is-selected");
    if (eventDays.has(day)) classes.push("has-event");
    const label = eventDays.has(day) ? `July ${day}, has event` : `July ${day}`;
    return `<button class="${classes.join(" ")}" type="button" aria-label="${label}">${day}</button>`;
  });
  target.innerHTML = labels.map((label) => `<span class="calendar-label">${label}</span>`).join("") + blanks.join("") + days.join("");
}

function renderQuickLinks() {
  const target = document.querySelector("#quick-links");
  target.innerHTML = data.quickLinks.map((link) => `
    <article class="quick-link-row">
      <span class="quick-icon" aria-hidden="true">${svg(iconPaths[link.icon])}</span>
      <div>
        <h3>${link.label}</h3>
        <p>${link.detail}</p>
      </div>
      <button class="link-button" type="button" data-link="${link.label}">Open</button>
    </article>
  `).join("");
}

function renderApprovals() {
  const target = document.querySelector("#approval-list");
  target.innerHTML = data.approvals.map((item) => `
    <article class="approval-row">
      <div>
        <h3>${item.title}</h3>
        <p>${item.meta}</p>
      </div>
      <span class="status-badge ${item.tone}">${item.status}</span>
    </article>
  `).join("");
}

function renderAnnouncements() {
  const target = document.querySelector("#announcement-list");
  target.innerHTML = data.announcements.map((item) => `
    <article class="announcement-row">
      <div>
        <h3>${item.title}</h3>
        <p>${item.meta}</p>
      </div>
      <span class="status-badge ${item.tone}">New</span>
    </article>
  `).join("");
}

function bindInteractions() {
  document.querySelector("#theme-toggle").addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  document.querySelector("[data-open-drawer]").addEventListener("click", () => {
    document.querySelector("#sidebar").classList.add("is-open");
    document.querySelector("[data-close-drawer]").hidden = false;
  });

  document.querySelector("[data-close-drawer]").addEventListener("click", closeDrawer);

  document.querySelectorAll(".nav-item[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      navigate(button.dataset.route);
      closeDrawer();
    });
  });

  document.querySelector("#new-request-button").addEventListener("click", () => {
    navigate("requests");
    showToast("Request catalog opened", "Choose a request type to continue.");
  });

  document.addEventListener("click", (event) => {
    const wishButton = event.target.closest("[data-wish]");
    const linkButton = event.target.closest("[data-link]");
    if (wishButton) showToast("Wish sent", `${wishButton.dataset.wish} will receive your birthday message.`);
    if (linkButton) showToast("Opening quick link", `${linkButton.dataset.link} is ready for API routing.`);
  });

  document.querySelector("#global-search").addEventListener("input", debounce((event) => {
    const value = event.target.value.trim();
    if (value.length > 2) {
      showToast("Search ready", `Searching for "${value}" across portal data.`);
    }
  }, 650));
}

function navigate(route) {
  const routeInfo = routes[route] || routes.dashboard;
  const isDashboard = route === "dashboard";

  document.querySelector("#page-title").textContent = routeInfo.title;
  document.querySelector("[data-view='dashboard']").hidden = !isDashboard;
  document.querySelector("[data-placeholder-view]").hidden = isDashboard;
  document.querySelector("#placeholder-eyebrow").textContent = routeInfo.eyebrow;
  document.querySelector("#placeholder-title").textContent = routeInfo.title;
  document.querySelector("#placeholder-copy").textContent = routeInfo.copy;

  document.querySelectorAll(".nav-item[data-route]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === route);
  });

  document.querySelector("#main-content").focus({ preventScroll: true });
}

function closeDrawer() {
  document.querySelector("#sidebar").classList.remove("is-open");
  document.querySelector("[data-close-drawer]").hidden = true;
}

function showToast(title, message) {
  const region = document.querySelector("#toast-region");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function avatar(initials, tone = "blue") {
  return `<span class="avatar avatar-${tone}" aria-hidden="true">${initials}</span>`;
}

function svg(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
}

function debounce(callback, delay) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), delay);
  };
}
