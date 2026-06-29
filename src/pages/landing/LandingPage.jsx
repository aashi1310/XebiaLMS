/**
 * LandingPage.jsx
 * Composes all public-facing sections:
 * PublicNavbar → HeroSection → FAQSection → ContactSection → FooterSection
 */

import React from 'react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import HeroSection from './sections/HeroSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

const LandingPage = () => (
  <div className="min-h-screen bg-white dark:bg-[#1C0B1B]">
    <PublicNavbar />
    <HeroSection />
    <FAQSection />
    <ContactSection />
    <FooterSection />
  </div>
);

export default LandingPage;
