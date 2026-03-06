import { ContactMaps } from "@/components/ContactMaps";
import { ContactForm } from "@/components/ContactForm";
import { ContactInfo } from "@/components/ContactInfo";

export const metadata = {
  title: "Liên hệ - MITEK VIETNAM",
  description: "Liên hệ với MITEK để được tư vấn kỹ thuật và nhận báo giá chi tiết.",
};

export default function Contact() {
  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/slider_1.jpg?1763658688907"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4 font-oswald uppercase font-bold">Liên hệ</h1>
          <div className="w-20 h-1 bg-secondary mx-auto" />
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
          <a href="/" className="hover:text-primary transition-colors">Trang chủ</a>
          <span className="mx-2">&gt;</span>
          <span className="text-primary font-bold">Liên hệ</span>
        </div>
      </section>

      {/* Maps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <ContactMaps />
        </div>
      </section>

      {/* Contact Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <ContactInfo />
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
