import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { TermsModal } from '../legal/TermsModal';
import { LogoMark } from '../ui/LogoMark';

export function Footer({ className }) {
  const { t } = useTranslation();
  const [termsOpen, setTermsOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'border-t border-border bg-surface-elevated text-sm text-brand-muted',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 border-b border-border/80 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark size="sm" />
            <span className="text-base font-semibold text-brand-strong">{t('common.companyName')}</span>
          </div>
        </div>
        <nav
          className="flex flex-wrap gap-x-6 gap-y-2"
          aria-label={t('footer.privacy')}
        >
          <Link
            to="/privacy"
            className="text-brand-muted underline-offset-4 hover:text-brand-strong hover:underline"
          >
            {t('footer.privacy')}
          </Link>
          <button
            type="button"
            onClick={() => setTermsOpen(true)}
            className="text-left text-brand-muted underline-offset-4 hover:text-brand-strong hover:underline"
          >
            {t('footer.terms')}
          </button>
          <Link
            to="/cookies"
            className="text-brand-muted underline-offset-4 hover:text-brand-strong hover:underline"
          >
            {t('footer.cookies')}
          </Link>
          <Link
            to="/imprint"
            className="text-brand-muted underline-offset-4 hover:text-brand-strong hover:underline"
          >
            {t('footer.imprint')}
          </Link>
        </nav>
        <p className="mt-4 text-brand-muted">
          {t('footer.kvkBtw', { kvk: t('footer.kvk'), btw: t('footer.btw') })}
        </p>
        <p className="mt-2 text-brand-muted">
          {t('footer.copyright', {
            year,
            company: t('common.companyName'),
          })}
        </p>
        <TermsModal isOpen={termsOpen} onRequestClose={() => setTermsOpen(false)} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  className: PropTypes.string,
};
