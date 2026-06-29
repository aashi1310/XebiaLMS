/**
 * Sidebar.jsx
 *
 * Left navigation sidebar for the authenticated dashboard.
 * Shows: Xebia logo, user profile section, nav links.
 * Supports mobile overlay mode (controlled by UIContext.sidebarOpen).
 *
 * Nav items match exactly what's in the reference:
 * Overview, My Learning, Browse Courses, Learning Paths,
 * Assignments, Certificates, Community
 */

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiDashboardLine,
  RiBookOpenLine,
  RiCompassLine,
  RiMapLine,
  RiFileTextLine,
  RiAwardLine,
  RiGroupLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import Avatar from '../common/Avatar';

const NAV_ITEMS = [
  { label: 'Overview', path: ROUTES.DASHBOARD, icon: RiDashboardLine, end: true },
  { label: 'My Learning', path: ROUTES.MY_LEARNING, icon: RiBookOpenLine },
  { label: 'Browse Courses', path: ROUTES.BROWSE_COURSES, icon: RiCompassLine },
  { label: 'Learning Paths', path: ROUTES.LEARNING_PATHS, icon: RiMapLine },
  { label: 'Assignments', path: ROUTES.ASSIGNMENTS, icon: RiFileTextLine },
  { label: 'Certificates', path: ROUTES.CERTIFICATES, icon: RiAwardLine },
  { label: 'Community', path: ROUTES.COMMUNITY, icon: RiGroupLine },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { sidebarOpen, closeSidebar } = useUI();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const SidebarContent = () => (
    <aside className="flex flex-col h-full bg-white dark:bg-slate-900 w-[260px] shrink-0 border-r border-slate-200 dark:border-slate-700">
      {/* Logo */}
      <div className="px-5 pt-5 pb-3">
        <span className="text-2xl font-black text-[#84117C] tracking-tight cursor-pointer" onClick={() => navigate(ROUTES.DASHBOARD)}>
          Xebia
        </span>
      </div>

      {/* User profile card */}
      <div className="mx-3 mb-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
        <Avatar initials={user?.name?.[0] || 'S'} size="md" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">Student Portal</p>
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user?.program || 'Xebia Learning'}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto" aria-label="Dashboard navigation">
        {NAV_ITEMS.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={closeSidebar}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-[#6C1D5F] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <>
                <Icon className={`text-base shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors"
          aria-label="Log out"
        >
          <RiLogoutBoxLine className="text-base" />
          Log out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-screen sticky top-0">
        <SidebarContent />
      </div>

      {/* Mobile overlay sidebar */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full z-50 flex lg:hidden">
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
