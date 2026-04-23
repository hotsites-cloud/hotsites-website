import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const overlayPresets = {
  dark: 'bg-gradient-to-b from-black/80 via-black/60 to-black/50',
  darker: 'bg-gradient-to-b from-black/85 via-black/70 to-black/60',
  soft: 'bg-gradient-to-b from-black/70 via-black/50 to-black/40',
};

/**
 * Full-width block with a cover photo, dark scrim, and high-contrast children (large type).
 */
export function FullBleedPhotoSection({
  imageUrl,
  imageLabel = '',
  minHeight = 'min-h-[78vh]',
  align = 'center',
  overlay = 'dark',
  overlayEntrance = false,
  backgroundSlowLoop = false,
  /** CSS background-position for the cover image (e.g. `center 25%`). */
  backgroundPosition = 'center',
  className,
  contentClassName,
  bottomContent = null,
  children,
}) {
  const contentJustify =
    align === 'top' ? 'justify-start pt-24 sm:pt-32' : align === 'bottom' ? 'justify-end pb-16 sm:pb-20' : 'justify-center py-16 sm:py-24';

  const overlayClass =
    typeof overlay === 'string' && Object.hasOwn(overlayPresets, overlay)
      ? overlayPresets[overlay]
      : typeof overlay === 'string'
        ? overlay
        : overlayPresets.dark;

  return (
    <section
      className={cn(
        'relative flex w-full flex-col overflow-hidden border-b border-border/60',
        minHeight,
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center',
          backgroundSlowLoop
            ? 'hero-bg-25s-loop'
            : 'scale-105 motion-reduce:scale-100',
        )}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition,
        }}
        role={imageLabel ? 'img' : undefined}
        aria-label={imageLabel || undefined}
        aria-hidden={imageLabel ? undefined : true}
      />
      <div
        className={cn(
          'absolute inset-0',
          overlayClass,
          overlayEntrance && 'animate-hero-overlay-darken',
        )}
        aria-hidden
      />
      <div
        className={cn(
          'relative z-10 flex min-h-0 w-full flex-1 flex-col px-4 sm:px-6',
          bottomContent ? 'min-h-0 justify-stretch pt-20 pb-4 sm:pt-24 sm:pb-6' : contentJustify,
        )}
      >
        {bottomContent ? (
          <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col">
            <div
              className={cn('flex min-h-0 flex-1 flex-col justify-center', contentClassName)}
            >
              {children}
            </div>
            <div className="shrink-0">{bottomContent}</div>
          </div>
        ) : (
          <div className={cn('mx-auto w-full max-w-6xl', contentClassName)}>{children}</div>
        )}
      </div>
    </section>
  );
}

FullBleedPhotoSection.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  imageLabel: PropTypes.string,
  minHeight: PropTypes.string,
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  overlay: PropTypes.oneOfType([
    PropTypes.oneOf(['dark', 'darker', 'soft']),
    PropTypes.string,
  ]),
  overlayEntrance: PropTypes.bool,
  backgroundSlowLoop: PropTypes.bool,
  backgroundPosition: PropTypes.string,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  bottomContent: PropTypes.node,
  children: PropTypes.node.isRequired,
};
