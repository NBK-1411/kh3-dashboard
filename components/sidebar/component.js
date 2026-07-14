import { svg } from "../../utils/dom.js";

export function init(root, { navigationSections = [], company, application } = {}) {
  if (company) {
    root.querySelector(".brand-name").textContent = application?.name || company.brandName;
    root.querySelector(".brand-meta").textContent = company.brandMeta;
    root.querySelector(".brand-logo").src = company.logo;
  }

  root.querySelector(".nav-groups").innerHTML = navigationSections.map((section) => `
    <section class="nav-section ${section.account ? "nav-section-account" : ""}" aria-labelledby="nav-${section.id}-heading">
      <div class="nav-section-title" id="nav-${section.id}-heading">${section.title}</div>
      ${section.items.map((item) => renderItem(item)).join("")}
    </section>
  `).join("");
}

function renderItem(item) {
  const badgeClass = item.mutedBadge ? "nav-badge nav-badge-muted" : "nav-badge";
  const icon = item.colorClass
    ? `<span class="color-dot ${item.colorClass}" aria-hidden="true"></span>`
    : svg(item.icon);
  return `
    <button class="nav-item ${item.route === "dashboard" ? "is-active" : ""}" type="button" data-route="${item.route}">
      ${icon}
      <span>${item.label}</span>
      ${item.badge ? `<span class="${badgeClass}">${item.badge}</span>` : ""}
    </button>
  `;
}
