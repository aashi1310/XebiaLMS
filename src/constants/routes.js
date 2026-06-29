/**
 * routes.js
 * Centralized route path constants.
 * Use these instead of hardcoding strings throughout the app.
 */

export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',

  // Dashboard (authenticated)
  DASHBOARD: '/dashboard',
  MY_LEARNING: '/dashboard/my-learning',
  BROWSE_COURSES: '/dashboard/courses',
  LEARNING_PATHS: '/dashboard/learning-paths',
  ASSIGNMENTS: '/dashboard/assignments',
  CERTIFICATES: '/dashboard/certificates',
  COMMUNITY: '/dashboard/community',
};
