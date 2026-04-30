/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_ORIGIN: string | undefined;
  readonly VITE_EMAILJS_SERVICE_ID: string | undefined;
  readonly VITE_EMAILJS_PUBLIC_KEY: string | undefined;
  readonly VITE_EMAILJS_USER_TEMPLATE_ID: string | undefined;
  /** Dev only: skip EmailJS API, show success (see .env.example). */
  readonly VITE_MOCK_EMAILJS: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
