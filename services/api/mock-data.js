import { apps } from "../../config/apps.js";
import { departments } from "../../config/departments.js";
import { recentDocuments } from "../../config/documents.js";
import { news } from "../../config/news.js";
import { quickActions } from "../../config/quick-actions.js";
import { workplace } from "../../config/workplace.js";

export const mockDashboardData = {
  apps,
  departments,
  recentDocuments,
  news,
  quickActions,
  weather: workplace.weather,
  schedule: workplace.schedule,
  tasks: workplace.tasks,
  notifications: [
    { title: "Approval waiting", detail: "Laptop replacement needs your decision today.", time: "8 min ago", tone: "danger" },
    { title: "Town hall acknowledgement", detail: "Please acknowledge the quarterly town hall notice.", time: "1 hr ago", tone: "warning" },
    { title: "Resource updated", detail: "The hybrid work policy was revised by HR.", time: "Yesterday", tone: "success" },
    { title: "New joiner", detail: "Akosua Mensah joins HR next week.", time: "Yesterday", tone: "success" }
  ]
};
