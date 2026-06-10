import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import QRCode from "qrcode";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const CODE_LENGTH = 6;

const createLoveMessageSchema = z.object({
  senderName: z.string().trim().max(80).optional().default("Người gửi"),
  receiverName: z.string().trim().max(80).optional().default("Người nhận"),
  message: z.string().trim().max(1000).optional().default("Hãy chỉnh sửa lời chúc của bạn tại link được cung cấp."),
  theme: z.string().trim().max(40).optional().default("warm"),
  orderCode: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  adminSecret: z.string().trim().min(1, "Mã quản trị là bắt buộc"),
});

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

function generatePublicCode() {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return code;
}

async function generateUniquePublicCode() {
  for (let attempt = 0; attempt < 10; attempt++) {
    const publicCode = generatePublicCode();
    const existing = await prisma.loveMessage.findUnique({ where: { publicCode } });
    if (!existing) return publicCode;
  }

  throw new Error("Không thể tạo mã công khai duy nhất");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = createLoveMessageSchema.parse(body);

    const expectedSecret = process.env.LOVE_MESSAGE_ADMIN_SECRET;
    if (payload.adminSecret !== expectedSecret) {
      return NextResponse.json(
        { success: false, message: "Mã quản trị không đúng" },
        { status: 403 }
      );
    }

    const publicCode = await generateUniquePublicCode();
    const editToken = nanoid(48);

    const loveMessage = await prisma.loveMessage.create({
      data: {
        publicCode,
        editToken,
        senderName: payload.senderName,
        receiverName: payload.receiverName,
        message: payload.message,
        theme: payload.theme,
        orderCode: payload.orderCode,
        phone: payload.phone,
      },
      select: {
        publicCode: true,
        editCount: true,
        editLimit: true,
      },
    });

    const siteUrl = getSiteUrl();
    const viewUrl = `${siteUrl}/love/${loveMessage.publicCode}`;
    const editUrl = `${siteUrl}/edit/${loveMessage.publicCode}?token=${editToken}`;
    const printUrl = `${siteUrl}/print-love/${loveMessage.publicCode}`;

    const qrOptions = { margin: 2, width: 280 };
    const [qrCodeDataUrl, editQrCodeDataUrl] = await Promise.all([
      QRCode.toDataURL(viewUrl, {
        ...qrOptions,
        color: { dark: "#244434", light: "#FFF8ED" },
      }),
      QRCode.toDataURL(editUrl, {
        ...qrOptions,
        color: { dark: "#1c3d6e", light: "#f0f5ff" },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        publicCode: loveMessage.publicCode,
        viewUrl,
        editUrl,
        printUrl,
        qrCodeDataUrl,
        editQrCodeDataUrl,
        editCount: loveMessage.editCount,
        editLimit: loveMessage.editLimit,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dữ liệu không hợp lệ", details: error.flatten() },
        { status: 400 },
      );
    }

    console.error("POST /api/love-messages", error);
    return NextResponse.json(
      { success: false, error: "Không thể tạo lời chúc. Vui lòng thử lại." },
      { status: 500 },
    );
  }
}
