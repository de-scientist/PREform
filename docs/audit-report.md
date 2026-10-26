# Phase 0 — Repository audit and product baseline

## 1. Current architecture

PREform NCLEX is an npm-workspaces monorepo (`npm@11.19.0`, Node.js >= 24).

| Layer | Technology | Location |
|---|---|---|
| Frontend | Next.js 16.4.3 App Router, React 19.3.0, Tailwind CSS v4, TypeScript | `apps/web` |
| Backend API | NestJS 12 with the Fastify platform adapter, TypeScript | `apps/api` |
| Database / ORM | PostgreSQL 16 (via Docker Compose), Prisma 7.10.1 client + migrations | `prisma/`, `apps/api/src/prisma/` |
| Validation | Zod (API env + shared), NestJS `ValidationPipe` (class-validator/class-transformer), `class-validator` | `apps/api/src/config/env.ts`, `main.ts` |
| API error handling | Global `ApiExceptionFilter` with consistent JSON error shape | `apps/api/src/common/api-exception.filter.ts` |
| Security headers / CORS / rate limit | `@fastify/helmet`, CORS allowlist from `WEB_ORIGIN`, `@fastify/rate-limit` (100 req/min) | `apps/api/src/main.ts` |
| Tests | Vitest (unit + e2e), Supertest for e2e HTTP; Playwright is NOT present | `apps/api/vitest.config.ts`, `vitest.config.e2e.ts` |
| Lint | ESLint (web), oxlint (api) | `apps/web/eslint.config.mjs`, `apps/api/.oxlintrc.json` |
| CI | GitHub Actions: install, lint, typecheck, test, test:e2e, build | `.github/workflows/ci.yml` |
| Local DB | `compose.yaml` (postgres:16-alpine) | repo root |

Runtime contract: API listens on `PORT` (default 4000) under global prefix `api/v1`. Web app on port 3000 (`WEB_ORIGIN`). Health endpoints: `GET /api/v1/health/live` and `GET /api/v1/health/ready`.

## 2. Stack mapping against the agreed default stack (Section 3.4)

| Agreed technology | Actual in repository | Status / notes |
|---|---|---|
| Frontend: Next.js App Router + React + TypeScript + Tailwind + shadcn/ui | Next.js 16, React 19, Tailwind v4, TypeScript strict | Present. No shadcn/ui component library; custom CSS-only design system in `globals.css`. |
| Client data fetching: TanStack Query / Next.js server components | None | Not present. Next.js App Router server components used for public pages. |
| Forms: React Hook Form + Zod | None | Not present. |
| Backend: .NET LTS / C# ASP.NET Core Web API | **NestJS 12 + Fastify, TypeScript** | **Deviation.** The repository's working backend is NestJS/TypeScript, not ASP.NET Core/C#. Per stack rule #1 (not a rewrite instruction) and rule #3 (reuse working modules), the NestJS backend is preserved. This deviation is documented here rather than silently changing architecture. |
| Database: PostgreSQL + EF Core + Npgsql | PostgreSQL + Prisma 7 (Npgsql driver adapter via `@prisma/adapter-pg`) | Database matches; ORM differs (Prisma, not EF Core). Preserved — no second ORM introduced. |
| Auth: ASP.NET Core Identity / sessions | None | No authentication system exists yet. |
| Background work: .NET hosted services / durable queue | None | No background jobs or queue. Redis/BullMQ intentionally absent (decisions.md #3). |
| Testing: xUnit (.NET) + Playwright | Vitest + Supertest; no Playwright | Present test tooling differs (Vitest, not xUnit). No browser E2E tooling installed. |
| API docs: OpenAPI/Swagger | None | Not present. |
| Hosting targets: Vercel (web), Render/Railway (API), managed PostgreSQL | None configured | No deployment config beyond local Compose and CI. |

**Architecture decision recorded:** Keep the NestJS/TypeScript + Prisma backend. Do not perform a wholesale rewrite to ASP.NET Core/EF Core. The backend remains TypeScript-based; API contracts are versioned under `api/v1` and can be documented with OpenAPI in a later phase.

## 3. Features already implemented (verification status)

| Feature | Evidence | Verification |
|---|---|---|
| Public landing page | `apps/web/src/app/page.tsx` | Built & renders; honest "foundation phase" status copy. |
| RN / PN programme pages | `apps/web/src/app/programmes/[programme]/page.tsx` | Static generated routes `/programmes/rn`, `/programmes/pn`; state clearly "not open for enrollment". |
| Design tokens / custom CSS design system | `apps/web/src/app/globals.css` | WCAG-leaning: skip link, focus-visible, reduced-motion media query, responsive breakpoints. |
| API foundation | `apps/api/src/main.ts`, `app.module.ts` | Global prefix, validation pipe, exception filter, CORS, helmet, rate limit, shutdown hooks. |
| Health checks (live + ready) | `apps/api/src/health/health.controller.ts` | Ready probes PostgreSQL via `SELECT 1`; returns 503 when unreachable. |
| Environment validation | `apps/api/src/config/env.ts` | Zod schema validated at startup; no secrets logged. |
| Prisma schema + initial migration | `prisma/schema.prisma`, `prisma/migrations/20261024144800_foundation/` | `prisma validate` passes. Seed: RN and PN programmes. |
| Unit + e2e tests | `apps/api/src/health/health.controller.spec.ts`, `test/app.e2e-spec.ts` | 3 unit + 3 e2e tests pass with local `.env`. |
| CI workflow | `.github/workflows/ci.yml` | Lint, typecheck, test, test:e2e, build. |
| Local dev docs | `README.md`, `docs/decisions.md`, `docs/implementation-status.md` | Documented setup, stack decisions, and honest scope limits. |

Baseline check results (run with a locally created `.env` copied from `.env.example`; PostgreSQL not running locally so `ready` returns 503 as expected):
- `npm run lint` — passed (api + web)
- `npm run typecheck` — passed (api + web)
- `npm run test` — passed, 3 unit tests
- `npm run test:e2e` — passed, 3 API health tests (mocked Prisma)
- `npm run build` — passed (api + web)
- `npx prisma validate` — passed

## 4. Features partially implemented

None of the product features in the full scope are implemented. The public shell (landing, RN/PN pages, design system) is complete as an informational foundation but explicitly states accounts, question banks, assessments, subscriptions, and AI tools are not available.

## 5. Missing features

Everything in the product scope beyond the public shell:

**Authentication & accounts (Phase 4):** registration, sign-in, sessions, logout, password recovery, email verification, roles, protected routes, account settings. None exist.

**RBAC & administration (Phase 6, L):** no users, roles, permissions, admin dashboard, content management, audit logs, or super-admin concept.

**Question bank & practice (Phase 5):** no `Question`, `QuestionVersion`, `AnswerOption`, `Rationale`, `PracticeSession`, `AttemptResponse` models; no question delivery, scoring, rationales, flags/bookmarks, NGN formats.

**Readiness assessments & CAT (Phase 7):** no assessment blueprints, attempts, scoring, readiness rules. CAT explicitly deferred (decisions.md #6) pending calibrated item data and a validated model.

**Analytics & recommendations (Phase 8):** no performance data model or recommendation rules.

**AI Study Studio (Phase 9–11):** no AI provider abstraction, summaries, flashcards, spaced-repetition scheduler, quizzes, or tutor. No API keys configured.

**Document learning (Phase 12):** no upload, storage, extraction, or processing.

**Subscriptions & entitlements (Phase 13):** no `SubscriptionPlan`, `Entitlement`, `UserSubscription`, payment provider, webhooks, or server-enforced entitlements. No pricing cards.

**Public carousel & pricing UI (Phase 3):** no carousel component, no dynamic plan configuration.

**Notifications & study planning (Phase P):** none.

**OpenAPI docs, Playwright E2E, TanStack Query, React Hook Form:** not present.

## 6. Critical defects and security concerns

1. **Tests require `DATABASE_URL` but no `.env` is committed.** `apps/api/src/config/env.ts` throws at import time when `DATABASE_URL` is missing, so `npm run test` and `npm run test:e2e` fail in a clean checkout until the developer copies `.env.example` to `.env`. CI sets `DATABASE_URL` directly. This is a setup-friction issue, not a code defect; the README documents the copy step.
2. **No authentication or authorization exists.** All future protected routes must be built from scratch; there is no identity system to reuse.
3. **No OpenAPI/Swagger documentation** for the versioned API.
4. **No Playwright/browser E2E tooling.** The agreed stack lists Playwright for critical journeys; none is installed.
5. **No shadcn/ui or form library.** The design system is custom CSS; adding shadcn/ui + React Hook Form + Zod forms is part of Phase 2.
6. **Local PostgreSQL is unavailable in this environment** (no Docker/PostgreSQL CLI), so the initial Prisma migration could not be applied against a live database. This is an environment limitation, recorded as a blocker; schema is valid and migrations are additive.
7. **README/implementation-status.md claim tests pass unconditionally.** They pass only with `DATABASE_URL` present. This report records the actual conditional result.

No secrets, tokens, or private keys were found in tracked files (secret-pattern scan clean). `.env` is gitignored; `.env.example` contains only a local-dev placeholder password.

## 7. Existing functionality that must be preserved

- `apps/web` public pages, layout, metadata, skip links, focus styles, reduced-motion support, responsive pathways.
- `apps/api` NestJS/Fastify app: global prefix `api/v1`, validation pipe, exception filter, CORS, helmet, rate limit, health controllers, Prisma service with `@prisma/adapter-pg`.
- `prisma/schema.prisma` `Programme` model + RN/PN seed migration (additive only; do not alter the seed data or enum values without a migration plan).
- CI workflow and all npm scripts (`lint`, `typecheck`, `test`, `test:e2e`, `build`, `db:generate`, `db:migrate`, `db:deploy`).
- Honest public copy stating the platform is in a foundation phase with no live question bank, assessments, subscriptions, or AI.

## 8. Recommended implementation order

Follow the mandated phases 1–15 in order. Immediate dependencies:

1. **Phase 1 Foundation:** local `.env` setup, apply migration against PostgreSQL (blocked locally — see blockers), verify quality gates.
2. **Phase 2 Design system & shell:** shadcn/ui primitives (or extend the existing coherent CSS system consistently), shared layouts, navigation, authentication-aware shell.
3. **Phase 3 Public pages & pricing:** carousel, dynamic pricing from config source.
4. **Phase 4 Auth & onboarding:** identity, sessions, roles, protected routes (the trust boundary between Next.js and NestJS must be defined: cookies/CSRF/CORS/token lifecycle).
5. **Phase 5 Question bank & practice:** question versioning, scoring, rationales.
6. **Phase 6 Admin content management:** RBAC, question editor, publication workflow, audit logs.
7. **Phase 7 Readiness assessments; CAT only with validated data.**
8. **Phase 8 Analytics.**
9. **Phases 9–12 AI Study Studio, flashcards/spaced repetition, tutor, document learning** (AI and document ingestion deferred until credentials/validated data available).
10. **Phase 13 Subscription administration & entitlement enforcement** (payment provider decision required first).
11. **Phases 14–15 Polish, accessibility, security, release readiness.**

## 9. Architecture decisions that genuinely need to change (with reasons)

| Decision | Reason |
|---|---|
| Preserve NestJS + Prisma backend instead of migrating to ASP.NET Core + EF Core | The backend is a working, tested module. A rewrite is prohibited by stack rule #1 and adds no product value. The deviation from the agreed .NET stack is documented here. |
| Add OpenAPI/Swagger documentation | Required by the agreed stack; currently absent. |
| Add Playwright for critical browser E2E journeys | Required by the agreed stack; currently only Vitest/Supertest exists. |
| Add shadcn/ui or unify on one component system | Required by the agreed stack; currently a custom CSS system. Avoid introducing two competing systems — adopt shadcn/ui incrementally as the single component system going forward. |
| Introduce server-side authentication (cookies/tokens) bridging Next.js and NestJS | None exists; required before any protected feature. Define CORS, CSRF, cookie settings, session/token lifecycle, and logout explicitly. |

## 10. Baseline commands and results

| Command | Result |
|---|---|
| `npm run lint` | Passed (api: oxlint; web: eslint) |
| `npm run typecheck` | Passed (api: `tsc --noEmit`; web: `tsc --noEmit`) |
| `npm run test` | Passed, 3 unit tests (requires `DATABASE_URL`) |
| `npm run test:e2e` | Passed, 3 API health tests with mocked Prisma (requires `DATABASE_URL`) |
| `npm run build` | Passed (api `nest build`; web `next build`, 7 static routes) |
| `npx prisma validate` | Passed |
| `npm run db:migrate` | Not executed — PostgreSQL unavailable in this environment (environment limitation, not a code failure) |

Pre-existing failures recorded separately: none in code. The only conditional failure is the missing local `.env`/`DATABASE_URL`, resolved by copying `.env.example` (documented in README) and confirmed passing above.

## 11. Blockers requiring credentials, decisions, or data

1. **PostgreSQL instance** — Docker/PostgreSQL CLI unavailable locally; migration cannot be applied against a live DB in this environment. Required to verify migrations end-to-end before Phase 1 sign-off.
2. **Authentication provider/strategy** — decision needed on session cookie vs token trust boundary between Next.js frontend and NestJS API (cookie settings, CSRF, CORS, logout).
3. **Payment provider** — required before Phase 13; do not activate live payments without credentials and verified webhooks.
4. **AI provider** — required before Phase 9; provider calls must be server-side only, keys never in the browser.
5. **Calibrated CAT item data + approved psychometric model** — required before production CAT (Phase 7). Until then, CAT remains behind a feature flag as prototype/fixed-form adaptive-style practice, not a validated CAT.
6. **Original/licensed clinical question content** — no question content exists; content must be original or properly licensed before any question-bank feature is exposed as production content.

## 12. Implementation checklist (Phase 0 complete)

- [x] Repository map completed
- [x] Stack and dependency inventory mapped against agreed stack (deviation documented: NestJS/TypeScript + Prisma, not .NET/EF Core)
- [x] Baseline typecheck, lint, test, e2e, build results recorded
- [x] Existing feature inventory completed
- [x] Gap analysis against product scope completed
- [x] Initial security and data-integrity review completed
- [x] Proposed architecture and implementation plan documented
- [x] Phase-by-phase checklist with dependencies and risks documented
- [x] Blockers documented

Next action: begin **Phase 1 — Foundation, environment and quality gates**.
