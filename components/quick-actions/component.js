import { svg } from "../../utils/dom.js";

export function init(root, { actions = [] } = {}) {
  root.querySelector("#quick-action-grid").innerHTML = actions.map((action) => `
    <button class="quick-action-button" type="button" ${action.id === "leave" ? "data-open-request" : `data-route-shortcut="${action.route}"`}>
      ${svg(action.icon)}
      <span>${action.label}</span>
    </button>
  `).join("");
}
