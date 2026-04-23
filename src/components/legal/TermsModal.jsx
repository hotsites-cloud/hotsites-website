import PropTypes from 'prop-types';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { publicAssetUrl } from '../../utils/public-asset';
import { cn } from '../../utils/cn';

const TERMS_PDF_REL = 'legal/nl-digital-voorwaarden-2025-nl.pdf';

/**
 * Modal met toelichting en downloadlink naar de NL Digital-voorwaarden (PDF).
 */
export function TermsModal({ isOpen, onRequestClose }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const titleId = useId();
  const panelRef = useRef(null);
  const lastActive = useRef(null);
  const pdfUrl = publicAssetUrl(TERMS_PDF_REL);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    lastActive.current = document.activeElement;
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = 'hidden';
    const focusEl = panelRef.current?.querySelector('a[href$=".pdf"]');
    if (focusEl) {
      focusEl.focus();
    }
    return () => {
      body.style.overflow = prev;
      lastActive.current?.focus?.();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default border-0 bg-black/50"
        onClick={close}
        tabIndex={-1}
        aria-label={t('termsModal.closeBackdrop')}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative z-10 w-full max-w-md rounded-2xl bg-surface p-5 text-brand shadow-2xl ring-1 ring-black/10',
          'sm:p-6',
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="text-lg font-bold tracking-tight text-brand-strong sm:text-xl"
          >
            {t('termsModal.title')}
          </h2>
          <button
            type="button"
            onClick={close}
            className="shrink-0 rounded-lg p-1.5 text-brand-muted transition-colors hover:bg-surface-elevated hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong"
            aria-label={t('termsModal.close')}
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-brand-muted sm:text-base">
          {t('termsModal.body')}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          <a
            href={pdfUrl}
            download="NLdigital-Voorwaarden-2025-NL.pdf"
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-brand-strong px-4 py-2.5 text-sm font-medium text-brand-foreground no-underline transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong sm:w-auto"
          >
            {t('termsModal.downloadPdf')}
          </a>
          <Button type="button" variant="secondary" onClick={close}>
            {t('termsModal.close')}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

TermsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
