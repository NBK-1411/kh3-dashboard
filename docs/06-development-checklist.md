# 06 Development Checklist

## Foundation

- [ ] Confirm project name, branding, company structure, and target users.
- [ ] Confirm SSO provider and authentication requirements.
- [ ] Confirm hosting/deployment environment.
- [ ] Confirm compliance, retention, and audit requirements.
- [ ] Create repository and branch strategy.
- [ ] Configure JavaScript linting, formatting, and test scripts.
- [ ] Set up environment variable management.

## Design System

- [ ] Implement the dashboard layout and dual-theme visual direction from `07-visual-design-direction.md`.
- [ ] Define layout shell: sidebar, top bar, mobile drawer, content region.
- [ ] Define color tokens for light and dark mode.
- [ ] Add a theme switcher and persist the selected theme.
- [ ] Define typography scale, spacing scale, radius, shadows, and focus states.
- [ ] Build reusable components: button, input, select, textarea, modal, drawer, toast, table, badge, tabs, pagination.
- [ ] Build dashboard widgets: overview banner, event card, calendar, quick links, progress ring, people list row.
- [ ] Build JavaScript utilities for API calls, session state, client-side validation, tables, filters, modals, and notifications.
- [ ] Build status components for requests, approvals, tasks, announcements, and files.
- [ ] Verify WCAG AA contrast in light mode and dark mode.

## Backend Foundation

- [ ] Add PostgreSQL and SQL migration tooling.
- [ ] Create initial schema and migrations.
- [ ] Seed roles, permissions, departments, locations, request types, and sample users.
- [ ] Add auth provider and session handling.
- [ ] Add authorization helpers and policy checks.
- [ ] Add audit logging helper.
- [ ] Add file storage abstraction.

## Feature Build Order

1. Auth and app shell.
2. Users, roles, departments, locations.
3. Dashboard with static then live data.
4. Announcements.
5. People directory.
6. Resources and file uploads.
7. Request catalog and request submission.
8. Approval queue and decision actions.
9. Tasks and notifications.
10. Admin pages.
11. Audit logs.
12. Search.

## Optional Feature Parking Lot

These are not part of the confirmed MVP unless approved later:

- Lunch ordering.
- Department-specific application launch pages.
- Finance dashboards.
- Attendance reports.
- Gmail, CRM, Google Sheets, or other third-party shortcuts beyond generic quick links.

## Testing

- [ ] Unit test authorization helpers.
- [ ] Unit test workflow status transitions.
- [ ] Integration test API validation and permission checks.
- [ ] E2E test login, dashboard, request submission, approval, announcement publishing, and resource access.
- [ ] Accessibility checks for keyboard navigation and form labels.
- [ ] Verify restricted content does not appear in search results.

## Production Readiness

- [ ] Add structured logging.
- [ ] Add error monitoring.
- [ ] Add health endpoint.
- [ ] Add database backups.
- [ ] Add migration deployment process.
- [ ] Add rate limiting.
- [ ] Add file size/type restrictions.
- [ ] Add rich text sanitization.
- [ ] Add security headers.
- [ ] Add dependency scanning.

## Definition Of Done

- [ ] Feature works for happy path and common failure paths.
- [ ] Loading, empty, error, and permission states are implemented.
- [ ] Server-side authorization is enforced.
- [ ] Mutations are audited where required.
- [ ] Forms have validation and preserve useful draft state.
- [ ] Tests cover high-risk behavior.
- [ ] UI is responsive at 375px, 768px, 1024px, and 1440px.
- [ ] No sensitive data is logged or exposed in unauthorized responses.

