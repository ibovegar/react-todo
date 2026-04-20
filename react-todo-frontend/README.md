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
