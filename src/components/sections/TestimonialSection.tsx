'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/data/herbalData';

export default function TestimonialSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section
      id="cam-nhan"
      className="py-20 md:py-28 bg-background font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 space-y-16">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Gửi gắm yêu thương
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Cảm nhận từ khách hàng dùng Ấm
          </h2>
          <p className="text-onBackground/70 text-base leading-relaxed">
            Những chia sẻ mộc mạc và chân thành nhất từ những con người đã chạm tay vào hơi ấm dịu dàng của chúng tôi.
          </p>
        </div>

        {/* Testimonials List */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              variants={itemVariants}
              className="bg-surface-low rounded-[2rem] p-8 border border-outline-variant/20 shadow-diffused-sm relative hover:border-secondary/20 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-6 right-8 text-secondary/10 w-16 h-16 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Rating stars */}
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm text-onBackground/80 leading-relaxed italic font-normal">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-outline-variant/30 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-base shadow-diffused-sm uppercase">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm tracking-tight">{t.author}</h4>
                  <p className="text-xs text-onBackground/60 font-medium">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
