import Link from "next/link";
import { ChevronRight, Target, Eye, Factory, ShieldCheck, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header / Breadcrumbs */}
      <section className="bg-primary py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/slider_1.jpg?1763658688907" 
            alt="" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl uppercase font-bold mb-4 font-oswald tracking-tight">Giới thiệu</h1>
          <nav className="flex items-center gap-2 text-sm text-white/80 uppercase font-oswald tracking-wider">
            <Link href="/" className="hover:text-secondary transition-colors">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-secondary font-medium">Giới thiệu về MITEK</span>
          </nav>
        </div>
      </section>

      {/* Main Intro Section */}
      <section className="py-24">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 -z-0 rounded-full" />
                <img 
                  src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/image-abouts.png?1763658688907" 
                  alt="Nhà máy MITEK" 
                  className="w-full h-auto relative z-10 shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 md:p-8 z-20 shadow-xl hidden md:block max-w-[240px]">
                  <p className="font-oswald text-4xl font-bold mb-2">4,000</p>
                  <p className="text-xs uppercase tracking-widest font-bold opacity-80">Tấn / Năm công suất sản xuất</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-primary font-oswald uppercase tracking-[0.2em] font-bold mb-4 block">Về chúng tôi</span>
              <h2 className="text-3xl md:text-5xl font-oswald uppercase font-bold mb-8 leading-tight">
                MITEK - TIÊN PHONG TRONG GIẢI PHÁP <span className="text-primary">XI MẠ XANH</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  <strong>MITEK</strong> là doanh nghiệp sản xuất và kinh doanh hóa chất phụ gia đặc chủng, tọa lạc tại KCN Xuyên Á, xã Đức Lập, tỉnh Tây Ninh, Việt Nam. Chúng tôi tự hào sở hữu nhà máy hiện đại với công suất <strong>4.000 tấn/năm</strong> cùng kho chứa <strong>1.500 tấn</strong>, vận hành nghiêm ngặt theo các tiêu chuẩn an toàn và môi trường quốc tế.
                </p>
                <p>
                  Được dẫn dắt bởi đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực hoàn thiện bề mặt kim loại, MITEK cam kết mang đến những giải pháp công nghệ ưu việt, không ngừng đổi mới để đáp ứng nhu cầu khắt khe của ngành công nghiệp phụ trợ tại Việt Nam và khu vực.
                </p>
                <p>
                  Với phòng thí nghiệm hiện đại và đội ngũ kỹ sư tận tâm, chúng tôi không chỉ cung cấp sản phẩm mà còn đồng hành cùng khách hàng trong việc tối ưu hóa quy trình, giảm thiểu tác động môi trường thông qua các sản phẩm sản xuất "xanh".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 shadow-sm border border-gray-100 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full transition-transform group-hover:scale-150 duration-500" />
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8 relative z-10">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-oswald uppercase font-bold mb-6 relative z-10">Tầm nhìn</h3>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Trở thành công ty hàng đầu tại Việt Nam chuyên cung cấp các sản phẩm hóa chất đặc chủng thân thiện môi trường và giải pháp công nghệ tiên tiến. Chúng tôi hướng tới hoạt động đa ngành, toàn cầu, mang lại những giá trị gia tăng cao nhất cho đối tác, cổ đông và xã hội.
              </p>
            </div>
            <div className="bg-white p-12 shadow-sm border border-gray-100 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -mr-16 -mt-16 rounded-full transition-transform group-hover:scale-150 duration-500" />
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-primary mb-8 relative z-10">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-oswald uppercase font-bold mb-6 relative z-10">Sứ mệnh</h3>
              <p className="text-gray-600 leading-relaxed text-lg relative z-10">
                Kiến tạo môi trường kinh doanh minh bạch, phát huy tối đa nguồn lực cho sự phát triển bền vững. MITEK cam kết cung cấp các sản phẩm phụ gia và tư vấn công nghệ theo hướng an toàn môi trường, đảm bảo hiệu quả kinh tế cao nhất cho khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities / Facts */}
      <section className="py-24">
        <div className="container px-4">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-oswald uppercase font-bold mb-4">Năng lực sản xuất</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <Factory size={28} />
              </div>
              <div className="font-oswald text-4xl font-bold text-gray-900 mb-2">4,000</div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Tấn / Năm</p>
              <p className="mt-4 text-sm text-gray-600">Công suất sản xuất thực tế tại nhà máy Tây Ninh.</p>
            </div>
            <div className="text-center p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <ShieldCheck size={28} />
              </div>
              <div className="font-oswald text-4xl font-bold text-gray-900 mb-2">1,500</div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Tấn</p>
              <p className="mt-4 text-sm text-gray-600">Sức chứa hệ thống kho bãi hiện đại, an toàn.</p>
            </div>
            <div className="text-center p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <Users size={28} />
              </div>
              <div className="font-oswald text-4xl font-bold text-gray-900 mb-2">15+</div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Năm kinh nghiệm</p>
              <p className="mt-4 text-sm text-gray-600">Đội ngũ chuyên gia và kỹ sư nòng cốt.</p>
            </div>
            <div className="text-center p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <Globe size={28} />
              </div>
              <div className="font-oswald text-4xl font-bold text-gray-900 mb-2">Quốc tế</div>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Tiêu chuẩn</p>
              <p className="mt-4 text-sm text-gray-600">Vận hành theo chuẩn an toàn – môi trường toàn cầu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="bg-primary py-24 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-oswald uppercase font-bold mb-12 italic">Cam kết từ MITEK</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="space-y-4">
              <h4 className="text-secondary font-oswald uppercase text-xl font-bold">Công nghệ ưu việt</h4>
              <p className="opacity-80 leading-relaxed">Luôn cập nhật và nghiên cứu các giải pháp hóa chất phụ gia tiên tiến nhất trên thế giới.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-secondary font-oswald uppercase text-xl font-bold">Sản xuất "Xanh"</h4>
              <p className="opacity-80 leading-relaxed">Đề cao trách nhiệm môi trường trong từng quy trình và sản phẩm cung cấp cho khách hàng.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-secondary font-oswald uppercase text-xl font-bold">Đồng hành kỹ thuật</h4>
              <p className="opacity-80 leading-relaxed">Hỗ trợ kỹ thuật chuyên sâu tại hiện trường, giúp khách hàng giải quyết mọi khó khăn.</p>
            </div>
          </div>
          <div className="mt-16">
            <Link href="/lien-he">
              <Button size="lg" className="bg-secondary text-primary hover:bg-white font-bold h-14 rounded-none px-12 uppercase font-oswald tracking-widest">
                Liên hệ với chúng tôi
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
