import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

export function Layout({ className }) {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        const targetId = decodeURIComponent(hash.slice(1));
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ block: 'start', behavior: 'auto' });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [hash, pathname]);

  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <Header />
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
