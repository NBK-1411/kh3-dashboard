export const routes = {
  dashboard: { title: "Home", eyebrow: "Workplace", copy: "" },
  apps: { title: "Apps", eyebrow: "Work tools", copy: "Open approved workplace apps and connected productivity tools." },
  people: { title: "People", eyebrow: "Directory", copy: "Search employees by department, location, role, manager, or contact detail." },
  documents: { title: "Documents", eyebrow: "Knowledge and files", copy: "Find policies, forms, templates, and versioned documents relevant to your role." },
  calendar: { title: "Calendar", eyebrow: "Schedule", copy: "Review meetings, room bookings, site visits, and calendar commitments." },
  tasks: { title: "Tasks", eyebrow: "Assigned work", copy: "Track assigned tasks from workflows, announcements, resources, and follow-ups." },
  services: { title: "Services", eyebrow: "Requests", copy: "Submit workplace requests and track service activity." },
  departments: { title: "Departments", eyebrow: "Workspaces", copy: "Open department workspaces for teams, shortcuts, documents, and updates." },
  knowledge: { title: "Knowledge Base", eyebrow: "Guidance", copy: "Browse operating guidance, policies, standards, and how-to articles." },
  "department-finance": { title: "Finance", eyebrow: "Department workspace", copy: "Budgets, invoices, approval policies, and finance contacts." },
  "department-construction": { title: "Construction", eyebrow: "Department workspace", copy: "Site updates, schedules, checklists, and delivery documents." },
  "department-project-design": { title: "Project Design", eyebrow: "Department workspace", copy: "Design reviews, drawings, specifications, and decisions." },
  "department-operations": { title: "Operations", eyebrow: "Department workspace", copy: "Operational notices, resources, contacts, and internal process updates." },
  "department-business-development": { title: "Business Development", eyebrow: "Department workspace", copy: "Pipeline, clients, proposals, and relationship activity." },
  "department-tech-support": { title: "Tech Support", eyebrow: "Department workspace", copy: "Support contacts, system notices, access requests, and device guidance." },
  "department-executive": { title: "Executive", eyebrow: "Department workspace", copy: "Leadership updates, decision records, and company priorities." },
  admin: { title: "Admin", eyebrow: "System management", copy: "Manage users, roles, departments, workflows, content, integrations, and audit logs." },
  settings: { title: "Settings", eyebrow: "Account preferences", copy: "Manage your profile, notification preferences, theme, and accessibility settings." }
};

export const navigationSections = [
  {
    id: "main",
    title: "Primary",
    items: [
      { route: "dashboard", label: "Home", icon: "M4 10.5 12 4l8 6.5V20h-6v-6h-4v6H4z" },
      { route: "apps", label: "Apps", icon: "M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" },
      { route: "people", label: "People", icon: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 2c0-2.2-4-3.4-6-3.4S3 10.8 3 13v3h12z" },
      { route: "documents", label: "Documents", icon: "M5 3h11l3 3v15H5zm10 1.8V7h2.2zM8 10h8v2H8zm0 4h8v2H8z" },
      { route: "calendar", label: "Calendar", icon: "M7 2h2v3h6V2h2v3h3v16H4V5h3zm11 8H6v9h12z" },
      { route: "tasks", label: "Tasks", icon: "M9.5 16.2 5.8 12.5l-1.4 1.4 5.1 5.1L20.2 8.3l-1.4-1.4z" },
      { route: "services", label: "Services", icon: "M7 3h10v2h3v16H4V5h3zm2 2v2h6V5zm-1 7h8v2H8zm0 4h6v2H8z" },
      { route: "departments", label: "Departments", icon: "M4 5h7v6H4zm9 0h7v6h-7zM4 13h7v6H4zm9 0h7v6h-7z" },
      { route: "knowledge", label: "Knowledge Base", icon: "M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2zm2 2v10.2A3.8 3.8 0 0 1 7 16h10V7a1 1 0 0 0-1-1z" }
    ]
  },
  {
    id: "account",
    title: "Secondary",
    account: true,
    items: [
      { route: "admin", label: "Admin", icon: "M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5zm0 4a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 14a9 9 0 0 1-5-3.2c.5-1.9 3.1-2.8 5-2.8s4.5.9 5 2.8A9 9 0 0 1 12 20z" },
      { route: "settings", label: "Settings", icon: "m19.4 13.5.1-1.5-.1-1.5 2-1.5-2-3.5-2.4 1a8 8 0 0 0-2.6-1.5L14 2h-4l-.4 3a8 8 0 0 0-2.6 1.5l-2.4-1-2 3.5 2 1.5-.1 1.5.1 1.5-2 1.5 2 3.5 2.4-1a8 8 0 0 0 2.6 1.5l.4 3h4l.4-3a8 8 0 0 0 2.6-1.5l2.4 1 2-3.5zM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5z" }
    ]
  }
];
