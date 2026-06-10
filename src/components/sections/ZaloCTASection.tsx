'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Copy, Check, QrCode } from 'lucide-react';
import { CustomButton } from '../ui/CustomButton';

export default function ZaloCTASection() {
  const [copied, setCopied] = useState(false);
  const zaloPhone = '0353923012';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(zaloPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset after 3s
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <section
      id="zalo-cta"
      className="py-20 md:py-28 bg-surface-low border-y border-outline-variant/20 font-sans overflow-hidden relative"
    >
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-secondary/5 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-5 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-background rounded-[3rem] p-8 md:p-16 border border-outline-variant/20 shadow-diffused-lg flex flex-col md:flex-row gap-12 items-center justify-between text-center md:text-left"
        >

          {/* Left Side: Call to action */}
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary bg-secondary-container/50 px-3 py-1 rounded-full border border-secondary-container/30">
                Đặt hàng trực tiếp
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary leading-tight">
                Kết nối Zalo với Ấm
              </h2>
            </div>

            <p className="text-sm md:text-base text-onBackground/80 leading-relaxed font-normal">
              Ấm không dùng hệ thống thanh toán tự động vô hồn. Chúng tôi muốn lắng nghe từng chia sẻ, tư vấn tận tâm cho tình trạng đau nhức của bạn hoặc bọc gói món quà tre đan xinh xắn theo đúng tâm tình bạn gửi trao.
            </p>

            {/* Interactive Copy Phone Number panel */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="w-full sm:w-auto bg-surface-low border border-outline-variant/30 px-5 py-3 rounded-xl flex items-center justify-between sm:justify-start gap-4">
                <span className="text-xs text-onBackground/50 font-bold uppercase tracking-widest">SĐT Zalo:</span>
                <span className="font-mono text-base font-bold text-primary">{zaloPhone}</span>
              </div>
              <button
                onClick={handleCopy}
                className="w-full sm:w-auto px-5 py-3 bg-secondary text-background rounded-xl hover:bg-secondary/90 transition-colors font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                {copied ? (
                  <>
                    <Check size={16} /> Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Sao chép số điện thoại
                  </>
                )}
              </button>
            </div>

            {/* Large Chat button */}
            <div className="pt-2">
              <a
                href={`https://zalo.me/${zaloPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full sm:w-auto"
              >
                <CustomButton size="lg" className="w-full sm:w-auto gap-2 rounded-xl">
                  <MessageSquare size={20} /> Trò chuyện qua Zalo tư vấn
                </CustomButton>
              </a>
            </div>
          </div>

          {/* Right Side: Elegant QR Scanner Box */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="relative p-6 bg-background rounded-3xl border border-outline-variant/30 shadow-diffused-md">
              {/* Wood frame decorations */}
              <div className="absolute inset-2 border border-dashed border-secondary/30 rounded-2xl pointer-events-none" />

              {/* QR Code Placeholder with fine graphic lines */}
              <div className="w-40 h-40 bg-surface-low rounded-xl border border-outline-variant/20 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                <QrCode size={96} className="text-primary opacity-90" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-primary/70 relative z-10">Quét Mã Zalo</span>
              </div>
            </div>

            <p className="text-xs text-onBackground/60 font-semibold italic">
              Quét mã QR bằng điện thoại để kết nối ngay
            </p>
          </div>

        </motion.div>
      </div>

      {/* Reactive Success Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-primary text-background border border-primary-container px-6 py-3.5 rounded-full shadow-diffused-lg flex items-center gap-2.5 z-50 text-sm font-semibold tracking-wide font-sans"
          >
            <span className="w-5 h-5 rounded-full bg-secondary text-background flex items-center justify-center">
              <Check size={12} />
            </span>
            <span>Số điện thoại Zalo của Ấm đã được sao chép vào khay nhớ tạm!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
