"use client";

import { Layout } from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/slider_1.jpg?1763658688907" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 uppercase">{title}</h1>
          <div className="w-20 h-1 bg-secondary mx-auto" />
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Đang cập nhật nội dung</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {description || "Chúng tôi đang nỗ lực cập nhật thông tin chi tiết cho trang này. Vui lòng quay lại sau hoặc liên hệ trực tiếp với chúng tôi để được hỗ trợ nhanh nhất."}
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="px-8 py-3 border border-primary text-primary font-oswald uppercase font-bold hover:bg-primary hover:text-white transition-colors"
            >
              Quay lại
            </button>
            <a 
              href="/"
              className="px-8 py-3 bg-primary text-white font-oswald uppercase font-bold hover:bg-primary/90 transition-colors"
            >
              Về trang chủ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
