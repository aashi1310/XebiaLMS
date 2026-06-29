/**
 * PublicNavbar.jsx
 * Top navigation for the public landing page.
 * Items: Xebia logo | Home | FAQ | Contact | search icon | dark mode | Start Learning
 * Matches the reference exactly.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiSearchLine, RiSunLine, RiMoonLine, RiCloseLine } from 'react-icons/ri';
import { useUI } from '../../context/UIContext';
import { ROUTES } from '../../constants/routes';

const PublicNavbar = () => {
  const { isDark, toggleDark } = useUI();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#1C0B1B]/95 backdrop-blur-sm border-b border-slate-200/60 dark:border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-1 shrink-0">
          <span className="text-2xl font-black text-[#84117C] tracking-tight">
            Xebia
          </span>
        </Link>

        {/* Nav links — centered */}
        <div className="flex-1 flex items-center justify-center gap-6">
          <a
            href="#hero"
            className="text-sm font-medium text-[#01AC9F] border-b-2 border-[#01AC9F] pb-0.5 transition-colors"
          >
            Home
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#6C1D5F] transition-colors"
          >
            FAQ
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#6C1D5F] transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(v => !v)}
            className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#6C1D5F] transition-colors"
            aria-label="Toggle search"
          >
            {searchOpen ? <RiCloseLine className="text-lg" /> : <RiSearchLine className="text-lg" />}
          </button>

          <button
            onClick={toggleDark}
            className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-[#6C1D5F] transition-colors"
            aria-label={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <RiSunLine className="text-lg" /> : <RiMoonLine className="text-lg" />}
          </button>

          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="ml-1 px-4 py-2 bg-[#01AC9F] text-white text-sm font-semibold rounded-full hover:bg-[#018076] transition-colors"
          >
            Start Learning
          </button>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;
