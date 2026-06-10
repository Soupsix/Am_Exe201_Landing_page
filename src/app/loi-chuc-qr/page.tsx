"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QrCode, Plus, Eye, Edit2, ArrowLeft } from "lucide-react";

export default function LoiChucQrPage() {
  const router = useRouter();
  
  // States for View card
  const [publicCode, setPublicCode] = useState("");
  const [viewError, setViewError] = useState("");

  // States for Edit card
  const [editUrl, setEditUrl] = useState("");
  const [editError, setEditError] = useState("");

  const handleView = (e: React.FormEvent) => {
    e.preventDefault();
    setViewError("");
    const code = publicCode.trim().toUpperCase();
    if (!code) {
      setViewError("Vui lòng nhập mã lời chúc.");
      return;
    }
    router.push(`/love/${code}`);
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditError("");
    const url = editUrl.trim();
    if (!url) {
      setEditError("Vui lòng nhập link chỉnh sửa.");
      return;
    }

    if (url.includes("/edit/") && url.includes("token=")) {
      try {
        if (url.startsWith("http://") || url.startsWith("https://")) {
          const urlObj = new URL(url);
          router.push(urlObj.pathname + urlObj.search);
        } else {
          router.push(url);
        }
      } catch (err) {
        router.push(url);
      }
    } else {
      setEditError("Vui lòng sử dụng link chỉnh sửa được cung cấp sau khi tạo lời chúc.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-12 text-[#244434] font-sans">
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#8b6f47] hover:text-[#244434] transition-colors"
        >
          <ArrowLeft size={16} /> Trở về Trang chủ
        </button>

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#244434]/5 text-[#244434]">
            <QrCode size={32} />
          </div>
          <h1 className="text-3xl font-bold md:text-5xl tracking-tight">Lời chúc QR yêu thương</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[#6f7d68]">
            Tạo, xem hoặc chỉnh sửa lời nhắn cá nhân hóa cho món quà của bạn.
          </p>
        </div>

        {/* Cards Layout */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
          {/* Card 2: Xem Lời Chúc */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#eadfca] bg-white p-6 shadow-xl shadow-[#dbcaa8]/10 hover:shadow-2xl transition duration-300">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff2db] text-[#8b6f47]">
                <Eye size={24} />
              </div>
              <h2 className="text-xl font-bold">Xem lời chúc</h2>
              <p className="mt-3 text-sm text-[#6f7d68] leading-relaxed">
                Xem lại lời nhắn yêu thương bằng cách nhập mã quà tặng.
              </p>
              
              <form onSubmit={handleView} className="mt-4">
                <input
                  type="text"
                  placeholder="Ví dụ: AB12CD"
                  value={publicCode}
                  onChange={(e) => setPublicCode(e.target.value)}
                  className="w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#244434]/20"
                />
                {viewError && (
                  <p className="mt-2 text-xs text-red-600 font-medium">{viewError}</p>
                )}
              </form>
            </div>
            <div className="mt-6">
              <button
                onClick={handleView}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#244434] px-4 py-3 font-bold text-[#244434] transition hover:bg-[#244434]/5"
              >
                Xem lời chúc
              </button>
            </div>
          </div>

          {/* Card 3: Sửa Lời Chúc */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#eadfca] bg-white p-6 shadow-xl shadow-[#dbcaa8]/10 hover:shadow-2xl transition duration-300">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e6effc] text-[#3178c6]">
                <Edit2 size={24} />
              </div>
              <h2 className="text-xl font-bold">Sửa lời chúc</h2>
              <p className="mt-3 text-sm text-[#6f7d68] leading-relaxed">
                Dán link chỉnh sửa để cập nhật nội dung thiệp.
              </p>

              <form onSubmit={handleEdit} className="mt-4">
                <input
                  type="text"
                  placeholder="Dán link /edit/[code]?token=..."
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#244434]/20"
                />
                {editError && (
                  <p className="mt-2 text-xs text-red-600 font-medium leading-relaxed">{editError}</p>
                )}
              </form>
            </div>
            <div className="mt-6">
              <button
                onClick={handleEdit}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#244434] px-4 py-3 font-bold text-[#244434] transition hover:bg-[#244434]/5"
              >
                Chỉnh sửa
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
