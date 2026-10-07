# ResourceFlow Management System

Enterprise-style resource planning and project allocation application demonstrating REST API design, TypeScript service architecture, relational data modeling, approval workflows, and auditable business rules.

## Problem
Organizations need a controlled way to allocate people to projects without exceeding capacity, route allocation requests for approval, and expose reliable utilization data to managers.

## Architecture
- **API:** Node.js + Express + TypeScript
- **Data layer:** Oracle-compatible SQL schema and repository abstraction
- **Frontend architecture:** Angular-style TypeScript services/components
- **Workflow:** DRAFT → SUBMITTED → APPROVED/REJECTED allocation requests
- **Validation:** capacity, date range, role, and allocation constraints
- **Quality:** unit tests, lint/type checks, GitHub Actions

## Repository layout
```
database/schema.sql
api/src/
frontend/src/app/
docs/
tests/
.github/workflows/
```

## API
- `GET /api/projects`
- `GET /api/employees/:id/capacity`
- `POST /api/allocations`
- `POST /api/allocations/:id/submit`
- `POST /api/allocations/:id/approve`
- `GET /api/dashboard/utilization`

## Key engineering behavior
ResourceFlow prevents an employee's approved allocations from exceeding 100% over an overlapping date range. Approval is a server-side business operation, not merely a frontend state change. Workflow events are retained for auditability.

## Quick start
```bash
npm install
npm run build
npm test
npm run dev
```

The included repository uses an in-memory implementation for a runnable demo while `database/schema.sql` documents the Oracle-compatible persistence model intended for production integration.

## Skills demonstrated
TypeScript • JavaScript • REST APIs • Angular architecture • HTML/CSS • Oracle-compatible SQL • application architecture • validation • workflow design • automated testing • Git/version control • CI
