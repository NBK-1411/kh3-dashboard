import { application } from "../config/application.js";
import { companies, activeCompanyId } from "../config/companies.js";
import { navigationSections, routes } from "../config/navigation.js";
import { theme as themeConfig } from "../config/theme.js";
import { createApiService } from "../services/api/index.js";
import { createAuthService } from "../services/auth/index.js";
import { createGoogleService } from "../services/google/index.js";
import { createMicrosoftService } from "../services/microsoft/index.js";
import { debounce } from "./dom.js";
import { loadComponent, loadLayout } from "./component-loader.js";

const root = document.documentElement;
const sidebarStorageKey = "kh3.sidebarCollapsed";

export async function initializeApp() {
  const services = createServices();
  const state = {
    route: getRouteFromHash(),
    dashboardData: null,
    user: null,
    company: companies.find((company) => company.id === activeCompanyId) || companies[0],
    sidebarCollapsed: localStorage.getItem(sidebarStorageKey) === "true"
  };

  initializeTheme();
  await initializeServices(services, state);
  await loadLayout("authenticated", "#app");
  await initializeComponents(state);
  applySidebarState(state);
  await navigate(state.route, state, { replaceHash: true });
  bindInteractions(state);
}

function createServices() {
  return {
    api: createApiService(),
    auth: createAuthService(),
    google: createGoogleService(),
    microsoft: createMicrosoftService()
  };
}

async function initializeServices(services, state) {
  await Promise.all([
    services.google.initialize(),
    services.microsoft.initialize()
  ]);
  state.user = await services.auth.getCurrentUser();
  state.dashboardData = await services.api.getDashboardData();
}

async function initializeComponents(state) {
  await Promise.all([
    loadComponent("sidebar", "[data-component='sidebar']", {
      navigationSections,
      company: state.company,
      application
    }),
    loadComponent("topbar", "[data-component='topbar']", {
      user: state.user
    }),
    loadComponent("notification-drawer", "[data-component='notification-drawer']", {
      notifications: state.dashboardData.notifications
    }),
    loadComponent("modal-system", "[data-component='modal-system']"),
    loadComponent("search-panel", "[data-component='search-panel']"),
    loadComponent("toast-region", "[data-component='toast-region']"),
    loadComponent("footer", "[data-component='footer']", {
      application
    })
  ]);

  await Promise.all([
    loadComponent("company-badge", "[data-component='company-badge']", {
      company: state.company
    }),
    loadComponent("profile-summary", "[data-component='profile-summary']", {
      user: state.user
    })
  ]);

  await renderDashboardPage(state);
}

async function renderDashboardPage(state) {
  const outlet = document.querySelector("[data-page-outlet]");
  outlet.innerHTML = `<div data-component="dashboard-home"></div>`;

  await loadComponent("dashboard-home", "[data-component='dashboard-home']", {
    data: state.dashboardData,
    user: state.user,
    company: state.company
  });

  await Promise.all([
    loadComponent("weather", "[data-component='weather']", {
      weather: state.dashboardData.weather
    }),
    loadComponent("pinned-apps", "[data-component='pinned-apps']", {
      apps: state.dashboardData.apps
    }),
    loadComponent("task-list", "[data-component='task-list']", {
      tasks: state.dashboardData.tasks
    }),
    loadComponent("recent-documents", "[data-component='recent-documents']", {
      documents: state.dashboardData.recentDocuments
    }),
    loadComponent("announcements", "[data-component='announcements']", {
      news: state.dashboardData.news
    }),
    loadComponent("department-shortcuts", "[data-component='department-shortcuts']", {
      departments: state.dashboardData.departments
    }),
    loadComponent("quick-actions", "[data-component='quick-actions']", {
      actions: state.dashboardData.quickActions
    }),
    loadComponent("people-moments", "[data-component='people-moments']", {
      peopleMoments: state.dashboardData.peopleMoments
    }),
    loadComponent("crm-sync", "[data-component='crm-sync']", {
      crmStatus: state.dashboardData.crmStatus
    }),
    loadComponent("workflow-board", "[data-component='workflow-board']", {
      requests: state.dashboardData.requests,
      approvals: state.dashboardData.approvals
    })
  ]);
}

async function renderModulePage(route, state) {
  const outlet = document.querySelector("[data-page-outlet]");
  const routeInfo = routes[route] || routes.dashboard;
  outlet.innerHTML = `<div data-component="module-view"></div>`;
  await loadComponent("module-view", "[data-component='module-view']", {
    route,
    routeInfo,
    data: state.dashboardData,
    user: state.user,
    company: state.company
  });
}

function initializeTheme() {
  const savedTheme = localStorage.getItem(themeConfig.storageKey);
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : themeConfig.defaultTheme;
  setTheme(savedTheme || systemTheme);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem(themeConfig.storageKey, theme);
  const toggle = document.querySelector("#theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  }
}

function bindInteractions(state) {
  const requestDialog = document.querySelector("#request-dialog");
  const requestForm = document.querySelector("#request-form");
  const notificationsButton = document.querySelector("#notifications-button");
  const notificationDrawer = document.querySelector("#notification-drawer");
  const searchPanel = document.querySelector("#search-panel");
  const closeSearchButton = document.querySelector("#close-search-panel");
  const renderSearch = debounce((value) => {
    updateSearchPanel(value, state);
  }, 180);

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  document.querySelector("[data-open-drawer]").addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1040px)").matches) {
      document.querySelector("#sidebar").classList.add("is-open");
      document.querySelector("[data-close-drawer]").hidden = false;
      return;
    }
    state.sidebarCollapsed = !state.sidebarCollapsed;
    localStorage.setItem(sidebarStorageKey, String(state.sidebarCollapsed));
    applySidebarState(state);
  });

  document.querySelector("[data-close-drawer]").addEventListener("click", closeDrawer);

  window.addEventListener("hashchange", () => {
    navigate(getRouteFromHash(), state, { skipHashUpdate: true });
  });

  document.addEventListener("click", (event) => {
    const navItem = event.target.closest(".nav-item[data-route]");
    const wishButton = event.target.closest("[data-wish]");
    const linkButton = event.target.closest("[data-link]");
    const approvalButton = event.target.closest("[data-approval-action]");
    const routeShortcut = event.target.closest("[data-route-shortcut]");
    const requestButton = event.target.closest("[data-open-request]");
    const searchResult = event.target.closest("[data-search-route]");

    if (navItem) {
      navigate(navItem.dataset.route, state);
      closeDrawer();
    }
    if (wishButton) showToast("Wish sent", `${wishButton.dataset.wish} will receive your birthday message.`);
    if (linkButton) showToast("Opening quick link", `${linkButton.dataset.link} is ready for API routing.`);
    if (approvalButton) showToast("Approval opened", "The approval detail view is ready for the next build pass.");
    if (routeShortcut) navigate(routeShortcut.dataset.routeShortcut, state);
    if (searchResult) {
      navigate(searchResult.dataset.searchRoute, state);
      closeSearchPanel();
    }
    if (requestButton) {
      requestDialog.showModal();
      document.querySelector("#request-type").focus();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("[data-global-search]")) {
      syncSearchInputs(event.target.value, event.target);
      renderSearch(event.target.value.trim());
    }
  });

  document.addEventListener("submit", (event) => {
    if (event.target.matches("[data-search-form]")) {
      event.preventDefault();
      const input = event.target.querySelector("[data-global-search]");
      updateSearchPanel(input?.value.trim() || "", state);
    }
  });

  closeSearchButton?.addEventListener("click", closeSearchPanel);

  document.querySelector("#new-request-button")?.addEventListener("click", () => {
    requestDialog.showModal();
    document.querySelector("#request-type").focus();
  });

  document.querySelector("#close-request-dialog").addEventListener("click", () => {
    requestDialog.close();
  });

  document.querySelector("#cancel-request").addEventListener("click", () => {
    requestDialog.close();
  });

  requestForm.addEventListener("submit", () => {
    const title = document.querySelector("#request-title").value.trim() || "New request";
    showToast("Request submitted", `${title} was added to the request queue.`);
    requestForm.reset();
    requestDialog.close();
  });

  notificationsButton.addEventListener("click", () => {
    const isOpen = !notificationDrawer.hidden;
    notificationDrawer.hidden = isOpen;
    notificationsButton.setAttribute("aria-expanded", String(!isOpen));
  });

  document.querySelector("#close-notifications").addEventListener("click", () => {
    notificationDrawer.hidden = true;
    notificationsButton.setAttribute("aria-expanded", "false");
    notificationsButton.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !notificationDrawer.hidden) {
      notificationDrawer.hidden = true;
      notificationsButton.setAttribute("aria-expanded", "false");
    }
    if (event.key === "Escape" && searchPanel && !searchPanel.hidden) {
      closeSearchPanel();
    }
  });

}

async function navigate(route, state, options = {}) {
  state.route = routes[route] ? route : "dashboard";
  const routeInfo = routes[state.route] || routes.dashboard;
  const isDashboard = state.route === "dashboard";

  document.querySelector("#page-title").textContent = routeInfo.title;

  if (!options.skipHashUpdate) {
    updateHash(state.route, options.replaceHash);
  }

  if (isDashboard) {
    await renderDashboardPage(state);
  } else {
    await renderModulePage(state.route, state);
  }

  document.querySelectorAll(".nav-item[data-route]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.route === state.route);
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

function updateSearchPanel(query, state) {
  const panel = document.querySelector("#search-panel");
  const queryLabel = document.querySelector("[data-search-query]");
  const resultsTarget = document.querySelector("[data-search-results]");
  if (!panel || !queryLabel || !resultsTarget) return;

  if (query.length < 2) {
    panel.hidden = true;
    resultsTarget.innerHTML = "";
    queryLabel.textContent = "Type at least two characters to search portal data.";
    return;
  }

  const results = searchPortalData(query, state.dashboardData);
  panel.hidden = false;
  queryLabel.textContent = results.length
    ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
    : `No results for "${query}"`;
  resultsTarget.innerHTML = results.length ? results.map(renderSearchResult).join("") : `
    <div class="search-empty">
      <strong>No matching records</strong>
      <span>Try a name, department, request title, document, or app.</span>
    </div>
  `;
}

function searchPortalData(query, data = {}) {
  const normalized = query.toLowerCase();
  return buildSearchIndex(data)
    .filter((item) => item.terms.includes(normalized))
    .slice(0, 10);
}

function buildSearchIndex(data = {}) {
  const records = [];

  (data.people || []).forEach((person) => {
    records.push({
      type: "Person",
      title: person.name,
      meta: `${person.role} - ${person.department}`,
      route: "people",
      terms: [person.name, person.role, person.department, person.location, person.email, person.manager].join(" ").toLowerCase()
    });
  });

  (data.recentDocuments || []).forEach((document) => {
    records.push({
      type: "Document",
      title: document.title,
      meta: `${document.type} - ${document.owner}`,
      route: "documents",
      terms: [document.title, document.type, document.owner, document.updated].join(" ").toLowerCase()
    });
  });

  (data.apps || []).forEach((app) => {
    records.push({
      type: "App",
      title: app.label,
      meta: app.description || "Connected workplace tool",
      route: "apps",
      terms: [app.label, app.description, app.initials].join(" ").toLowerCase()
    });
  });

  (data.requests || []).forEach((request) => {
    records.push({
      type: "Request",
      title: request.title,
      meta: `${request.owner} - ${request.status}`,
      route: "services",
      terms: [request.title, request.owner, request.due, request.status].join(" ").toLowerCase()
    });
  });

  (data.approvals || []).forEach((approval) => {
    records.push({
      type: "Approval",
      title: approval.title,
      meta: `${approval.requester} - ${approval.priority}`,
      route: "services",
      terms: [approval.title, approval.requester, approval.context, approval.due, approval.priority].join(" ").toLowerCase()
    });
  });

  (data.tasks || []).forEach((task) => {
    records.push({
      type: "Task",
      title: task.title,
      meta: `${task.context} - ${task.due}`,
      route: "tasks",
      terms: [task.title, task.context, task.due, task.priority].join(" ").toLowerCase()
    });
  });

  (data.news || []).forEach((item) => {
    records.push({
      type: "Announcement",
      title: item.title,
      meta: item.summary || "Company update",
      route: "knowledge",
      terms: [item.title, item.summary, item.category].join(" ").toLowerCase()
    });
  });

  (data.departments || []).forEach((department) => {
    records.push({
      type: "Department",
      title: department.label,
      meta: department.description,
      route: department.id,
      terms: [department.label, department.description].join(" ").toLowerCase()
    });
  });

  return records;
}

function renderSearchResult(result) {
  return `
    <button class="search-result-row" type="button" data-search-route="${result.route}">
      <span class="search-result-type">${result.type}</span>
      <span>
        <strong>${result.title}</strong>
        <small>${result.meta}</small>
      </span>
    </button>
  `;
}

function closeSearchPanel() {
  const panel = document.querySelector("#search-panel");
  if (panel) panel.hidden = true;
}

function syncSearchInputs(value, source) {
  document.querySelectorAll("[data-global-search]").forEach((input) => {
    if (input !== source) input.value = value;
  });
}

function getRouteFromHash() {
  const route = window.location.hash.replace(/^#\/?/, "");
  return routes[route] ? route : "dashboard";
}

function updateHash(route, replace = false) {
  const nextHash = route === "dashboard" ? "" : `#${route}`;
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  if (window.location.hash === nextHash) return;
  if (replace) {
    window.history.replaceState(null, "", nextUrl);
  } else {
    window.history.pushState(null, "", nextUrl);
  }
}

function applySidebarState(state) {
  const shell = document.querySelector(".app-shell");
  const toggle = document.querySelector("[data-open-drawer]");
  if (!shell || !toggle) return;
  shell.classList.toggle("is-sidebar-collapsed", state.sidebarCollapsed);
  toggle.setAttribute("aria-expanded", String(!state.sidebarCollapsed));
  toggle.setAttribute("aria-label", state.sidebarCollapsed ? "Expand navigation" : "Collapse navigation");
}
