# 08 Security Architecture

## Purpose

This document defines the security standards, controls, and best practices for the Intranet Portal. It establishes how the system protects employee data, business information, and integrated enterprise services while ensuring compliance with organizational security policies.

---

# Security Principles

The application follows the principle of **Defense in Depth**, implementing multiple layers of security so that the failure of one control does not compromise the entire system.

Core principles include:

* Least Privilege
* Zero Trust
* Secure by Default
* Fail Securely
* Complete Auditability
* Data Confidentiality
* Data Integrity
* High Availability

---

# HTTPS

## Requirements

* All traffic must use HTTPS.
* HTTP requests must automatically redirect to HTTPS.
* TLS 1.3 is preferred (TLS 1.2 minimum).
* Weak ciphers and protocols must be disabled.
* HSTS (HTTP Strict Transport Security) enabled.
* Secure cookies only.

## Cookie Configuration

| Setting    | Value                                                 |
| ---------- | ----------------------------------------------------- |
| Secure     | Enabled                                               |
| HttpOnly   | Enabled                                               |
| SameSite   | Lax (Strict for sensitive admin flows where feasible) |
| Expiration | Configurable                                          |

---

# Authentication Security

## Session Management

* Secure server-side sessions or signed JWTs (depending on deployment model).
* Sessions expire after inactivity (e.g., 30 minutes).
* Automatic logout after maximum session lifetime.
* Session ID regenerated after login.
* Logout invalidates the active session immediately.

## Account Lockout

After repeated failed login attempts:

* Lock account for a configurable period (e.g., 15 minutes).
* Notify the user of suspicious login attempts.
* Log the event for security monitoring.

---

# Multi-Factor Authentication (MFA)

## Supported Methods

* Authenticator App (TOTP)
* Security Key (WebAuthn/FIDO2) (future enhancement)
* Email verification (fallback, if approved by policy)

SMS-based MFA is discouraged unless required by organizational policy.

## MFA Policy

Mandatory for:

* System Administrators
* Department Administrators
* HR users
* Users handling sensitive financial or employee data
* Any account with elevated privileges

Optional for standard employees.

## Recovery

* Recovery codes generated during enrollment.
* Administrators cannot view MFA secrets.
* MFA reset requires identity verification.

---

# Password Policy

If local authentication is enabled (SSO environments may defer to the identity provider):

## Requirements

Minimum length:

12 characters

Must contain:

* Uppercase letter
* Lowercase letter
* Number
* Special character

Must not:

* Match previous passwords
* Contain the username
* Contain common dictionary words

## Expiration

* No forced expiration unless required by organizational policy.
* Users must change passwords immediately if compromise is suspected.

## Storage

Passwords are never stored in plaintext.

Use:

* Argon2id (preferred)
* bcrypt (acceptable fallback)

---

# Cross-Site Request Forgery (CSRF)

All state-changing requests require CSRF protection.

## Controls

* CSRF token on every form.
* Token validation server-side.
* SameSite cookies.
* Origin and Referer validation where appropriate.

Protected endpoints include:

* Login
* Profile updates
* Admin actions
* File uploads
* Request approvals
* Optional approved workflow submissions

---

# Cross-Site Scripting (XSS)

## Protection Measures

* Output encoding.
* HTML escaping by default.
* Content Security Policy (CSP).
* Trusted HTML sanitizer for rich text.
* No inline JavaScript where possible.
* Secure handling of Markdown and rich-text editors.

## Content Security Policy

Example directives:

* `default-src 'self'`
* `script-src 'self'`
* `style-src 'self'`
* `img-src 'self' data: https:`
* `frame-ancestors 'none'`

---

# SQL Injection Protection

## Rules

* Parameterized queries only.
* Prepared statements for all database operations.
* No string concatenation in SQL.
* ORM/query builder configured to use prepared statements.
* Database accounts operate with least privilege.

---

# Input Validation

Validation occurs on both the client and server.

## General Rules

* Validate all input.
* Reject unexpected fields.
* Normalize whitespace.
* Enforce length limits.
* Validate data types.
* Validate file types.
* Reject malformed requests.

## Examples

Email

* RFC-compliant format.

Phone

* Numeric format with configurable country support.

Dates

* ISO 8601.

Files

Allowed:

* PDF
* DOCX
* XLSX
* PNG
* JPG

Maximum upload size should be configurable by administrators.

---

# File Upload Security

Every uploaded file must undergo:

* File extension validation.
* MIME type validation.
* Virus scanning.
* Size validation.
* Filename sanitization.

Files are stored outside the web root in object storage.

Downloads require authorization checks.

---

# Encryption

## Data in Transit

* HTTPS only.
* TLS encryption.

## Data at Rest

Encrypt:

* Database backups.
* Object storage.
* Secrets.
* Configuration backups.

Sensitive fields (where applicable) should use application-level encryption, such as:

* Personal identifiers
* API tokens
* Integration credentials

---

# Secrets Management

Secrets include:

* Database passwords
* SMTP credentials
* OAuth client secrets
* API keys
* Encryption keys
* Object storage credentials

## Storage

Development

* `.env`

Production

* Docker Secrets
* HashiCorp Vault
* Kubernetes Secrets (if applicable)

Secrets must never be:

* Stored in Git.
* Logged.
* Exposed to browsers.
* Embedded in frontend code.

Secrets should be rotated regularly according to organizational policy.

---

# Authorization

Role-Based Access Control (RBAC)

Roles may include:

* Employee
* Manager
* Department Administrator
* HR
* IT Administrator
* System Administrator
* Auditor

Every request undergoes:

1. Authentication
2. Permission check
3. Department scope validation (where applicable)

---

# Audit Logging

Every security-sensitive action must generate an immutable audit record.

## Events

* Login
* Logout
* Failed login
* Password change
* MFA enrollment/reset
* Permission changes
* Role changes
* User creation/deletion
* Content publication
* Request or approval modification
* File upload/deletion
* System configuration changes

## Audit Record

Each entry includes:

* Timestamp
* User ID
* Role
* Department
* IP address
* User agent
* Action performed
* Resource affected
* Success or failure
* Correlation/request ID

Audit logs are append-only and accessible only to authorized administrators and auditors.

---

# Rate Limiting

Rate limiting protects against abuse and denial-of-service attacks.

## Recommended Limits

Login

* 5 attempts per minute per IP/account.

API

* 100 requests per minute per user.

Search

* 30 requests per minute.

File Upload

* 10 uploads per minute.

Password Reset

* 3 requests per hour.

Administrative Actions

* Configurable limits based on operation.

Exceeding limits returns HTTP 429 (Too Many Requests) with retry information.

---

# Security Headers

The application should include:

* Strict-Transport-Security
* Content-Security-Policy
* X-Content-Type-Options
* X-Frame-Options
* Referrer-Policy
* Permissions-Policy

---

# Dependency Security

* Automated dependency scanning in CI/CD.
* Regular updates for frameworks and libraries.
* Vulnerability alerts monitored.
* High and critical vulnerabilities remediated before production deployment.

---

# Security Monitoring

Monitor for:

* Repeated failed logins.
* Brute-force attempts.
* Suspicious geographic logins (where applicable).
* Privilege escalation attempts.
* Unexpected permission changes.
* Large file downloads.
* Unusual API usage.
* SQL errors.
* XSS or CSRF violations.

Critical events should trigger alerts to the IT team.

---

# Incident Response

In the event of a security incident:

1. Detect and classify the incident.
2. Contain affected systems.
3. Preserve logs and evidence.
4. Notify stakeholders.
5. Eradicate the root cause.
6. Recover services.
7. Conduct a post-incident review.
8. Implement corrective actions.

---

# Security Testing

Security testing must be integrated into the development lifecycle.

## Automated

* Static Application Security Testing (SAST)
* Dependency scanning
* Secret scanning
* Container image scanning

## Manual

* Penetration testing before major releases.
* Authorization testing.
* Input validation testing.
* File upload testing.
* Session management testing.
* Business logic testing.

---

# Security Checklist

Before each production release, verify that:

* HTTPS is enforced.
* MFA is enabled for privileged users.
* Password policy is compliant.
* CSRF protection is active.
* XSS protections are verified.
* SQL injection protections are in place.
* Input validation passes security review.
* Secrets are stored securely.
* Audit logging is operational.
* Rate limiting is configured.
* Security headers are enabled.
* Dependencies have no unresolved critical vulnerabilities.
* Backups are successful.
* Monitoring and alerting are functioning correctly.
