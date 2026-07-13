# omnivest-ai

Monorepo managed with pnpm workspaces + Turborepo.

## Structure

- `apps/frontend` — Next.js 16 (App Router), React 19. See `apps/frontend/AGENTS.md` for Next-specific rules before touching this app.
- `apps/backend` — NestJS.
- `packages/types` (`@repo/types`) — shared types/schemas consumed by both apps via `workspace:*`. Exports raw TypeScript source, no build step. Use Zod so the TS type and the runtime validation come from a single definition. Only put things that cross the API boundary (request/response contracts) here — never backend-only internals like DB models/entities.

## Tooling

- Package manager: pnpm. Internal cross-package deps use `workspace:*`.
- Formatting + linting: Biome is the source of truth for the whole repo (`biome.json` at root). Don't reintroduce Prettier.
- `apps/frontend` keeps a minimal ESLint config (`eslint-config-next`) only for the Next-specific rules Biome doesn't cover (Core Web Vitals, etc.). `apps/backend` has no ESLint — Biome covers linting there too.
- Root scripts (Turbo-orchestrated): `pnpm build`, `pnpm dev`, `pnpm lint`, `pnpm format`, `pnpm check-types`, `pnpm test`, `pnpm check`.

# Quality gate (must pass 0 errors before completing any task)

Before considering any task done, run from the repo root, in order:

1. `pnpm format`
2. `pnpm lint`
3. `pnpm check-types`
4. `pnpm test`
5. `pnpm build`

All five must finish with 0 errors. This is enforced automatically as a git `pre-commit` hook via `lefthook` (`lefthook.yml` at root) — commits are blocked if any step fails. Don't bypass it with `git commit --no-verify` unless the user explicitly asks.

## Commit Convention

- Follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`.
- Message always in **English**, clean, descriptive, and summarized.
- Keep it short: a one-line summary is enough; only add a body if a short (1-2 line) clarification is truly needed. Avoid long explanations.
- **No** co-author / `Co-Authored-By` trailers.