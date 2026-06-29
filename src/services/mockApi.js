/**
 * mockApi.js
 *
 * Simulates API calls using imported JSON data.
 * Returns Promises with artificial delays to mimic real network requests.
 * All functions return { data, error, loading } compatible shapes.
 */

import courses from '../data/courses.json';
import assignments from '../data/assignments.json';
import certificates from '../data/certificates.json';
import learningPaths from '../data/learningPaths.json';
import community from '../data/community.json';
import dashboard from '../data/dashboard.json';
import faq from '../data/faq.json';

// Simulates network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// --- Course Services ---

export const getCourses = async (filters = {}) => {
  await delay(400);
  let result = [...courses];

  // Filter by category
  if (filters.category && filters.category !== 'All') {
    result = result.filter(c => c.category === filters.category);
  }

  // Filter by search query (title/description match)
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }

  // Filter enrolled only
  if (filters.enrolledOnly) {
    result = result.filter(c => c.enrolled);
  }

  return { data: result, error: null };
};

export const getCourseById = async (id) => {
  await delay(300);
  const course = courses.find(c => c.id === Number(id));
  if (!course) return { data: null, error: 'Course not found' };
  return { data: course, error: null };
};

// --- Dashboard Service ---

export const getDashboard = async () => {
  await delay(400);
  const enrolledCourses = courses.filter(c => c.enrolled);
  const upcomingAssignments = assignments.filter(a =>
    dashboard.upcomingAssignments.includes(a.id)
  );
  return {
    data: {
      ...dashboard,
      recentCourses: enrolledCourses.slice(0, 4),
      upcomingAssignments,
      featuredCourse: courses.find(c => c.id === dashboard.featuredCourse.id) || null,
    },
    error: null,
  };
};

// --- Assignment Services ---

export const getAssignments = async (filter = 'all') => {
  await delay(400);
  let result = [...assignments];
  if (filter === 'pending') result = result.filter(a => a.status === 'pending');
  if (filter === 'submitted') result = result.filter(a => a.status === 'submitted');
  if (filter === 'graded') result = result.filter(a => a.status === 'graded');
  return { data: result, error: null };
};

// --- Certificate Services ---

export const getCertificates = async () => {
  await delay(400);
  return { data: certificates, error: null };
};

// --- Learning Path Services ---

export const getLearningPaths = async () => {
  await delay(400);
  return { data: learningPaths, error: null };
};

// --- Community Services ---

export const getCommunityPosts = async () => {
  await delay(500);
  return { data: community, error: null };
};

// --- FAQ Services ---

export const getFAQs = async () => {
  await delay(300);
  return { data: faq, error: null };
};

// --- Auth Mock ---

const MOCK_USERS = [
  {
    email: 'student@xebia.com',
    password: 'password123',
    name: 'Student',
    role: 'student',
    program: 'Mastering Digital Innovation',
  },
  {
    email: 'admin@xebia.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    program: 'Platform Administration',
  },
];

export const loginUser = async (email, password) => {
  await delay(600);
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!user) return { data: null, error: 'Invalid email or password' };
  const { password: _, ...safeUser } = user;
  return { data: safeUser, error: null };
};
