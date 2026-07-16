export function init(root, { crmStatus = {} } = {}) {
  root.querySelector("[data-crm-health]").textContent = crmStatus.health || "Connected";
  root.querySelector("[data-crm-provider]").textContent = crmStatus.providerName || "Company CRM";
  root.querySelector("[data-crm-policy]").textContent = crmStatus.writePolicy || "";
  root.querySelector("[data-crm-mode]").textContent = crmStatus.mode || "Mock adapter";
  root.querySelector("[data-crm-sync]").textContent = `Last sync ${crmStatus.lastSyncAt || "pending"}`;

  const stats = crmStatus.recordCounts || {};
  root.querySelector("[data-crm-stats]").innerHTML = Object.entries(stats).map(([label, value]) => `
    <div>
      <dt>${formatLabel(label)}</dt>
      <dd>${value}</dd>
    </div>
  `).join("");
}

function formatLabel(value) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
}
