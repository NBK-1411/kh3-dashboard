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

export async function initializeApp() {
  const services = createServices();
  const state = {
    route: "dashboard",
    dashboardData: null,
    user: null,
    company: companies.find((company) => company.id === activeCompanyId) || companies[0]
  };

  initializeTheme();
  await initializeServices(services, state);
  await loadLayout("authenticated", "#app");
  await initializeComponents(state);
  bindInteractions(state);
  navigate("dashboard", state);
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
  outlet.innerHTML = `<div data-component="dashboard-home"></div><div data-component="placeholder-view"></div>`;

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
    loadComponent("placeholder-view", "[data-component='placeholder-view']")
  ]);
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

  document.querySelector("#theme-toggle").addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  document.querySelector("[data-open-drawer]").addEventListener("click", () => {
    document.querySelector("#sidebar").classList.add("is-open");
    document.querySelector("[data-close-drawer]").hidden = false;
  });

  document.querySelector("[data-close-drawer]").addEventListener("click", closeDrawer);

  document.addEventListener("click", (event) => {
    const navItem = event.target.closest(".nav-item[data-route]");
    const wishButton = event.target.closest("[data-wish]");
    const linkButton = event.target.closest("[data-link]");
    const approvalButton = event.target.closest("[data-approval-action]");
    const routeShortcut = event.target.closest("[data-route-shortcut]");
    const requestButton = event.target.closest("[data-open-request]");

    if (navItem) {
      navigate(navItem.dataset.route, state);
      closeDrawer();
    }
    if (wishButton) showToast("Wish sent", `${wishButton.dataset.wish} will receive your birthday message.`);
    if (linkButton) showToast("Opening quick link", `${linkButton.dataset.link} is ready for API routing.`);
    if (approvalButton) showToast("Approval opened", "The approval detail view is ready for the next build pass.");
    if (routeShortcut) navigate(routeShortcut.dataset.routeShortcut, state);
    if (requestButton) {
      requestDialog.showModal();
      document.querySelector("#request-type").focus();
    }
  });

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
  });

  document.querySelector("#global-search").addEventListener("input", debounce((event) => {
    const value = event.target.value.trim();
    if (value.length > 2) {
      showToast("Search ready", `Searching for "${value}" across portal data.`);
    }
  }, 650));
}

function navigate(route, state) {
  const routeInfo = routes[route] || routes.dashboard;
  const isDashboard = route === "dashboard";
  state.route = route;

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
