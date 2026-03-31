/** EmailJS IDs from static hosting / build-time env (Vite `import.meta.env`). */
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

/**
 * @returns {boolean}
 */
export function hasEmailJsConfig() {
  return Boolean(
    String(serviceId).trim() && String(templateId).trim() && String(publicKey).trim(),
  );
}

/**
 * @returns {{ serviceId: string; templateId: string; publicKey: string }}
 */
export function getEmailJsConfig() {
  return {
    serviceId: String(serviceId).trim(),
    templateId: String(templateId).trim(),
    publicKey: String(publicKey).trim(),
  };
}
