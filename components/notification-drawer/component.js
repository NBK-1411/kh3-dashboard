export function init(root, { notifications = [] } = {}) {
  root.querySelector("#notification-list").innerHTML = notifications.map((item) => `
    <article class="notification-row">
      <span class="notification-status ${item.tone}" aria-hidden="true"></span>
      <div>
        <h3>${item.title}</h3>
        <p>${item.detail}</p>
        <small>${item.time}</small>
      </div>
    </article>
  `).join("");
}
