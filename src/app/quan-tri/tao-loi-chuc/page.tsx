"use client";

import { useState } from "react";
import { QrCode, ArrowLeft, Copy, Printer, Check } from "lucide-react";
import Link from "next/link";

type CreateResult = {
  publicCode: string;
  viewUrl: string;
  editUrl: string;
  printUrl: string;
  qrCodeDataUrl: string;
  editQrCodeDataUrl: string;
  editCount: number;
  editLimit: number;
};

export default function AdminCreateLoveMessagePage() {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [phone, setPhone] = useState("");
  const [adminSecret, setAdminSecret] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<CreateResult | null>(null);
  const [error, setError] = useState("");

  const [copiedView, setCopiedView] = useState(false);
  const [copiedEdit, setCopiedEdit] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsSubmitting(true);

    try {
      const payload: any = { adminSecret, theme: "warm" };
      if (senderName.trim()) payload.senderName = senderName.trim();
      if (receiverName.trim()) payload.receiverName = receiverName.trim();
      if (message.trim()) payload.message = message.trim();
      if (orderCode.trim()) payload.orderCode = orderCode.trim();
      if (phone.trim()) payload.phone = phone.trim();

      const response = await fetch("/api/love-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || json.error || "Không thể tạo lời chúc");
      }

      setResult(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleCopy(text: string, type: "view" | "edit") {
    await navigator.clipboard.writeText(text);
    if (type === "view") {
      setCopiedView(true);
      setTimeout(() => setCopiedView(false), 2000);
    } else {
      setCopiedEdit(true);
      setTimeout(() => setCopiedEdit(false), 2000);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 text-[#244434] font-sans">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#8b6f47] hover:text-[#244434] transition-colors"
        >
          <ArrowLeft size={16} /> Quay lại Trang chủ
        </Link>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form Card */}
          <section className="rounded-3xl border border-[#eadfca] bg-white p-6 shadow-xl shadow-[#dbcaa8]/10 lg:col-span-7">
            <div className="mb-6">
              <span className="rounded-full bg-[#244434]/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#244434]">
                Khu vực Quản trị
              </span>
              <h1 className="mt-3 text-2xl font-bold md:text-3xl">Tạo QR Lời chúc</h1>
              <p className="mt-1 text-sm text-[#6f7d68]">
                Tạo lời chúc mặc định, liên kết đơn hàng và sinh mã QR thiệp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Admin Secret */}
              <div>
                <label className="block text-sm font-semibold">Mã quản trị *</label>
                <input
                  type="password"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
                  placeholder="Nhập mã bí mật của admin..."
                  required
                />
              </div>

              {/* Order Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold">Mã đơn hàng (Order Code)</label>
                  <input
                    type="text"
                    value={orderCode}
                    onChange={(e) => setOrderCode(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
                    placeholder="Ví dụ: #AM1001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Số điện thoại khách</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
                    placeholder="Ví dụ: 0987654321"
                  />
                </div>
              </div>

              {/* Message Details */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold">Tên người gửi (Mặc định)</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
                    placeholder="Người gửi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold">Tên người nhận (Mặc định)</label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
                    placeholder="Người nhận"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold">Lời chúc (Mặc định)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 min-h-32 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
                  placeholder="Hãy chỉnh sửa lời chúc của bạn tại link được cung cấp."
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-[#244434] px-5 py-4 font-bold text-white transition hover:bg-[#1c3528] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Đang tạo..." : "Tạo mã QR thiệp"}
              </button>
            </form>
          </section>

          {/* Results Side */}
          <div className="lg:col-span-5">
            {result ? (
              <section className="space-y-4">
                {/* === QR XEM THIỆP === */}
                <div className="rounded-3xl border border-[#eadfca] bg-white p-5 text-center shadow-xl shadow-[#dbcaa8]/10">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#8b6f47]">QR Xem Thiệp</p>
                  <p className="mt-0.5 text-[10px] text-[#6f7d68]">Người nhận quét mã này</p>
                  <img
                    src={result.qrCodeDataUrl}
                    alt="QR xem thiệp"
                    className="mx-auto mt-3 h-44 w-44 rounded-2xl border border-[#eadfca] bg-[#fff8ed] p-2 shadow-sm"
                  />
                  <p className="mt-3 text-xl font-black tracking-widest text-[#244434]">{result.publicCode}</p>

                  {/* View URL row */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-[#fff8ed] px-3 py-2.5 text-left">
                    <span className="flex-1 truncate text-xs font-medium text-[#244434]">{result.viewUrl}</span>
                    <button
                      onClick={() => handleCopy(result.viewUrl, "view")}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#244434]/5 text-[#244434] hover:bg-[#244434]/15 transition"
                      title="Copy Link Xem"
                    >
                      {copiedView ? <Check size={13} className="text-green-700" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>

                {/* === QR SỬA THIỆP === */}
                <div className="rounded-3xl border-2 border-[#3178c6]/30 bg-white p-5 text-center shadow-xl shadow-blue-100/30">
                  <div className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                    <p className="text-xs font-semibold text-blue-700">Link Sửa Thiệp — Gửi Riêng Cho Khách</p>
                  </div>
                  <p className="text-[10px] text-[#6f7d68]">Khách mua dùng link này để chỉnh sửa nội dung</p>

                  <img
                    src={result.editQrCodeDataUrl}
                    alt="QR sửa thiệp"
                    className="mx-auto mt-3 h-44 w-44 rounded-2xl border border-blue-100 bg-[#f0f5ff] p-2 shadow-sm"
                  />

                  {/* Edit URL row */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-left">
                    <span className="flex-1 truncate text-xs font-medium text-[#1c3d6e]">{result.editUrl}</span>
                    <button
                      onClick={() => handleCopy(result.editUrl, "edit")}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      title="Copy Link Sửa"
                    >
                      {copiedEdit ? <Check size={13} className="text-green-700" /> : <Copy size={13} />}
                    </button>
                  </div>
                  <p className="mt-2 text-[10px] text-[#6f7d68]">
                    ⚠ Chỉ gửi link này cho khách mua, không public. Dùng tối đa {result.editLimit} lần.
                  </p>
                </div>

                {/* Print Action */}
                <a
                  href={result.printUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8b6f47] px-4 py-3.5 font-bold text-white hover:bg-[#725a38] transition shadow-sm"
                >
                  <Printer size={16} /> Mở Trang In QR
                </a>
              </section>
            ) : (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#eadfca] bg-white/40 p-6 text-center">
                <QrCode size={48} className="text-[#8b6f47]/40" />
                <p className="mt-4 text-sm font-semibold text-[#8b6f47]">Thông tin QR sẽ hiển thị tại đây</p>
                <p className="mt-1 text-xs text-[#6f7d68]">Vui lòng điền thông tin và bấm "Tạo mã QR thiệp" ở bên trái.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
