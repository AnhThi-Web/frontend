"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ProductView({ product, relatedProducts }: { product: any, relatedProducts: any[] }) {
  const [activeTab, setActiveTab] = useState("info");

  // Parse JSON fields if they are strings
  let features = [];
  try {
    features = typeof product.features === 'string' ? JSON.parse(product.features) : (product.features || []);
  } catch (e) {}

  let specs = {};
  try {
    specs = typeof product.specs === 'string' ? JSON.parse(product.specs) : (product.specs || {});
  } catch (e) {}

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 uppercase font-oswald tracking-wider">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/danh-muc-san-pham" className="hover:text-primary transition-colors">Sản phẩm</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <div className="bg-gray-50 border border-gray-100 p-8 md:p-12 sticky top-24 group overflow-hidden">
                <img src={product.imageUrl || ""} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                  {product.category?.name || "Sản phẩm"}
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-5xl font-oswald uppercase font-bold text-gray-900 mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="w-20 h-1.5 bg-primary mb-8" />
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light italic border-l-4 border-gray-100 pl-6">{product.description}</p>
              <div className="prose prose-slate max-w-none mb-10 text-gray-700 leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: product.details || "" }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0"><CheckCircle2 size={24} /></div>
                  <div><h4 className="font-bold text-sm uppercase">Chất lượng</h4><p className="text-xs text-gray-500">Đạt chuẩn quốc tế</p></div>
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0"><FileText size={24} /></div>
                  <div><h4 className="font-bold text-sm uppercase">Tài liệu</h4><p className="text-xs text-gray-500">Sẵn sàng cung cấp</p></div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:02723759664" className="flex-1">
                  <Button size="lg" className="w-full h-14 rounded-none font-oswald uppercase tracking-wider flex gap-2">
                    <Phone size={18} /> Liên hệ tư vấn
                  </Button>
                </a>
                <Link href="/lien-he" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full h-14 rounded-none border-primary text-primary hover:bg-primary hover:text-white font-oswald uppercase tracking-wider flex gap-2">
                    <Mail size={18} /> Gửi yêu cầu báo giá
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
              <button onClick={() => setActiveTab("info")} className={cn("px-8 py-4 font-oswald uppercase text-sm tracking-widest transition-all relative shrink-0", activeTab === "info" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600")}>
                Đặc điểm nổi bật
                {activeTab === "info" && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
              </button>
              <button onClick={() => setActiveTab("specs")} className={cn("px-8 py-4 font-oswald uppercase text-sm tracking-widest transition-all relative shrink-0", activeTab === "specs" ? "text-primary font-bold" : "text-gray-400 hover:text-gray-600")}>
                Thông số kỹ thuật
                {activeTab === "specs" && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
              </button>
            </div>

            <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm min-h-[300px]">
              {activeTab === "info" && (
                <div className="animate-in fade-in duration-500">
                  <h3 className="font-oswald text-2xl uppercase font-bold mb-6 text-primary flex items-center gap-3">Ưu điểm của sản phẩm</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex gap-4">
                        <CheckCircle2 size={20} className="text-primary shrink-0 mt-1" /><span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeTab === "specs" && (
                <div className="animate-in fade-in duration-500">
                  <h3 className="font-oswald text-2xl uppercase font-bold mb-6 text-primary">Thông số vận hành tiêu chuẩn</h3>
                  <div className="overflow-hidden border border-gray-100 rounded-lg">
                    <table className="w-full text-left">
                      <tbody className="divide-y divide-gray-100">
                        {Object.entries(specs || {}).map(([key, value]) => (
                          <tr key={key} className="hover:bg-gray-50 transition-colors">
                            <th className="px-6 py-4 bg-gray-50 font-bold text-sm text-gray-700 w-1/3 uppercase tracking-wider">{key}</th>
                            <td className="px-6 py-4 text-sm text-gray-600">{value as string}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-24">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="font-oswald text-3xl md:text-4xl uppercase font-bold mb-4">Sản phẩm liên quan</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <div key={p.id} className="bg-white group border border-gray-100 hover:border-primary/20 transition-all hover:shadow-xl overflow-hidden">
                  <div className="aspect-square relative overflow-hidden bg-gray-50">
                    <img src={p.imageUrl || ""} alt={p.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link href={`/${p.slug}`}><Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary rounded-none">Xem chi tiết</Button></Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2 block">{p.category?.name}</span>
                    <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">{p.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
