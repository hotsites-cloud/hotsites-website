/** EmailJS IDs from static hosting / build-time env (Vite `import.meta.env`). */
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const userTemplateId = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID ?? '';
const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID ?? '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

/**
 * Requires service, public key, and both templates (visitor confirmation + admin).
 * @returns {boolean}
 */
export function hasEmailJsConfig() {
  const sid = String(serviceId).trim();
  const key = String(publicKey).trim();
  const user = String(userTemplateId).trim();
  const admin = String(adminTemplateId).trim();
  return Boolean(sid && key && user && admin);
}

/**
 * @returns {{ serviceId: string; userTemplateId: string; adminTemplateId: string; publicKey: string }}
 */
export function getEmailJsConfig() {
  return {
    serviceId: String(serviceId).trim(),
    userTemplateId: String(userTemplateId).trim(),
    adminTemplateId: String(adminTemplateId).trim(),
    publicKey: String(publicKey).trim(),
  };
}
