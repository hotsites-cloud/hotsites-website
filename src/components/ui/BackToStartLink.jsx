import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Link back to the home / audience choice page (hash router: /#/).
 */
const variantClass = {
  default:
    'border-border bg-surface/80 text-brand-strong shadow-sm hover:border-brand-strong/35 hover:bg-surface-elevated',
  onDark:
    'border-transparent bg-transparent text-sm font-normal text-white/70 shadow-none hover:bg-white/[0.06] hover:text-white',
};

const arrowClass = {
  default: 'text-brand-muted',
  onDark: 'text-white/55 group-hover:text-white/90',
};

export function BackToStartLink({ className, variant = 'default' }) {
  const { t } = useTranslation();
  const v = variant === 'onDark' ? 'onDark' : 'default';

  return (
    <Link
      to="/"
      className={cn(
        'group mb-6 inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        v === 'onDark'
          ? 'focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/30'
          : 'focus-visible:ring-brand-strong focus-visible:ring-offset-2',
        variantClass[v],
        className,
      )}
    >
      <ArrowLeft
        className={cn(
          'h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-0.5',
          arrowClass[v],
        )}
        aria-hidden
      />
      <span className="truncate">{t('common.backToStart')}</span>
    </Link>
  );
}

BackToStartLink.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'onDark']),
};
