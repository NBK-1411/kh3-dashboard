import { mockDashboardData } from "./mock-data.js";

export function createApiService() {
  return {
    async getDashboardData() {
      return structuredClone(mockDashboardData);
    }
  };
}
