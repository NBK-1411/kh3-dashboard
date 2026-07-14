export function init(root, { tasks = [] } = {}) {
  root.querySelector("#work-queue").innerHTML = tasks.map((item) => `
    <article class="task-card">
      <div>
        <h3>${item.title}</h3>
        <p>${item.context} - Due ${item.due}</p>
      </div>
      <span class="status-badge">${item.priority}</span>
    </article>
  `).join("");
}
