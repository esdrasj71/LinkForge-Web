# LinkForge Web

The Angular dashboard for **LinkForge** — a distributed URL shortener with event-driven click analytics.

Create short links, track every click in real time, and see where your traffic is coming from. The frontend talks to the LinkForge API over REST and renders live analytics as clicks arrive.

[![Angular](https://img.shields.io/badge/Angular-20-DD0031)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://www.typescriptlang.org/)
[![Angular Material](https://img.shields.io/badge/Angular%20Material-M3-757575)](https://material.angular.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000)](https://vercel.com/)

---

## Backend

The API, background worker, PostgreSQL schema, and Redis integration live in a separate repository:

**👉 [LinkForge API](https://github.com/esdrasj71/LinkForge)**

You need the backend running before the dashboard can do anything. Start it first, then start this app.

---

## What It Is

A single-page Angular application that acts as the control panel for a URL shortener:

- **Link list** — paginated table of every link you've created, with click counts and creation dates
- **Link creation** — form to shorten a URL, with inline validation feedback from the API
- **Analytics view** — per-link breakdown of total clicks, days active, referrers, and a daily click chart
- **Delete** — soft delete with confirmation, immediately reflected in the list

The dashboard does not maintain its own state. Everything comes from the API. If the API is down, the dashboard shows the error and stays usable.

---

### Environment-Driven Configuration

The API URL is not hardcoded. It comes from Angular's environment files:

| File                                   | When used                             | `apiUrl`                |
| -------------------------------------- | ------------------------------------- | ----------------------- |
| `src/environments/environment.ts`      | `ng serve` (local dev)                | `http://localhost:8080` |
| `src/environments/environment.prod.ts` | `ng build --configuration production` | Deployed API URL        |

Angular swaps them automatically at build time. No code changes between environments.

---

## Tech Stack

| Layer                | Technology                         | Purpose                                |
| -------------------- | ---------------------------------- | -------------------------------------- |
| **Framework**        | Angular 20 (standalone components) | SPA framework                          |
| **Language**         | TypeScript 5                       | Type-safe application code             |
| **UI Kit**           | Angular Material 3                 | Tables, forms, buttons, icons          |
| **Charts**           | ngx-charts                         | Daily click bar chart                  |
| **Change Detection** | Zoneless                           | Explicit, predictable change detection |
| **Styling**          | SCSS + CSS custom properties       | Component-scoped styles                |
| **Fonts**            | Inter, JetBrains Mono              | Body text and monospace codes          |

---

---

## Quick Start

**Requires the LinkForge API to be running first.** See the [backend README](https://github.com/esdrasj71/LinkForge#quick-start) for setup.

In a terminal:

```bash
# 1. Start the backend (in a separate terminal)
git clone https://github.com/esdrasj71/LinkForge.git
cd LinkForge
docker compose up --build

# 2. Start the frontend (in this terminal)
git clone https://github.com/esdrasj71/LinkForge-Web.git
cd LinkForge-Web
npm install
ng serve
Then open http://localhost:4200
```
