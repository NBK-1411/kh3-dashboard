# 05 API Specification

## API Style

- REST-style JSON endpoints for app operations.
- Browser JavaScript calls endpoints with `fetch`; standard form posts may be used where progressive enhancement is useful.
- All endpoints require authentication unless explicitly marked public.
- All write endpoints validate request bodies on the backend.
- All list endpoints support pagination.

## Conventions

Base path: `/api`

Headers:

- `Content-Type: application/json`
- `Authorization: Bearer <token>` for API clients where applicable.
- Browser sessions may use secure cookies.

Standard pagination query:

- `page`: number, default `1`
- `pageSize`: number, default `25`, max `100`

Standard list response:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 25,
    "total": 0,
    "pageCount": 0
  }
}
```

Standard error response:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid.",
    "details": {}
  }
}
```

## Auth And Session

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/auth/session` | Get current user session, roles, scopes | authenticated |
| POST | `/api/auth/logout` | End current session | authenticated |

## Dashboard

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/dashboard` | Get personalized dashboard widgets | authenticated |

Example response:

```json
{
  "announcements": [],
  "tasks": [],
  "approvals": [],
  "quickLinks": [],
  "resources": [],
  "metrics": []
}
```

## Search

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/search?q=&types=&page=&pageSize=` | Search accessible people, resources, announcements, and requests | authenticated |

Search result item:

```json
{
  "id": "uuid",
  "type": "resource",
  "title": "Leave Policy",
  "summary": "Policy document",
  "url": "/resources/uuid",
  "matchedAt": "2026-06-30T10:00:00Z"
}
```

## Announcements

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/announcements` | List accessible announcements | `announcement.read` |
| POST | `/api/announcements` | Create announcement draft | `announcement.create` |
| GET | `/api/announcements/:id` | Get announcement detail | `announcement.read` plus audience access |
| PATCH | `/api/announcements/:id` | Update draft/scheduled announcement | `announcement.update` |
| POST | `/api/announcements/:id/publish` | Publish announcement | `announcement.publish` |
| POST | `/api/announcements/:id/archive` | Archive announcement | `announcement.archive` |
| POST | `/api/announcements/:id/acknowledge` | Acknowledge required announcement | authenticated audience member |

Create announcement request:

```json
{
  "title": "Quarterly town hall",
  "summary": "Join the company update meeting.",
  "body": "<p>Details...</p>",
  "priority": "important",
  "audience": {
    "type": "departments",
    "departmentIds": ["uuid"]
  },
  "requiresAcknowledgement": true,
  "publishedAt": "2026-07-01T09:00:00Z",
  "expiresAt": "2026-07-15T23:59:00Z"
}
```

## People

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/people` | List/search employees | authenticated |
| GET | `/api/people/:id` | View employee profile | authenticated |
| PATCH | `/api/me/profile` | Update current user's editable profile fields | authenticated |
| GET | `/api/departments` | List departments | authenticated |
| GET | `/api/locations` | List locations | authenticated |

## Resources

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/resources` | List accessible resources | `resource.read` |
| POST | `/api/resources` | Create resource metadata | `resource.create` |
| GET | `/api/resources/:id` | Get resource detail | `resource.read` plus audience access |
| PATCH | `/api/resources/:id` | Update resource | `resource.update` |
| POST | `/api/resources/:id/publish` | Publish resource | `resource.publish` |
| POST | `/api/resources/:id/archive` | Archive resource | `resource.archive` |
| POST | `/api/files/upload-url` | Create signed upload URL | authenticated with upload permission |
| GET | `/api/files/:id/download-url` | Create authorized download URL | file access |

## Request Types And Requests

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/request-types` | List active request types visible to user | `request.submit` |
| POST | `/api/request-types` | Create request type | `workflow.manage` |
| PATCH | `/api/request-types/:id` | Update request type | `workflow.manage` |
| POST | `/api/requests` | Submit request | `request.submit` |
| GET | `/api/requests` | List own/accessible requests | authenticated |
| GET | `/api/requests/:id` | Get request detail | participant or admin |
| POST | `/api/requests/:id/comments` | Add request comment | participant |
| POST | `/api/requests/:id/cancel` | Cancel own request if allowed | request owner |

Submit request body:

```json
{
  "requestTypeId": "uuid",
  "title": "Laptop replacement",
  "fieldValues": {
    "currentDevice": "MacBook Pro 2019",
    "reason": "Battery failure"
  },
  "attachmentFileIds": ["uuid"]
}
```

## Approvals

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/approvals` | List approval steps assigned to current user | `approval.act` |
| POST | `/api/approvals/:stepId/approve` | Approve step | assigned approver |
| POST | `/api/approvals/:stepId/reject` | Reject step | assigned approver |
| POST | `/api/approvals/:stepId/request-changes` | Request changes | assigned approver |
| POST | `/api/approvals/:stepId/delegate` | Delegate approval | assigned approver with delegation allowed |

Approval decision body:

```json
{
  "note": "Approved for replacement."
}
```

## Tasks

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/tasks` | List current user's tasks | authenticated |
| POST | `/api/tasks/:id/complete` | Complete permitted task | task assignee |

## Notifications

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/notifications` | List current user's notifications | authenticated |
| POST | `/api/notifications/:id/read` | Mark notification read | notification owner |
| POST | `/api/notifications/read-all` | Mark all notifications read | authenticated |

## Admin

| Method | Path | Description | Permission |
| --- | --- | --- | --- |
| GET | `/api/admin/users` | List users | `user.manage` |
| POST | `/api/admin/users` | Invite/create user | `user.manage` |
| PATCH | `/api/admin/users/:id` | Update user profile/admin fields | `user.manage` |
| POST | `/api/admin/users/:id/roles` | Assign role | `role.manage` |
| DELETE | `/api/admin/users/:id/roles/:roleId` | Remove role | `role.manage` |
| GET | `/api/admin/roles` | List roles | `role.manage` |
| POST | `/api/admin/roles` | Create role | `role.manage` |
| GET | `/api/admin/audit-logs` | List audit logs | `audit.read` |

## Webhooks And Integrations

Post-MVP integration endpoints:

- `POST /api/integrations/hris/sync`
- `POST /api/integrations/chat/events`
- `POST /api/webhooks/:provider`

Webhook requirements:

- Verify provider signatures.
- Reject replayed events.
- Log webhook receipt and processing result.
- Process long-running work asynchronously.


### 1. Filtering Conventions
List endpoints accept filter parameters as query string keys. General rules:

* Exact match filters use the field name directly: ?status=published.
* Multiple values for the same field are comma-separated and treated as OR: ?status=published,scheduled.
* Range filters use From/To suffixes: ?createdAtFrom=2026-01-01&createdAtTo=2026-06-30.
* Boolean filters accept true/false: ?requiresAcknowledgement=true.
* Free-text search within a list endpoint (distinct from the global /api/search) uses ?q=.
* Unknown filter keys are ignored, not rejected, to keep the API forward-compatible with older clients.
* Filters combine with AND across different fields; OR only applies within a comma-separated single field's values.

### Per-resource filter fields
|Endpoint|	Supported filters |
|---|---|
|GET /api/announcements	|status, priority, authorId, departmentId, publishedAtFrom, publishedAtTo, requiresAcknowledgement, q|
|GET /api/resources|	status, categoryId, tags, ownerId, q|
|GET /api/people|	departmentId, locationId, managerId, status, q|
|GET /api/requests|	requestTypeId, status, priority, submittedById, dueAtFrom, dueAtTo, q|
|GET /api/approvals|	status, requestTypeId, priority|
|GET /api/tasks	|status, priority, dueAtFrom, dueAtTo, sourceType|
|GET /api/notifications|	read (boolean, maps to read_at IS NULL/IS NOT NULL), type|
|GET /api/admin/audit-logs|	actorId, action, entityType, entityId, createdAtFrom, createdAtTo|

### 2. Sorting Conventions
* Sorting is specified with ?sort=field for ascending and ?sort=-field for descending.
* Multiple sort keys are comma-separated and applied in order: ?sort=-priority,createdAt.
* Each endpoint defines an allow-list of sortable fields; requesting a non-sortable field returns a 400 VALIDATION_ERROR.
* Default sort is documented per endpoint below; if sort is omitted, the default applies.

### Per-resource sortable fields and defaults
| Endpoint |	Sortable fields |	Default |
|---|---|---|
|GET /api/announcements|	publishedAt, priority, createdAt, expiresAt|	-publishedAt|
|GET /api/resources	|title, updatedAt, reviewAt| -updatedAt|
|GET /api/people|	lastName, firstName, jobTitle, createdAt |	lastName|
|GET /api/requests	createdAt, dueAt, priority, status|	-createdAt|
|GET /api/approvals	|decidedAt, stepOrder	|stepOrder|
|GET /api/tasks	|dueAt, priority, createdAt	|dueAt|
|GET /api/notifications |createdAt	|-createdAt|
|GET /api/admin/audit-logs|	createdAt	|-createdAt|

### 3. Rate Limits

* Rate limits are applied per authenticated user (and per IP for unauthenticated/public endpoints), using a sliding window.
* Default limit: 300 requests per minute per user across all endpoints.
* Stricter limits apply to specific sensitive or expensive operations:

| Endpoint group |	Limit|
|---|---|
| POST /api/auth/*	| 10 requests / minute / IP |
|POST /api/files/upload-url	| 30 requests / minute / user|
|GET /api/search	| 60 requests / minute / user |
|POST /api/admin/* (writes) |	60 requests / minute / user |
|POST /api/webhooks/:provider	| 600 requests / minute / provider, IP-allowlisted|
|All other authenticated endpoints	| 300 requests / minute / user|
	
 Rate limit status is communicated via response headers on every request:
 
X-RateLimit-Limit: 300

X-RateLimit-Remaining: 287

X-RateLimit-Reset: 1751280000

* Exceeding the limit returns 429 Too Many Requests with a standard error body (code: RATE_LIMITED) and a Retry-After header (seconds).
* Webhook endpoints additionally enforce per-provider replay protection (event ID deduplication) independent of the rate limit.

### 4. Error Code Catalog
All errors use the standard error envelope from 05-api.md. The table below lists the full set of error.code values, their associated HTTP status, and when they occur.

| Code |	HTTP status	| Meaning |
|---|---|---|
|VALIDATION_ERROR	| 400	| Request body or query parameters failed validation; details contains field-level messages |
| INVALID_SORT_FIELD |	400 |	sort parameter references a field not in the endpoint's allow-list
|INVALID_FILTER	| 400 |	A filter value couldn't be parsed (e.g. malformed date) |
| UNAUTHENTICATED |	401 |	No valid session or bearer token present |
| TOKEN_EXPIRED	| 401	|Bearer token or session has expired |
|FORBIDDEN	| 403	| Authenticated, but lacks the required permission for this action |
|AUDIENCE_RESTRICTED|	403 |	User has read permission generally, but this specific record's audience excludes them|
|NOT_FOUND	| 404 |	Resource does not exist, or exists but the user has no visibility (404 used instead of 403 to avoid leaking existence)|
| CONFLICT	| 409	| Action conflicts with current state (e.g. publishing an already-published announcement) |
| INVALID_STATE_TRANSITION |	409	 |Requested status change isn't allowed from the entity's current status|
|STALE_UPDATE|	409|	Optimistic concurrency check failed; the record was modified since the client last fetched it|
|DUPLICATE_RESOURCE|	409 |	Unique constraint violation surfaced as a domain error (e.g. duplicate department slug)|
|PAYLOAD_TOO_LARGE|	413	|Request body or file exceeds size limit|
|UNSUPPORTED_MEDIA_TYPE|	415|	File upload MIME type not allowed|
|RATE_LIMITED	|429	|Rate limit exceeded; see Retry-After header|
|INTERNAL_ERROR|	500|	Unexpected server error; safe generic message returned, details logged server-side only|
|SERVICE UNAVAILABLE|	503|	Dependent service (e.g. file storage, workflow engine) temporarily unavailable|