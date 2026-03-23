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
              CÔNG TY CỔ PHẦN ANH THI VIET NAM
            </h3>
          </div>

          {/* Hanoi Office */}
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Văn phòng Hà Nội</h4>
            <div className="flex gap-3 text-sm text-gray-600">
              <MapPin className="shrink-0 text-primary mt-0.5" size={16} />
              <span>Nhà Số 10, Ngõ 243/44, Tổ 8 Ngọc Thuỵ, Phường Bồ Đề, TP Hà Nội, Việt Nam</span>
            </div>
          </div>
        {/* Phone */}
          <div>
            <div className="flex gap-3 text-sm text-gray-600">
              <Phone className="shrink-0 text-primary" size={16} />
              <div className="space-y-0.5">
                  <div><a href="tel:0336680264" className="hover:text-primary transition-colors">0336680264</a></div>
              </div>
            </div>
          </div>
      

          {/* Email */}
          <div className="flex gap-3 text-sm">
            <Mail className="shrink-0 text-primary mt-0.5" size={16} />
            <div>
              <a href="mailto:info@anhthi.com" className="text-gray-600 hover:text-primary transition-colors">
                anhthi.chemical@gmail.com
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-3">Kết nối với chúng tôi</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com" 
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
