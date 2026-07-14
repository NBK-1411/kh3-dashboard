export function init(root, { company } = {}) {
  if (!company) return;
  root.querySelector("img").src = company.logo;
  root.querySelector("[data-company-short]").textContent = company.shortName;
}
