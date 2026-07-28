import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/components/layout/MainLayout';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage, ResetPasswordPage } from '@/pages/auth/ForgotPasswordPage';
import { RoleSelectionPage } from '@/pages/auth/RoleSelectionPage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ReelsPage } from '@/pages/ReelsPage';
import { CreatorProfilePage } from '@/pages/CreatorProfilePage';
import { ComparePage } from '@/pages/ComparePage';
import { DestinationsPage } from '@/pages/DestinationsPage';
import { DestinationDetailPage } from '@/pages/DestinationDetailPage';
import { DroneMarketplacePage } from '@/pages/DroneMarketplacePage';
import { BookingPage } from '@/pages/booking/BookingPage';
import { BookingConfirmationPage } from '@/pages/booking/BookingConfirmationPage';
import { BookingTrackingPage } from '@/pages/booking/BookingTrackingPage';
import { ProductionsPage } from '@/pages/booking/ProductionsPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { MessagesPage } from '@/pages/MessagesPage';
import { ClientDashboard } from '@/pages/dashboard/ClientDashboard';
import { CreatorDashboard } from '@/pages/dashboard/CreatorDashboard';
import { AdminDashboard } from '@/pages/dashboard/AdminDashboard';
import { AIPage } from '@/pages/ai/AIPage';
import { AILayout } from '@/pages/ai/AILayout';
import { CompareWidget } from '@/components/creator/CompareWidget';
import { useAuthStore } from '@/store';
import type { UserRole } from '@/types';
import { BlogPage, AboutPage, HelpPage, SupportPage } from '@/pages/ContentPages';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, staleTime: 60000 } },
});

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: UserRole[] }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && user && !roles.includes(user.role)) {
    const dash = user.role === 'creator' ? '/dashboard/creator' : user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client';
    return <Navigate to={dash} replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/creator/:id" element={<CreatorProfilePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/destinations/:id" element={<DestinationDetailPage />} />
            <Route path="/drone-marketplace" element={<DroneMarketplacePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/support" element={<SupportPage />} />

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/role-selection" element={<RoleSelectionPage />} />

            {/* Booking */}
            <Route path="/book/:creatorId" element={<BookingPage />} />
            <Route path="/booking/confirmation/:id" element={<BookingConfirmationPage />} />
            <Route path="/booking/tracking/:id" element={<BookingTrackingPage />} />
            <Route path="/productions" element={<ProductionsPage />} />

            {/* AI routes */}
            <Route path="/ai" element={<AILayout />}>
              <Route path=":feature" element={<AIPage />} />
            </Route>

            {/* Client Dashboard */}
            <Route path="/dashboard/client" element={<ProtectedRoute roles={['client']}><ClientDashboard /></ProtectedRoute>}>
              <Route path=":section" element={<ClientDashboard />} />
            </Route>

            {/* Creator Dashboard */}
            <Route path="/dashboard/creator" element={<ProtectedRoute roles={['creator']}><CreatorDashboard /></ProtectedRoute>}>
              <Route path=":section" element={<CreatorDashboard />} />
            </Route>

            {/* Admin Dashboard */}
            <Route path="/dashboard/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>}>
              <Route path=":section" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <CompareWidget />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
