# Architecture decisions

## 1. Start as a modular monorepo

**Decision:** Use npm workspaces with a Next.js web application and a NestJS API.

**Reason:** This keeps the public/student UI and server-side business logic in one repository while giving them clear dependency and deployment boundaries.

## 2. Use Fastify for the API adapter

**Decision:** Use NestJS with its Fastify platform adapter.

**Reason:** This follows the proposed API architecture and avoids adding a second HTTP server framework.

## 3. PostgreSQL and Prisma; no queue yet

**Decision:** PostgreSQL is the system-of-record target; Prisma owns schema and migrations. Do not add Redis/BullMQ to the initial scaffold.

**Reason:** The initial foundation needs durable relational storage. There is not yet an implemented asynchronous workflow that justifies operating a queue.

## 4. Keep claims and capabilities honest

**Decision:** The initial public shell identifies itself as an early platform foundation and does not present mock questions, fabricated metrics, live plans, validated readiness labels, or working product features.

**Reason:** Accurate product status is more important than a simulated finished experience.

## 5. Defer product-specific models until their workflows exist

**Decision:** The initial database migration creates only the RN/PN programme reference model.

**Reason:** Attempts, question versions, subscriptions, AI data and other domain records need workflow-specific integrity and retention decisions; creating them prematurely would produce unused schema.

## 6. CAT is disabled until validated

**Decision:** Do not implement or advertise CAT in the scaffold.

**Reason:** A defensible CAT implementation requires calibrated item parameters, an approved model and validated stopping rules, none of which were supplied.
