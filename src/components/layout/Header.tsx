'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Menu, X, ExternalLink, QrCode } from 'lucide-react';
import { CustomButton } from '../ui/CustomButton';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll state to apply glassmorphic styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Trang chủ', href: '#trang-chu' },
    { name: 'Câu chuyện', href: '#cau-chuyen' },
    { name: 'Sản phẩm', href: '#san-pham' },
    { name: 'Lợi ích', href: '#loi-ich' },
    { name: 'Cách dùng', href: '#cach-dung' },
    { name: 'Liên hệ', href: '#lien-he' },
  ];

  const isDarkText = isScrolled || isOpen;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans border-b border-transparent',
          isScrolled || isOpen
            ? 'bg-background/80 backdrop-blur-md shadow-diffused-sm border-outline-variant/30 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#trang-chu"
            onClick={() => setIsOpen(false)}
            className={cn(
              "text-2xl font-bold tracking-widest hover:opacity-80 transition-colors duration-500 flex items-center gap-2",
              isDarkText ? "text-primary" : "text-white"
            )}
          >
            <span className={cn(
              "inline-block w-8 h-8 rounded-full flex items-center justify-center font-serif text-lg leading-none shadow-diffused-sm transition-colors duration-500",
              isDarkText ? "bg-primary text-background" : "bg-white text-primary"
            )}>
              Ấ
            </span>
            <span className="font-sans uppercase text-xl font-bold tracking-wider">Ấm</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium text-sm transition-colors duration-500 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full",
                  isDarkText 
                    ? "text-onBackground/80 hover:text-primary after:bg-primary" 
                    : "text-white/90 hover:text-white after:bg-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="/loi-chuc-qr">
              <CustomButton 
                size="sm" 
                variant="secondary"
                className={cn(
                  "gap-2 rounded-full transition-colors duration-500",
                  !isDarkText && "bg-transparent text-white hover:bg-white/10 border-white"
                )}
              >
                <QrCode size={14} /> Lời chúc QR
              </CustomButton>
            </a>
            <a href="https://zalo.me/0987654321" target="_blank" rel="noopener noreferrer">
              <CustomButton 
                size="sm" 
                className={cn(
                  "gap-2 rounded-full transition-colors duration-500",
                  !isDarkText && "bg-white text-primary hover:bg-white/90 border-white"
                )}
              >
                Tư vấn Zalo <ExternalLink size={14} />
              </CustomButton>
            </a>
          </div>

          {/* Mobile Menu Toggle & Actions */}
          <div className="flex md:hidden items-center gap-2">
            <a href="/loi-chuc-qr" aria-label="Lời chúc QR">
              <CustomButton
                size="sm"
                variant="ghost"
                className={cn(
                  "p-2 min-h-0 min-w-0 border-transparent rounded-full transition-colors duration-500",
                  isDarkText ? "text-primary hover:bg-surface-low" : "text-white hover:bg-white/10"
                )}
              >
                <QrCode size={20} />
              </CustomButton>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "md:hidden p-2 focus:outline-none transition-colors duration-500 relative z-50",
                isDarkText ? "text-primary" : "text-white"
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/98 backdrop-blur-xl animate-fade-in flex flex-col pt-[100px] px-6 pb-8 overflow-y-auto">
          <nav className="flex flex-col gap-2 text-center flex-grow">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-semibold text-onBackground/90 hover:text-primary py-4 border-b border-outline-variant/20 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="mt-auto pt-8 flex flex-col gap-3">
              <a
                href="/loi-chuc-qr"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <CustomButton fullWidth variant="secondary" size="lg" className="gap-2 rounded-xl h-14 text-lg">
                  <QrCode size={18} /> Lời chúc QR
                </CustomButton>
              </a>
              <a
                href="https://zalo.me/0987654321"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <CustomButton fullWidth size="lg" className="gap-2 rounded-xl shadow-diffused-md h-14 text-lg">
                  Tư vấn Zalo <ExternalLink size={18} />
                </CustomButton>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
