"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Lock, Unlock, Edit2, Check, X, Eye, RefreshCw } from "lucide-react";

type LoveMessage = {
  publicCode: string;
  senderName: string;
  receiverName: string;
  message: string;
  theme: string;
  orderCode: string | null;
  phone: string | null;
  viewedCount: number;
  editCount: number;
  editLimit: number;
  isLocked: boolean;
  createdAt: string;
  firstViewedAt: string | null;
  lastViewedAt: string | null;
  editToken: string;
};

const THEME_LABELS: Record<string, string> = {
  warm: "🌿 Warm",
  forest: "🌲 Forest",
  cream: "🍯 Cream",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" });
}

export default function AdminManagePage() {
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [messages, setMessages] = useState<LoveMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<LoveMessage>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/love-messages/admin", {
        headers: { "x-admin-secret": adminSecret },
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setAuthError(json.error || "Mã quản trị không đúng.");
        return;
      }
      setMessages(json.data);
      setIsAuthenticated(true);
    } catch {
      setAuthError("Không thể kết nối đến server.");
    } finally {
      setIsLoading(false);
    }
  }

  async function refreshMessages() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/love-messages/admin", {
        headers: { "x-admin-secret": adminSecret },
      });
      const json = await res.json();
      if (json.success) setMessages(json.data);
    } finally {
      setIsLoading(false);
    }
  }

  function startEdit(msg: LoveMessage) {
    setEditingCode(msg.publicCode);
    setEditForm({
      senderName: msg.senderName,
      receiverName: msg.receiverName,
      message: msg.message,
      theme: msg.theme,
      isLocked: msg.isLocked,
    });
    setSaveError("");
    setSaveSuccess("");
  }

  function cancelEdit() {
    setEditingCode(null);
    setEditForm({});
    setSaveError("");
    setSaveSuccess("");
  }

  async function saveEdit(publicCode: string) {
    setSaving(true);
    setSaveError("");
    setSaveSuccess("");
    try {
      const res = await fetch("/api/love-messages/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ publicCode, ...editForm }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || "Lỗi cập nhật");
      setSaveSuccess("Đã lưu thành công.");
      setMessages((prev) =>
        prev.map((m) => (m.publicCode === publicCode ? { ...m, ...json.data } : m))
      );
      setTimeout(() => {
        setEditingCode(null);
        setSaveSuccess("");
      }, 1200);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleLock(msg: LoveMessage) {
    try {
      const res = await fetch("/api/love-messages/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": adminSecret,
        },
        body: JSON.stringify({ publicCode: msg.publicCode, isLocked: !msg.isLocked }),
      });
      const json = await res.json();
      if (json.success) {
        setMessages((prev) =>
          prev.map((m) => (m.publicCode === msg.publicCode ? { ...m, isLocked: !m.isLocked } : m))
        );
      }
    } catch {
      /* silent */
    }
  }

  // === Login screen ===
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#fff8ed] flex items-center justify-center px-4 font-sans">
        <section className="w-full max-w-md rounded-3xl border border-[#eadfca] bg-white p-8 shadow-xl shadow-[#dbcaa8]/20">
          <Link href="/quan-tri/tao-loi-chuc" className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#8b6f47] hover:text-[#244434] transition-colors">
            <ArrowLeft size={15} /> Tạo lời chúc
          </Link>
          <h1 className="text-2xl font-bold text-[#244434]">Quản lý mã yêu thương</h1>
          <p className="mt-1 text-sm text-[#6f7d68]">Nhập mã quản trị để đăng nhập.</p>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              value={adminSecret}
              onChange={(e) => setAdminSecret(e.target.value)}
              placeholder="Mã quản trị bí mật..."
              required
              className="w-full rounded-xl border border-[#dfd4bd] bg-[#fffaf1] px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-[#244434]/10"
            />
            {authError && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{authError}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[#244434] py-4 font-bold text-white hover:bg-[#1c3528] transition disabled:opacity-60"
            >
              {isLoading ? "Đang xác thực..." : "Đăng nhập"}
            </button>
          </form>
        </section>
      </main>
    );
  }

  // === Dashboard ===
  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 font-sans text-[#244434]">
      <div className="mx-auto max-w-7xl">
        {/* Header bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Quản lý mã yêu thương</h1>
            <p className="mt-1 text-sm text-[#6f7d68]">{messages.length} mã · Nhấn hàng để chỉnh sửa</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshMessages}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#dfd4bd] bg-white px-4 py-2.5 text-sm font-semibold text-[#244434] hover:bg-[#fff3e0] transition disabled:opacity-50"
            >
              <RefreshCw size={15} className={isLoading ? "animate-spin" : ""} />
              Tải lại
            </button>
            <Link
              href="/quan-tri/tao-loi-chuc"
              className="inline-flex items-center gap-2 rounded-xl bg-[#244434] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1c3528] transition"
            >
              <Plus size={15} /> Tạo lời chúc mới
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-[#eadfca] bg-white shadow-xl shadow-[#dbcaa8]/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#eadfca] bg-[#fff8ed] text-xs font-semibold uppercase tracking-wider text-[#8b6f47]">
                <th className="px-5 py-4 text-left">Mã</th>
                <th className="px-5 py-4 text-left">Người gửi → Nhận</th>
                <th className="px-5 py-4 text-left hidden lg:table-cell">Đơn hàng</th>
                <th className="px-5 py-4 text-left hidden lg:table-cell">Theme</th>
                <th className="px-4 py-4 text-center">Xem</th>
                <th className="px-4 py-4 text-center">Sửa</th>
                <th className="px-4 py-4 text-center">Trạng thái</th>
                <th className="px-5 py-4 text-left hidden xl:table-cell">Tạo lúc</th>
                <th className="px-5 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eadfca]/60">
              {messages.map((msg) => {
                const isEditing = editingCode === msg.publicCode;
                return (
                  <tr
                    key={msg.publicCode}
                    className={`transition-colors ${isEditing ? "bg-amber-50" : "hover:bg-[#fffbf3]"}`}
                  >
                    {/* Code */}
                    <td className="px-5 py-4">
                      <a
                        href={`/love/${msg.publicCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-base font-black tracking-widest text-[#244434] hover:text-[#8b6f47] transition"
                      >
                        {msg.publicCode}
                        <Eye size={12} className="opacity-40" />
                      </a>
                    </td>

                    {/* Names */}
                    <td className="px-5 py-4 max-w-[220px]">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            value={editForm.senderName || ""}
                            onChange={(e) => setEditForm((f) => ({ ...f, senderName: e.target.value }))}
                            placeholder="Người gửi"
                            className="w-full rounded-lg border border-[#dfd4bd] bg-white px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#244434]/20"
                          />
                          <input
                            value={editForm.receiverName || ""}
                            onChange={(e) => setEditForm((f) => ({ ...f, receiverName: e.target.value }))}
                            placeholder="Người nhận"
                            className="w-full rounded-lg border border-[#dfd4bd] bg-white px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#244434]/20"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="font-semibold leading-tight">{msg.senderName}</p>
                          <p className="text-xs text-[#6f7d68]">→ {msg.receiverName}</p>
                        </div>
                      )}
                    </td>

                    {/* Order */}
                    <td className="px-5 py-4 hidden lg:table-cell text-xs text-[#6f7d68]">
                      <p>{msg.orderCode || "—"}</p>
                      <p>{msg.phone || ""}</p>
                    </td>

                    {/* Theme */}
                    <td className="px-5 py-4 hidden lg:table-cell">
                      {isEditing ? (
                        <select
                          value={editForm.theme || "warm"}
                          onChange={(e) => setEditForm((f) => ({ ...f, theme: e.target.value }))}
                          className="rounded-lg border border-[#dfd4bd] bg-white px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#244434]/20"
                        >
                          <option value="warm">🌿 Warm</option>
                          <option value="forest">🌲 Forest</option>
                          <option value="cream">🍯 Cream</option>
                        </select>
                      ) : (
                        <span className="text-xs">{THEME_LABELS[msg.theme] || msg.theme}</span>
                      )}
                    </td>

                    {/* View count */}
                    <td className="px-4 py-4 text-center">
                      <span className="rounded-full bg-[#244434]/5 px-2 py-0.5 text-xs font-semibold text-[#244434]">
                        {msg.viewedCount}
                      </span>
                    </td>

                    {/* Edit count */}
                    <td className="px-4 py-4 text-center">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${msg.editCount >= msg.editLimit ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                        {msg.editCount}/{msg.editLimit}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${msg.isLocked ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
                        {msg.isLocked ? <><Lock size={10} /> Đã khóa</> : <><Unlock size={10} /> Mở</>}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-5 py-4 hidden xl:table-cell text-xs text-[#6f7d68]">
                      {formatDate(msg.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      {isEditing ? (
                        <div className="flex flex-col gap-1.5 min-w-[160px]">
                          <textarea
                            value={editForm.message || ""}
                            onChange={(e) => setEditForm((f) => ({ ...f, message: e.target.value }))}
                            rows={3}
                            className="w-full rounded-lg border border-[#dfd4bd] bg-white px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-[#244434]/20 resize-none"
                            placeholder="Nội dung lời chúc..."
                          />
                          {saveError && <p className="text-[11px] text-red-600">{saveError}</p>}
                          {saveSuccess && <p className="text-[11px] text-green-700">{saveSuccess}</p>}
                          <div className="flex gap-2">
                            <button
                              onClick={() => saveEdit(msg.publicCode)}
                              disabled={saving}
                              className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg bg-[#244434] px-3 py-2 text-xs font-bold text-white hover:bg-[#1c3528] transition disabled:opacity-60"
                            >
                              <Check size={12} /> {saving ? "Đang lưu..." : "Lưu"}
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="flex-1 inline-flex items-center justify-center gap-1 rounded-lg border border-[#dfd4bd] px-3 py-2 text-xs font-semibold text-[#6f7d68] hover:bg-[#fff3e0] transition"
                            >
                              <X size={12} /> Hủy
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEdit(msg)}
                            className="inline-flex items-center gap-1 rounded-lg border border-[#dfd4bd] bg-white px-3 py-1.5 text-xs font-semibold text-[#244434] hover:bg-[#fff3e0] transition"
                          >
                            <Edit2 size={11} /> Sửa
                          </button>
                          <button
                            onClick={() => toggleLock(msg)}
                            className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                              msg.isLocked
                                ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                : "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                            }`}
                          >
                            {msg.isLocked ? <><Unlock size={11} /> Mở</> : <><Lock size={11} /> Khóa</>}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {messages.length === 0 && (
            <div className="px-8 py-16 text-center text-[#8b6f47]">
              <p className="text-4xl">💌</p>
              <p className="mt-3 font-semibold">Chưa có mã lời chúc nào</p>
              <p className="mt-1 text-sm text-[#6f7d68]">Tạo lời chúc đầu tiên để bắt đầu.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
