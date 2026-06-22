import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Họ và tên là thông tin bắt buộc.'),
  phone: z.string().trim().min(1, 'Số điện thoại là thông tin bắt buộc.'),
  product: z.string().trim().min(1, 'Sản phẩm quan tâm là thông tin bắt buộc.'),
  note: z.string().trim().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const errorMsg = result.error.issues.map(issue => issue.message).join(', ');
      return NextResponse.json(
        { success: false, error: errorMsg },
        { status: 400 }
      );
    }

    const { name, phone, product, note } = result.data;
    const scriptUrl = process.env.GOOGLE_SHEET_SCRIPT_URL;

    if (!scriptUrl) {
      console.warn('⚠️ GOOGLE_SHEET_SCRIPT_URL chưa được thiết lập trong .env. Dữ liệu nhận được:');
      console.warn(`Họ tên: ${name} | SĐT: ${phone} | Sản phẩm: ${product} | Ghi chú: ${note || '(Không có)'}`);
      
      // Giả lập thành công cho môi trường phát triển chưa config Sheet
      return NextResponse.json({
        success: true,
        message: 'Đăng ký thành công (Chế độ giả lập - Chưa cấu hình Google Sheet URL)',
      });
    }

    // Gửi yêu cầu tới Google Apps Script Web App
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        product,
        note: note || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (data.result === 'success') {
      return NextResponse.json({ success: true });
    } else {
      console.error('Lỗi phản hồi từ Google Sheets Apps Script:', data.error);
      return NextResponse.json(
        { success: false, error: 'Không thể lưu dữ liệu vào Google Sheet.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Lỗi khi gọi API Contact:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
