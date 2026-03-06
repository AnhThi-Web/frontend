import Link from "next/link";
import { ChevronRight, Calendar, User, Facebook, Twitter, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsData = {
  "mitek-viif-2025": {
    title: "MITEK TỎA SÁNG TẠI VIIF 2025 VỚI CÁC GIẢI PHÁP CÔNG NGHỆ MẠ TIÊN TIẾN",
    date: "18/11/2025",
    author: "MITEK Admin",
    mainImage: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/z7237180294827-cb1c68642c1ec9105391ef281c550c94.jpg?v=1763456409053",
    content: [
      { type: "p", text: "Vào ngày 12–15/11/2025 vừa qua, Công ty Cổ phần Giải pháp Công nghệ MITEK đã tham gia Hội chợ Quốc tế Hàng Công nghiệp Việt Nam 2025 (Vietnam International Industrial Fair – VIIF 2025) tổ chức tại Hà Nội." },
      { type: "p", text: "Sự kiện quy tụ đông đảo doanh nghiệp, nhà sản xuất và đơn vị cung cấp máy móc – thiết bị công nghiệp, được tổ chức thường niên từ năm 1991 dưới sự chỉ đạo của Thủ tướng Chính phủ và bảo trợ của Bộ Công thương, Bộ Khoa học và Công nghệ, Phòng Thương mại và Công nghiệp Việt Nam." },
      { type: "h4", text: "Dấu ấn của MITEK tại VIIF 2025" },
      { type: "img", src: "https://bizweb.dktcdn.net/thumb/1024x1024/100/424/639/files/z7236587172256-336c31a6bbcb34bec16db34f96ed66d5-2cfd4a55-7ecb-4a9c-b3f6-6fd0dc6e5dd8.jpg?v=1763455677137", caption: "Gian hàng MITEK thu hút đông đảo khách tham quan" },
      { type: "p", text: "Tham gia VIIF 2025, MITEK giới thiệu đến khách tham quan và đối tác những giải pháp công nghệ nổi bật đang được doanh nghiệp triển khai trên thị trường, bao gồm:" },
      { type: "list", items: [
        "Công nghệ mạ kẽm gốm – Giải pháp thay thế hiệu quả cho mạ kẽm nhúng nóng.",
        "Công nghệ mạ Cr3+ thân thiện môi trường – Giải pháp thay thế cho mạ Cr6+.",
        "Công nghệ mạ Đồng, Bạc không Xyanua – Giải pháp công nghệ thân thiện môi trường.",
        "Giải pháp chống ăn mòn toàn diện cho kim loại."
      ]},
      { type: "img", src: "https://bizweb.dktcdn.net/thumb/1024x1024/100/424/639/files/z7236596563350-eac7c210af1832ec085247d164114ea1.jpg?v=1763455998826", caption: "Các sản phẩm mẫu được trưng bày tại triển lãm" },
      { type: "h4", text: "Tăng cường kết nối – mở rộng hợp tác" },
      { type: "p", text: "Trong suốt thời gian diễn ra triển lãm, gian hàng MITEK đã đón tiếp nhiều lượt khách tham quan đến từ các lĩnh vực cơ khí, chế tạo, điện tử, và các đối tác cung cấp thiết bị công nghiệp." },
      { type: "img", src: "https://bizweb.dktcdn.net/thumb/1024x1024/100/424/639/files/z7236602029759-56b4bc7e7c8c6b690f09a7f19f5b1ad7-4f38d327-5fd7-45e9-8beb-90e507f2174d.jpg?v=1763456031779", caption: "Đội ngũ kỹ sư MITEK tư vấn cho khách hàng" },
      { type: "h4", text: "Khẳng định năng lực – định hướng phát triển" },
      { type: "p", text: "VIIF 2025 là nền tảng quan trọng giúp MITEK khẳng định năng lực dẫn đầu trong các giải pháp công nghệ mạ tiên tiến, thân thiện với môi trường; đồng thời tăng cường kết nối đối tác, cập nhật các xu hướng công nghệ mới và tối ưu hóa định hướng phát triển sản phẩm trong giai đoạn tiếp theo." },
      { type: "p", text: "MITEK trân trọng cảm ơn Ban tổ chức VIIF 2025, quý đối tác và khách hàng đã đến tham quan và làm việc tại gian hàng. Sự quan tâm của quý vị là động lực để MITEK tiếp tục đổi mới và nâng cao chất lượng sản phẩm – dịch vụ." }
    ]
  }
};

const relatedNews = [
  {
    id: "outing-2025",
    title: 'OUTING 2025 "BUILD STRENGTH - BREAK LIMITS"',
    date: "17/07/2025",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/mitek-381.jpg?v=1763363914247"
  },
  {
    id: "chuc-mung-ngay-phu-nu-2025",
    title: "CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10/2025",
    date: "20/10/2025",
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/z7237180294827-cb1c68642c1ec9105391ef281c550c94.jpg?v=1763456409053"
  }
];

export default function NewsDetail({ params }: { params: { newsId: string } }) {
  const newsId = params.newsId;
  const news = newsData[newsId as keyof typeof newsData] || newsData["mitek-viif-2025"];

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase font-oswald tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate max-w-[200px] md:max-w-none">{news.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Content */}
            <div className="lg:w-3/4">
              <article>
                {/* News Title */}
                <h1 className="text-3xl md:text-5xl font-oswald uppercase font-bold text-gray-900 mb-8 leading-tight">
                  {news.title}
                </h1>

                {/* News Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-10 pb-6 border-b border-gray-100 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2 text-primary">
                    <Calendar size={18} /> {news.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={18} /> {news.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Share2 size={18} /> 125 Shares
                  </span>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
                  {news.content.map((item, index) => {
                    if (item.type === "p") return <p key={index}>{item.text}</p>;
                    if (item.type === "h4") return <h4 key={index} className="text-2xl font-oswald uppercase font-bold text-primary pt-6">{item.text}</h4>;
                    if (item.type === "img") return (
                      <figure key={index} className="my-10 group">
                        <div className="overflow-hidden border border-gray-100 shadow-sm">
                          <img src={item.src} alt={item.caption} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        {item.caption && <figcaption className="text-center text-sm text-gray-400 mt-4 italic">{item.caption}</figcaption>}
                      </figure>
                    );
                    if (item.type === "list") return (
                      <ul key={index} className="space-y-3 list-none pl-0">
                        {item.items?.map((li, i) => (
                          <li key={i} className="flex gap-3 items-start">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2.5 shrink-0" />
                            <span>{li}</span>
                          </li>
                        ))}
                      </ul>
                    );
                    return null;
                  })}
                </div>

                {/* Social Share Footer */}
                <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-oswald uppercase font-bold text-sm tracking-widest text-gray-500">Chia sẻ bài viết:</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="w-10 h-10 rounded-none border-gray-200 hover:bg-[#3b5998] hover:text-white hover:border-[#3b5998] transition-all">
                        <Facebook size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="w-10 h-10 rounded-none border-gray-200 hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] transition-all">
                        <Twitter size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="w-10 h-10 rounded-none border-gray-200 hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-all">
                        <MessageCircle size={18} />
                      </Button>
                    </div>
                  </div>
                  <Link href="/tin-tuc">
                    <Button variant="ghost" className="uppercase font-oswald font-bold tracking-widest text-primary flex gap-2 hover:bg-primary/5">
                      <ArrowLeft size={18} /> Quay lại tin tức
                    </Button>
                  </Link>
                </div>
              </article>
            </div>

            {/* Sidebar (Similar to listing but simplified) */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-12">
                {/* Related Posts */}
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h4 className="font-oswald uppercase font-bold text-lg mb-6 border-l-4 border-primary pl-4">Bài viết liên quan</h4>
                  <div className="space-y-8">
                    {relatedNews.map((n) => (
                      <div key={n.id} className="group">
                        <div className="aspect-[16/10] overflow-hidden mb-4 border border-white">
                          <img src={n.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h5 className="text-sm font-oswald uppercase font-bold leading-tight group-hover:text-primary transition-colors">
                          <Link href={`/tin-tuc/${n.id}`}>{n.title}</Link>
                        </h5>
                        <p className="text-[10px] text-gray-400 mt-2 font-bold">{n.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-primary p-10 text-white text-center">
                  <h4 className="font-oswald uppercase text-xl font-bold mb-4">MITEK SOLUTIONS</h4>
                  <p className="text-sm opacity-80 mb-8 leading-relaxed">Chúng tôi cung cấp các giải pháp công nghệ xi mạ tiên tiến và thân thiện môi trường.</p>
                  <Link href="/lien-he">
                    <Button className="bg-white text-primary hover:bg-secondary hover:text-primary font-bold w-full h-12 rounded-none uppercase font-oswald tracking-widest text-xs">
                      Liên hệ ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
