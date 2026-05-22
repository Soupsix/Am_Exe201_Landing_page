'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { CustomButton } from '../ui/CustomButton';
import Image from 'next/image';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 18,
      },
    },
  };

  return (
    <section
      id="trang-chu"
      className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans bg-background"
    >
      {/* 
        1. Full-Width Background Image:
        Uses Next.js Image with fill layout for high performance and responsiveness.
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-herbal-warm-pack.jpg"
          alt="Ấm herbal warm pack natural background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none"
        />
        {/* 
          2. Soft Cream + Dark Green Tinted Overlay Gradient:
          Ensures text is fully readable, keeping the top dark for light text and the bottom cream
          to transition seamlessly into the page background.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B463C]/85 via-[#2B463C]/60 to-[#faf9f7] pointer-events-none z-10" />

        {/* Ambient Warm Golden Overlay to emphasize wellness & spa atmosphere */}
        <div className="absolute inset-0 bg-[#688F4E]/10 mix-blend-overlay pointer-events-none z-10" />
      </div>

      {/* Hero Content Container */}
      <div className="max-w-5xl mx-auto px-5 md:px-16 pt-32 pb-24 text-center z-20 relative flex flex-col items-center justify-center min-h-screen">

        <motion.div
          className="flex flex-col items-center space-y-12 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* 
            3. Centered, Very Large, Visually Dominant Title "Ấm":
            Playfair/Serif look created using local typographic setup.
          */}
          <motion.div variants={itemVariants} className="relative select-none">
            <h1 className="mt-14 text-8xl sm:text-[10rem] md:text-[15rem] lg:text-[18rem] font-bold tracking-widest text-[#faf9f7] uppercase leading-none filter drop-shadow-[0_10px_35px_rgba(20,48,38,0.25)]">
              Ấm
            </h1>
            {/* Elegant organic glow effect behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#B1D182]/20 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* 
            4. Lower Placed Subheadline, Description & Buttons with generous spacing:
            Visually separated from "Ấm" to emphasize luxury and calm.
          */}
          <div className="space-y-6 max-w-3xl pt-6">
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight filter drop-shadow-sm max-w-2xl mx-auto"
            >
              Túi chườm thảo mộc mang hơi ấm dịu dàng từ thiên nhiên
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#faf9f7]/90 leading-relaxed max-w-2xl mx-auto font-normal filter drop-shadow-sm"
            >
              Nơi tìm thấy sự tĩnh tại giữa cuộc sống hối hả. Những túi chườm thủ công được ướp hương thảo mộc Việt, ôm áp cơ thể bạn bằng nhiệt lượng chữa lành.
            </motion.p>
          </div>

          {/* Action CTAs using existing custom Button Component */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-6"
          >
            <a
              href="https://zalo.me/0987654321"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <CustomButton
                size="lg"
                className="w-full sm:w-auto gap-2.5 rounded-full bg-primary text-background border-primary hover:bg-primary-container shadow-diffused-md"
              >
                <MessageSquare size={18} /> Đặt hàng qua Zalo
              </CustomButton>
            </a>

            <a
              href="#san-pham"
              className="w-full sm:w-auto"
            >
              <CustomButton
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto gap-2.5 rounded-full border-white text-white hover:bg-[#faf9f7] hover:text-[#2B463C] hover:border-[#faf9f7] shadow-diffused-sm"
              >
                Tìm hiểu thêm <ArrowRight size={18} />
              </CustomButton>
            </a>
          </motion.div>

        </motion.div>

      </div>

      {/* Elegant traditional bottom wave transition overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#faf9f7] to-transparent pointer-events-none z-10" />
    </section>
  );
}
