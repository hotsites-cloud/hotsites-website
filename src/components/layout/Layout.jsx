import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '../../utils/cn';

function PageFallback() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 text-brand-muted">
      <p role="status">{t('common.loading')}</p>
    </div>
  );
}

export function Layout({ className }) {
  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  className: PropTypes.string,
};
