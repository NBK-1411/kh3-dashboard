export function createGoogleService() {
  return {
    async initialize() {
      return { provider: "google", status: "mock" };
    }
  };
}
