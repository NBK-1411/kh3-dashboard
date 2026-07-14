export function init(root, { data, user, company } = {}) {
  root.querySelector("[data-user-name]").textContent = firstName(user?.name);
  root.querySelector("[data-user-department]").textContent = user?.department || "Operations";
  root.querySelector("[data-user-role]").textContent = user?.role || "Operations Manager";
  root.querySelector("[data-company-name]").textContent = company?.name || "KH3 Group";
  root.querySelector("[data-current-date]").textContent = formatToday();
  renderSchedule(root.querySelector("#schedule-list"), data.schedule);
}

function renderSchedule(target, schedule = []) {
  target.innerHTML = schedule.map((event) => `
    <article class="schedule-row">
      <time>${event.time}</time>
      <div>
        <h3>${event.title}</h3>
        <p>${event.location}</p>
      </div>
    </article>
  `).join("");
}

function firstName(name = "Yaa") {
  return name.split(" ")[0];
}

function formatToday() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());
}
