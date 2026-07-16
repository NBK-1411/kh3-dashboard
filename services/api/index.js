import { mockDashboardData } from "./mock-data.js";

export function createApiService() {
  return {
    async getDashboardData() {
      return structuredClone(mockDashboardData);
    },
    async getCrmStatus() {
      return structuredClone(mockDashboardData.crmStatus);
    },
    async getCrmSnapshot() {
      const { people, requests, approvals, tasks, recentDocuments, crmStatus } = mockDashboardData;
      return structuredClone({ people, requests, approvals, tasks, recentDocuments, crmStatus });
    }
  };
}
