'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export default function BrandStorySection() {
  return (
    <section
      id="cau-chuyen"
      className="py-20 md:py-28 bg-surface-low border-y border-outline-variant/20 font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Image Stack */}
        <motion.div
          className="lg:col-span-6 relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Visual */}
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-diffused-md border border-outline-variant/30">
            <Image
              src="/images/brand_story_section.png"
              alt="Ấm herbal ingredients story"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Overlapping Secondary Card */}
          <motion.div
            className="absolute bottom-[-40px] right-[-20px] md:right-[-40px] w-[50%] bg-background p-6 rounded-2xl border border-outline-variant/30 shadow-diffused-lg hidden sm:block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Quote className="text-secondary/30 mb-2 w-8 h-8" />
            <p className="text-xs italic text-onBackground/80 leading-relaxed">
              &ldquo;Ấm nảy nở từ mong ước gửi trọn sự nâng niu mộc mạc tới người thương yêu sau chuỗi ngày dài mỏi mệt.&rdquo;
            </p>
          </motion.div>
        </motion.div>

        {/* Right Column: Brand narrative */}
        <motion.div
          className="lg:col-span-6 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
              Nguồn cảm hứng
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary leading-tight">
              Câu chuyện của Ấm
            </h2>
          </div>

          <div className="space-y-4 text-onBackground/80 leading-relaxed text-base font-normal">
            <p>
              Tên gọi <strong className="text-primary font-semibold">&ldquo;Ấm&rdquo;</strong> giản dị vô cùng, thuần phác ngôn ngữ Việt. Chữ &ldquo;Ấm&rdquo; gợi mở sự dễ chịu của dòng nhiệt nóng, sự thảnh thơi vỗ về và cảm giác an toàn che chở khi được quan tâm săn sóc.
            </p>
            <p>
              Xuất phát từ nét văn hóa trị liệu cổ truyền Việt Nam, chúng tôi kết tinh 9 vị nam dược organic quý giá—bao gồm ngải cứu xanh khô, sả thanh thơm dịu, vỏ quế chi nồng nàn và hoa cúc nụ thảo dã ngoại dệt nên những chiếc túi chườm sinh học mộc mạc.
            </p>
            <p>
              Không chứa bất kỳ chất bảo quản công nghiệp nào, mỗi túi chườm của Ấm là sản phẩm dệt khâu tỉ mỉ hoàn chỉnh từ sợi cotton thô lanh mịn màng. Khi làm nóng, hơi nước ẩm bốc lên thấm sâu mang theo dược tính thảo dược nhẹ nhàng tháo gỡ từng nút thắt cơ học căng cứng trên cơ thể và thư giãn từng dây thần kinh nhỏ nơi đôi mắt mỏi mệt.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <span className="h-[1px] w-12 bg-secondary" />
            <span className="font-serif italic text-primary font-medium text-lg">Hơi ấm Việt - Tình thương Việt</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
