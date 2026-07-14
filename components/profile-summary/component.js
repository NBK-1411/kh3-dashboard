export function init(root, { user } = {}) {
  if (!user) return;
  const avatar = root.querySelector("[data-profile-avatar]");
  avatar.textContent = user.avatar;
  avatar.className = `avatar avatar-${user.avatarTone || "blue"}`;
  root.querySelector("[data-profile-name]").textContent = user.name;
  root.querySelector("[data-profile-email]").textContent = user.email;
  root.querySelector("[data-profile-meta]").textContent = `${user.company} - ${user.department} - ${user.role}`;
}
