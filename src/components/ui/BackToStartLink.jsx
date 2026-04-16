import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Link back to the home / audience choice page (hash router: /#/).
 */
export function BackToStartLink({ className }) {
  const { t } = useTranslation();

  return (
    <Link
      to="/"
      className={cn(
        'group mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border border-border bg-surface/80 px-3 py-2 text-sm font-medium text-brand-strong shadow-sm backdrop-blur-sm transition-colors',
        'hover:border-brand-strong/35 hover:bg-surface-elevated',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2',
        className,
      )}
    >
      <ArrowLeft
        className="h-4 w-4 shrink-0 text-brand-muted transition-transform group-hover:-translate-x-0.5"
        aria-hidden
      />
      <span className="truncate">{t('common.backToStart')}</span>
    </Link>
  );
}

BackToStartLink.propTypes = {
  className: PropTypes.string,
};
