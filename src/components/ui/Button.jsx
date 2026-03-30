import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const variants = {
  primary:
    'bg-brand-strong text-brand-foreground hover:opacity-90 focus-visible:ring-brand-strong',
  secondary:
    'border border-border bg-surface text-brand-strong hover:bg-surface-elevated focus-visible:ring-brand-muted',
};

/**
 * @param {object} props
 * @param {'primary' | 'secondary'} [props.variant]
 */
export function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  disabled,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};
