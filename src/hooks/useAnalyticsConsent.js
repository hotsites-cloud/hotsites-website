import { useSyncExternalStore } from 'react';
import {
  ANALYTICS_STORAGE_KEY,
  CONSENT_UPDATED_EVENT,
} from '../config/cookies';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  window.addEventListener(CONSENT_UPDATED_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CONSENT_UPDATED_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
}

/**
 * Returns whether analytics may run ('true' | 'false' | null if unset).
 * Future: load GA only when value === 'true'.
 */
export function useAnalyticsConsent() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
