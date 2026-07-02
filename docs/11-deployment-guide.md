# 11 Deployment Guide

## Purpose

This document defines the deployment strategy, environments, release process, infrastructure requirements, monitoring integration, health checks, rollback procedures, and deployment standards for the Intranet Portal.

The deployment process is designed to ensure:

* Repeatable deployments
* Minimal downtime
* Safe rollbacks
* Automated validation
* Secure production releases
* High availability

---

# Deployment Architecture

```text id="5x7mjp"
Developer

↓

GitHub Repository

↓

GitHub Actions

↓

Build

↓

Test

↓

Docker Image

↓

Container Registry

↓

Deployment

↓

Staging

↓

Production
```

---

# Environment Overview

## Development

Purpose

Local development.

Infrastructure

* Local machine
* Docker Compose
* PostgreSQL
* Redis
* Object Storage (MinIO)
* Mail testing service

Characteristics

* Debug logging enabled
* Mock integrations allowed
* Hot reload enabled
* Sample data installed

Deployment

Developer executes

```bash
docker compose up -d
```

---

## Staging

Purpose

Pre-production validation.

Infrastructure

Production-like environment.

Characteristics

* Production configuration
* Test identity provider
* Test email service
* Test object storage
* Monitoring enabled

Deployment Trigger

Merge into the `develop` branch.

Validation

* Smoke tests
* Integration tests
* User Acceptance Testing (UAT)

---

## Production

Purpose

Live employee access.

Characteristics

* HTTPS only
* Production authentication
* Monitoring enabled
* Backups enabled
* Audit logging enabled
* High availability

Deployment Trigger

Approved release from the `main` branch.

---

# Release Workflow

```text id="8qpjho"
Developer

↓

Feature Branch

↓

Pull Request

↓

Code Review

↓

Merge

↓

CI Pipeline

↓

Docker Build

↓

Automated Tests

↓

Deploy Staging

↓

UAT Approval

↓

Production Deployment
```

---

# Docker Compose

Docker Compose is recommended for:

* Local development
* Testing
* Small production deployments

## Services

Frontend

Backend API

PostgreSQL

Redis

MinIO

Caddy

Worker

Grafana

Prometheus

Loki

---

## Service Dependencies

```text id="8ws2bo"
Frontend

↓

Backend

↓

Redis

↓

PostgreSQL

↓

MinIO
```

Background workers consume jobs from Redis.

Caddy exposes HTTPS.

---

## Volumes

Persistent storage

* PostgreSQL
* MinIO
* Logs
* Monitoring data

Containers remain stateless.

---

## Networks

Frontend Network

Internal Network

Database Network

Only Caddy exposes ports externally.

---

# Kubernetes (Optional)

Recommended when:

* Multiple servers exist.
* High availability is required.
* Automatic scaling is needed.

---

## Kubernetes Resources

Deployment

Service

Ingress

ConfigMap

Secret

Persistent Volume

Persistent Volume Claim

Horizontal Pod Autoscaler

Network Policy

---

## Namespace Layout

```text id="tbj5c4"
production

staging

monitoring
```

---

## Replica Counts

Frontend

2+

Backend

2+

Worker

2+

Database

Primary + Replica

Redis

Cluster (optional)

---

## Ingress

Caddy or NGINX Ingress Controller

Responsibilities

* HTTPS termination
* Routing
* Compression
* Security headers

---

# Database Deployment

Deployment order

1. Backup database.
2. Run migrations.
3. Validate schema.
4. Deploy application.
5. Verify connectivity.

Migrations must be backward compatible whenever possible.

---

# Static Assets

Assets include

* CSS
* JavaScript
* Images
* Fonts

Deployment

Uploaded with each release.

Browser cache controlled using hashed filenames.

---

# Secrets Management

Development

`.env`

Production

Docker Secrets

HashiCorp Vault

or Kubernetes Secrets

Secrets include

* Database credentials
* SMTP credentials
* OAuth secrets
* JWT keys
* Object storage credentials

Secrets are never stored in Git.

---

# Configuration Management

Configuration values are environment-specific.

Examples

Development

```text id="z20w2k"
APP_ENV=development
DEBUG=true
```

Staging

```text id="b2em7t"
APP_ENV=staging
DEBUG=false
```

Production

```text id="vpgcva"
APP_ENV=production
DEBUG=false
```

---

# Deployment Strategy

Preferred

Rolling Deployment

Benefits

* Zero downtime
* Continuous availability
* Easy rollback

Deployment sequence

```text id="3yk9qm"
Old Container

↓

New Container

↓

Health Check

↓

Traffic Switch

↓

Remove Old Container
```

---

# Blue-Green Deployment (Future)

For major releases

```text id="r4rkhi"
Blue Environment

↓

Green Environment

↓

Health Validation

↓

Traffic Switch
```

Provides nearly zero downtime.

---

# Rollback Strategy

Rollback is required when

* Health checks fail.
* Smoke tests fail.
* Critical defects detected.
* Database migration fails.
* Performance degrades significantly.

---

## Application Rollback

1. Stop deployment.
2. Deploy previous container image.
3. Verify application health.
4. Notify stakeholders.
5. Investigate root cause.

---

## Database Rollback

Only performed when necessary.

Steps

1. Stop application.
2. Restore backup.
3. Validate data.
4. Restart services.
5. Verify integrity.

---

## Rollback Objectives

Rollback should complete within:

15 minutes

---

# Monitoring During Deployment

Observe

* CPU
* Memory
* API latency
* Error rate
* Container restarts
* Database connections
* Queue backlog

Deployment automatically pauses if monitoring detects critical failures.

---

# Health Checks

## Application

Endpoint

```text id="mwdg2e"
/health
```

Returns

* Application status
* Build version
* Database connectivity
* Redis connectivity
* Queue status

---

## Readiness Check

Endpoint

```text id="ibnbl9"
/ready
```

Verifies

* Database
* Redis
* Object Storage
* Authentication provider

Traffic is only routed after readiness succeeds.

---

## Liveness Check

Endpoint

```text id="65l6f9"
/live
```

Verifies

Application process is responsive.

Failed liveness checks restart the container automatically.

---

# Smoke Testing

Executed immediately after deployment.

Verify

* Login
* Dashboard
* Search
* Calendar
* Notifications
* Requests and approvals
* Reports
* User management
* API connectivity

Deployment succeeds only if all smoke tests pass.

---

# Monitoring Integration

Integrated systems

* Prometheus
* Grafana
* Loki
* OpenTelemetry
* Sentry

Deployment automatically registers the new application version.

---

# Versioning

Semantic Versioning

Format

```text id="d0zw5o"
MAJOR.MINOR.PATCH

Example

1.4.2
```

Every deployment includes

* Version number
* Git commit
* Build timestamp
* Release notes

---

# Deployment Checklist

Before deployment

* Code review approved
* Unit tests pass
* Integration tests pass
* E2E tests pass
* Security scan passes
* Database backup completed
* Release notes prepared
* Monitoring configured

After deployment

* Health checks pass
* Smoke tests pass
* Monitoring active
* No critical errors
* User login verified
* Dashboard loads successfully
* External integrations verified
* Deployment recorded in the change log

---

# Release Approval

Production deployments require approval from:

* Project Owner
* Technical Lead
* IT Operations

Emergency releases may bypass standard scheduling but must undergo a post-deployment review.

---

# Post-Deployment Validation

Monitor for at least 30 minutes after each production deployment.

Verify

* Error rates remain within normal thresholds.
* API response times are stable.
* No abnormal container restarts.
* Background jobs are processing correctly.
* Database performance is healthy.
* Users can successfully authenticate.
* Critical business workflows such as announcements, requests, approvals, resources, and approved quick links are functioning normally.

---

# Disaster Recovery During Deployment

If a deployment causes a critical outage:

1. Halt the deployment pipeline.
2. Execute the rollback procedure.
3. Restore the previous application version.
4. Restore the database if migrations caused corruption.
5. Confirm service health.
6. Notify stakeholders.
7. Conduct a post-incident review and document corrective actions before attempting another deployment.
