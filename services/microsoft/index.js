export function createMicrosoftService() {
  return {
    async initialize() {
      return { provider: "microsoft", status: "mock" };
    }
  };
}
