import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

function checkAdminSecret(request: Request) {
  const secret = request.headers.get("x-admin-secret");
  return secret === process.env.LOVE_MESSAGE_ADMIN_SECRET;
}

// GET /api/love-messages/admin — list all messages
export async function GET(request: Request) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ success: false, error: "Không có quyền truy cập." }, { status: 403 });
  }

  try {
    const messages = await prisma.loveMessage.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        publicCode: true,
        senderName: true,
        receiverName: true,
        message: true,
        theme: true,
        orderCode: true,
        phone: true,
        viewedCount: true,
        editCount: true,
        editLimit: true,
        isLocked: true,
        createdAt: true,
        firstViewedAt: true,
        lastViewedAt: true,
        editToken: true,
      },
    });

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    console.error("GET /api/love-messages/admin", error);
    return NextResponse.json({ success: false, error: "Không thể tải danh sách." }, { status: 500 });
  }
}

const adminUpdateSchema = z.object({
  publicCode: z.string().min(1),
  senderName: z.string().trim().min(1).max(80).optional(),
  receiverName: z.string().trim().min(1).max(80).optional(),
  message: z.string().trim().min(1).max(1000).optional(),
  theme: z.string().trim().max(40).optional(),
  isLocked: z.boolean().optional(),
});

// PATCH /api/love-messages/admin — admin edit (no editToken needed)
export async function PATCH(request: Request) {
  if (!checkAdminSecret(request)) {
    return NextResponse.json({ success: false, error: "Không có quyền truy cập." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const payload = adminUpdateSchema.parse(body);

    const updateData: Record<string, unknown> = {};
    if (payload.senderName !== undefined) updateData.senderName = payload.senderName;
    if (payload.receiverName !== undefined) updateData.receiverName = payload.receiverName;
    if (payload.message !== undefined) updateData.message = payload.message;
    if (payload.theme !== undefined) updateData.theme = payload.theme;
    if (payload.isLocked !== undefined) updateData.isLocked = payload.isLocked;

    const updated = await prisma.loveMessage.update({
      where: { publicCode: payload.publicCode.toUpperCase() },
      data: updateData,
      select: {
        publicCode: true,
        senderName: true,
        receiverName: true,
        message: true,
        theme: true,
        isLocked: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Dữ liệu không hợp lệ", details: error.flatten() }, { status: 400 });
    }
    console.error("PATCH /api/love-messages/admin", error);
    return NextResponse.json({ success: false, error: "Không thể cập nhật." }, { status: 500 });
  }
}
