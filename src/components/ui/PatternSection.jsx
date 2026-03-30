import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import patternUrl from '../../assets/Patroon achtergrond.svg';

/**
 * Full-width section with Patroon achtergrond.svg as cover, 150% scale, 60% opacity.
 */
export function PatternSection({ children, className, contentClassName }) {
  return (
    <section
      className={cn('relative overflow-hidden border-y border-border/70', className)}
      style={{ backgroundColor: 'var(--color-page)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 origin-center opacity-60"
        style={{
          backgroundImage: `url(${patternUrl})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transform: 'scale(1.5)',
        }}
        aria-hidden
      />
      <div
        className={cn(
          'relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20',
          contentClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}

PatternSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
};
