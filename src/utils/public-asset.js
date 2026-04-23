/**
 * Resolve a path under /public for Vite's base URL (e.g. `./` in production).
 * @param {string} path - Path relative to public root, e.g. `media/photo-01.jpg`
 * @returns {string}
 */
export function publicAssetUrl(path) {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, '');
  return `${base}${clean}`;
}
