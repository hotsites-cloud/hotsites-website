import PropTypes from 'prop-types';
import { useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

export function Layout({ className }) {
  const { pathname } = useLocation();
  const [pinHeaderExpanded, setPinHeaderExpanded] = useState(false);
  const scrollPollRaf = useRef(0);

  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
      if (prefersReducedMotion) {
        return;
      }
      setPinHeaderExpanded(true);
    });

    const releasePin = () => {
      if (!cancelled) {
        setPinHeaderExpanded(false);
      }
    };

    if (prefersReducedMotion) {
      return () => {
        cancelled = true;
      };
    }

    const pollUntilTop = () => {
      if (cancelled) {
        return;
      }
      if (window.scrollY <= 0.5) {
        releasePin();
        return;
      }
      scrollPollRaf.current = requestAnimationFrame(pollUntilTop);
    };

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }
      scrollPollRaf.current = requestAnimationFrame(pollUntilTop);
    });
    const safetyTimeoutId = window.setTimeout(releasePin, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(safetyTimeoutId);
      if (scrollPollRaf.current !== 0) {
        cancelAnimationFrame(scrollPollRaf.current);
        scrollPollRaf.current = 0;
      }
    };
  }, [pathname]);

  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <Header key={pathname} forceExpanded={pinHeaderExpanded} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  className: PropTypes.string,
};
