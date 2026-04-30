# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Static React SPA marketing website for "Hotsites" (hotsites.nl). No backend, no database — purely client-side with Vite + React 19 + Tailwind CSS 3.4. Uses hash-based routing (`HashRouter`).

### Commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite on port 5173) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Preview prod build | `npm run preview` |

### Gotchas

- **ESLint has 1 pre-existing error** in `src/components/legal/TermsModal.jsx` (`react-hooks/set-state-in-effect`). This is expected and not a blocker.
- **No test framework** is configured — there are no unit/integration tests in this repo.
- **EmailJS env vars** (`VITE_EMAILJS_*`) are optional. The contact form renders without them but shows a config-missing warning when submitting. Copy `.env.example` to `.env` for local dev.
- **Hash routing**: all routes use `/#/` prefix (e.g. `/#/resellers`, `/#/contact`, `/#/werkwijze`).
- **Language**: site is bilingual (NL/EN) via i18next; Dutch is the default language.
