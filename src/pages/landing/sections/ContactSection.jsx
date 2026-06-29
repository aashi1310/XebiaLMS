/**
 * ContactSection.jsx
 *
 * Contact form section. Matches reference layout:
 * - Centered heading: "Let's Build Your Next Skill."
 * - Left: Contact form (First Name, Last Name, Email, Phone, Subject, Message, Send button)
 * - Right: Contact info cards (Email Us, Call Us, Visit Us) in deep purple
 */

import React, { useState } from 'react';
import { RiMailLine, RiPhoneLine, RiMapPinLine } from 'react-icons/ri';

const ContactInfoCard = ({ icon: Icon, title, value }) => (
  <div className="bg-gradient-to-br from-[#6C1D5F] to-[#9333EA] text-white rounded-xl p-5">
    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
      <Icon className="text-lg text-white" />
    </div>
    <p className="font-semibold text-sm mb-1">{title}</p>
    <p className="text-sm text-purple-200">{value}</p>
  </div>
);

const ContactSection = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission — just show success state
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputClass =
    'w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#6C1D5F] transition-colors';

  return (
    <section id="contact" className="py-16 bg-white dark:bg-[#1C0B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white">
            Let's Build Your Next{' '}
            <span className="inline-block bg-[#6C1D5F] text-white px-3 rounded-lg">Skill.</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
            Have questions about courses, learning paths, or team training? We're here to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact form */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            {submitted && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl text-sm">
                Message sent! We'll get back to you shortly.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">First Name</label>
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">Last Name</label>
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#01AC9F] hover:bg-[#018076] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info cards */}
          <div className="lg:w-72 space-y-4">
            <ContactInfoCard icon={RiMailLine} title="Email Us" value="support@xebia.com" />
            <ContactInfoCard icon={RiPhoneLine} title="Call Us" value="+91 98765 43210" />
            <ContactInfoCard icon={RiMapPinLine} title="Visit Us" value="Chandigarh, India" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
