import PropTypes from 'prop-types';
import { useLayoutEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

function scrollWindowToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto',
  });
}

export function Layout({ className }) {
  const { pathname } = useLocation();
  const scrollPollRaf = useRef(0);

  useLayoutEffect(() => {
    let cancelled = false;
    const previousScrollRestoration = window.history.scrollRestoration;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    scrollWindowToTop();

    scrollPollRaf.current = requestAnimationFrame(() => {
      if (cancelled) {
        return;
      }
      scrollWindowToTop();
    });

    return () => {
      cancelled = true;
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
      if (scrollPollRaf.current !== 0) {
        cancelAnimationFrame(scrollPollRaf.current);
        scrollPollRaf.current = 0;
      }
    };
  }, [pathname]);

  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <Header key={pathname} />
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
