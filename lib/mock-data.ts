export const categories = [
  { id: "all", name: "Tất cả sản phẩm", path: "/danh-muc-san-pham" },
  { id: "detergents", name: "CHẤT TẨY RỬA", path: "/chat-tay-rua" },
  { id: "zinc", name: "MẠ KẼM", path: "/ma-kem" },
  { id: "copper", name: "MẠ ĐỒNG", path: "/ma-dong" },
  { id: "nickel", name: "MẠ NIKEN", path: "/ma-niken" },
  { id: "chrome", name: "MẠ CRÔM", path: "/ma-crom" },
  { id: "aluminum", name: "HOÀN THIỆN BỀ MẶT NHÔM", path: "/hoan-thien-be-mat-nhom" },
  { id: "plastic", name: "MẠ TRÊN NỀN NHỰA", path: "/ma-tren-nen-nhua" },
  { id: "anti-corrosion", name: "CHỐNG ĂN MÒN", path: "/chong-an-mon" },
];

export const products = [
  {
    id: "metclean-sc10",
    name: "METCLEAN® SC10",
    categoryId: "detergents",
    categoryName: "Chất tẩy rửa",
    description: "Hoá chất tẩy dầu mỡ ngâm nóng dạng kiềm",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/sc10.jpg?v=1628823270670",
    details: "METCLEAN® SC10 là chất tẩy rửa kiềm mạnh được thiết kế đặc biệt để loại bỏ các loại dầu mỡ, hợp chất đánh bóng và bụi bẩn bám trên bề mặt thép, đồng và các hợp kim của chúng. Sản phẩm hoạt động hiệu quả trong quy trình ngâm nóng, chuẩn bị bề mặt hoàn hảo cho các công đoạn xi mạ tiếp theo.",
    features: [
      "Khả năng tẩy rửa mạnh mẽ",
      "Tuổi thọ bể cao, tiết kiệm chi phí",
      "Dễ dàng rửa sạch sau khi tẩy",
      "Thân thiện với môi trường, không chứa chất độc hại cấm"
    ],
    specs: {
      "Nồng độ": "40 - 80 g/L",
      "Nhiệt độ": "60 - 90°C",
      "Thời gian": "5 - 15 phút",
      "Thiết bị": "Bể thép nhẹ hoặc thép không gỉ"
    }
  },
  {
    id: "metclean-ec20",
    name: "METCLEAN® EC20",
    categoryId: "detergents",
    categoryName: "Chất tẩy rửa",
    description: "Hoá chất tẩy dầu điện",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/ec20.jpg?v=1628823330367",
    details: "METCLEAN® EC20 là chất tẩy dầu điện hóa chuyên dụng, giúp loại bỏ triệt để các vết dầu mỡ còn sót lại sau công đoạn tẩy ngâm. Sản phẩm tạo bọt kiểm soát, dẫn điện tốt và bảo vệ bề mặt kim loại không bị xâm thực mạnh trong quá trình điện giải.",
    features: [
      "Tẩy sạch sâu bằng tác động điện hóa",
      "Dẫn điện cực tốt",
      "Ít tạo bọt, dễ vận hành",
      "Phù hợp cho cả quy trình tẩy điện cực dương và cực âm"
    ],
    specs: {
      "Nồng độ": "50 - 100 g/L",
      "Nhiệt độ": "20 - 50°C",
      "Mật độ dòng": "5 - 10 A/dm²",
      "Thời gian": "1 - 3 phút"
    }
  },
  {
    id: "coldip-tri-v-zn-ni",
    name: "COLDIP™ TRI-V ZN-NI TRUE BLUE 1000",
    categoryId: "zinc",
    categoryName: "Mạ kẽm",
    description: "Hóa chất mạ kẽm-niken chất lượng cao",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/sc10.jpg?v=1628823270670",
    details: "COLDIP™ TRI-V ZN-NI là công nghệ mạ hợp kim Kẽm-Niken tiên tiến, mang lại khả năng chống ăn mòn vượt trội (lên đến hơn 1000 giờ phun muối). Sản phẩm tạo lớp mạ có màu xanh đẹp mắt, đồng nhất và có độ bám dính cực tốt.",
    features: [
      "Khả năng chống ăn mòn cực cao (>1000h SST)",
      "Lớp mạ đồng nhất, bóng đẹp",
      "Hàm lượng Niken trong hợp kim ổn định (12-15%)",
      "Đáp ứng các tiêu chuẩn khắt khe của ngành ô tô và hàng không"
    ],
    specs: {
      "Hàm lượng Zn": "8 - 12 g/L",
      "Hàm lượng Ni": "1.5 - 2.0 g/L",
      "Nhiệt độ": "23 - 28°C",
      "Mật độ dòng": "1 - 4 A/dm²"
    }
  },
  {
    id: "kenlevel-blue",
    name: "KENLEVEL® BLUE",
    categoryId: "zinc",
    categoryName: "Mạ kẽm",
    description: "Phụ gia mạ kẽm acid clorua",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/ec20.jpg?v=1628823330367",
    details: "KENLEVEL® BLUE là hệ phụ gia mạ kẽm acid amoni-free hoặc kali clorua, tạo lớp mạ kẽm siêu bóng, dẻo và có khả năng thụ động tuyệt vời. Quy trình vận hành ổn định, dễ kiểm soát và hiệu suất dòng cao.",
    features: [
      "Lớp mạ siêu bóng như gương",
      "Khả năng phân bố lớp mạ tốt",
      "Tốc độ mạ nhanh",
      "Dễ dàng thụ động xanh hoặc cầu vồng"
    ],
    specs: {
      "Hàm lượng Zn": "25 - 35 g/L",
      "Hàm lượng Cl-": "120 - 150 g/L",
      "pH": "4.8 - 5.4",
      "Nhiệt độ": "20 - 45°C"
    }
  },
  {
    id: "sparkle-ac-78",
    name: "SPARKLE AC 78",
    categoryId: "copper",
    categoryName: "Mạ đồng",
    description: "Hoá chất xi mạ đánh bóng đồng",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/ac78.jpg?v=1628823483980",
    details: "SPARKLE AC 78 là quy trình mạ đồng acid bóng cao cấp, tạo lớp mạ có độ san phẳng tuyệt vời và độ bóng gương rực rỡ. Sản phẩm cực kỳ ổn định, dễ vận hành và phù hợp cho cả mạ treo và mạ quay.",
    features: [
      "Độ bóng và độ san phẳng cực cao",
      "Lớp mạ dẻo, độ bám dính tốt",
      "Tiêu hao phụ gia thấp",
      "Phù hợp cho nhiều nền kim loại khác nhau"
    ],
    specs: {
      "Hàm lượng Cu": "50 - 60 g/L",
      "Hàm lượng H2SO4": "50 - 70 g/L",
      "Hàm lượng Cl-": "60 - 100 ppm",
      "Nhiệt độ": "20 - 30°C"
    }
  },
  {
    id: "ni-2600",
    name: "NI 2600",
    categoryId: "nickel",
    categoryName: "Mạ niken",
    description: "Phụ gia mạ niken bóng nhanh",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/ni2600.jpg?v=1628823545000",
    details: "NI 2600 là hệ phụ gia mạ niken bóng tiên tiến, giúp tạo lớp mạ niken cực kỳ bóng và trắng sáng trong thời gian ngắn. Sản phẩm có khả năng phân bố độ dày lớp mạ tốt và độ san phẳng cao.",
    features: [
      "Tốc độ làm bóng cực nhanh",
      "Lớp mạ trắng sáng, rực rỡ",
      "Khả năng chịu tạp chất tốt",
      "Dễ dàng kiểm soát bằng phân tích"
    ],
    specs: {
      "Hàm lượng Ni": "60 - 80 g/L",
      "Hàm lượng Acid Boric": "40 - 50 g/L",
      "pH": "3.8 - 4.6",
      "Nhiệt độ": "50 - 60°C"
    }
  },
  {
    id: "tricol-decor",
    name: "TriCOL™ Décor",
    categoryId: "chrome",
    categoryName: "Mạ crôm",
    description: "Hóa chất mạ crôm 3+ trang trí",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/products/ni2600.jpg?v=1628823545000",
    details: "TriCOL™ Décor là công nghệ mạ crôm hóa trị 3 (Cr3+) thân thiện với môi trường, thay thế hoàn toàn quy trình mạ crôm hóa trị 6 độc hại. Sản phẩm tạo lớp mạ crôm trang trí có màu sắc hiện đại, trắng sáng và khả năng bao phủ tuyệt vời.",
    features: [
      "Thân thiện với môi trường (Cr3+)",
      "Khả năng bao phủ cực tốt",
      "Màu sắc đồng nhất, trắng sáng",
      "An toàn cho người vận hành"
    ],
    specs: {
      "Hàm lượng Cr": "20 - 25 g/L",
      "pH": "3.4 - 3.8",
      "Nhiệt độ": "30 - 40°C",
      "Mật độ dòng": "5 - 15 A/dm²"
    }
  }
];

export const galleryItems = [
  {
    id: "outing-2020-nha-trang",
    title: "Outing 2020 Nha Trang",
    date: { day: "16", month: "T08" },
    image: "https://bizweb.dktcdn.net/100/424/639/articles/1.jpg?v=1628753030207",
    summary: "Outing 2020 Nha Trang. Một hành trình gắn kết và tràn đầy năng lượng của tập thể MITEK."
  },
  {
    id: "cong-nghe-ma-metatech",
    title: "Công nghệ mạ Metatech",
    date: { day: "16", month: "T08" },
    image: "https://bizweb.dktcdn.net/100/424/639/articles/image45.jpg?v=1629270933923",
    summary: "Giới thiệu các giải pháp công nghệ mạ Metatech tiên tiến, tối ưu hiệu quả sản xuất."
  },
  {
    id: "chrome-plating",
    title: "Mạ crom",
    date: { day: "04", month: "T08" },
    image: "https://bizweb.dktcdn.net/100/424/639/articles/macrom.jpg?v=1629274103357",
    summary: "Hình ảnh quy trình và sản phẩm mạ crom chất lượng cao tại nhà máy MITEK."
  },
  {
    id: "production-factory",
    title: "Nhà máy sản xuất MITEK",
    date: { day: "12", month: "T07" },
    image: "https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/image-abouts.png?1763658688907",
    summary: "Cơ sở hạ tầng và trang thiết bị hiện đại tại nhà máy sản xuất của MITEK."
  }
];

export const galleryDetailData: Record<string, any> = {
  "outing-2020-nha-trang": {
    title: "Outing 2020 Nha Trang",
    date: "12/08/2021",
    description: "Hành trình Outing 2020 tại Nha Trang của tập thể MITEK đã để lại nhiều kỷ niệm đáng nhớ. Những hoạt động team building sôi động, những giây phút thư giãn bên bờ biển xanh đã thắt chặt thêm tinh thần đoàn kết của các thành viên.",
    images: [
      { src: "https://bizweb.dktcdn.net/100/424/639/articles/1.jpg?v=1628753030207", alt: "Outing 2020 Nha Trang - Team MITEK" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/1.jpg?v=1628752846095", alt: "Outing 2020 Nha Trang - Biển xanh" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/5.jpg?v=1628752891579", alt: "Outing 2020 Nha Trang - Team building" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/7.jpg?v=1628752913399", alt: "Outing 2020 Nha Trang - Gala Dinner" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/8.jpg?v=1628752920941", alt: "Outing 2020 Nha Trang - Chụp ảnh lưu niệm" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/10.jpg?v=1628752941086", alt: "Outing 2020 Nha Trang - Vui chơi trên biển" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/11.jpg?v=1628752949213", alt: "Outing 2020 Nha Trang - Khám phá vịnh" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/12.jpg?v=1628752957096", alt: "Outing 2020 Nha Trang - Tập thể đoàn kết" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/15.jpg?v=1628752969774", alt: "Outing 2020 Nha Trang - Những nụ cười" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/16.jpg?v=1628752978586", alt: "Outing 2020 Nha Trang - Kỷ niệm khó quên" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/3.jpg?v=1628752874779", alt: "Outing 2020 Nha Trang - Khởi động" },
      { src: "https://bizweb.dktcdn.net/100/424/639/files/4.jpg?v=1628752875806", alt: "Outing 2020 Nha Trang - Teambuilding sôi động" }
    ]
  }
};
