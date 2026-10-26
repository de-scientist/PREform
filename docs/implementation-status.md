# Implementation status

## Phase 0 — Repository audit and product baseline

**Status: complete.**

Audit report: `docs/audit-report.md`. Stack deviation decision: `docs/decisions.md` (decision 7).

Baseline verified with a locally created `.env` copied from `.env.example` (README-documented setup). PostgreSQL is unavailable in this environment, so the migration could not be applied against a live database; this is an environment limitation, not a code failure.

Verification results:

- `npm run lint` — passed (api + web)
- `npm run typecheck` — passed (api + web)
- `npm run test` — passed, 3 unit tests (requires `DATABASE_URL`; fails without it until `.env` is created)
- `npm run test:e2e` — passed, 3 API health tests with a mocked Prisma service (requires `DATABASE_URL`)
- `npm run build` — passed (api + web)
- `npx prisma validate` — passed; `npm run db:generate` — passed

Note: earlier status entries claiming tests passed unconditionally are corrected here — tests require `DATABASE_URL` to be present at API import time.

## Phase 1 — Foundation, environment and quality gates

**Status: not started (blocked on live PostgreSQL).**

- [ ] Apply the migration against an isolated PostgreSQL database.
- [ ] Confirm `npm run db:generate` and `npm run db:deploy` work against the target database.
- [x] npm workspaces and documented local development commands.
- [x] Environment example and server-side API environment validation.
- [x] PostgreSQL Compose service and additive initial Prisma migration.
- [x] Separate liveness and database readiness endpoints.
- [x] Fastify adapter, CORS allowlist, security headers, request validation and common error shape.
- [x] Lint, typecheck, unit-test, end-to-end-test and build scripts.
- [x] CI workflow for install and core checks.
- [x] Install dependencies and execute checks.
- [x] Review dependency audit and scan tracked files for common secret patterns.

## Phase 2 — Design system, navigation and core UI shell

**Status: initial public shell scaffolded and production build verified; authentication and student/admin shells remain outstanding.**

- [x] Responsive public landing page and RN/PN pathway routes.
- [x] Keyboard focus, reduced-motion support and small-screen layouts.
- [ ] Authenticated student and administrator layouts.
- [ ] Shared reusable form, navigation and application-state components.
- [ ] shadcn/ui component system (adopt as the single component system; do not maintain two competing systems).

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
- Backend is NestJS/TypeScript + Prisma (not .NET/EF Core); deviation documented in `docs/decisions.md` decision 7 and `docs/audit-report.md`. No rewrite performed.
- PostgreSQL unavailable locally; live migration verification deferred to an environment with a running PostgreSQL instance.
