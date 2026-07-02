# 00 Assumptions And Decisions

## Product Assumptions

- The portal is for internal company use, not public users.
- All users must authenticate before accessing portal content.
- The first release serves employees, managers, HR/content admins, IT admins, and super admins.
- The portal must work well on desktop first, with responsive support for tablets and phones.
- The portal must support departments, locations, job titles, and manager relationships.
- Content visibility may be global, department-specific, location-specific, role-specific, or user-specific.
- Requests and approvals are generic enough to support HR, IT, finance, facilities, and admin workflows.
- Every sensitive admin action must be auditable.

## Product Decisions

- The first screen after login is the dashboard, not a marketing-style landing page.
- Navigation uses a persistent left sidebar on desktop and compact drawer/bottom access on mobile.
- Global search is a first-class feature across people, documents, announcements, and request records.
- Notifications are stored in-app first, with email/push integrations treated as optional channels.
- Documents are stored as metadata records with file assets in object storage.
- Approvals use a configurable workflow model rather than hardcoded one-off flows.

## Technical Decisions

- Use HTML, CSS, and vanilla JavaScript for the frontend.
- Use PostgreSQL as the primary relational datastore.
- Use SQL migrations and parameterized database queries through the backend service.
- Use server-rendered or static HTML pages where practical, with browser JavaScript modules for filters, tables, charts, forms, and live notifications.
- Start with a modular monolith unless scale or ownership boundaries require separate services.
- Design the authentication layer to support SSO through OIDC or SAML.
- Use RBAC with optional scoped permissions by department/location.

## Open Questions To Confirm

- Company size and expected active users.
- Required SSO provider: Microsoft Entra ID, Google Workspace, Okta, OneLogin, or custom.
- Required compliance requirements: SOC 2, ISO 27001, HIPAA, GDPR, local data residency.
- Whether employees can create content or only admins/managers can publish.
- Whether requests need SLA timers, escalation rules, or external system integrations.
- Required file storage provider.
- Whether the app must integrate with HRIS, payroll, ticketing, calendar, or chat systems.
