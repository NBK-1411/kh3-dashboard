export const workplace = {
  weather: {
    label: "Weather",
    value: "22 C",
    detail: "Partly cloudy"
  },
  schedule: [
    { id: "mtg-1", time: "09:00", title: "Operations stand-up", location: "Teams" },
    { id: "mtg-2", time: "11:30", title: "Project design review", location: "Boardroom A" },
    { id: "mtg-3", time: "14:00", title: "Finance approvals", location: "Online" }
  ],
  tasks: [
    { id: "task-1", title: "Review facilities request", context: "Operations", due: "Today", priority: "High" },
    { id: "task-2", title: "Acknowledge security policy", context: "Technology", due: "Tomorrow", priority: "Required" },
    { id: "task-3", title: "Update team contact list", context: "People Ops", due: "Jul 10", priority: "Open" }
  ]
};
