'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Heart, Package, Leaf, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US } from '@/data/herbalData';

export default function WhyChooseUsSection() {
  const icons = [
    <Heart key="0" className="text-primary w-6 h-6" />,
    <Package key="1" className="text-primary w-6 h-6" />,
    <Leaf key="2" className="text-primary w-6 h-6" />,
    <Sparkles key="3" className="text-primary w-6 h-6" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 90,
        damping: 18,
      },
    },
  };

  return (
    <section
      id="vi-sao-chon-am"
      className="py-20 md:py-28 bg-surface-low border-y border-outline-variant/20 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 space-y-16">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Giá trị độc bản
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Vì sao bạn nên chọn Ấm?
          </h2>
          <p className="text-onBackground/70 text-base leading-relaxed">
            Chúng tôi chăm sóc bạn bằng việc bảo lưu trọn vẹn tinh hoa nam dược và gói ghém chúng trong những khuôn vải thô lanh tinh tế nhất.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {WHY_CHOOSE_US.map((item, idx) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="bg-background p-8 rounded-[2rem] border border-outline-variant/20 hover:border-secondary/20 shadow-diffused-sm hover:shadow-diffused-md transition-all duration-300 flex items-start gap-5"
            >
              {/* Icon Frame */}
              <div className="p-4 bg-secondary-container/40 rounded-2xl border border-secondary-container/20 flex-shrink-0 flex items-center justify-center">
                {icons[idx]}
              </div>

              {/* Copy */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary tracking-tight leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-onBackground/75 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
