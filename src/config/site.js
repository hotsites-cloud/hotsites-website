/** Base URL for canonical links, JSON-LD, and email assets (no trailing slash). */
const fallbackOrigin = 'https://www.hotsites.nl';
const raw = import.meta.env.VITE_SITE_ORIGIN;
const trimmed = typeof raw === 'string' ? raw.trim() : '';
export const SITE_ORIGIN = (trimmed || fallbackOrigin).replace(/\/$/, '');
