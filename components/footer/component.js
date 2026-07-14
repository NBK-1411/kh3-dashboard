export function init(root, { application } = {}) {
  if (application?.versionLabel) {
    root.querySelector(".app-version").textContent = application.versionLabel;
  }
}
