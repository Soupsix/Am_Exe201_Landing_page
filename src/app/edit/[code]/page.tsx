"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LoveMessage = {
  publicCode: string;
  senderName: string;
  receiverName: string;
  message: string;
  theme: string;
  viewedCount: number;
  createdAt: string;
};

type UpdateResult = {
  publicCode: string;
  editCount: number;
  editLimit: number;
  isLocked: boolean;
};

export default function EditLoveMessagePage() {
  const params = useParams<{ code: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const code = useMemo(() => params.code?.toUpperCase() || "", [params.code]);

  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("warm");
  const [status, setStatus] = useState<UpdateResult | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(token));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    if (!showReminder) return;
    const timer = setTimeout(() => {
      setShowReminder(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, [showReminder]);

  useEffect(() => {
    if (!token || !code) return;

    async function loadMessage() {
      setIsLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/love-messages/${code}`);
        const json = await response.json();
        if (!response.ok || !json.success) {
          throw new Error(json.error || "Không thể tải lời chúc");
        }
        const data = json.data as LoveMessage;
        setSenderName(data.senderName);
        setReceiverName(data.receiverName);
        setMessage(data.message);
        setTheme(data.theme || "warm");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      } finally {
        setIsLoading(false);
      }
    }

    loadMessage();
  }, [code, token]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/love-messages/${code}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ editToken: token, senderName, receiverName, message, theme }),
      });
      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Không thể cập nhật lời chúc");
      }

      setStatus(json.data);
      setSuccessMessage("Đã cập nhật lời chúc thành công.");
      setShowReminder(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8ed] px-4 text-[#244434]">
        <section className="max-w-lg rounded-3xl border border-[#eadfca] bg-white p-8 text-center shadow-xl shadow-[#dbcaa8]/20">
          <h1 className="text-2xl font-bold">Không có quyền chỉnh sửa</h1>
          <p className="mt-3 text-[#6f7d68]">Đường dẫn chỉnh sửa cần có token bí mật. Vui lòng dùng đúng link chỉnh sửa đã được tạo.</p>
        </section>
      </main>
    );
  }

  const remainingEdits = status ? Math.max(status.editLimit - status.editCount, 0) : null;
  const isLocked = Boolean(status?.isLocked);

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 text-[#244434]">
      <section className="mx-auto max-w-3xl rounded-3xl border border-[#eadfca] bg-white/95 p-5 shadow-xl shadow-[#dbcaa8]/20 md:p-8">
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#8b6f47]">Chỉnh sửa lời chúc</p>
          <h1 className="text-3xl font-bold">Mã {code}</h1>
          <p className="mt-3 text-[#6f7d68]">Bạn có tối đa 3 lần chỉnh sửa. Hãy giữ link này riêng tư.</p>
        </div>

        {isLoading ? (
          <p className="text-center text-[#6f7d68]">Đang tải lời chúc...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <span className="mb-2 block text-sm font-semibold">Tên người gửi</span>
                <input value={senderName} onChange={(event) => setSenderName(event.target.value)} maxLength={80} disabled={isLocked} className="w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 outline-none focus:ring-4 focus:ring-[#244434]/20 disabled:opacity-60" />
              </label>
              <label>
                <span className="mb-2 block text-sm font-semibold">Tên người nhận</span>
                <input value={receiverName} onChange={(event) => setReceiverName(event.target.value)} maxLength={80} disabled={isLocked} className="w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 outline-none focus:ring-4 focus:ring-[#244434]/20 disabled:opacity-60" />
              </label>
            </div>

            <label>
              <span className="mb-2 block text-sm font-semibold">Lời chúc</span>
              <textarea value={message} onChange={(event) => setMessage(event.target.value)} maxLength={1000} disabled={isLocked} className="min-h-40 w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 outline-none focus:ring-4 focus:ring-[#244434]/20 disabled:opacity-60" />
            </label>

            <label>
              <span className="mb-2 block text-sm font-semibold">Theme</span>
              <select value={theme} onChange={(event) => setTheme(event.target.value)} disabled={isLocked} className="w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 outline-none focus:ring-4 focus:ring-[#244434]/20 disabled:opacity-60">
                <option value="warm">warm</option>
                <option value="forest">forest</option>
                <option value="cream">cream</option>
              </select>
            </label>

            {successMessage && <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">{successMessage}</p>}
            {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            {remainingEdits !== null && <p className="rounded-xl bg-[#fff8ed] px-4 py-3 text-sm text-[#8b6f47]">Số lần sửa còn lại: {remainingEdits}</p>}
            {isLocked && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">Lời chúc đã hết lượt chỉnh sửa.</p>}

            <button type="submit" disabled={isSubmitting || isLocked} className="w-full rounded-xl bg-[#244434] px-5 py-4 font-bold text-white transition hover:bg-[#1c3528] disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </form>
        )}
      </section>

      <AnimatePresence>
        {showReminder && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-4 right-4 z-50 flex max-w-sm items-start gap-3 rounded-2xl border border-[#eadfca] bg-white/95 p-4 shadow-2xl shadow-[#dbcaa8]/40 backdrop-blur-md text-[#244434] md:left-auto md:right-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff8ed] text-xl shadow-inner">
              🤫
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="font-bold text-sm text-[#8b6f47]">Lời nhắn nhỏ</h4>
              <p className="mt-1 text-sm text-[#244434] leading-relaxed">
                Suỵt! Đừng gửi người ấy lời chúc này sớm nhé!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowReminder(false)}
              className="rounded-lg p-1 text-[#8b6f47]/60 hover:bg-[#fff8ed] hover:text-[#8b6f47] transition"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
