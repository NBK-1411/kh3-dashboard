# 02 UX Flows And Information Architecture

## UX Principles

- Prioritize work completion over decorative presentation.
- Keep navigation stable and predictable.
- Make search globally available.
- Follow the dashboard layout and dual-theme visual direction defined in [07 Visual Design Direction](./07-visual-design-direction.md).
- Show status, ownership, next action, and due dates wherever work items appear.
- Use dense but readable layouts for repeated daily use.
- Provide clear empty, loading, error, and permission-denied states.
- Never rely on color alone for status.

## Page Map

| Page | Route | Primary Users | Purpose |
| --- | --- | --- | --- |
| Login | `/login` | All users | Authenticate user |
| Dashboard | `/dashboard` | All users | Personalized portal home |
| Announcements | `/announcements` | All users | Browse company updates |
| Announcement Detail | `/announcements/:id` | All users | Read, acknowledge, comment if enabled |
| People Directory | `/people` | All users | Find colleagues |
| Person Profile | `/people/:id` | All users | View colleague profile |
| Resources | `/resources` | All users | Find policies, documents, templates |
| Resource Detail | `/resources/:id` | All users | Preview/download document |
| Request Catalog | `/requests` | All users | Choose request type |
| New Request | `/requests/new/:typeId` | All users | Submit request |
| Request Detail | `/requests/:id` | Request participants | Track request and comments |
| Approvals | `/approvals` | Managers/approvers | Review pending approvals |
| Tasks | `/tasks` | All users | View assigned tasks |
| Notifications | `/notifications` | All users | Manage notifications |
| My Profile | `/me` | All users | Update own profile preferences |
| Admin | `/admin` | Admins | System management |
| Admin Users | `/admin/users` | IT/admins | Manage users and roles |
| Admin Content | `/admin/content` | Content admins | Manage announcements/resources |
| Admin Workflows | `/admin/workflows` | Workflow admins | Manage request types |
| Audit Logs | `/admin/audit-logs` | Super admins/auditors | Review system activity |

## Primary Navigation

Desktop sidebar:

- Dashboard
- Announcements
- People
- Resources
- Requests
- Approvals
- Tasks
- Admin

Top bar:

- Global search
- Create/request shortcut
- Notifications
- User menu

Mobile:

- Top app bar with search and user menu.
- Drawer for full navigation.
- Bottom navigation may expose Dashboard, Search, Requests, Tasks, Notifications.

## Dashboard Layout

Desktop grid:

- Header: greeting, department/location context, quick action.
- Left sidebar: logo, grouped navigation, product/system links, account actions.
- Top header: page title, notifications/messages, user profile.
- Main column: overview banner, upcoming events, performance/KPI row, people lists.
- Right utility rail: calendar, quick links, compact alerts, bookmarks.
- Lower section: birthdays, weekly joiners, farewell employees, team or department metrics.

Mobile layout:

- Critical alerts.
- Search.
- Quick actions.
- Tasks/approvals.
- Announcements.
- Resources.

## Full Page Inventory

### Public

* Login
* Forgot Password
* Access Denied
* Session Expired

### Dashboard

* Dashboard Home
* Personalized Widgets
* Global Search Results

### Departments

Each department has its own landing page.
Example:

* HR
* IT
* Operations
* Marketing
* Sales
* Administration

Each contains:

* Resources
* Documents
* Announcements
* Contacts
* Optional approved application shortcuts

Department-specific pages such as Finance dashboards or application launch hubs are optional/post-MVP unless explicitly approved.

### Calendar

* Monthly Calendar
* Weekly View
* Event Details

### People

* Directory
* Employee Profile
* Birthdays
* Joiners
* Staff on Leave

### Resources

* Policies
* Forms
* Downloads

### Requests

* Request Catalog
* Request Form
* Request Details
* My Requests

### Notifications

* Notification Center
* Notification Preferences

### Reports

* Department Reports
* Request and approval reports
* Content engagement reports
* Optional attendance or lunch reports only if those modules are approved later

### Administration

* Dashboard
* User Management
* Roles
* Departments
* Permissions
* Audit Logs
* System Settings
* Integrations


## Core Flows

### Login Flow

1. User opens app.
2. If unauthenticated, app redirects to `/login`.
3. User selects SSO or local sign-in in development.
4. App validates identity and loads roles/scopes.
5. User lands on `/dashboard`.
6. If account is inactive, app shows access-disabled page.

### Find Information Flow

1. User uses global search or navigates to a module.
2. User filters by type, department, date, category, owner, or status.
3. User opens a result.
4. App verifies access server-side.
5. User views the content or receives a permission message.

### Submit Request Flow

1. User opens Requests.
2. User chooses a request type from the catalog.
3. App renders the configured form.
4. User fills fields and adds attachments.
5. App validates required fields.
6. User submits request.
7. App creates request, workflow steps, audit event, and notification.
8. User lands on request detail with status timeline.

### Approval Flow

1. Approver opens Approvals or receives notification.
2. Approver opens request detail.
3. Approver reviews form data, attachments, comments, and history.
4. Approver chooses approve, reject, request changes, or delegate.
5. App records decision and advances workflow.
6. Requestor and next approver receive notifications.

### Publish Announcement Flow

1. Content admin opens Admin Content.
2. Admin creates announcement draft.
3. Admin selects audience, priority, publish date, expiry date, and acknowledgement requirement.
4. Admin previews announcement.
5. Admin publishes or schedules.
6. App records audit event and notifies target audience.

## State Requirements

- Loading: skeletons for dashboard widgets, tables, and cards.
- Empty: explain what is missing and provide the next relevant action.
- Error: show cause, retry action, and support reference where useful.
- Permission denied: explain that access is restricted without exposing private details.
- Offline/connection issue: preserve draft forms and offer retry.

## Accessibility Requirements

- Keyboard navigation for every page and modal.
- Visible focus states.
- Skip link to main content.
- Semantic headings.
- Form labels and inline validation.
- Status labels include text and icon, not color only.
- Tables expose sortable headers and accessible labels.


### Toast Notification Rules
Toast notifications communicate the outcome of an action and automatically disappear.

### Success
Duration
4 seconds
Examples

* Order submitted.
* Changes saved.
* User created.
* Menu published.

### Warning
Duration
6 seconds
Examples

* Deadline approaching.
* Missing required fields.
* Unsaved changes.

### Error
Persistent until dismissed.
Examples

* Failed to save.
* Network unavailable.
* Permission denied.

### Information
Duration
5 seconds.
Examples

* New announcement published.
* Maintenance tonight.
* New company event added.

### Rules
* Maximum three visible toasts.
* Newest appears at the top-right.
* Clicking a toast opens the related page if applicable.
* Screen readers announce toast messages.
* Toasts do not block user interaction.

## Modal Inventory

### Confirmation
* Delete
* Cancel Order
* Approve Request
* Reject Request
* Publish Announcement
* Logout

### Forms
* Create Announcement
* Create Event
* Add Department
* Edit User
* Upload Menu
* Assign Roles
* Create Request

### Selection
* Department Picker
* Employee Picker
* Date Picker
* Application Picker
* Icon Picker

### Information
* Employee Details
* Event Details
* Leave Details
* Birthday Details
* Version Information

### Warning
* Session Expiring
* Unsaved Changes
* Duplicate Submission
* Permission Change
* Maintenance Notice

## Error Pages
### 401

User not authenticated.
Actions
Login
Contact IT

### 403

User lacks permission.
Actions
Return Home
Request Access

### 404

Requested page not found.
Actions
Search
Dashboard

### 500
Unexpected server error.
Actions
Retry
Report Problem

### Offline
Connection unavailable.
Actions
Retry
Continue Offline (where supported)

### Maintenance
System unavailable.
Display
Estimated completion time
Support contact
Status page link
