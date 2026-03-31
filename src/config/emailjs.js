/** EmailJS IDs from static hosting / build-time env (Vite `import.meta.env`). */
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const userTemplateId = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID ?? '';
const adminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID ?? '';
const legacyTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

/**
 * @returns {boolean}
 */
export function hasEmailJsConfig() {
  const sid = String(serviceId).trim();
  const key = String(publicKey).trim();
  const user = String(userTemplateId).trim();
  const admin = String(adminTemplateId).trim();
  const legacy = String(legacyTemplateId).trim();
  if (!sid || !key) {
    return false;
  }
  if (user && admin) {
    return true;
  }
  return Boolean(legacy);
}

/**
 * @returns {{
 *   serviceId: string;
 *   userTemplateId: string;
 *   adminTemplateId: string;
 *   publicKey: string;
 *   mode: 'dual' | 'legacy';
 * }}
 */
export function getEmailJsConfig() {
  const sid = String(serviceId).trim();
  const key = String(publicKey).trim();
  const user = String(userTemplateId).trim();
  const admin = String(adminTemplateId).trim();
  const legacy = String(legacyTemplateId).trim();
  if (user && admin) {
    return {
      serviceId: sid,
      userTemplateId: user,
      adminTemplateId: admin,
      publicKey: key,
      mode: 'dual',
    };
  }
  return {
    serviceId: sid,
    userTemplateId: legacy,
    adminTemplateId: legacy,
    publicKey: key,
    mode: 'legacy',
  };
}
