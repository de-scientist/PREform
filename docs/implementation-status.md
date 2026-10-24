# Implementation status

## Phase 0 — Repository audit and product baseline

**Status: complete for the newly scaffolded repository.**

- The workspace was empty before scaffolding; there was no existing application, user data, database schema, or feature to preserve.
- The project is an npm-workspace monorepo with a Next.js web app and a NestJS/Fastify API.
- PostgreSQL and Prisma provide the initial persistence foundation.
- No existing authentication, question bank, assessments, subscription integration, AI provider, or production content was present.
- Initial baseline checks could not run before scaffolding because there was no project or package manifest.
- Docker and a local PostgreSQL CLI were unavailable in the environment. Database-backed migration and readiness checks therefore require a configured PostgreSQL service.

## Phase 1 — Foundation, environment and quality gates

**Status: scaffolded; verification pending.**

- [x] npm workspaces and documented local development commands.
- [x] Environment example and server-side API environment validation.
- [x] PostgreSQL Compose service and additive initial Prisma migration.
- [x] Separate liveness and database readiness endpoints.
- [x] Fastify adapter, CORS allowlist, security headers, request validation and common error shape.
- [x] Lint, typecheck, unit-test, end-to-end-test and build scripts.
- [x] CI workflow for install and core checks.
- [ ] Install dependencies and execute checks.
- [ ] Apply the migration against an isolated PostgreSQL database.
- [ ] Review dependency and secret scans.

## Phase 2 — Design system, navigation and core UI shell

**Status: initial public shell scaffolded; authentication and student/admin shells remain outstanding.**

- [x] Responsive public landing page and RN/PN pathway routes.
- [x] Keyboard focus, reduced-motion support and small-screen layouts.
- [ ] Authenticated student and administrator layouts.
- [ ] Shared reusable form, navigation and application-state components.

## Remaining phases

| Phase | Scope | Status |
|---|---|---|
| 3 | Public pages, original sample content and dynamic pricing UI | Not started |
| 4 | Authentication, onboarding and programme selection | Not started |
| 5 | Versioned question bank, practice and rationales | Not started |
| 6 | Administrator content management | Not started |
| 7 | Readiness assessments; CAT only with validated methods and item data | Not started |
| 8 | Data-backed analytics and explainable recommendations | Not started |
| 9 | Approved-source AI Study Studio foundations | Not started |
| 10 | Flashcards and spaced repetition | Not started |
| 11 | Contextual AI tutor | Not started |
| 12 | Secure document learning and advanced study tools | Not started |
| 13 | Admin-managed plans and server-enforced entitlements | Not started |
| 14 | Accessibility, responsive and product-flow QA | Not started |
| 15 | Security, integration and release readiness | Not started |

## Decisions and blockers

- RN and PN share one application; programme-specific content and assessment rules must remain distinct.
- No question or clinical learning content has been fabricated or imported.
- Formal CAT is blocked on an approved psychometric method, calibrated item data and validation.
- Payments and AI are blocked on provider, policy and credential decisions.
- Phase 1 checks and database migration need to be run in an environment with installed dependencies and PostgreSQL.
