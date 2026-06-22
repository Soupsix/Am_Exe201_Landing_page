'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Mail, Send, Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', product: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.product) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', product: '', note: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      } else {
        setError(result.error || 'Có lỗi xảy ra, vui lòng thử lại sau.');
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="lien-he"
      className="py-20 md:py-28 bg-background font-sans overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-16 space-y-16">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Kênh liên hệ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Gửi yêu cầu tới Ấm
          </h2>
          <p className="text-onBackground/70 text-base leading-relaxed">
            Nếu bạn có bất cứ câu hỏi nào về liều lượng thảo dược, cách sử dụng hoặc muốn đặt các bộ quà tặng đan tre đặc biệt, hãy gửi thông tin cho Ấm nhé!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Details */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary tracking-tight">
                Xưởng Thảo Mộc Ấm
              </h3>
              <p className="text-sm text-onBackground/75 leading-relaxed font-normal">
                Địa điểm gìn giữ công thức sấy khô thủ công và dệt bông tự nhiên. Nơi chúng tôi chắt chiu từng hạt muồng, nhành ngải cứu tươi để đưa vào các túi chườm tinh xảo gửi tới bạn.
              </p>
            </div>

            {/* List details */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container/40 rounded-xl text-primary flex-shrink-0 flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Địa chỉ xưởng cốt</h4>
                  <p className="text-xs text-onBackground/70 font-semibold mt-0.5">Số 18, ngõ 84, phố Láng Hạ, Đống Đa, Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container/40 rounded-xl text-primary flex-shrink-0 flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Hotline đặt quà</h4>
                  <p className="text-xs text-onBackground/70 font-semibold mt-0.5">0987.654.321 (Tư vấn 8:00 - 21:00 hàng ngày)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary-container/40 rounded-xl text-primary flex-shrink-0 flex items-center justify-center">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">Kênh trực tuyến duy nhất</h4>
                  <p className="text-xs text-onBackground/70 font-semibold mt-0.5">Zalo chat trực tiếp với tư vấn viên hỗ trợ 24/7</p>
                </div>
              </div>
            </div>

            {/* Cultural signature note */}
            <div className="p-5 bg-surface-low border border-dashed border-secondary/30 rounded-2xl">
              <p className="text-xs italic text-primary/80 leading-relaxed font-normal">
                &ldquo;Mỗi chiếc túi chườm trao đi, chúng tôi mong gửi trọn lời chúc an nhiên bình dị và sức khỏe tròn đầy tới gia đình bạn.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right Column: Mini Contact Form */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-surface-low rounded-[2rem] p-8 md:p-10 border border-outline-variant/20 shadow-diffused-sm relative">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary text-background flex items-center justify-center shadow-diffused-md animate-bounce">
                    <Check size={28} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-primary">Gửi thành công!</h3>
                    <p className="text-xs text-onBackground/60 font-semibold">Cảm ơn bạn đã chia sẻ, Ấm sẽ liên lạc qua Zalo/Hotline hỗ trợ ngay.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-primary tracking-tight">Để lại thông tin</h3>
                  
                  <div className="space-y-4">
                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide block">Họ & Tên bạn *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      />
                    </div>

                    {/* Phone input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide block">Số điện thoại / Zalo của bạn *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="09xx xxx xxx"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                      />
                    </div>

                    {/* Product dropdown select */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide block">Sản phẩm bạn quan tâm *</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.product}
                          onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                          className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans appearance-none text-onBackground"
                        >
                          <option value="" disabled>Chọn sản phẩm...</option>
                          <option value="Túi Chườm Thảo Mộc">Túi Chườm Thảo Mộc</option>
                          <option value="Túi Chườm Mắt Thảo Mộc">Túi Chườm Mắt Thảo Mộc</option>
                          <option value="Quà Tặng">Quà Tặng</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-onBackground/50">
                          <ChevronDown size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Note input */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-primary tracking-wide block">Ghi chú (Tình trạng đau nhức / Sản phẩm quan tâm)</label>
                      <textarea
                        rows={3}
                        value={formData.note}
                        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                        placeholder="Tôi muốn được tư vấn túi chườm mắt thảo mộc cho học sinh giảm áp lực thi cử..."
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans resize-none"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs font-semibold text-red-500 px-1">
                      ⚠️ {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary text-background hover:bg-primary-container rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-diffused-sm focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        Đang gửi thông tin...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Gửi thông tin đăng ký tư vấn
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
