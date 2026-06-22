"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-xl bg-[#244434] px-6 py-3 font-bold text-white hover:bg-[#1c3528] transition print:hidden shadow-md"
    >
      <Printer size={18} /> In thẻ QR
    </button>
  );
}
