'use client';

import * as React from 'react';
import { Leaf, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-background border-t border-primary-container font-sans relative overflow-hidden">
      {/* Decorative leaf watermarks */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-16 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-6">
            <a
              href="#trang-chu"
              className="text-2xl font-bold tracking-widest text-background flex items-center gap-2"
            >
              <span className="inline-block w-8 h-8 rounded-full bg-background text-primary flex items-center justify-center font-serif text-lg leading-none">
                Ấ
              </span>
              <span className="uppercase text-xl font-bold tracking-wider">Ấm</span>
            </a>
            <p className="text-primary-onContainer text-base max-w-sm leading-relaxed">
              Thương hiệu túi chườm thảo mộc 100% tự nhiên của Việt Nam. Được tạo tác tỉ mỉ từ lòng trân quý sức khỏe và tinh hoa y học cổ truyền dân tộc.
            </p>
            <div className="flex items-center gap-2 text-secondary-container/80 text-sm">
              <Leaf size={14} className="text-secondary-container" />
              <span>Sức khỏe xanh - Tự nhiên lành - Trao gửi yêu thương</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg tracking-wide border-b border-primary-container pb-2 text-background/90">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Trang chủ', href: '#trang-chu' },
                { name: 'Câu chuyện', href: '#cau-chuyen' },
                { name: 'Sản phẩm của Ấm', href: '#san-pham' },
                { name: 'Lợi ích tự nhiên', href: '#loi-ich' },
                { name: 'Cách dùng an toàn', href: '#cach-dung' },
                { name: 'Đặt hàng nhanh Zalo', href: '#zalo-cta' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-onContainer hover:text-background transition-colors text-sm flex items-center gap-1 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-secondary-container">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Care */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg tracking-wide border-b border-primary-container pb-2 text-background/90">
              Lưu ý bảo quản
            </h3>
            <ul className="space-y-3 text-sm text-primary-onContainer leading-relaxed">
              <li className="flex gap-2">
                <span className="text-secondary-container">•</span>
                <span>Luôn bảo quản túi chườm trong túi zip kín đi kèm sau khi nguội hẳn.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary-container">•</span>
                <span>Giữ túi chườm ở nơi khô ráo, tránh ẩm ướt và ánh nắng trực tiếp.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-secondary-container">•</span>
                <span>Không giặt giũ túi chứa dược liệu, chỉ giặt vỏ bọc lanh bên ngoài (nếu có).</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-primary-container/40 my-10" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-onContainer">
          <p>© {currentYear} Ấm - Bản quyền thuộc dự án khởi nghiệp EXE201. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Được dệt từ lòng chân thành <Heart size={12} className="text-red-400 fill-red-400 animate-pulse" /> tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
