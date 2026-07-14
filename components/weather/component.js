export function init(root, { weather } = {}) {
  if (!weather) return;
  root.querySelector("[data-weather-value]").textContent = weather.value;
  root.querySelector("[data-weather-detail]").textContent = weather.detail;
}
