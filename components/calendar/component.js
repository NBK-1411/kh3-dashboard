export function init(root) {
  const target = root.querySelector("#calendar-grid");
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const eventDays = new Set([3, 6, 9, 14, 22, 28]);
  const blanks = Array.from({ length: 3 }, (_, index) => `<span class="calendar-day is-muted" aria-hidden="true">${28 + index}</span>`);
  const days = Array.from({ length: 31 }, (_, index) => {
    const day = index + 1;
    const classes = ["calendar-day"];
    if (day === 1) classes.push("is-selected");
    if (eventDays.has(day)) classes.push("has-event");
    const label = eventDays.has(day) ? `July ${day}, has event` : `July ${day}`;
    return `<button class="${classes.join(" ")}" type="button" aria-label="${label}">${day}</button>`;
  });
  target.innerHTML = labels.map((label) => `<span class="calendar-label">${label}</span>`).join("") + blanks.join("") + days.join("");
}
