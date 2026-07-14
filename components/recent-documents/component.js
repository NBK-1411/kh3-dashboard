export function init(root, { documents = [] } = {}) {
  root.querySelector("#document-list").innerHTML = documents.map((document) => `
    <article class="document-row">
      <span class="document-icon" aria-hidden="true">${document.type.slice(0, 1)}</span>
      <div>
        <h3>${document.title}</h3>
        <p>${document.owner} - ${document.updated}</p>
      </div>
      <span class="status-badge">${document.type}</span>
    </article>
  `).join("");
}
