# KH3 Dashboard Agent Guide

## Project Structure

- `index.html` is the host document only.
- `app.js` is the central bootstrap for layout loading, service setup, theme setup, routing, and interaction binding.
- `components/<component-name>/` contains reusable UI components.
- `layouts/<layout-name>/` contains layout shells.
- `pages/<page-name>/` contains future page-level modules.
- `config/` contains application configuration and navigation metadata.
- `services/` contains integration interfaces and mock implementations.
- `styles/` contains shared CSS layers imported by `styles.css`.
- `utils/` contains reusable browser helpers.
- `docs/` contains product, architecture, testing, deployment, and operations documentation.

## Coding Standards

- Use vanilla HTML, CSS, and modern ES Modules.
- Do not introduce React, Vue, Angular, Svelte, or another frontend framework.
- Preserve existing visual behavior unless a requested architecture change requires otherwise.
- Prefer existing class names and markup patterns when extending the UI.
- Keep modules small, explicit, and easy to replace during future API integration.
- Use mock services until real API credentials and contracts are approved.

## Component Conventions

Every component must use this folder contract:

```text
components/component-name/
  component.html
  component.css
  component.js
```

- `component.html` owns static markup.
- `component.css` owns component-specific CSS only when shared styles are insufficient.
- `component.js` exports `init(root, props)`.
- Components should accept data through `props`; they should not import application state directly.
- Components should keep stable IDs and data attributes only when required for accessibility or app-level behavior.

## Folder Conventions

- Layout folders use `layout.html`, `layout.css`, and `layout.js`.
- Page folders should use `page.html`, `page.css`, and `page.js` when pages are implemented.
- Service folders expose their public interface from `index.js`.
- Config modules export plain data objects and arrays.
- Utility modules should be framework-independent and side-effect light.

## Naming Conventions

- Folders use kebab-case.
- JavaScript variables and functions use camelCase.
- CSS classes keep the existing kebab-case naming.
- Route IDs should match navigation route keys.
- Service factories use `create<Name>Service`.

## Architecture Rules

- `app.js` coordinates the application but should not own large rendering templates.
- Reusable UI belongs in `components/`.
- Page-level composition belongs in `pages/` when future pages are implemented.
- Hardcoded navigation, company, app, role, department, and theme values belong in `config/`.
- API, auth, Google, and Microsoft behavior belongs behind `services/` interfaces.
- Global CSS belongs in the `styles/` layers and should retain current design tokens.

## Future Roadmap

- Add page modules for executive, finance, project design, construction, operations, tech support, and admin.
- Replace mock services with authenticated API clients.
- Add real Google Workspace and Microsoft 365 integration adapters.
- Add role-aware navigation filtering from `config/roles.js`.
- Add company-specific theming and content from `config/companies.js`.
- Introduce test coverage for the component loader, routing, and service adapters.
