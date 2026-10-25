# PREform NCLEX - Part I

PREform NCLEX is a new monorepo for an NCLEX-RN and NCLEX-PN learning platform. It is being built in phases; the current scaffold is infrastructure, not a live study or subscription product.

## Stack

- Web: Next.js App Router, React, TypeScript and Tailwind CSS.
- API: NestJS with the Fastify adapter, request validation, CORS and security headers.
- Data: PostgreSQL and Prisma migrations.
- Workspace: npm workspaces.
- Tests and checks: Vitest, ESLint, Oxlint and TypeScript.

Redis, payment processing, AI providers and formal CAT remain intentionally out of the foundation. Add them only when their product workflows and required external configuration are ready.

## Requirements

- Node.js 24 or newer and npm 10 or newer.
- Docker Compose for the local PostgreSQL service, or an existing PostgreSQL 16 database.

## Local development

1. Copy `.env.example` to `.env`. The sample password is for local development only.
2. Install dependencies from the repository root:

   ```powershell
   npm install
   ```

3. Start PostgreSQL with `docker compose up -d postgres`.
4. Generate the Prisma client and apply local migrations:

   ```powershell
   npm run db:generate
   npm run db:migrate
   ```

5. In separate terminals, start the API and web app:

   ```powershell
   npm run dev:api
   npm run dev
   ```

The web app runs at `http://localhost:3000`. The API runs at `http://localhost:4000`; its liveness endpoint is `/api/v1/health/live` and its database readiness endpoint is `/api/v1/health/ready`.

For a deployed environment, set secrets through the hosting platform, validate the database URL and apply reviewed migrations with `npm run db:deploy`. Do not use the local example password in shared or production environments.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run test
npm run test:e2e
npm run build
```

The readiness endpoint returns `503 Service Unavailable` when PostgreSQL cannot be reached. Liveness does not depend on the database.

## Current scope

The current UI is an informational product shell. User accounts, question delivery and scoring, readiness assessments, CAT, analytics, AI Study Studio, flashcards, plans and payments are not implemented or available. Do not describe this scaffold as a validated NCLEX predictor, live question bank or operational payment service.

See [docs/implementation-status.md](./docs/implementation-status.md) for the phase checklist and [docs/decisions.md](./docs/decisions.md) for initial architecture decisions.
