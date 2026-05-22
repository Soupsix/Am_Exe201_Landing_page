'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, Heart, Sun, Activity, Eye } from 'lucide-react';
import { BENEFITS } from '@/data/herbalData';

export default function BenefitsSection() {
  const icons = [
    <Activity key="0" className="text-secondary w-6 h-6" />,
    <Eye key="1" className="text-secondary w-6 h-6" />,
    <Sparkles key="2" className="text-secondary w-6 h-6" />,
    <Leaf key="3" className="text-secondary w-6 h-6" />,
    <Heart key="4" className="text-secondary w-6 h-6" />,
    <Sun key="5" className="text-secondary w-6 h-6" />,
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="loi-ich"
      className="py-20 md:py-28 bg-surface-low border-y border-outline-variant/20 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 space-y-16">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Hiệu quả chữa lành
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Lợi ích tuyệt diệu của Ấm
          </h2>
          <p className="text-onBackground/70 text-base leading-relaxed">
            Hơi ấm nam dược không chỉ xua tan đau nhức bên ngoài, mà còn tưới mát và khơi dậy năng lượng thư thái, an lành sâu thẳm trong tâm hồn bạn.
          </p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              className="bg-background rounded-3xl p-8 border border-outline-variant/20 hover:border-secondary/30 shadow-diffused-sm hover:shadow-diffused-md transition-all duration-300 flex flex-col items-start space-y-4"
            >
              {/* Icon round frame */}
              <div className="p-3 bg-secondary-container/40 rounded-2xl border border-secondary-container/20 flex items-center justify-center">
                {icons[index] || <Leaf className="text-secondary w-6 h-6" />}
              </div>

              {/* Title & Desc */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-primary tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-onBackground/75 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
