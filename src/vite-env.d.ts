/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ORIGIN: string | undefined;
  readonly VITE_EMAILJS_SERVICE_ID: string | undefined;
  readonly VITE_EMAILJS_TEMPLATE_ID: string | undefined;
  readonly VITE_EMAILJS_USER_TEMPLATE_ID: string | undefined;
  readonly VITE_EMAILJS_ADMIN_TEMPLATE_ID: string | undefined;
  readonly VITE_EMAILJS_PUBLIC_KEY: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
