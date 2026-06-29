/**
 * HeroSection.jsx
 *
 * Landing page hero with dark background, neon line decoration,
 * headline, stats, and an embedded login card on the right.
 * Matches reference: https://lms-xebia-mac.onrender.com
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ROUTES } from '../../../constants/routes';
import Button from '../../../components/common/Button';

const LoginCard = () => {
  const { login, authLoading, authError } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate(ROUTES.DASHBOARD);
  };

  return (
    <div className="bg-[#230E22]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-6 w-full max-w-[340px]">
      {/* Card tab */}
      <div className="mb-4">
        <button className="px-5 py-1.5 bg-[#84117C] text-white text-sm font-semibold rounded-full">
          Login
        </button>
      </div>
      <p className="text-slate-400 text-xs mb-4">Login to continue your learning journey</p>

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#1C0B1B]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6C1D5F] transition-colors"
          aria-label="Email address"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#1C0B1B]/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#6C1D5F] transition-colors"
          aria-label="Password"
        />

        {authError && (
          <p className="text-red-400 text-xs">{authError}</p>
        )}

        <div className="text-right">
          <a href="#" className="text-xs text-slate-400 hover:text-white transition-colors">
            Forgot Password?
          </a>
        </div>

        <Button
          type="submit"
          variant="secondary"
          fullWidth
          loading={authLoading}
          size="lg"
        >
          Login
        </Button>
      </form>

      <p className="text-center text-xs text-slate-400 mt-4">
        Don't have an account?{' '}
        <a href="#" className="text-[#84117C] font-medium hover:underline">
          Sign up
        </a>
      </p>

      {/* Hint for demo */}
      <p className="text-center text-xs text-slate-600 mt-3">
        Demo: student@xebia.com / password123
      </p>
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-64px)] bg-[#1C0B1B] flex items-center overflow-hidden"
    >
      {/* Decorative SVG curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <svg className="absolute w-[150%] h-[150%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-magenta" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Faint circles from the design */}
          <circle cx="1300" cy="200" r="400" fill="none" stroke="#84117C" strokeWidth="2" opacity="0.15" />
          <path d="M -100 800 L 1920 1200" fill="none" stroke="#01AC9F" strokeWidth="1" opacity="0.1" />

          {/* Cyan Curve */}
          <path d="M 600 -100 C 1300 300, 300 700, 1100 1200" fill="none" stroke="#01AC9F" strokeWidth="6" filter="url(#glow-cyan)" opacity="0.4" />
          
          {/* Magenta Curve */}
          <path d="M 1100 -100 C 400 300, 1400 700, 500 1200" fill="none" stroke="#84117C" strokeWidth="6" filter="url(#glow-magenta)" opacity="0.4" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: Headline + CTA + stats */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
              Shape Your Future
              <br />
              With Skills that{' '}
              <span className="text-[#84117C]">Matter.</span>
            </h1>
            <p className="text-slate-400 text-base mb-8 max-w-md">
              Learn from industry experts, build real projects, and earn certificates that moves your career forward.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={() => navigate(ROUTES.LOGIN)}
                className="px-6 py-3 bg-[#01AC9F] text-white font-semibold rounded-full hover:bg-[#018076] transition-colors text-sm"
              >
                Explore Courses
              </button>
              <button
                className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors text-sm"
                onClick={() => navigate(ROUTES.LOGIN)}
              >
                View Learning Path
              </button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-6 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-white">10,000</p>
                <p className="text-xs text-slate-500">Learners</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">200</p>
                <p className="text-xs text-slate-500">Expert-lead-courses</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.8/5</p>
                <p className="text-xs text-slate-500">Learning Rate</p>
              </div>
            </div>
          </div>

          {/* Right: Login card */}
          <div className="shrink-0">
            <LoginCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
