/** Cookie name used by react-cookie-consent for site cookie banner. */
export const COOKIE_CONSENT_NAME = 'hotsites_cookie_consent';

/** localStorage key for analytics opt-in (future GA etc.). */
export const ANALYTICS_STORAGE_KEY = 'hotsites_analytics_consent';

export const CONSENT_UPDATED_EVENT = 'hotsites-consent-updated';

/**
 * Persist analytics preference and notify listeners (same tab).
 * @param {'true' | 'false'} value
 */
export function setAnalyticsConsent(value) {
  try {
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, value);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(CONSENT_UPDATED_EVENT));
}

/**
 * Clear consent cookie and analytics flag, then reload so the banner shows again.
 */
export function resetCookieConsentAndReload() {
  document.cookie = `${COOKIE_CONSENT_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  try {
    window.localStorage.removeItem(ANALYTICS_STORAGE_KEY);
  } catch {
    // ignore
  }
  window.location.reload();
}
