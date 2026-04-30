/** EmailJS IDs from static hosting / build-time env (Vite `import.meta.env`). */
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const userTemplateId = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID ?? '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

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
 * Requires the three EmailJS variables configured in StaticHost.
 * Template "To Email" in EmailJS should be {{to_email}}.
 * @returns {boolean}
 */
export function hasEmailJsConfig() {
  const sid = String(serviceId).trim();
  const key = String(publicKey).trim();
  const tpl = String(userTemplateId).trim();
  return Boolean(sid && key && tpl);
}

/**
 * Form may submit: real EmailJS configured, or dev mock send enabled.
 * @returns {boolean}
 */
export function canSubmitContactForm() {
  return hasEmailJsConfig() || shouldMockEmailJsSend();
}

/**
 * @returns {{ serviceId: string; userTemplateId: string; publicKey: string }}
 */
export function getEmailJsConfig() {
  return {
    serviceId: String(serviceId).trim(),
    userTemplateId: String(userTemplateId).trim(),
    publicKey: String(publicKey).trim(),
  };
}
