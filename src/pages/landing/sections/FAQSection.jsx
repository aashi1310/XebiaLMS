/**
 * FAQSection.jsx
 *
 * FAQ accordion section. Matches reference layout:
 * - Left: "FAQ" badge, "Questions, Answered" purple block, description, "View All FAQs" button
 * - Right: Accordion items with +/- toggle
 */

import React, { useState, useEffect } from 'react';
import { RiAddLine, RiSubtractLine } from 'react-icons/ri';
import { getFAQs } from '../../../services/mockApi';

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div
    className={`border rounded-xl transition-all duration-200 overflow-hidden ${
      isOpen
        ? 'border-[#84117C] bg-white dark:bg-slate-800'
        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
    }`}
  >
    <button
      className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{item.question}</span>
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm transition-colors ${
          isOpen
            ? 'bg-[#6C1D5F] text-white'
            : 'bg-purple-100 dark:bg-purple-900/30 text-[#6C1D5F]'
        }`}
      >
        {isOpen ? <RiSubtractLine /> : <RiAddLine />}
      </span>
    </button>
    {isOpen && (
      <div className="px-5 pb-4">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.answer}</p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(1); // First item open by default

  useEffect(() => {
    getFAQs().then(({ data }) => setFaqs(data));
  }, []);

  return (
    <section id="faq" className="py-16 bg-slate-50 dark:bg-[#0D0818]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left panel */}
          <div className="lg:w-[320px] shrink-0">
            {/* FAQ badge */}
            <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-[#84117C] text-xs font-semibold rounded-full mb-4">
              FAQ
            </span>

            {/* Headline block */}
            <div className="bg-[#6C1D5F] text-white rounded-xl px-5 py-3 inline-block mb-4">
              <h2 className="text-2xl font-black leading-tight">Questions,<br />Answered</h2>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Everything you need to know before you start learning with Xebia Skill.
            </p>

            <button className="px-5 py-2.5 border border-[#6C1D5F] text-[#6C1D5F] text-sm font-medium rounded-full hover:bg-[#6C1D5F] hover:text-white transition-colors">
              View All FAQs
            </button>
          </div>

          {/* Right: Accordion */}
          <div className="flex-1 space-y-3">
            {faqs.map(faq => (
              <FAQItem
                key={faq.id}
                item={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
