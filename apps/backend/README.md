# backend

NestJS API. Part of the `omnivest-ai` monorepo — run these from the repo root with `pnpm --filter backend <script>`, or `cd apps/backend` first.

## Run

```bash
pnpm start:dev   # watch mode
pnpm start       # no watch
pnpm start:prod  # run compiled dist/main.js
```

## Test

```bash
pnpm test        # unit
pnpm test:e2e    # e2e
pnpm test:cov    # coverage
```

## Lint & format

Handled by Biome at the repo root (`pnpm lint` / `pnpm format` from root, or `pnpm --filter backend lint`).
