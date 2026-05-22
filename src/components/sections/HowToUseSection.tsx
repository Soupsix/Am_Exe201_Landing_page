'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Clock, RefreshCw, Snowflake, ChevronDown } from 'lucide-react';
import { STEPS } from '@/data/herbalData';

export default function HowToUseSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Quay nóng bằng lò vi sóng trong bao lâu là tốt nhất?',
      a: 'Với túi chườm vai gáy/toàn thân, hãy quay ở mức công suất trung bình (Microwave 800W) từ 1.5 - 2 phút. Với túi chườm mắt thảo mộc nhỏ gọn hơn, chỉ cần quay từ 20 - 30 giây để đạt nhiệt độ ấm dịu nhẹ thích hợp.',
      icon: <Clock size={18} className="text-secondary" />
    },
    {
      q: 'Tôi không có lò vi sóng thì làm nóng bằng cách nào?',
      a: 'Bạn có thể hấp cách thủy túi thảo mộc trong 5 phút. Trước khi đặt vào nồi hấp, nhớ bọc kín túi chườm trong một chiếc khăn khô hoặc túi zip chuyên dụng chịu nhiệt để nước ngưng tụ không làm ướt dược thảo bên trong.',
      icon: <Flame size={18} className="text-secondary" />
    },
    {
      q: 'Mỗi túi chườm thảo mộc dùng được bao nhiêu lần?',
      a: 'Mỗi sản phẩm có thời hạn sử dụng tối ưu lên đến 200 - 300 lần làm nóng (tương đương 6 - 9 tháng sử dụng thường xuyên). Sau thời gian này, lượng tinh dầu tự nhiên trong hạt thảo mộc sẽ bay bớt, tuy nhiên bạn vẫn có thể tận dụng chườm ấm cơ thể vô cùng tốt.',
      icon: <RefreshCw size={18} className="text-secondary" />
    },
    {
      q: 'Ấm có chườm lạnh được không?',
      a: 'Hoàn toàn được! Để chườm lạnh làm dịu vùng sưng, giảm ngứa mắt hoặc hạ sốt: bọc kín túi chườm trong túi zip kín rồi đặt vào ngăn đá tủ lạnh từ 15 - 20 phút trước khi áp chườm thư giãn.',
      icon: <Snowflake size={18} className="text-secondary" />
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section
      id="cach-dung"
      className="py-20 md:py-28 bg-background font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 space-y-16">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Hướng dẫn trị liệu
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Sử dụng Ấm đúng cách
          </h2>
          <p className="text-onBackground/70 text-base leading-relaxed">
            Chỉ với vài thao tác đơn giản, bạn sẽ kích hoạt trọn vẹn dược tính tự nhiên của túi chườm thảo mộc để vỗ về cơ thể nhức mỏi.
          </p>
        </div>

        {/* Timeline Steps (Desktop/Horizontal, Mobile/Vertical) */}
        <div className="relative pt-6">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-secondary-container/40 -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 relative z-10">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-surface-low p-8 rounded-[2rem] border border-outline-variant/20 hover:border-secondary/20 shadow-diffused-sm space-y-4 relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                {/* Step Circle Badge */}
                <div className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-bold text-lg shadow-diffused-sm">
                  {step.number}
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-primary text-base leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-onBackground/75 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accordions / Frequently Asked Questions */}
        <div className="max-w-3xl mx-auto pt-10 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-xl font-bold text-primary tracking-tight">Giải đáp thắc mắc chườm ấm</h3>
            <p className="text-xs text-onBackground/60 font-semibold">Để trải nghiệm chườm thảo mộc của bạn trọn vẹn an toàn nhất</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-surface-low border border-outline-variant/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-diffused-sm"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-surface-container/30 transition-colors focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      {faq.icon}
                      <span className="font-bold text-sm md:text-base text-primary">
                        {faq.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary flex-shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-1 text-sm text-onBackground/80 border-t border-outline-variant/10 leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
