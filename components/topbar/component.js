export function init(root, { user } = {}) {
  if (!user) return;
  const avatar = root.querySelector(".profile-button .avatar");
  avatar.textContent = user.initials;
  avatar.className = `avatar avatar-${user.avatarTone || "blue"}`;
  root.querySelector(".profile-button strong").textContent = user.name;
  root.querySelector(".profile-button small").textContent = user.role;

  root.querySelector(".profile-button").addEventListener("click", () => {
    const summary = document.querySelector(".profile-summary");
    if (summary) summary.hidden = !summary.hidden;
  });
}
