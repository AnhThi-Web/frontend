import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const newsItems = [
  {
    id: "mitek-viif-2025",
    title: "MITEK TỎA SÁNG TẠI VIIF 2025 VỚI CÁC GIẢI PHÁP CÔNG NGHỆ MẠ TIÊN TIẾN",
    date: { day: "18", month: "T11" },
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/z7237180294827-cb1c68642c1ec9105391ef281c550c94.jpg?v=1763456409053",
    summary: "Vào ngày 12–15/11/2025 vừa qua, Công ty Cổ phần Giải pháp Công nghệ MITEK đã tham gia Hội chợ Công nghiệp Quốc tế Việt Nam (VIIF 2025) tại Hà Nội. Tại đây, MITEK đã giới thiệu những công nghệ mạ tiên tiến nhất...",
    author: "MITEK Admin"
  },
  {
    id: "outing-2025",
    title: 'OUTING 2025 "BUILD STRENGTH - BREAK LIMITS"',
    date: { day: "17", month: "T07" },
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/mitek-381.jpg?v=1763363914247",
    summary: "Chương trình Outing 2025 với chủ đề 'Build Strength - Break Limits' đã diễn ra thành công rực rỡ, mang lại những giây phút gắn kết và trải nghiệm đáng nhớ cho toàn thể đội ngũ MITEK...",
    author: "MITEK Admin"
  },
  {
    id: "chuc-mung-ngay-phu-nu-2025",
    title: "CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10/2025",
    date: { day: "20", month: "T10" },
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/z7237180294827-cb1c68642c1ec9105391ef281c550c94.jpg?v=1763456409053",
    summary: "Nhân ngày Phụ nữ Việt Nam 20/10, MITEK xin gửi những lời chúc tốt đẹp nhất đến toàn thể chị em phụ nữ. Chúc các chị em luôn xinh đẹp, hạnh phúc và thành công trong công việc cũng như cuộc sống...",
    author: "MITEK Admin"
  },
  {
    id: "hoi-thao-cong-nghe-ma",
    title: "HỘI THẢO CÔNG NGHỆ MẠ VÀ HOÀN THIỆN BỀ MẶT 2025",
    date: { day: "05", month: "T09" },
    image: "https://bizweb.dktcdn.net/thumb/large/100/424/639/articles/mitek-381.jpg?v=1763363914247",
    summary: "MITEK phối hợp cùng Hiệp hội Xi mạ Việt Nam tổ chức hội thảo chuyên đề về các giải pháp mạ thân thiện môi trường, thu hút sự tham gia của đông đảo các chuyên gia và doanh nghiệp trong ngành...",
    author: "MITEK Admin"
  }
];

const sidebarNews = newsItems.slice(0, 3);

export default function News() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/slider_1.jpg?1763658688907" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 px-4">
          <h1 className="text-3xl md:text-5xl uppercase font-bold mb-4 font-oswald tracking-tight">Tin tức</h1>
          <nav className="flex items-center gap-2 text-sm text-white/80 uppercase font-oswald tracking-wider">
            <Link href="/" className="hover:text-secondary transition-colors">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-secondary font-medium">Tin tức & Sự kiện</span>
          </nav>
        </div>
      </section>

      {/* News Content */}
      <section className="py-20">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Main News List */}
            <div className="lg:w-3/4 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {newsItems.map((news) => (
                  <article key={news.id} className="group border border-gray-100 hover:border-primary/10 transition-all hover:shadow-xl bg-white flex flex-col h-full">
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-white p-3 text-center min-w-[60px] shadow-lg">
                        <p className="font-oswald text-2xl font-bold leading-none">{news.date.day}</p>
                        <p className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-80 border-t border-white/20 pt-1">{news.date.month}</p>
                      </div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">
                        <span className="flex items-center gap-1.5"><User size={14} className="text-primary" /> {news.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" /> {news.date.day}/{news.date.month}/2025</span>
                      </div>
                      <h3 className="text-xl font-oswald font-bold uppercase mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        <Link href={`/tin-tuc/${news.id}`}>{news.title}</Link>
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {news.summary}
                      </p>
                      <div className="mt-auto">
                        <Link 
                          href={`/tin-tuc/${news.id}`} 
                          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3 transition-all"
                        >
                          Xem chi tiết <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Placeholder */}
              <div className="flex justify-center pt-8">
                <nav className="flex items-center gap-2">
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-none bg-primary text-white border-primary">1</Button>
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-none hover:bg-primary hover:text-white transition-colors border-gray-200">2</Button>
                  <Button variant="outline" className="w-10 h-10 p-0 rounded-none hover:bg-primary hover:text-white transition-colors border-gray-200">
                    <ChevronRight size={18} />
                  </Button>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-12">
                {/* Search Sidebar */}
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h4 className="font-oswald uppercase font-bold text-lg mb-6 border-l-4 border-primary pl-4">Tìm kiếm tin tức</h4>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm..." 
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>

                {/* Categories Sidebar */}
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h4 className="font-oswald uppercase font-bold text-lg mb-6 border-l-4 border-primary pl-4">Danh mục tin tức</h4>
                  <ul className="space-y-4">
                    {["Tin công ty", "Tin tức ngành", "Sự kiện", "Thông báo", "Tuyển dụng"].map((cat) => (
                      <li key={cat}>
                        <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors flex justify-between items-center group">
                          <span>{cat}</span>
                          <span className="w-6 h-6 bg-white border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors">0</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Posts Sidebar */}
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h4 className="font-oswald uppercase font-bold text-lg mb-6 border-l-4 border-primary pl-4">Tin nổi bật</h4>
                  <div className="space-y-6">
                    {sidebarNews.map((news) => (
                      <div key={news.id} className="flex gap-4 group">
                        <div className="w-20 h-20 shrink-0 overflow-hidden bg-white border border-gray-100">
                          <img src={news.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div>
                          <h5 className="text-xs font-bold uppercase leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                            <Link href={`/tin-tuc/${news.id}`}>{news.title}</Link>
                          </h5>
                          <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-wider">{news.date.day}/{news.date.month}/2025</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Sidebar */}
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h4 className="font-oswald uppercase font-bold text-lg mb-6 border-l-4 border-primary pl-4">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {["MITEK", "Xi mạ", "VIIF 2025", "Công nghệ", "Môi trường", "Hội thảo"].map((tag) => (
                      <Link 
                        key={tag} 
                        href="#" 
                        className="px-3 py-1.5 bg-white border border-gray-200 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-white">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-oswald uppercase font-bold mb-4">Nhận bản tin từ MITEK</h2>
            <p className="opacity-80 text-sm">Đăng ký để nhận những thông tin mới nhất về công nghệ xi mạ và các sự kiện của chúng tôi.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Email của bạn..." 
              className="bg-white/10 border border-white/20 px-6 py-4 text-sm w-full md:w-80 focus:outline-none focus:border-white transition-colors placeholder:text-white/50"
            />
            <Button className="bg-secondary text-primary hover:bg-white font-bold h-auto rounded-none px-8 uppercase font-oswald tracking-widest">Gửi</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
