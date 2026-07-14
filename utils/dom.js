export function svg(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
}

export function avatar(initials, tone = "blue") {
  return `<span class="avatar avatar-${tone}" aria-hidden="true">${initials}</span>`;
}

export function debounce(callback, delay) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), delay);
  };
}
