import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Youtube, Send } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#c4c5c5] text-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <img
                src="/assets/logo.png"
                alt="ANH THI Logo"
                className="h-20 md:h-24 object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-700">
              ANH THI là doanh nghiệp sản xuất và kinh doanh hóa chất phụ gia đặc chủng cho ngành hoàn thiện bề mặt kim loại – xi mạ. Với nhà máy hiện đại và quy trình đạt chuẩn quốc tế.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/mitekchemicals/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors text-white"
              >
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors text-white">
                <Youtube size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors text-white">
                <Send size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-oswald text-gray-900 uppercase text-lg mb-6 border-l-4 border-primary pl-4 font-bold">Liên kết nhanh</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/gioi-thieu" className="text-gray-700 hover:text-primary transition-colors font-medium">Giới thiệu</Link></li>
              <li><Link href="/danh-muc-san-pham" className="text-gray-700 hover:text-primary transition-colors font-medium">Sản phẩm</Link></li>
              <li><Link href="/tin-tuc" className="text-gray-700 hover:text-primary transition-colors font-medium">Tin tức & Sự kiện</Link></li>
              <li><Link href="/thu-vien-anh" className="text-gray-700 hover:text-primary transition-colors font-medium">Thư viện ảnh</Link></li>
              <li><Link href="/lien-he" className="text-gray-700 hover:text-primary transition-colors font-medium">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="font-oswald text-gray-900 uppercase text-lg mb-6 border-l-4 border-primary pl-4 font-bold">Danh mục chính</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/chat-tay-rua" className="text-gray-700 hover:text-primary transition-colors uppercase font-medium text-xs">Chất tẩy rửa</Link></li>
              <li><Link href="/ma-kem" className="text-gray-700 hover:text-primary transition-colors uppercase font-medium text-xs">Mạ kẽm</Link></li>
              <li><Link href="/ma-dong" className="text-gray-700 hover:text-primary transition-colors uppercase font-medium text-xs">Mạ đồng</Link></li>
              <li><Link href="/ma-niken" className="text-gray-700 hover:text-primary transition-colors uppercase font-medium text-xs">Mạ niken</Link></li>
              <li><Link href="/ma-crom" className="text-gray-700 hover:text-primary transition-colors uppercase font-medium text-xs">Mạ crôm</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-oswald text-gray-900 uppercase text-lg mb-6 border-l-4 border-primary pl-4 font-bold">Thông tin liên hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="shrink-0 text-primary" size={20} />
                <span className="text-gray-700">Trụ sở chính: Khu liên cơ Vân Hồ - 52 Lê Đại Hành, Hai Bà Trưng, Hà Nội, Việt Nam.</span>
              </li>
              <li className="flex gap-3">
                <Phone className="shrink-0 text-primary" size={20} />
                <a href="tel:0336680264" className="text-gray-700 hover:text-primary transition-colors">033.668.0264</a>
              </li>
              <li className="flex gap-3">
                <Mail className="shrink-0 text-primary" size={20} />
                <a href="mailto:info@anhthi.com" className="text-gray-700 hover:text-primary transition-colors">info@anhthi.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-400 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-700">
          <p>© 2026 CÔNG TY CỔ PHẦN ANH THI VIET NAM. All rights reserved.</p>
          <p>Thiết kế bởi HTB</p>
        </div>
      </div>
    </footer>
  );
};
