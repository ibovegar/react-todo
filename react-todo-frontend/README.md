# React Todo Frontend

A todo app built with React Router 7, NAV's Aksel design system, and MSW for local mock data.

## Tech Stack

- [React Router 7](https://reactrouter.com/) (framework mode, SSR)
- [Aksel / ds-react](https://aksel.nav.no/) (NAV design system)
- [MSW](https://mswjs.io/) (API mocking for local development)
- [Vite](https://vitejs.dev/) (build tool)
- [Biome](https://biomejs.dev/) (linter/formatter)

## Getting Started

```bash
pnpm install
```

## Development

### With backend

Requires the Spring Boot backend running on `http://localhost:8081` (configured in `.env`):

```bash
pnpm dev
```

### With mock data

Uses MSW to intercept API calls with in-memory mock data — no backend needed:

```bash
pnpm dev:mock
```

This uses Vite's `--mode mock` which loads `.env.mock` (sets `VITE_USE_MSW=true`).

### Environment

| File | Purpose |
|------|---------|
| `.env` | Default config (committed). Sets `API_BASE_URL`. |
| `.env.mock` | Mock mode config (committed). Enables MSW. |
| `.env.local` | Personal overrides (gitignored). |

## Building for Production

```bash
pnpm build
pnpm start
```

## Type Checking

```bash
pnpm typecheck
```

## API Type Generation

TypeScript types are auto-generated from the backend's OpenAPI specification using [openapi-typescript](https://openapi-ts.dev/).

### How it works

1. The backend has a test (`OpenApiExportTest`) that exports its OpenAPI spec to `react-todo-backend/openapi.json`
2. The frontend reads that file and generates fully typed interfaces into `app/api/generated/schema.d.ts`

### Regenerating types

After any backend API change:

```bash
# 1. In the backend project — export the latest spec
cd ../react-todo-backend
./mvnw test -Dtest=OpenApiExportTest

# 2. In the frontend project — regenerate types
cd ../react-todo-frontend
pnpm run generate:api
```

### Generated files

| File | Purpose |
|------|---------|
| `../react-todo-backend/openapi.json` | Exported OpenAPI spec (source of truth) |
| `app/api/generated/schema.d.ts` | Auto-generated TypeScript types (do not edit) |

> **Note:** The generated `schema.d.ts` should be committed to git so the frontend builds without needing the backend.
