/**
 * AppRouter.jsx
 *
 * Defines all application routes.
 * Uses React Router v6 with nested routes.
 * Implements a ProtectedRoute wrapper for authenticated-only pages.
 */

import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import Loader from '../components/common/Loader';
import DashboardLayout from '../components/layout/DashboardLayout';

// Lazy load all pages for code splitting and better performance
const LandingPage = lazy(() => import('../pages/landing/LandingPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const OverviewPage = lazy(() => import('../pages/dashboard/OverviewPage'));
const MyLearningPage = lazy(() => import('../pages/dashboard/MyLearningPage'));
const BrowseCoursesPage = lazy(() => import('../pages/dashboard/BrowseCoursesPage'));
const LearningPathsPage = lazy(() => import('../pages/dashboard/LearningPathsPage'));
const AssignmentsPage = lazy(() => import('../pages/dashboard/AssignmentsPage'));
const CertificatesPage = lazy(() => import('../pages/dashboard/CertificatesPage'));
const CommunityPage = lazy(() => import('../pages/dashboard/CommunityPage'));

// Redirect to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />;
  return children;
};

// Redirect to dashboard if already logged in
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={ROUTES.DASHBOARD} replace />;
  return children;
};

const AppRouter = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader /></div>}>
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.HOME} element={<LandingPage />} />
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="my-learning" element={<MyLearningPage />} />
        <Route path="courses" element={<BrowseCoursesPage />} />
        <Route path="learning-paths" element={<LearningPathsPage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="community" element={<CommunityPage />} />
      </Route>

      {/* Fallback: redirect unknown routes to home */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  </Suspense>
);

export default AppRouter;
