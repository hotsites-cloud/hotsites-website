# AGENTS.md

## Cursor Cloud specific instructions

This is a React + Vite SPA (no backend, no database). All commands are defined in `package.json` scripts.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (Vite, default port 5173) |
| Lint | `npm run lint` |
| Build | `npm run build` |
| Preview prod build | `npm run preview` |

### Notes

- The site uses **HashRouter** (`/#/`), so routes look like `http://localhost:5173/#/contact`.
- There are no automated tests (no test framework configured).
- The contact form requires EmailJS env vars (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_USER_TEMPLATE_ID`, `VITE_EMAILJS_ADMIN_TEMPLATE_ID`) in a `.env` file. Without them the site works fine but the form shows a config-missing warning and cannot send emails.
- i18n: Dutch (`nl`) is the default language; English (`en`) is the secondary. Language switcher is in the navbar.
- To expose the dev server on all interfaces (useful in cloud VMs), run `npm run dev -- --host 0.0.0.0`.
