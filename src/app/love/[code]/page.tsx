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
  params: {
    code: string;
  };
};

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

async function getLoveMessage(code: string): Promise<LoveMessageView | null> {
  try {
    const response = await fetch(`${getSiteUrl()}/api/love-messages/${code}`, {
      cache: "no-store",
    });
    const json = await response.json();
    return response.ok && json.success ? json.data : null;
  } catch {
    return null;
  }
}

export default async function LoveMessagePage({ params }: PageProps) {
  const loveMessage = await getLoveMessage(params.code);

  if (!loveMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8ed] px-4 py-10 text-[#244434]">
        <section className="max-w-lg rounded-3xl border border-[#eadfca] bg-white p-8 text-center shadow-xl shadow-[#dbcaa8]/20">
          <p className="text-5xl">♡</p>
          <h1 className="mt-4 text-2xl font-bold">Không tìm thấy lời chúc</h1>
          <p className="mt-3 text-[#6f7d68]">Mã QR hoặc đường dẫn này có thể chưa đúng. Hãy kiểm tra lại mã lời chúc bạn nhận được nhé.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8ed] px-4 py-10 text-[#244434]">
      <section className="mx-auto max-w-2xl rounded-[2rem] border border-[#eadfca] bg-white p-6 shadow-2xl shadow-[#dbcaa8]/25 md:p-10">
        <div className="rounded-[1.5rem] border border-dashed border-[#cdbf9f] bg-[#fffaf1] p-6 md:p-10">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-[#8b6f47]">Một lời nhắn yêu thương</p>
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#cdbf9f] to-transparent" />

          <p className="text-xl font-bold md:text-2xl">Gửi {loveMessage.receiverName},</p>
          <p className="mt-6 whitespace-pre-wrap text-lg leading-8 text-[#344f3d] md:text-xl md:leading-9">{loveMessage.message}</p>
          <p className="mt-10 text-right text-lg font-semibold">Từ {loveMessage.senderName}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[#8b6f47]">
          <span>Mã: {loveMessage.publicCode}</span>
          <span>Đã mở {loveMessage.viewedCount} lần</span>
        </div>
      </section>
    </main>
  );
}
