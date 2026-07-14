export function init(root, { apps = [] } = {}) {
  root.querySelector("#pinned-app-grid").innerHTML = apps.map((app) => `
    <button class="app-tile app-tone-${app.tone}" type="button" data-route-shortcut="${app.route}" aria-label="Open ${app.label}">
      <span class="app-tile-icon">${app.initials}</span>
      <span>
        <strong>${app.label}</strong>
        <small>${app.provider}</small>
      </span>
    </button>
  `).join("");
}
