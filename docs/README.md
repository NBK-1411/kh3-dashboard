# Intranet Portal Documentation

This folder is the planning source of truth for the intranet dashboard/page/portal project.

## Documents

- [00 Assumptions And Decisions](./00-assumptions-and-decisions.md)
- [01 Product Requirements Document](./01-prd.md)
- [02 UX Flows And Information Architecture](./02-ux-flows.md)
- [03 Technical Architecture](./03-architecture.md)
- [04 Data Model](./04-data-model.md)
- [05 API Specification](./05-api.md)
- [06 Development Checklist](./06-development-checklist.md)
- [07 Visual Design Direction](./07-visual-design-direction.md)
- [08 Security Architecture](./08-security.md)
- [09 Testing Strategy](./09-testing-strategy.md)
- [10 Operations Guide](./10-operations-guide.md)
- [11 Deployment Guide](./11-deployment-guide.md)

## Product Summary

The application is an internal employee portal for announcements, employee resources, requests, approvals, directory lookup, tasks, notifications, and operational dashboards. It is designed for authenticated staff, department managers, HR/admin teams, and system administrators.

## Default Build Direction

- Web app: HTML, CSS, and vanilla JavaScript
- UI: Custom CSS design system with reusable HTML/CSS/JS components
- Backend: REST API service, recommended Node.js with Express or PHP depending on hosting preference
- Database: PostgreSQL
- Data access: SQL migrations and parameterized queries through the backend service
- Auth: SSO-ready session authentication using OIDC/SAML provider integration and RBAC
- Files: Object storage compatible with S3
- Deployment: Dockerized app, PostgreSQL managed database, CI/CD with automated checks

## MVP Modules

- Dashboard home
- Announcements/news
- People directory
- Resources/documents
- Requests and approvals
- Tasks
- Notifications
- Admin settings
- Audit logs

## Visual Direction

The dashboard should use the provided reference for layout and density: fixed sidebar, top utility header, compact widget cards, event cards, calendar widget, quick links, performance rings, and people-focused lists. The app must support both a white-based light mode and a matched dark mode. See [07 Visual Design Direction](./07-visual-design-direction.md).
