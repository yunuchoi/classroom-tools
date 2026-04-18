# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript compile + Vite build
npm run preview   # Preview production build
npm run format    # Prettier format (src/**/*.tsx)
```

No test runner is configured.

## Architecture

Frontend-only SPA for Korean classroom display tools. React 19 + TypeScript + Vite, styled entirely with MUI v6 (`sx` prop — no CSS modules or separate stylesheets).

**Routing** (React Router v7):
- `/` — HomePage: grid of tool cards, each opens its route in a new tab
- `/clock-timetable` — ClockPage: two-phase flow — setup form → real-time clock + timetable display

**State**: `useState` only. Period content persists to localStorage under key `classroom-tools:period-content`. Clock updates every 1s, timetable every 5s via `setInterval`.

## Key conventions

- **All colors** must come from the token map in `src/theme.ts` — never hardcode hex values.
- **Arrow functions only** — no `function` declarations.
- **Styling**: MUI `sx` prop exclusively. Use `theme.tokens.*` for colors, MUI breakpoints for responsiveness.
- **New tools** added to HomePage follow the `ToolCard` pattern with a path, icon (Lucide), and color from tokens.
- Korean font: A2Gothic / 에이투지체 (loaded via `src/fonts.css`, weights 100–900); sans-serif fallback.
