import { apps } from "../../config/apps.js";
import { departments } from "../../config/departments.js";
import { recentDocuments } from "../../config/documents.js";
import { news } from "../../config/news.js";
import { quickActions } from "../../config/quick-actions.js";
import { workplace } from "../../config/workplace.js";

export const people = [
  { id: "emp-1", name: "Nabila Humairah", initials: "NH", role: "Executive Secretary", department: "Operations", location: "Accra HQ", email: "nabila@kh3group.local", phone: "+233 20 555 0101", manager: "Yaa Addo", birthday: "Today", status: "Active" },
  { id: "emp-2", name: "Dany Kurniawan", initials: "DK", role: "Senior UI Designer", department: "Project Design", location: "Accra HQ", email: "dany@kh3group.local", phone: "+233 20 555 0102", manager: "Kojo Appiah", birthday: "Today", status: "Active" },
  { id: "emp-3", name: "Septiana Puspita", initials: "SP", role: "Office Supervisor", department: "Operations", location: "Site Office", email: "septiana@kh3group.local", phone: "+233 20 555 0103", manager: "Yaa Addo", birthday: "This month", status: "Active" },
  { id: "emp-4", name: "Aditya Suazi", initials: "AS", role: "Lead UX Designer", department: "Project Design", location: "Remote", email: "aditya@kh3group.local", phone: "+233 20 555 0104", manager: "Kojo Appiah", birthday: "This month", status: "Active" },
  { id: "emp-5", name: "Vebbyana Agusti", initials: "VA", role: "Corporate Strategy", department: "Executive", location: "Accra HQ", email: "vebbyana@kh3group.local", phone: "+233 20 555 0105", manager: "Executive Office", birthday: "This month", status: "Active" },
  { id: "emp-6", name: "Akosua Mensah", initials: "AM", role: "HR Coordinator", department: "Operations", location: "Accra HQ", email: "akosua@kh3group.local", phone: "+233 20 555 0106", manager: "Yaa Addo", startDate: "08 Jul 2026", status: "Starting" },
  { id: "emp-7", name: "Kojo Appiah", initials: "KA", role: "Backend Engineer", department: "Tech Support", location: "Remote", email: "kojo@kh3group.local", phone: "+233 20 555 0107", manager: "Tech Support Lead", startDate: "12 Jul 2026", status: "Starting" },
  { id: "emp-8", name: "Maya Boateng", initials: "MB", role: "Procurement Analyst", department: "Finance", location: "Accra HQ", email: "maya@kh3group.local", phone: "+233 20 555 0108", manager: "Finance Lead", startDate: "18 Jul 2026", status: "Starting" }
];

export const requests = [
  { id: "req-1", title: "Facilities access card", owner: "Operations", due: "Due today", status: "Needs decision", tone: "danger" },
  { id: "req-2", title: "Laptop replacement", owner: "IT request", due: "Due today", status: "Urgent", tone: "danger" },
  { id: "req-3", title: "Leave request", owner: "Ama Owusu", due: "3 days", status: "Review", tone: "warning" },
  { id: "req-4", title: "Vendor onboarding", owner: "Procurement", due: "Jul 18", status: "Open", tone: "success" }
];

export const approvals = [
  { id: "appr-1", title: "Laptop replacement", requester: "Kojo Appiah", context: "IT request", due: "Due today", priority: "Urgent", tone: "danger" },
  { id: "appr-2", title: "Leave request", requester: "Ama Owusu", context: "People Ops", due: "Due tomorrow", priority: "Review", tone: "warning" },
  { id: "appr-3", title: "Facilities access", requester: "Nabila Humairah", context: "Operations", due: "Jul 16", priority: "Open", tone: "success" }
];

export const crmStatus = {
  providerName: "Company CRM",
  mode: "Mock adapter",
  lastSyncAt: "14 Jul 2026, 10:42 AM",
  syncInterval: "Every 15 minutes",
  health: "Connected",
  writePolicy: "Portal actions queue updates, then post back to CRM after approval rules pass.",
  recordCounts: {
    people: people.length,
    tasks: workplace.tasks.length,
    documents: recentDocuments.length,
    requests: requests.length,
    approvals: approvals.length
  }
};

export const peopleMoments = {
  birthdays: [
    { id: "bday-1", name: "Nabila Humairah", initials: "NH", role: "Executive Secretary", department: "Operations" },
    { id: "bday-2", name: "Dany Kurniawan", initials: "DK", role: "Senior UI Designer", department: "Project Design" },
    { id: "bday-3", name: "Septiana Puspita", initials: "SP", role: "Office Supervisor", department: "Operations" },
    { id: "bday-4", name: "Aditya Suazi", initials: "AS", role: "Lead UX Designer", department: "Project Design" }
  ],
  joiners: [
    { id: "join-1", name: "Akosua Mensah", initials: "AM", role: "HR Coordinator", department: "Operations", date: "08 Jul 2026" },
    { id: "join-2", name: "Kojo Appiah", initials: "KA", role: "Backend Engineer", department: "Tech Support", date: "12 Jul 2026" },
    { id: "join-3", name: "Maya Boateng", initials: "MB", role: "Procurement Analyst", department: "Finance", date: "18 Jul 2026" }
  ],
  onLeave: [
    { id: "leave-1", name: "Ama Owusu", initials: "AO", role: "Finance Analyst", department: "Finance", date: "02 Jul 2026" },
    { id: "leave-2", name: "Bismark Tetteh", initials: "BT", role: "Facilities Lead", department: "Operations", date: "03 Jul 2026" },
    { id: "leave-3", name: "Joy Nyarko", initials: "JN", role: "People Partner", department: "Operations", date: "04 Jul 2026" }
  ]
};

export const mockDashboardData = {
  apps,
  departments,
  recentDocuments,
  news,
  quickActions,
  people,
  crmStatus,
  requests,
  approvals,
  peopleMoments,
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
