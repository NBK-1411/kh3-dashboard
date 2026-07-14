export function createAuthService() {
  return {
    async getCurrentUser() {
      return {
        name: "Yaa Addo",
        email: "yaa.addo@kh3group.com",
        company: "KH3 Group",
        department: "Operations",
        initials: "YA",
        avatar: "YA",
        role: "Operations Manager",
        avatarTone: "blue"
      };
    },
    async isAuthenticated() {
      return true;
    }
  };
}
