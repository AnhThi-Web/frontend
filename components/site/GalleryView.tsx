"use client";

import Link from "next/link";
import { ChevronRight, Calendar, User, Camera, Facebook, Twitter, MessageCircle, ArrowLeft, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GalleryView({ gallery }: { gallery: any }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <section className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase font-oswald tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/thu-vien-anh" className="hover:text-primary transition-colors">Thư viện ảnh</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold">{gallery.title}</span>
          </nav>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Header Info */}
            <div className="mb-12">
              <h1 className="text-3xl md:text-5xl font-oswald uppercase font-bold text-gray-900 mb-6 leading-tight">
                {gallery.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-bold uppercase tracking-wider mb-8">
                <span className="flex items-center gap-2 text-primary">
                  <Calendar size={18} /> {gallery.date}
                </span>
                <span className="flex items-center gap-2">
                  <User size={18} /> MITEK Admin
                </span>
                <span className="flex items-center gap-2">
                  <Camera size={18} /> {gallery.images.length} Ảnh
                </span>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-primary pl-6 py-2 bg-gray-50">
                {gallery.description}
              </p>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.images.map((img: any, index: number) => (
                <div key={index} className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-100">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-500">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Social Share */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-oswald uppercase font-bold text-sm tracking-widest text-gray-500">Chia sẻ album:</span>
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
              <Link href="/thu-vien-anh">
                <Button variant="ghost" className="uppercase font-oswald font-bold tracking-widest text-primary flex gap-2 hover:bg-primary/5">
                  <ArrowLeft size={18} /> Quay lại thư viện
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
