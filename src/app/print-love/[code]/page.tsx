import { prisma } from "@/lib/prisma";
import QRCode from "qrcode";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PrintButton from "./PrintButton";

export const dynamic = "force-dynamic";

type PrintPageProps = {
  params: {
    code: string;
  };
};

export default async function PrintLoveMessagePage({ params }: PrintPageProps) {
  const code = params.code.toUpperCase();

  const loveMessage = await prisma.loveMessage.findUnique({
    where: { publicCode: code },
  });

  if (!loveMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8ed] px-4 text-[#244434]">
        <section className="max-w-lg rounded-3xl border border-[#eadfca] bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-bold">Không tìm thấy lời chúc</h1>
          <p className="mt-3 text-[#6f7d68]">Mã lời chúc không tồn tại trong hệ thống.</p>
        </section>
      </main>
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
  const viewUrl = `${siteUrl}/love/${loveMessage.publicCode}`;

  const qrCodeDataUrl = await QRCode.toDataURL(viewUrl, {
    margin: 1,
    width: 280,
    color: {
      dark: "#244434",
      light: "#FFFFFF",
    },
  });

  return (
    <main className="min-h-screen bg-[#fff8ed] p-4 md:p-8 text-[#244434] font-sans flex flex-col items-center justify-center print:bg-white print:p-0">
      {/* Controls */}
      <div className="mb-6 w-full max-w-md flex items-center justify-between print:hidden">
        <Link
          href="/quan-tri/tao-loi-chuc"
          className="flex items-center gap-2 text-sm font-semibold text-[#8b6f47] hover:text-[#244434] transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại Quản trị
        </Link>
        <PrintButton />
      </div>

      {/* Printable Card Area */}
      <div className="w-full max-w-md border-2 border-dashed border-[#cdbf9f] bg-white p-8 shadow-2xl rounded-[2rem] text-center print:shadow-none print:border-dashed print:border-[#cdbf9f] print:rounded-none print:max-w-full print:w-[10cm] print:h-[10cm] print:mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6f47]">
          Ấm - Lời nhắn yêu thương
        </p>

        <div className="my-4 h-px bg-gradient-to-r from-transparent via-[#cdbf9f] to-transparent" />

        {/* QR Code Container */}
        <div className="mx-auto my-6 flex h-48 w-48 items-center justify-center border border-[#eadfca] bg-[#fff8ed] p-2 rounded-2xl">
          <img src={qrCodeDataUrl} alt="QR Code" className="h-full w-full object-contain" />
        </div>

        {/* Card info */}
        <p className="text-xs text-[#6f7d68] tracking-wider uppercase">Mã quét lời chúc</p>
        <p className="text-xl font-black tracking-widest text-[#244434] mt-0.5">{loveMessage.publicCode}</p>

        <div className="mt-6 text-xs text-[#6f7d68] space-y-1">
          <p>Gửi: <span className="font-semibold text-[#244434]">{loveMessage.receiverName}</span></p>
          <p>Từ: <span className="font-semibold text-[#244434]">{loveMessage.senderName}</span></p>
        </div>

        <p className="mt-8 text-[10px] text-[#8b6f47] leading-relaxed border-t border-[#eadfca] pt-4">
          Quét mã QR để đọc lời yêu thương cá nhân hóa dành riêng cho bạn.
        </p>
      </div>
    </main>
  );
}
