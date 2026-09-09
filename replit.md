# Mockup API Sandbox

The **Mockup API Sandbox** is a development platform designed to run an Express-based API server alongside a sandbox interface, allowing users to prototype, mock, and test API specs backed by a relational database schema.

## Run & Operate

* `PORT=5000 pnpm --filter @workspace/api-server run dev` — Run the API server on port 5000 (requires explicit `PORT`).
* `pnpm run typecheck` — Run a full TypeScript typecheck across all workspace packages.
* `PORT=3000 pnpm run build` — Run a full typecheck and build all workspace packages.
* `pnpm --filter @workspace/api-spec run codegen` — Regenerate frontend API hooks and Zod validation schemas directly from the OpenAPI specification.
* `pnpm --filter @workspace/db run push` — Push schema migrations and changes directly to the database instance (development mode only).

### Required Environment Variables
* `DATABASE_URL` — PostgreSQL database connection string.
* `PORT` — The network port for binding servers during execution and workspace compilation stages.

## Tech Stack

* **Package Management**: pnpm workspaces
* **Runtime & Language**: Node.js 24, TypeScript 5.9
* **API Layer**: Express 5
* **Database & ORM**: PostgreSQL paired with Drizzle ORM
* **Data Validation**: Zod (zod/v4), drizzle-zod
* **Code Generation**: Orval (generates client endpoints from OpenAPI specifications)
* **Bundler & Build Tooling**: esbuild (produces a unified CJS bundle), Vite (powers the mockup sandbox environment)

## Where Things Live

* `artifacts/api-server/` — Source code for the backend Express application engine.
* `artifacts/mockup-sandbox/` — Frontend workspace for sandbox interaction and visual testing.
* `lib/` — Shared utility libraries and business logic common to internal modules.
* `scripts/` — Infrastructure, environment configuration automation, and helper routines.
* `pnpm-workspace.yaml` — Source-of-truth workspace layout and module visibility mappings.

## Architecture Decisions

* **Contract-First Code Generation**: API client contracts, data models, and hook definitions are entirely derived from an OpenAPI blueprint via Orval rather than hand-coded.
* **Unified Workspace Typing**: Global compilation checking ensures cross-package boundary synchronization, forcing internal libraries and external endpoints to maintain unified TypeScript compatibility.
* **CJS Distribution Targets**: Server artifacts leverage fast `esbuild` configurations to transpile modern TypeScript down into optimized, self-contained CommonJS bundles.

## Product Capabilities

* **Integrated Mocking Suite**: Real-time evaluation sandbox allowing users to visually execute payloads against transient or simulated server environments.
* **Synchronized Type Validation**: Inbound HTTP parameters are instantly checked against persistent relational models using runtime Zod validation objects.

## User Preferences

* *To be populated dynamically as explicit instructions and configuration presets are saved across workspaces.*

## Gotchas

* **Enforced Build Port Environment**: You must explicitly prepend `PORT=[number]` ahead of commands executing `pnpm build`. The Vite framework configured in `artifacts/mockup-sandbox` strictly intercepts compilation pipelines and halts if a port fallback is missing from `process.env`.
* **Database Alignment Sync**: Run `pnpm --filter @workspace/db run push` immediately after altering structural models to prevent data validation mapping failures in runtime engines.
