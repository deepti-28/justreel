import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ToastContainer } from '@/components/ui/Toast';

export function MainLayout() {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/auth') || location.pathname === '/reels';
  const hideFooter = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/book/');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideChrome && !hideFooter && <Footer />}
      <ToastContainer />
    </div>
  );
}
