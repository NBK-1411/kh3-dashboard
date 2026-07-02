# KH3 Dashboard

Static HTML, CSS, and vanilla JavaScript implementation of the intranet portal MVP shell.

## Run Locally

From the repository root:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Current Scope

- Dashboard shell with fixed sidebar and top utility header.
- Light mode and dark mode with saved user preference.
- Overview banner, event cards, calendar, quick links, approvals, announcements, progress rings, and people lists.
- Responsive drawer navigation for tablet and mobile.
- Mock data rendered through JavaScript so future REST API integration can replace the local data source.

## Documentation

Planning and implementation documentation lives in [docs](./docs/README.md).
