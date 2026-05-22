export interface Product {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly benefits: readonly string[];
  readonly price: string;
  readonly originalPrice?: string;
  readonly tag: string;
  readonly ingredients: readonly string[];
  readonly imageUrl: string;
}

export interface PainPoint {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly iconType: 'eye' | 'wave' | 'cup' | 'leaf';
}

export interface Benefit {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface Testimonial {
  readonly id: string;
  readonly author: string;
  readonly role: string;
  readonly content: string;
  readonly rating: number;
}

export interface Step {
  readonly number: string;
  readonly title: string;
  readonly description: string;
}

export interface WhyChooseUs {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: "tui-chuom-thao-moc",
    name: "Túi Chườm Thảo Mộc Toàn Thân",
    category: "Chăm sóc cơ thể",
    description: "Được dệt tỉ mỉ từ cotton tự nhiên thoáng khí, chứa 9 vị thảo dược tinh túy giúp xoa dịu nhanh chóng vùng vai gáy, vùng lưng, bụng bị nhức mỏi.",
    benefits: [
      "Hơi nóng thẩm thấu sâu từ 30 đến 45 phút dưỡng sinh",
      "Hỗ trợ lưu thông khí huyết vùng cổ gáy, thắt lưng",
      "Hương quế chi, ngải cứu xua tan mệt mỏi tức thì"
    ],
    price: "320.000 đ",
    originalPrice: "380.000 đ",
    tag: "Bán chạy nhất",
    ingredients: ["Ngải cứu", "Sả chanh", "Quế chi", "Hồi hương", "Gừng khô", "Hạt quyết minh"],
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tui-chuom-mat-thao-moc",
    name: "Túi Chườm Mắt Thảo Mộc Dịu Nhẹ",
    category: "Chăm sóc đôi mắt",
    description: "Thiết kế cong ôm khít nhẹ nhàng vùng cơ mắt, kết hợp hạt thảo dược khô xoa dịu đôi mắt mỏi mệt sau ngày học tập hay làm việc căng thẳng.",
    benefits: [
      "Giảm áp lực tích tụ vùng cơ mắt, chống mỏi rát",
      "Hương thơm hoa cúc nụ thảo dược dịu ngọt lành tính",
      "Lớp lụa mát lành mộc mạc, tuyệt đối êm dịu cho da"
    ],
    price: "185.000 đ",
    originalPrice: "220.000 đ",
    tag: "Văn phòng & Học sinh yêu thích",
    ingredients: ["Hoa cúc nụ", "Hạt quyết minh", "Bạc hà khô", "Nụ oải hương", "Trà xanh"],
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "set-qua-tang-am-ap",
    name: "Set Quà Tặng Ấm Áp Gửi Thương",
    category: "Bộ quà tặng ý nghĩa",
    description: "Trải nghiệm chăm sóc sức khỏe toàn diện cả cơ thể và đôi mắt, xếp đặt tinh tế trong hộp đan tre thủ công đính kèm hoa nhài sấy khô thơm ngát.",
    benefits: [
      "Trọn bộ 1 túi chườm gáy & 1 túi chườm mắt thảo dược",
      "Tặng kèm 1 hũ trà thảo mộc mật cúc thư thái dưỡng tâm",
      "Hộp tre đan cao cấp, thắt nơ mộc mạc và thiệp chúc viết tay"
    ],
    price: "499.000 đ",
    originalPrice: "560.000 đ",
    tag: "Món quà trọn vẹn sức khỏe",
    ingredients: ["Bộ 2 sản phẩm", "Hộp tre đan thủ công", "Trà cúc mật", "Thiệp viết tay"],
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
  }
];

export const PAIN_POINTS: readonly PainPoint[] = [
  {
    id: "moi-mat",
    title: "Mỏi mắt liên tục",
    description: "Đôi mắt khô rát, nặng nề sau hàng giờ đọc sách, ôn thi hay làm việc trước màn hình điện tử công nghiệp.",
    iconType: "eye"
  },
  {
    id: "cang-co-vai-gay",
    title: "Cơ gáy co cứng",
    description: "Đau mỏi cơ vùng vai gáy, cột sống thắt lưng do tư thế ngồi thụ động kéo dài không được thư giãn giải tỏa.",
    iconType: "wave"
  },
  {
    id: "met-moi-kho-ngu",
    title: "Mất ngủ & uể oải",
    description: "Áp lực học tập khiến đầu óc căng thẳng kéo dài, cơ thể kiệt sức nhưng khó tìm lại giấc ngủ tự nhiên thanh bình.",
    iconType: "cup"
  },
  {
    id: "can-cham-soc-tu-nhien",
    title: "Muốn xoa dịu lành tính",
    description: "Mong tìm một phương thức thư giãn an toàn từ thiên nhiên, đem lại hơi ấm ôm ấp vỗ về cơ thể nhạy cảm.",
    iconType: "leaf"
  }
];

export const BENEFITS: readonly Benefit[] = [
  {
    id: "thu-gian-co-the",
    title: "Dưỡng sinh cơ thể chuyên sâu",
    description: "Luồng hơi nóng thảo mộc tự nhiên len lỏi xoa dịu tức thì cơ đau nhức vai gáy gối, hỗ trợ giải độc và lưu chuyển dòng năng lượng nội tại."
  },
  {
    id: "lam-diu-vung-mat",
    title: "Đôi mắt nhẹ nhõm tinh anh",
    description: "Tháo dỡ áp lực căng tức mạch máu mắt, giảm khô rát rệt, giúp khôi phục đôi mắt tươi sáng linh hoạt sau vài phút đắp chườm."
  },
  {
    id: "ho-tro-giam-cang-moi",
    title: "Tâm trí bình yên an tĩnh",
    description: "Hành trình nhiệt liệu học tác động giải phóng các nút thắt cơ học, hỗ trợ giảm hẳn stress căng thẳng học hành thi cử dồn dập."
  },
  {
    id: "huong-thom-de-chiu",
    title: "Hương hoa cỏ tự nhiên dễ chịu",
    description: "Mùi hương thảo dược mộc mạc thơm sâu sả ngải cúc thảo bay lan tỏa dịu dàng, tạo khoảng không spa an lành ngay tại giường nằm."
  },
  {
    id: "cam-giac-duoc-cham-soc",
    title: "Ôm ấp vỗ về từ lòng Việt",
    description: "Nương náu trong cảm giác ấm nóng dịu êm của túi chườm như sự ân cần, săn sóc chu đáo của người thân yêu dành tặng."
  },
  {
    id: "phu-hop-hang-ngay",
    title: "Thuận tiện & tiết kiệm thời gian",
    description: "Chỉ mất 1.5 phút làm nóng nhanh bằng lò vi sóng, bạn đã sở hữu ngay một buổi trị liệu phục hồi thể chất cao cấp tại nhà."
  }
];

export const STEPS: readonly Step[] = [
  {
    number: "01",
    title: "Phun sương nhẹ & Quay nóng",
    description: "Xịt một chút nước sạch lên mặt túi lanh để tạo hơi ẩm tự nhiên. Đặt túi chườm vào lò vi sóng quay công suất trung bình trong 1-2 phút (hoặc hấp cách thủy 5 phút)."
  },
  {
    number: "02",
    title: "Đặt túi chườm lên cơ thể",
    description: "Đặt nhẹ tay thử nhiệt độ vừa ấm êm dịu, sau đó áp chườm trực tiếp lên vùng cần thư giãn như mắt, vai gáy, bụng hay thắt lưng."
  },
  {
    number: "03",
    title: "Nhắm mắt & Thả lỏng tận hưởng",
    description: "Nằm tĩnh lặng, hít thở sâu tận hưởng làn hương thảo mộc mộc mạc bay bổng và cảm nhận dòng nhiệt trị liệu ôm ấp xoa dịu trong 15-20 phút."
  },
  {
    number: "04",
    title: "Cất giữ trong bao Zip kín",
    description: "Sau khi chườm xong, đợi túi thảo mộc nguội hẳn rồi cất cẩn thận vào túi zip đi kèm, bảo quản nơi khô ráo thoáng gió duy trì dược tính."
  }
];

export const WHY_CHOOSE_US: readonly WhyChooseUs[] = [
  {
    id: "culture",
    title: "Ấm áp cội nguồn văn hóa săn sóc",
    description: "Lấy cảm hứng từ nét đẹp quan tâm mộc mạc của gia đình Việt xưa và nay, nâng niu sức khỏe của bạn bằng sự ân cần tinh tế nhất."
  },
  {
    id: "design",
    title: "Bao bì trang nhã, chất liệu mộc",
    description: "Sử dụng sợi bông lanh dệt cotton tự nhiên bền bỉ, lành tính kết hợp hoàn thiện tỉ mỉ - là món quà tặng ý nghĩa đong đầy tình cảm."
  },
  {
    id: "spirit",
    title: "Dược tính bảo toàn 100% thảo mộc",
    description: "Thu hoạch từ vườn cây cỏ đạt chuẩn hữu cơ, phơi sấy lạnh thủ công nhằm giữ nguyên vẹn mùi thơm mộc mạc và công hiệu trị liệu của dược nam."
  },
  {
    id: "zalo-flow",
    title: "Đặt hàng Zalo tiện lợi, chu đáo",
    description: "Trải nghiệm mua hàng trực tuyến cá nhân hóa thân thiện, bạn được nhân viên lắng nghe và tư vấn điều chỉnh phù hợp như người nhà."
  }
];

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: "nguyen-minh-anh",
    author: "Nguyễn Minh Anh",
    role: "Sinh viên Đại học Ngoại Thương",
    content: "Mùa thi cử chạy deadline liên tục mắt em khô rát lắm luôn. Được bạn tặng túi chườm mắt thảo mộc Ấm đắp thử 15 phút mỗi tối trước khi ngủ thấy dễ chịu hẳn, hương hoa cúc khô mộc mạc ngửi siêu ghiền giúp ngủ sâu giấc.",
    rating: 5
  },
  {
    id: "tran-thi-thu-ha",
    author: "Trần Thị Thu Hà",
    role: "Trưởng phòng Nhân sự, Hà Nội",
    content: "Ngồi phòng máy lạnh 8 tiếng gáy tôi đau mỏi ê ẩm. Chiều nào ở văn phòng tôi cũng quay nóng túi chườm body của Ấm chườm sau cổ. Hơi nóng tỏa đều cùng hương quế ngải bay ra thơm cả phòng làm việc, gáy vai nhẹ nhõm hẳn.",
    rating: 5
  },
  {
    id: "le-hoang-nam",
    author: "Lê Hoàng Nam",
    role: "Khách hàng mua tặng mẹ, TP.HCM",
    content: "Set quà đan tre của Ấm thực sự rất tinh tế! Tôi mua gửi tặng mẹ sinh nhật, mẹ khen lắm vì hộp mây tre mộc mạc xinh đẹp, túi chườm nóng dễ dùng xoa dịu đau vai gáy tuổi già. Rất hài lòng vì thái độ tư vấn Zalo tận tình.",
    rating: 5
  }
];
