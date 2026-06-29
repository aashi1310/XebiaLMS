/**
 * LoginPage.jsx
 *
 * Standalone login page route (/login).
 * Left: Quote + form. Right: Illustration section with user roles.
 * Matches the reference: https://lms-xebia-mac.onrender.com (login page)
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RiGithubFill, RiGoogleFill, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';
import { useUI } from '../../context/UIContext';
import { ROUTES } from '../../constants/routes';

const LoginPage = () => {
  const { login, authLoading, authError } = useAuth();
  const { isDark, toggleDark } = useUI();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate(ROUTES.DASHBOARD);
  };

  const inputClass =
    'w-full px-4 py-3 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#6C1D5F] transition-colors';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">

      {/* Left: Form panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-10 max-w-xl">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="text-2xl font-black text-[#84117C] mb-10 block">
          Xebia
        </Link>

        {/* Quote */}
        <h1 className="text-lg font-bold text-[#6C1D5F] mb-1">
          "Learn coding, design, and more from the best in the industry."
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Welcome back! Please login to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className={inputClass}
              aria-label="Email Address"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="········"
                required
                className={`${inputClass} pr-10`}
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 accent-[#6C1D5F]"
              />
              Remember Me
            </label>
            <a href="#" className="text-sm text-[#6C1D5F] hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Error */}
          {authError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-xs text-red-600 dark:text-red-400">{authError}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 bg-[#6C1D5F] hover:bg-[#4A1E47] text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {authLoading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            Login
          </button>
        </form>

        {/* Social login */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-400">Or login with</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-semibold text-[#6C1D5F] hover:text-[#4A1E47] transition-colors">
            <RiGithubFill className="text-lg" /> GitHub
          </button>
          <button className="flex items-center gap-2 text-sm font-semibold text-[#6C1D5F] hover:text-[#4A1E47] transition-colors">
            <RiGoogleFill className="text-lg" /> Google
          </button>
        </div>

        {/* Demo hint */}
        <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            <strong>Demo credentials:</strong><br />
            Email: student@xebia.com<br />
            Password: password123
          </p>
        </div>
      </div>

      {/* Right: Illustration panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 p-10">
        {/* Role cards */}
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">JOIN AS</p>
        <div className="flex gap-4">
          {[
            { role: 'Client', color: 'bg-[#6C1D5F]', emoji: '👔' },
            { role: 'Trainer', color: 'bg-[#01AC9F]', emoji: '🎓' },
            { role: 'Learner', color: 'bg-green-500', emoji: '📚' },
          ].map(({ role, color, emoji }) => (
            <div
              key={role}
              className="flex flex-col items-center gap-2 w-28 bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700"
            >
              <span className="text-3xl">{emoji}</span>
              <span className={`text-xs font-semibold text-white px-2 py-0.5 rounded-full ${color}`}>
                {role.toUpperCase()}
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{role}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Join <span className="text-[#6C1D5F] font-semibold">10,000+</span> professionals advancing their careers with Xebia's expert-led courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
