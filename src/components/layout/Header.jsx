import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { persistLanguage } from '../../i18n';
import { LogoMark } from '../ui/LogoMark';

/** Pas compact aan na deze scroll — voorkomt trillen bij de top. */
const SCROLL_COMPACT_AFTER = 48;
/** Terug naar volledige header pas als we weer bijna bovenaan zijn (hysteresis). */
const SCROLL_EXPAND_BEFORE = 8;

const navLinkClass = ({ isActive }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-surface-elevated text-brand-strong'
      : 'text-brand-muted hover:text-brand-strong',
  );

function computeCompact(wasCompact, scrollY) {
  if (wasCompact) {
    return scrollY > SCROLL_EXPAND_BEFORE;
  }
  return scrollY > SCROLL_COMPACT_AFTER;
}

function useHomeHref() {
  const { pathname } = useLocation();
  if (pathname === '/resellers' || pathname === '/mkb') {
    return pathname;
  }
  return '/';
}

export function Header({ className }) {
  const { t, i18n } = useTranslation();
  const homeHref = useHomeHref();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const tick = () => {
      rafRef.current = 0;
      const y = window.scrollY;
      setIsScrolled((prev) => computeCompact(prev, y));
    };

    const onScroll = () => {
      if (rafRef.current !== 0) {
        return;
      }
      if (prefersReducedMotion) {
        tick();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== 0) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const setLang = (lng) => {
    void i18n.changeLanguage(lng);
    persistLanguage(lng);
    setOpen(false);
  };

  const easeHeader =
    'transition-[padding] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:duration-0';
  const easeBrand =
    'transition-[height,transform,gap,opacity,max-height] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:duration-0';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border bg-surface/90 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-surface/75',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-6xl px-4 sm:px-6',
          easeHeader,
          isScrolled ? 'py-2' : 'py-4',
        )}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
          {/* Links: navigatie (desktop) of menu (mobiel) */}
          <div className="flex min-w-0 items-center justify-self-start">
            <nav
              className="hidden flex-wrap items-center gap-1 md:flex"
              aria-label="Main"
            >
              <NavLink to={homeHref} className={navLinkClass} end>
                {t('nav.home')}
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                {t('nav.contact')}
              </NavLink>
            </nav>
            <button
              type="button"
              className="rounded-md p-2 text-brand-strong md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <Menu className="h-6 w-6" aria-hidden />
              <span className="sr-only">Menu</span>
            </button>
          </div>

          {/* Midden: logo + merknaam (merknaam krimpt vloeiend weg bij scroll) */}
          <NavLink
            to={homeHref}
            className={cn(
              'group flex min-w-0 flex-col items-center justify-center justify-self-center text-center outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2',
              easeBrand,
              isScrolled ? 'gap-0' : 'gap-1.5',
            )}
            aria-label={t('common.companyName')}
            end
          >
            <LogoMark
              size={isScrolled ? 'sm' : 'md'}
              className={cn(
                'object-center',
                easeBrand,
                isScrolled
                  ? 'h-6 max-h-6 sm:h-6'
                  : 'max-sm:h-8 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100',
              )}
            />
            <div
              className={cn(
                'w-full overflow-hidden',
                easeBrand,
                isScrolled ? 'max-h-0 opacity-0' : 'max-h-14 opacity-100',
              )}
              aria-hidden={isScrolled}
            >
              <span className="block text-base font-semibold tracking-tight text-brand-strong sm:text-lg">
                {t('common.companyName')}
              </span>
            </div>
          </NavLink>

          {/* Rechts: taal */}
          <div
            className="flex items-center justify-self-end"
            role="group"
            aria-label={t('common.languageLabel')}
          >
            <div className="flex rounded-lg border border-border p-0.5">
              <button
                type="button"
                onClick={() => setLang('nl')}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium',
                  i18n.language.startsWith('nl')
                    ? 'bg-brand-strong text-brand-foreground'
                    : 'text-brand-muted hover:text-brand-strong',
                )}
              >
                {t('common.languageNl')}
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={cn(
                  'rounded-md px-2 py-1 text-xs font-medium',
                  i18n.language.startsWith('en')
                    ? 'bg-brand-strong text-brand-foreground'
                    : 'text-brand-muted hover:text-brand-strong',
                )}
              >
                {t('common.languageEn')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-surface px-4 py-3 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile main">
            <NavLink
              to={homeHref}
              className={navLinkClass}
              end
              onClick={() => setOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setOpen(false)}
            >
              {t('nav.contact')}
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
