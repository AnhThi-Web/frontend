import Link from "next/link";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";

export const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-oswald uppercase font-bold text-gray-800 mb-6">
          Thông tin liên hệ
        </h2>

        <div className="space-y-6">
          {/* Company Name */}
          <div>
            <h3 className="font-oswald uppercase font-bold text-gray-800 mb-3">
              CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ MITEK
            </h3>
          </div>

          {/* Hanoi Office */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Văn phòng Hà Nội</h4>
            <div className="flex gap-3 text-sm text-gray-600">
              <MapPin className="shrink-0 text-primary mt-0.5" size={16} />
              <span>S02 - Tòa D'Eldorado I, 659A Lạc Long Quân, P.Tây Hồ, TP. Hà Nội</span>
            </div>
            <div className="mt-2 ml-6 space-y-1">
              <div className="flex gap-3 text-sm text-gray-600">
                <Phone className="shrink-0 text-primary" size={16} />
                <div className="space-y-0.5">
                  <div><a href="tel:0989491366" className="hover:text-primary transition-colors">0989491366</a></div>
                  <div><a href="tel:0869382925" className="hover:text-primary transition-colors">0869382925</a></div>
                </div>
              </div>
            </div>
          </div>

          {/* Ho Chi Minh Office */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Văn phòng TP. Hồ Chí Minh</h4>
            <div className="flex gap-3 text-sm text-gray-600">
              <MapPin className="shrink-0 text-primary mt-0.5" size={16} />
              <span>26 Đ. Số 5, khu Vạn Phúc 1, P.Hiệp Bình, TP. Hồ Chí Minh</span>
            </div>
            <div className="mt-2 ml-6 space-y-1">
              <div className="flex gap-3 text-sm text-gray-600">
                <Phone className="shrink-0 text-primary" size={16} />
                <div className="space-y-0.5">
                  <div><a href="tel:0963867366" className="hover:text-primary transition-colors">0963867366</a></div>
                  <div><a href="tel:0969678756" className="hover:text-primary transition-colors">0969678756</a></div>
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-3 text-sm">
            <Mail className="shrink-0 text-primary mt-0.5" size={16} />
            <div>
              <a href="mailto:info@mitekvn.com" className="text-gray-600 hover:text-primary transition-colors">
                info@mitekvn.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Kết nối với chúng tôi</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/mitekchemicals/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
