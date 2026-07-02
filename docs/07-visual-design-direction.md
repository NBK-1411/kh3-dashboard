# 07 Visual Design Direction

## Reference Direction

The intranet should use the provided reference images for layout, density, and component composition. It does not need to use the same colors.

- Full-height portal shell.
- Fixed left sidebar navigation.
- Top header with notifications and user profile.
- Dense dashboard content area.
- Branded accent media banners.
- Compact cards with thin borders.
- Employee avatars in lists and event cards.
- Calendar and quick-link widgets on the right side.
- KPI/performance widgets with circular progress visuals.
- People-focused sections for birthdays, joiners, farewell, teams, and announcements.
- Required theme support: light mode and dark mode.

This is a visual direction, not a brand copy. The final design should use the project/company brand, logo, text, modules, and data.

## Layout System

### Desktop

- Outer app shell uses the active theme background.
- Sidebar width: approximately `260px` to `300px`.
- Header height: approximately `80px` to `96px`.
- Main content uses a two-area layout:
  - Primary dashboard content column.
  - Right utility rail for calendar, links, alerts, and compact widgets.
- Content grid should support:
  - 3 event cards across the main area.
  - 1 right-side calendar card.
  - Wide performance card plus right-side quick links.
  - 3 lower people columns for birthdays, joiners, and farewells.

### Tablet

- Sidebar can collapse to icon-only or drawer mode.
- Right utility rail moves below the primary dashboard content.
- Event cards become 2 columns.
- People lists become 2 columns or stacked depending on width.

### Mobile

- Sidebar becomes a drawer.
- Header condenses to page title, search/action, notifications, and profile menu.
- Dashboard cards stack vertically.
- Calendar and quick links move below urgent tasks and announcements.
- Tables become searchable stacked lists.

## Visual Style

### Color Direction

The app must support both light mode and dark mode. Light mode should be white-based and should be treated as a first-class theme, not a fallback. Dark mode should use the same layout, spacing, hierarchy, and components with matched contrast.

Theme selection requirements:

- Users can switch between light mode and dark mode.
- The app remembers the user's theme preference.
- The app can default to the user's system preference if no saved preference exists.
- All components must be designed and tested in both themes.
- Theme colors must be implemented as CSS custom properties, not hardcoded per component.

Light mode token direction:

| Token | Suggested Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#F6F8FB` | App background |
| `--color-surface` | `#FFFFFF` | Cards and panels |
| `--color-surface-raised` | `#FFFFFF` | Header/sidebar raised areas |
| `--color-border` | `#E5E7EB` | Card and section borders |
| `--color-text` | `#111827` | Primary text |
| `--color-muted` | `#6B7280` | Secondary text |
| `--color-primary` | `#2F80FF` | Active nav, buttons, selected dates |
| `--color-accent` | `#7C4DFF` | Banner and media accent |
| `--color-success` | `#18C8A0` | Positive progress/status |
| `--color-warning` | `#B7791F` | Warnings and pending states |
| `--color-danger` | `#DC2626` | Critical/error states |
| `--color-orange` | `#FF8A45` | Highlight KPI cards |

Dark mode token direction:

| Token | Suggested Value | Usage |
| --- | --- | --- |
| `--color-bg` | `#080B0D` | App background |
| `--color-surface` | `#101114` | Cards and panels |
| `--color-surface-raised` | `#15171C` | Header/sidebar raised areas |
| `--color-border` | `#252932` | Card and section borders |
| `--color-text` | `#F5F7FA` | Primary text |
| `--color-muted` | `#A7ADB8` | Secondary text |
| `--color-primary` | `#5A9BFF` | Active nav, buttons, selected dates |
| `--color-accent` | `#9B7CFF` | Banner and media accent |
| `--color-success` | `#18C8A0` | Positive progress/status |
| `--color-warning` | `#FFC52B` | Warnings and pending states |
| `--color-danger` | `#FF5068` | Critical/error states |
| `--color-orange` | `#FF9A5C` | Highlight KPI cards |

Avoid using one accent color as the only visual idea. Pair blue with teal, orange, yellow, violet, and neutral surfaces so the app does not feel one-note in either theme.

### Typography

- Use a clean sans-serif such as Inter, Manrope, or system UI.
- Base body size: `16px`.
- Dashboard card labels: `13px` to `14px`.
- Section headings: `18px` to `24px`.
- Page title: `28px` to `32px`.
- Use tabular numbers for dates, metrics, counts, and percentages.

### Shape And Spacing

- Cards: `8px` border radius.
- Buttons: `8px` border radius.
- Avatar circles: fixed size, usually `32px` to `44px`.
- Use a consistent `4px` or `8px` spacing scale.
- Keep dashboard cards compact, but preserve readable line height.

### Imagery And Accents

- Use a narrow abstract banner in the dashboard overview card.
- Event cards may use a small top media strip.
- Media should support the brand palette and not reduce text readability.
- Do not use decorative blobs or unrelated stock-style images.

## Component Requirements

### Sidebar

- Contains logo area, grouped navigation sections, product/system shortcuts, and account actions.
- Active nav item uses blue accent, left indicator, icon, and label.
- Nav items use familiar icons from a consistent icon set.
- Badges show counts such as unread forum posts or pending approvals.
- Account actions such as settings and sign out are separated from main navigation.

### Header

- Shows current page title.
- Includes notification control, message/task count, and user profile.
- User profile includes avatar, name, and role.
- Header actions remain keyboard accessible.

### Dashboard Banner

- Shows short overview text.
- Uses branded media or abstract background.
- Must maintain text contrast.
- Should not dominate the page height.

### Event Cards

- Include date, title, time, location, and attendee avatars.
- Use colored title accents by event category.
- Cards are clickable and have visible hover/focus states.
- Event metadata uses icons plus text.

### Calendar Widget

- Shows current month, previous/next controls, selected date, and event indicators.
- Dates must be keyboard reachable.
- Event indicators cannot rely only on color; selected/marked dates need accessible labels.

### Quick Links Widget

- Shows frequently used internal systems.
- Each row has icon, label, and action button.
- Links open only if the current user has access.

### Performance Widgets

- Use circular progress charts for compact KPIs.
- Include text labels and numeric values.
- Do not rely only on color to explain state.
- Provide an accessible text summary for chart values.

### People Lists

- Used for birthdays, joiners, farewells, team updates, and people directory previews.
- Each row includes avatar, name, role/department, and relevant date/action.
- Action buttons such as `Wish` should use icon plus text, not emoji-only presentation.

## Accessibility And Responsiveness

- Contrast target: WCAG AA minimum.
- All icon-only buttons require accessible labels.
- Focus states must be visible in light mode and dark mode.
- Touch targets should be at least `44px`.
- Text must wrap cleanly in cards and buttons at mobile widths.
- Reduce or disable motion for users who prefer reduced motion.
- All charts need text equivalents.

## Notification UI Behavior
Notifications appear in the bell icon.
Unread notifications display a badge count.

#### Notification Categories
* Announcement
* Approval
* Task
* Calendar
* Leave
* Birthday
* System
* Security
* Optional approved workflow modules

#### Each notification displays
* Icon
* Title
* Description
* Timestamp
* Read/Unread state

#### Behavior
* Clicking opens the related page.
* Mark as read individually or all at once.
* Notifications persist until dismissed or archived.
* High-priority notifications remain pinned.
* Critical alerts also display as banners on the dashboard.
Real-time updates should appear without requiring a page refresh.


## Implementation Notes For HTML/CSS/JavaScript

- Use CSS custom properties for color, spacing, radius, shadow, and typography tokens.
- Implement theme switching with a root attribute such as `data-theme="light"` and `data-theme="dark"`.
- Store the selected theme in `localStorage`.
- Respect `prefers-color-scheme` when no saved theme exists.
- Use reusable HTML patterns for cards, list rows, badges, avatars, buttons, and widget headers.
- Use JavaScript modules for calendar interaction, dashboard data rendering, search, notifications, modals, and chart drawing.
- Use `fetch` for API data and render loading, empty, error, and unauthorized states.
- Keep component CSS modular enough that each dashboard widget can be reused on other pages.
