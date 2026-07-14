export function init(root, { news = [] } = {}) {
  root.querySelector("#announcement-list").innerHTML = news.map((item) => `
    <article class="announcement-row ${item.pinned ? "is-pinned" : ""}">
      <div>
        <h3>${item.title}</h3>
        <p>${item.meta} - ${item.summary}</p>
      </div>
      ${item.requiresAcknowledgement ? `<span class="status-badge warning">Ack required</span>` : `<span class="status-badge">Recent</span>`}
    </article>
  `).join("");
}
