export function init(root, { route, routeInfo = {}, data = {}, company } = {}) {
  root.querySelector("[data-module-eyebrow]").textContent = routeInfo.eyebrow || "Workspace";
  root.querySelector("[data-module-title]").textContent = routeInfo.title || "Portal section";
  root.querySelector("[data-module-copy]").textContent = routeInfo.copy || "";
  root.querySelector("[data-module-content]").innerHTML = renderContent(route, data, company);
  bindFilters(root);
}

function renderContent(route, data, company) {
  if (route === "people") return renderPeople(data.people);
  if (route === "documents" || route === "knowledge") return renderDocuments(route, data);
  if (route === "apps") return renderApps(data.apps);
  if (route === "calendar") return renderCalendar(data.schedule);
  if (route === "tasks") return renderTasks(data.tasks);
  if (route === "services") return renderServices(data);
  if (route === "departments") return renderDepartments(data.departments);
  if (route?.startsWith("department-")) return renderDepartment(route, data);
  if (route === "admin") return renderAdmin(data);
  if (route === "settings") return renderSettings(company);
  return renderGeneric(data);
}

function renderPeople(people = []) {
  return `
    <section class="module-toolbar">
      <label class="module-search">
        <span class="sr-only">Search people</span>
        <input type="search" data-module-filter placeholder="Search name, role, department, manager">
      </label>
      <span class="count-label" data-result-count>${people.length} people</span>
    </section>
    <section class="module-table-card">
      <div class="directory-list" data-filter-list>
        ${people.map((person) => renderPersonRecord(person)).join("")}
      </div>
    </section>
  `;
}

function renderDocuments(route, data) {
  const documents = route === "knowledge"
    ? [...(data.recentDocuments || []), ...(data.news || []).map((item) => ({ ...item, type: "Article", owner: "Internal Comms", updated: item.date || "Recent" }))]
    : data.recentDocuments || [];
  return `
    <section class="module-toolbar">
      <label class="module-search">
        <span class="sr-only">Search documents</span>
        <input type="search" data-module-filter placeholder="Search title, owner, type">
      </label>
      <span class="count-label" data-result-count>${documents.length} items</span>
    </section>
    <section class="module-grid" data-filter-list>
      ${documents.map((document) => `
        <article class="module-card" data-filter-text="${filterText(document)}">
          <span class="document-icon">${document.type?.slice(0, 2).toUpperCase() || "DO"}</span>
          <h3>${document.title}</h3>
          <p>${document.owner || document.summary || "Knowledge resource"}</p>
          <div class="module-card-meta">
            <span>${document.type || "Resource"}</span>
            <span>${document.updated || "Recent"}</span>
          </div>
        </article>
      `).join("")}
    </section>
  `;
}

function renderApps(apps = []) {
  return `
    <section class="module-grid">
      ${apps.map((app) => `
        <button class="app-tile app-tone-${app.tone || "blue"}" type="button" data-link="${app.label}">
          <span class="app-tile-icon">${app.initials || app.label?.slice(0, 2).toUpperCase()}</span>
          <span><strong>${app.label}</strong><small>${app.description || "Connected workplace tool"}</small></span>
        </button>
      `).join("")}
    </section>
  `;
}

function renderCalendar(schedule = []) {
  return `
    <section class="workplace-two-column">
      <div class="section-block">
        <div class="section-header"><h2>Upcoming meetings</h2><span class="count-label">${schedule.length} today</span></div>
        <div class="schedule-list">${schedule.map((event) => `
          <article class="schedule-row">
            <time>${event.time}</time>
            <div><h3>${event.title}</h3><p>${event.location}</p></div>
          </article>
        `).join("")}</div>
      </div>
      <div class="widget-card">${renderCalendarGrid()}</div>
    </section>
  `;
}

function renderTasks(tasks = []) {
  return `
    <section class="work-queue">
      ${tasks.map((task) => `
        <article class="task-card">
          <div><h3>${task.title}</h3><p>${task.context} - Due ${task.due}</p></div>
          <span class="status-badge ${task.priority === "High" ? "danger" : task.priority === "Required" ? "warning" : "success"}">${task.priority}</span>
        </article>
      `).join("")}
    </section>
  `;
}

function renderServices(data) {
  return `
    <div class="services-page">
      <section class="workflow-board services-workflow">
        <div class="section-header">
          <div><p class="eyebrow">CRM queue</p><h2>Requests and approvals</h2></div>
          <button class="pill-button" type="button" data-open-request><span>New request</span></button>
        </div>
        <div class="workflow-grid">
          <section class="workflow-panel">
            <div class="workflow-panel-header">
              <div><h3>Open requests</h3><p>CRM workflow records visible to your role</p></div>
              <span class="count-label">${data.requests?.length || 0} open</span>
            </div>
            <div class="workflow-list">
              ${(data.requests || []).map((request) => `
                <article class="workflow-row">
                  <div><h4>${request.title}</h4><p>${request.owner} - ${request.due}</p></div>
                  <span class="status-badge ${request.tone || ""}">${request.status}</span>
                  <button class="link-button" type="button" data-link="${request.title}">Open</button>
                </article>
              `).join("")}
            </div>
          </section>
          <section class="workflow-panel">
            <div class="workflow-panel-header">
              <div><h3>Pending approvals</h3><p>Assigned CRM decisions</p></div>
              <span class="count-label">${data.approvals?.length || 0} due</span>
            </div>
            <div class="workflow-list">
              ${(data.approvals || []).map((approval) => `
                <article class="workflow-row">
                  <div><h4>${approval.title}</h4><p>${approval.requester} - ${approval.context} - ${approval.due}</p></div>
                  <span class="status-badge ${approval.tone || ""}">${approval.priority}</span>
                  <button class="link-button" type="button" data-approval-action="${approval.id}">Review</button>
                </article>
              `).join("")}
            </div>
          </section>
        </div>
      </section>
      <section class="services-summary-grid">
        <div data-component="crm-sync-inline">${renderCrmSummary(data.crmStatus)}</div>
        <article class="widget-card services-summary-card">
          <div class="section-header compact">
            <div><p class="eyebrow">Service catalog</p><h2>Common requests</h2></div>
          </div>
          <div class="service-catalog-list">
            ${[
              ["IT support", "Access, devices, software, account help"],
              ["Facilities", "Badges, rooms, repairs, workplace needs"],
              ["People Ops", "Leave, onboarding, profile updates"],
              ["Finance", "Purchasing, reimbursement, approvals"]
            ].map(([title, copy]) => `
              <button class="service-catalog-row" type="button" data-open-request>
                <span><strong>${title}</strong><small>${copy}</small></span>
                <span class="link-button">Start</span>
              </button>
            `).join("")}
          </div>
        </article>
      </section>
    </div>
  `;
}

function renderDepartments(departments = []) {
  return `
    <section class="department-shortcut-grid">
      ${departments.map((department) => `
        <button class="department-tile" type="button" data-route-shortcut="${department.id}">
          <span class="color-dot ${department.colorClass}" aria-hidden="true"></span>
          <span><strong>${department.label}</strong><small>${department.description}</small></span>
        </button>
      `).join("")}
    </section>
  `;
}

function renderDepartment(route, data) {
  const department = (data.departments || []).find((item) => item.id === route);
  const people = (data.people || []).filter((person) => department && person.department === department.label);
  return `
    <section class="workplace-two-column">
      <div class="section-block">
        <div class="section-header"><div><p class="eyebrow">Team workspace</p><h2>${department?.label || "Department"}</h2></div><span class="count-label">${people.length} people</span></div>
        <div class="directory-list">${people.map((person) => renderPersonRecord(person)).join("") || "<p>No synced people records yet.</p>"}</div>
      </div>
      <div class="widget-card">
        <h3>Department resources</h3>
        <p>${department?.description || "Shared documents, contacts, and updates will appear here."}</p>
      </div>
    </section>
  `;
}

function renderAdmin(data) {
  return `
    <section class="module-grid">
      ${[
        ["Users and roles", `${data.people?.length || 0} synced records`],
        ["CRM integration", data.crmStatus?.health || "Connected"],
        ["Workflow rules", "Requests, approvals, escalations"],
        ["Audit log", "Portal and CRM write activity"]
      ].map(([title, copy]) => `<article class="module-card"><h3>${title}</h3><p>${copy}</p></article>`).join("")}
    </section>
  `;
}

function renderSettings(company) {
  return `
    <section class="module-grid">
      ${[
        ["Profile", "Name, role, department, and contact details"],
        ["Notifications", "Email, in-app, and workflow alerts"],
        ["Theme", "Light and dark mode preference"],
        ["Company", company?.name || "KH3 Group"]
      ].map(([title, copy]) => `<article class="module-card"><h3>${title}</h3><p>${copy}</p></article>`).join("")}
    </section>
  `;
}

function renderGeneric(data) {
  return `
    <section class="module-grid">
      <article class="module-card"><h3>CRM records</h3><p>${data.crmStatus?.recordCounts?.people || 0} people synced from CRM.</p></article>
      <article class="module-card"><h3>Open work</h3><p>${data.tasks?.length || 0} active tasks and workflow items.</p></article>
    </section>
  `;
}

function renderPersonRecord(person) {
  return `
    <article class="directory-row" data-filter-text="${filterText(person)}">
      <span class="avatar avatar-blue">${person.initials}</span>
      <div>
        <h3>${person.name}</h3>
        <p>${person.role} - ${person.department}</p>
      </div>
      <div class="directory-contact">
        <a href="mailto:${person.email}">${person.email}</a>
        <span>${person.location}</span>
      </div>
      <span class="status-badge">${person.status}</span>
    </article>
  `;
}

function renderCalendarGrid() {
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  return `
    <div class="section-header compact"><h2>July 2026</h2></div>
    <div class="calendar-grid">
      ${labels.map((label) => `<span class="calendar-label">${label}</span>`).join("")}
      ${days.map((day, index) => `<button class="calendar-day ${index < 3 ? "is-muted" : ""} ${day === 14 ? "is-selected" : ""} ${[3, 6, 9, 14, 21, 28].includes(day) ? "has-event" : ""}" type="button">${day}</button>`).join("")}
    </div>
  `;
}

function renderCrmSummary(crmStatus = {}) {
  return `
    <section class="widget-card crm-sync">
      <div class="section-header compact"><div><p class="eyebrow">Integration</p><h2>${crmStatus.providerName || "Company CRM"}</h2></div><span class="status-badge success">${crmStatus.health || "Connected"}</span></div>
      <p>${crmStatus.writePolicy || ""}</p>
      <div class="crm-sync-footer"><span>${crmStatus.mode || "Mock adapter"}</span><span>${crmStatus.lastSyncAt || "Sync pending"}</span></div>
    </section>
  `;
}

function bindFilters(root) {
  const input = root.querySelector("[data-module-filter]");
  const list = root.querySelector("[data-filter-list]");
  const count = root.querySelector("[data-result-count]");
  if (!input || !list || !count) return;

  input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    let visible = 0;
    list.querySelectorAll("[data-filter-text]").forEach((item) => {
      const isMatch = item.dataset.filterText.includes(value);
      item.hidden = !isMatch;
      if (isMatch) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? "item" : "items"}`;
  });
}

function filterText(record) {
  return Object.values(record || {}).join(" ").toLowerCase();
}
