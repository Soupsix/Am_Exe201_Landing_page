import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const updateLoveMessageSchema = z.object({
  editToken: z.string().min(1),
  senderName: z.string().trim().min(1).max(80).optional(),
  receiverName: z.string().trim().min(1).max(80).optional(),
  message: z.string().trim().min(1).max(1000).optional(),
  theme: z.string().trim().max(40).optional(),
});

type RouteContext = {
  params: {
    code: string;
  };
};

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const publicCode = params.code.toUpperCase();
    const now = new Date();

    const existing = await prisma.loveMessage.findUnique({
      where: { publicCode },
      select: { firstViewedAt: true },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy lời chúc." },
        { status: 404 },
      );
    }

    const loveMessage = await prisma.loveMessage.update({
      where: { publicCode },
      data: {
        viewedCount: { increment: 1 },
        firstViewedAt: existing.firstViewedAt ?? now,
        lastViewedAt: now,
      },
      select: {
        publicCode: true,
        senderName: true,
        receiverName: true,
        message: true,
        theme: true,
        viewedCount: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: loveMessage });
  } catch (error) {
    console.error("GET /api/love-messages/[code]", error);
    return NextResponse.json(
      { success: false, error: "Không thể tải lời chúc." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const publicCode = params.code.toUpperCase();
    const body = await request.json();
    const payload = updateLoveMessageSchema.parse(body);

    const existing = await prisma.loveMessage.findUnique({
      where: { publicCode },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy lời chúc." },
        { status: 404 },
      );
    }

    if (existing.editToken !== payload.editToken) {
      return NextResponse.json(
        { success: false, error: "Token chỉnh sửa không hợp lệ." },
        { status: 403 },
      );
    }

    if (existing.isLocked || existing.editCount >= existing.editLimit) {
      return NextResponse.json(
        { success: false, error: "Lời chúc đã hết lượt chỉnh sửa." },
        { status: 403 },
      );
    }

    const nextEditCount = existing.editCount + 1;
    const isLocked = nextEditCount >= existing.editLimit;

    const updateData = {
      ...(payload.senderName !== undefined && { senderName: payload.senderName }),
      ...(payload.receiverName !== undefined && { receiverName: payload.receiverName }),
      ...(payload.message !== undefined && { message: payload.message }),
      ...(payload.theme !== undefined && { theme: payload.theme }),
      editCount: { increment: 1 },
      isLocked,
    };

    const updated = await prisma.loveMessage.update({
      where: { publicCode },
      data: updateData,
      select: {
        publicCode: true,
        editCount: true,
        editLimit: true,
        isLocked: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Dữ liệu không hợp lệ", details: error.flatten() },
        { status: 400 },
      );
    }

    console.error("PATCH /api/love-messages/[code]", error);
    return NextResponse.json(
      { success: false, error: "Không thể cập nhật lời chúc." },
      { status: 500 },
    );
  }
}
