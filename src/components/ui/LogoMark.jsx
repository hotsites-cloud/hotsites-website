import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import logoUrl from '../../assets/Icoon logo Hotsites.svg';

const sizes = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-11',
};

/**
 * Brand mark from Icoon logo Hotsites.svg (self-hosted asset).
 */
export function LogoMark({ className, size = 'md' }) {
  const { t } = useTranslation();
  return (
    <img
      src={logoUrl}
      alt={t('common.logoAlt')}
      width={301}
      height={242}
      className={cn('w-auto shrink-0 object-contain object-left', sizes[size], className)}
      loading="eager"
      decoding="async"
    />
  );
}

LogoMark.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
