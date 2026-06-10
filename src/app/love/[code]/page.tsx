export const dynamic = "force-dynamic";

type LoveMessageView = {
  publicCode: string;
  senderName: string;
  receiverName: string;
  message: string;
  theme: string;
  viewedCount: number;
  createdAt: string;
};

type PageProps = {
  params: Promise<{
    code: string;
  }>;
};

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

async function getLoveMessage(code: string): Promise<LoveMessageView | null> {
  try {
    const cleanCode = code.trim().toUpperCase();

    const response = await fetch(`${getSiteUrl()}/api/love-messages/${cleanCode}`, {
      cache: "no-store",
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      console.error("Love message fetch failed:", json);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Love message fetch error:", error);
    return null;
  }
}

export default async function LoveMessagePage({ params }: PageProps) {
  const { code } = await params;
  const loveMessage = await getLoveMessage(code);

  if (!loveMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8ed] px-4 py-10 text-[#244434]">
        <section className="max-w-lg rounded-3xl border border-[#eadfca] bg-white p-8 text-center shadow-xl shadow-[#dbcaa8]/20">
          <p className="text-5xl">♡</p>
          <h1 className="mt-4 text-2xl font-bold">Không tìm thấy lời chúc</h1>
          <p className="mt-3 text-[#6f7d68]">
            Mã QR hoặc đường dẫn này có thể chưa đúng. Hãy kiểm tra lại mã lời chúc bạn nhận được nhé.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 text-[#244434]">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-[#eadfca] bg-white p-6 shadow-2xl shadow-[#dbcaa8]/25 md:p-10">
        <div className="rounded-[1.5rem] border border-dashed border-[#cdbf9f] bg-[#fffaf1] p-6 md:p-10">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#8b6f47]">
            Một lời nhắn yêu thương
          </p>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#cdbf9f] to-transparent" />

          <p className="text-xl font-bold md:text-2xl">
            Gửi {loveMessage.receiverName},
          </p>

          <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-[#344f3d] md:text-xl md:leading-9">
            {loveMessage.message}
          </p>

          <p className="mt-10 text-right text-lg font-semibold">
            Từ {loveMessage.senderName}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#8b6f47]">
          <span>Mã: {loveMessage.publicCode}</span>
          <span>Đã mở {loveMessage.viewedCount} lần</span>
        </div>
      </section>

      {/* Back to Home */}
      <div className="mx-auto mt-8 max-w-2xl text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#cdbf9f] bg-white px-6 py-3 text-sm font-semibold text-[#8b6f47] shadow-sm transition-all duration-300 hover:bg-[#fff3e0] hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Về trang chủ Ấm
        </a>
      </div>
    </main>
  );
}