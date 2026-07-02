# 01 Product Requirements Document

## Objective

Build an internal intranet portal that gives employees one authenticated place to find company information, complete requests, track approvals, discover colleagues, receive announcements, and access operational dashboards relevant to their role.

## Success Metrics

- Employees can find a person, document, announcement, or request form in under 30 seconds.
- At least 80% of routine internal requests can be submitted and tracked in the portal.
- Content admins can publish targeted announcements without developer involvement.
- Managers can review and approve assigned requests from a single queue.
- Admins can audit key account, content, and workflow changes.

## User Roles

| Role | Description | Core Capabilities |
| --- | --- | --- |
| Employee | Standard authenticated staff member | View dashboard, search, read content, submit requests, manage own profile |
| Manager | Employee with direct reports or approval duties | Employee capabilities plus approval queue, team visibility |
| Content Admin | HR/comms/admin publisher | Create announcements, manage resources, moderate content |
| Workflow Admin | Configures request types and approval paths | Manage forms, statuses, approvers, SLAs |
| IT Admin | Manages users, integrations, auth settings | User administration, permissions, integrations |
| Super Admin | Full system administrator | All capabilities including audit and system settings |

## Scope

Confirmed MVP scope:

* Personalized welcome message.
* Company announcements.
* Quick links.
* Department shortcuts.
* Search functionality.

Optional/post-MVP scope:

* Internal chat or instant messaging.
* Video conferencing.
* Performance evaluations.
* Document editing within the portal.
* Workflow automation beyond the core request/approval engine.
* Lunch ordering, attendance reports, Finance dashboards, and third-party application launch pages.

## Out of Scope

* External customer access.
* AI assistants or chatbots
* Mobile application.

## MVP Features

### Authentication And Access

- Users can sign in with email/password in local development.
- Production auth supports SSO through OIDC or SAML.
- Users are assigned roles and optional department/location scopes.
- Unauthenticated users are redirected to login.
- Unauthorized access returns a clear 403 page.

### Dashboard Home

- Shows personalized widgets based on role and department.
- Includes latest announcements, pending approvals, assigned tasks, upcoming events, quick links, and recent documents.
- Supports empty states when a user has no tasks or approvals.
- Displays critical alerts prominently.

### Announcements

- Content admins can create, schedule, publish, archive, and target announcements.
- Employees can view announcements relevant to them.
- Announcements support title, summary, body, attachments, priority, publish date, expiry date, audience, and author.
- Users can acknowledge required announcements.

### People Directory

- Users can search employees by name, department, role, location, email, and manager.
- Profiles show contact information, department, role, location, manager, direct reports, and optional bio.
- Users can edit approved profile fields such as photo, phone extension, preferred name, and bio.

### Resources And Documents

- Content admins can upload and categorize files.
- Employees can search, filter, preview/download, and bookmark resources.
- Documents support versioning, owner, category, tags, audience, and expiry/review date.
- Restricted resources are visible only to allowed roles/departments/locations.

### Requests And Approvals

- Employees can submit request forms from a catalog.
- Each request has a status timeline and comments.
- Managers/approvers can approve, reject, request changes, or delegate.
- Request types can define fields, validation, approver rules, SLA targets, and visibility.
- Users receive notifications on status changes.

### Tasks

- Users can view tasks assigned to them from workflows.
- Tasks include title, status, due date, source, priority, assignee, and completion action.
- Users can mark permitted tasks complete.

### Notifications

- Users receive in-app notifications for announcements, approvals, request updates, mentions, and admin alerts.
- Notifications can be marked read or unread.
- Critical notifications remain visible until acknowledged.

### Admin

- Admins can manage users, roles, departments, locations, categories, quick links, request types, and integrations.
- Admins can view audit logs.
- Admin pages are permission-protected.

## Post-MVP Features

- AI-assisted enterprise search.
- HRIS sync.
- Calendar and room booking.
- Knowledge base articles with feedback.
- Polls and employee surveys.
- Chat integrations such as Microsoft Teams or Slack.
- Mobile push notifications.
- Advanced analytics dashboards.
- Multilingual content.

## Non-Functional Requirements

- WCAG 2.1 AA accessibility target.
- Page shell loads in under 2 seconds on normal office networks.
- Critical actions must be auditable.
- Role and audience checks must be enforced server-side.
- The app must not expose private content through search, direct URLs, or cached API responses.
- Forms must preserve unsaved work where practical.
- Tables with large datasets must paginate or virtualize.
- All user-generated rich text must be sanitized.

## Acceptance Criteria

- A user can sign in and land on a personalized dashboard.
- A user can find and open a resource through search or navigation.
- A user can submit a request and track its status.
- An approver can act on an assigned approval.
- A content admin can publish a targeted announcement.
- An admin can assign a role to a user.
- Unauthorized users cannot access restricted pages or API data.
- Audit logs record admin role changes, publishing actions, and workflow changes.

## Success Metrics

* Employees can access all required work platforms from a single portal.
* Reduction in time spent locating internal applications.
* Increased adoption of the intranet across departments.
* Positive employee satisfaction regarding ease of use.
* Reliable display of company events, birthdays, and leave information.
