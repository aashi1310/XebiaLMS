/**
 * FooterSection.jsx
 * Site footer matching the reference:
 * Xebia brand + tagline | Explore | Company | Legal columns
 */

import React from 'react';

const FooterSection = () => (
  <footer className="bg-slate-100 dark:bg-[#08050F] border-t border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand */}
        <div className="lg:col-span-1">
          <span className="text-2xl font-black text-[#84117C]">Xebia</span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-[220px] leading-relaxed">
            Empowering professionals with practical, industry-ready learning experiences.
          </p>
        </div>

        {/* Explore */}
        <div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-3">Explore</p>
          <ul className="space-y-2">
            {['Courses', 'Learning Paths', 'Certifications'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#6C1D5F] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-3">Company</p>
          <ul className="space-y-2">
            {['About Us', 'Contact', 'Careers'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#6C1D5F] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wide mb-3">Legal</p>
          <ul className="space-y-2">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(item => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-[#6C1D5F] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} Xebia. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
