export function init(root, { peopleMoments = {} } = {}) {
  const birthdays = peopleMoments.birthdays || [];
  const joiners = peopleMoments.joiners || [];
  const onLeave = peopleMoments.onLeave || [];

  root.querySelector("[data-birthday-count]").textContent = formatCount(birthdays.length);
  root.querySelector("[data-joiner-count]").textContent = formatCount(joiners.length);
  root.querySelector("[data-leave-count]").textContent = formatCount(onLeave.length);

  root.querySelector("[data-birthdays]").innerHTML = birthdays.map((person) => renderMoment(person, {
    action: `<button class="person-action" type="button" data-wish="${person.name}">Wish</button>`
  })).join("");

  root.querySelector("[data-joiners]").innerHTML = joiners.map((person) => renderMoment(person, {
    meta: renderDate(person.date)
  })).join("");

  root.querySelector("[data-leave]").innerHTML = onLeave.map((person) => renderMoment(person, {
    meta: renderDate(person.date)
  })).join("");
}

function renderMoment(person, { action = "", meta = "" } = {}) {
  return `
    <article class="people-moment-row">
      <span class="avatar ${avatarClass(person.initials)}">${person.initials}</span>
      <div class="people-moment-copy">
        <h4>${person.name}</h4>
        <p>${person.role}</p>
        <small>${person.department}</small>
      </div>
      ${action || meta}
    </article>
  `;
}

function renderDate(date) {
  if (!date) return "";
  const [day, month, year] = date.split(" ");
  return `<time class="person-date" datetime="${year}-${monthNumber(month)}-${day}">${day}<small>${month} ${year}</small></time>`;
}

function monthNumber(month) {
  const months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  return months[month] || "01";
}

function formatCount(count) {
  return `${count} ${count === 1 ? "person" : "people"}`;
}

function avatarClass(seed = "") {
  const classes = ["avatar-blue", "avatar-green", "avatar-orange", "avatar-pink"];
  const index = seed.charCodeAt(0) % classes.length;
  return classes[index];
}
