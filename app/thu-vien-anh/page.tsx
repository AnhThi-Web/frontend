import Link from "next/link";
import { ChevronRight, Calendar, Camera, Maximize2 } from "lucide-react";
import { galleryItems } from "@/lib/mock-data";

export default function GalleryPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-primary py-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/slider_1.jpg?1763658688907" 
            alt="" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container relative z-10 px-4">
          <h1 className="text-3xl md:text-5xl uppercase font-bold mb-4 font-oswald tracking-tight">Thư viện ảnh</h1>
          <nav className="flex items-center gap-2 text-sm text-white/80 uppercase font-oswald tracking-wider">
            <Link href="/" className="hover:text-secondary transition-colors">Trang chủ</Link>
            <ChevronRight size={14} />
            <span className="text-secondary font-medium">Thư viện ảnh MITEK</span>
          </nav>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                className="group border border-gray-100 hover:border-primary/10 transition-all hover:shadow-2xl bg-white flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-primary text-white p-3 text-center min-w-[60px] shadow-lg z-10">
                    <p className="font-oswald text-2xl font-bold leading-none">{item.date.day}</p>
                    <p className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-80 border-t border-white/20 pt-1">
                      {item.date.month}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4 uppercase tracking-wider font-bold">
                    <Calendar size={14} className="text-primary" /> 
                    <span>Năm 2025</span>
                  </div>
                  
                  <h3 className="text-xl font-oswald font-bold uppercase mb-4 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 italic">
                    {item.summary}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">
                      Mitek Gallery
                    </span>
                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button (Simulation) */}
          <div className="text-center mt-20">
            <button className="px-10 py-4 bg-primary text-white font-oswald uppercase font-bold tracking-widest hover:bg-primary/90 transition-colors shadow-lg">
              Tải thêm hình ảnh
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section (Added for better layout) */}
      <section className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Hình ảnh", value: "500+" },
              { label: "Sự kiện", value: "50+" },
              { label: "Công nghệ", value: "20+" },
              { label: "Khách hàng", value: "100+" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-oswald font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
