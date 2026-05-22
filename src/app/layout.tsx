import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Ấm - Túi chườm thảo mộc mang hơi ấm dịu dàng',
  description: 'Ấm cung cấp túi chườm nóng và túi chườm mắt thảo mộc tự nhiên lấy cảm hứng từ y học cổ truyền Việt Nam, giúp cơ thể và tinh thần bạn được xoa dịu dịu lành.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${jakarta.variable} scroll-smooth`}>
      <body className="bg-background text-onBackground font-sans antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
