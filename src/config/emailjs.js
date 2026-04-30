/** EmailJS IDs from static hosting / build-time env (Vite `import.meta.env`). */
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';
const adminEmail = import.meta.env.VITE_EMAILJS_ADMIN_EMAIL ?? '';

/**
 * Skip real API calls in `npm run dev` when `.env` has VITE_MOCK_EMAILJS=true.
 * Never active in production builds. Use when EmailJS returns 412 (e.g. Gmail reconnect needed).
 * @returns {boolean}
 */
export function shouldMockEmailJsSend() {
  if (!import.meta.env.DEV) {
    return false;
  }
  return String(import.meta.env.VITE_MOCK_EMAILJS ?? '')
    .trim()
    .toLowerCase() === 'true';
}

/**
 * Requires service, public key, one template (used for visitor + admin sends), and admin inbox.
 * Template "To Email" in EmailJS should be {{to_email}}.
 * @returns {boolean}
 */
export function hasEmailJsConfig() {
  const sid = String(serviceId).trim();
  const key = String(publicKey).trim();
  const tpl = String(templateId).trim();
  const admin = String(adminEmail).trim();
  return Boolean(sid && key && tpl && admin);
}

/**
 * Form may submit: real EmailJS configured, or dev mock send enabled.
 * @returns {boolean}
 */
export function canSubmitContactForm() {
  return hasEmailJsConfig() || shouldMockEmailJsSend();
}

/**
 * @returns {{ serviceId: string; templateId: string; publicKey: string; adminEmail: string }}
 */
export function getEmailJsConfig() {
  return {
    serviceId: String(serviceId).trim(),
    templateId: String(templateId).trim(),
    publicKey: String(publicKey).trim(),
    adminEmail: String(adminEmail).trim(),
  };
}
