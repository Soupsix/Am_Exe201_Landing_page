'use client';

import * as React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import BrandStorySection from '@/components/sections/BrandStorySection';
import ProductSection from '@/components/sections/ProductSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import HowToUseSection from '@/components/sections/HowToUseSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ZaloCTASection from '@/components/sections/ZaloCTASection';
import ContactSection from '@/components/sections/ContactSection';
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-background selection:bg-primary selection:text-background relative">
      <Analytics />
      {/* 
        Tactile Overlay:
        This adds a gorgeous subtle paper/cotton fiber grid texture to the entire landing page, 
        giving it a tactile, handmade, and extremely premium organic feel.
      */}
      <div className="absolute inset-0 tactile-overlay pointer-events-none z-0 opacity-80" />

      {/* Main Navigation Header */}
      <Header />

      {/* Sections Wrapper */}
      <main className="flex-grow z-10 relative">

        {/* 1. Hero Introduction */}
        <HeroSection />

        {/* 2. Brand Narrative & Inspiration */}
        <BrandStorySection />

        {/* 3. Products Catalog with filters & ingredients */}
        <ProductSection />

        {/* 4. Herbal Health Benefits Grid */}
        <BenefitsSection />

        {/* 5. Therapy Timeline & Accordion FAQs */}
        <HowToUseSection />

        {/* 6. Why Choose Us (UVP) */}
        <WhyChooseUsSection />

        {/* 7. Warm Customer Reviews */}
        <TestimonialSection />

        {/* 8. Conversion Zalo QR Scanner Board */}
        <ZaloCTASection />

        {/* 9. Communication Details & Form */}
        <ContactSection />

      </main>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
}
