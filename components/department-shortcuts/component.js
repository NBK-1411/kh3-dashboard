export function init(root, { departments = [] } = {}) {
  root.querySelector("#department-shortcut-grid").innerHTML = departments.map((department) => `
    <button class="department-tile" type="button" data-route-shortcut="${department.id}">
      <span class="color-dot ${department.colorClass}" aria-hidden="true"></span>
      <span>
        <strong>${department.label}</strong>
        <small>${department.description}</small>
      </span>
    </button>
  `).join("");
}
