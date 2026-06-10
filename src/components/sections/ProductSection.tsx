'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MessageSquare, Tag } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/herbalData';
import { CustomButton } from '../ui/CustomButton';
import Image from 'next/image';

export default function ProductSection() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'Chăm sóc cơ thể', name: 'Chăm sóc cơ thể' },
    { id: 'Chăm sóc đôi mắt', name: 'Chăm sóc đôi mắt' },
    { id: 'Bộ quà tặng ý nghĩa', name: 'Quà tặng ý nghĩa' },
  ];

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <section
      id="san-pham"
      className="py-20 md:py-28 bg-background font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 space-y-12">

        {/* Header Text */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Danh mục sản phẩm
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Sản phẩm từ Tâm của Ấm
          </h2>
          <p className="text-onBackground/70 text-base leading-relaxed">
            Mỗi túi chườm là sự hòa quyện nhịp nhàng của các loài cây thuốc Nam lành tính và chất liệu tự nhiên thô lanh mộc mạc, chăm sóc an toàn cho sức khỏe gia đình bạn.
          </p>
        </div>

        {/* Filters/Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${activeTab === cat.id
                  ? 'bg-primary border-primary text-background shadow-diffused-sm'
                  : 'bg-transparent border-outline-variant/30 text-onBackground/80 hover:bg-surface-low hover:text-primary'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product: Product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-surface-low rounded-[2rem] overflow-hidden border border-outline-variant/20 shadow-diffused-sm hover:shadow-diffused-md transition-shadow duration-300 flex flex-col justify-between"
              >
                {/* Product Image Panel */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Absolute Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1 bg-secondary text-background text-xs font-semibold px-3 py-1 rounded-full shadow-diffused-sm">
                    <Tag size={12} /> {product.tag}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Category & Title */}
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-widest font-bold text-secondary">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-primary tracking-tight leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-onBackground/75 leading-relaxed font-normal">
                      {product.description}
                    </p>

                    {/* Key Benefits (leaf bullet indicators) */}
                    <ul className="space-y-2 pt-2">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-onBackground/80 leading-relaxed font-normal">
                          <Check size={14} className="text-secondary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Ingredients chip tags */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-primary block">Thành phần chính:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.ingredients.map((ing) => (
                          <span
                            key={ing}
                            className="text-[11px] font-semibold bg-secondary-container/40 text-on-secondary-container px-2.5 py-1 rounded-lg border border-secondary-container/20"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-outline-variant/30 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-onBackground/60 uppercase tracking-wider font-semibold">Giá trị trị liệu</span>
                      <div className="flex items-center gap-2">
                        {product.originalPrice && (
                          <span className="text-sm text-onBackground/40 line-through font-normal">
                            {product.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold text-primary">
                          {product.price}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="https://zalo.me/0987654321"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <CustomButton fullWidth size="md" className="gap-2 rounded-xl">
                        <MessageSquare size={16} /> Đặt hàng qua Zalo
                      </CustomButton>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
