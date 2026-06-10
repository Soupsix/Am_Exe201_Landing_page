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

const THEMES: Record<string, {
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  innerBg: string;
  innerBorder: string;
  label: string;
  divider: string;
  receiverColor: string;
  messageColor: string;
  senderColor: string;
  metaBg: string;
  metaText: string;
}> = {
  warm: {
    pageBg: "bg-[#fff8ed]",
    cardBg: "bg-white",
    cardBorder: "border-[#eadfca]",
    innerBg: "bg-[#fffaf1]",
    innerBorder: "border-dashed border-[#cdbf9f]",
    label: "text-[#8b6f47]",
    divider: "from-transparent via-[#cdbf9f] to-transparent",
    receiverColor: "text-[#244434]",
    messageColor: "text-[#344f3d]",
    senderColor: "text-[#244434]",
    metaBg: "bg-[#fff3e0]",
    metaText: "text-[#8b6f47]",
  },
  forest: {
    pageBg: "bg-[#eef4ee]",
    cardBg: "bg-white",
    cardBorder: "border-[#b7d4b7]",
    innerBg: "bg-[#f4faf4]",
    innerBorder: "border-dashed border-[#8fbb8f]",
    label: "text-[#3a6e3a]",
    divider: "from-transparent via-[#8fbb8f] to-transparent",
    receiverColor: "text-[#1e4020]",
    messageColor: "text-[#2d5e30]",
    senderColor: "text-[#1e4020]",
    metaBg: "bg-[#e8f5e8]",
    metaText: "text-[#3a6e3a]",
  },
  cream: {
    pageBg: "bg-[#fdf6ec]",
    cardBg: "bg-[#fffdf7]",
    cardBorder: "border-[#e8d9bc]",
    innerBg: "bg-[#fffcf3]",
    innerBorder: "border-dashed border-[#d4b896]",
    label: "text-[#a07840]",
    divider: "from-transparent via-[#d4b896] to-transparent",
    receiverColor: "text-[#5c3d10]",
    messageColor: "text-[#7a5220]",
    senderColor: "text-[#5c3d10]",
    metaBg: "bg-[#fdf0d8]",
    metaText: "text-[#a07840]",
  },
};

export default async function LoveMessagePage({ params }: PageProps) {
  const { code } = await params;
  const loveMessage = await getLoveMessage(code);
  const theme = THEMES[loveMessage?.theme ?? ""] ?? THEMES.warm;

  if (!loveMessage) {
    return (
      <main className={`flex min-h-screen items-center justify-center ${THEMES.warm.pageBg} px-4 py-10 ${THEMES.warm.receiverColor}`}>
        <section className={`max-w-lg rounded-3xl border ${THEMES.warm.cardBorder} ${THEMES.warm.cardBg} p-8 text-center shadow-xl shadow-[#dbcaa8]/20`}>
          <p className="text-5xl">♡</p>
          <h1 className="mt-4 text-2xl font-bold">Không tìm thấy lời chúc</h1>
          <p className={`mt-3 ${THEMES.warm.label}`}>
            Mã QR hoặc đường dẫn này có thể chưa đúng. Hãy kiểm tra lại mã lời chúc bạn nhận được nhé.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${theme.pageBg} px-4 py-10 ${theme.receiverColor}`}>
      <section className={`mx-auto max-w-2xl rounded-[2rem] border ${theme.cardBorder} ${theme.cardBg} p-6 shadow-2xl shadow-[#dbcaa8]/25 md:p-10`}>
        <div className={`rounded-[1.5rem] border ${theme.innerBorder} ${theme.innerBg} p-6 md:p-10`}>
          <p className={`text-center text-sm font-semibold uppercase tracking-[0.3em] ${theme.label}`}>
            Một lời nhắn yêu thương
          </p>

          <div className={`my-8 h-px bg-gradient-to-r ${theme.divider}`} />

          <p className={`text-xl font-bold md:text-2xl ${theme.receiverColor}`}>
            Gửi {loveMessage.receiverName},
          </p>

          <p className={`mt-6 whitespace-pre-wrap text-lg leading-8 md:text-xl md:leading-9 ${theme.messageColor}`}>
            {loveMessage.message}
          </p>

          <p className={`mt-10 text-right text-lg font-semibold ${theme.senderColor}`}>
            Từ {loveMessage.senderName}
          </p>
        </div>

        <div className={`mt-6 flex flex-wrap items-center justify-between gap-3 text-sm ${theme.metaText} ${theme.metaBg} rounded-2xl px-5 py-3`}>
          <span>Mã: {loveMessage.publicCode}</span>
          <span>Đã mở {loveMessage.viewedCount} lần</span>
        </div>
      </section>

      {/* Back to Home */}
      <div className="mx-auto mt-8 max-w-2xl text-center">
        <a
          href="/"
          className={`inline-flex items-center gap-2 rounded-full border ${theme.cardBorder} ${theme.cardBg} px-6 py-3 text-sm font-semibold ${theme.label} shadow-sm transition-all duration-300 hover:shadow-md`}
          style={{ opacity: 0.9 }}
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