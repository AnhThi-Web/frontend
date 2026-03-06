"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, notFound } from "next/navigation";
import { 
  Search, ChevronRight, LayoutGrid, List, Filter,
  Phone, Mail, FileText, CheckCircle2, ArrowLeft, Download,
  Calendar, User, Facebook, Twitter, MessageCircle, Share2, Camera, Maximize2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { categories, products, galleryDetailData } from "@/lib/mock-data";

export default function DynamicPage({ params }: { params: { slug: string } }) {
  const pathname = usePathname();
  const { slug } = params;

  // Check if it's a category
  const categoryMatch = categories.find(cat => cat.path === pathname || cat.path === `/${slug}`);
  
  // Check if it's a product
  const productMatch = products.find(p => p.id === slug);

  // Check if it's a gallery item
  const galleryMatch = galleryDetailData[slug];

  const [activeTab, setActiveTab] = useState("info");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (categoryMatch) {
    const selectedCategory = categoryMatch.id;
    const filteredProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const currentCategoryName = categoryMatch.name;

    return (
      <div className="bg-white min-h-screen">
        {/* Page Header */}
        <section className="bg-primary py-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/slider_1.jpg?1763658688907" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container relative z-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-5xl uppercase font-bold mb-2">{currentCategoryName}</h1>
                <nav className="flex items-center gap-2 text-sm text-white/80">
                  <Link href="/" className="hover:text-secondary">Trang chủ</Link>
                  <ChevronRight size={14} />
                  <span className="text-secondary font-medium">Danh mục sản phẩm</span>
                </nav>
              </div>
              <div className="relative w-full md:w-80">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm sản phẩm..." 
                  className="w-full bg-white/10 border border-white/20 rounded-none px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-secondary transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Product Content */}
        <section className="py-16">
          <div className="container px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar Filters */}
              <aside className="lg:w-1/4">
                <div className="sticky top-24">
                  <div className="mb-10">
                    <h3 className="font-oswald text-xl uppercase font-bold mb-6 pb-2 border-b-2 border-primary/10 flex items-center gap-2">
                      <Filter size={20} className="text-primary" />
                      Danh mục
                    </h3>
                    <ul className="space-y-1">
                      {categories.map((cat) => (
                        <li key={cat.id}>
                          <Link 
                            href={cat.path}
                            className={cn(
                              "w-full text-left px-4 py-3 font-medium transition-all flex justify-between items-center group",
                              selectedCategory === cat.id 
                                ? "bg-primary text-white" 
                                : "hover:bg-gray-100 text-gray-700"
                          )}
                        >
                          <span className="text-sm font-oswald uppercase tracking-wide">{cat.name}</span>
                          <ChevronRight size={16} className={cn(
                            "transition-transform",
                            selectedCategory === cat.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"
                          )} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary p-6 text-white text-center">
                  <h4 className="font-oswald uppercase text-lg mb-4">Hỗ trợ tư vấn</h4>
                  <p className="text-sm opacity-80 mb-6">Liên hệ với chuyên gia của chúng tôi để được tư vấn về giải pháp xi mạ.</p>
                  <a href="tel:02723759664" className="block bg-secondary text-primary py-3 font-bold hover:bg-white transition-colors">
                    0272.375.9664
                  </a>
                </div>
              </div>
            </aside>

            {/* Product List */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-gray-50 p-4 border border-gray-100">
                <p className="text-gray-600 text-sm">
                  Hiển thị <span className="font-bold text-primary">{filteredProducts.length}</span> sản phẩm
                </p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={cn("p-2 transition-colors", viewMode === "grid" ? "text-primary" : "text-gray-400 hover:text-primary")}
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={cn("p-2 transition-colors", viewMode === "list" ? "text-primary" : "text-gray-400 hover:text-primary")}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                )}>
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className={cn(
                        "bg-white border border-gray-100 hover:border-primary/20 transition-all hover:shadow-lg group overflow-hidden",
                        viewMode === "list" ? "flex flex-col md:flex-row" : ""
                      )}
                    >
                      <div className={cn(
                        "relative bg-gray-50 overflow-hidden shrink-0",
                        viewMode === "list" ? "w-full md:w-64 aspect-square" : "aspect-square"
                      )}>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-6"
                        />
                        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Link href={`/${product.id}`}>
                            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary rounded-none">
                              Chi tiết
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-primary font-oswald uppercase tracking-wider mb-2 block">{product.categoryName}</span>
                          <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-primary transition-colors">
                            <Link href={`/${product.id}`}>{product.name}</Link>
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6">
                            {product.description}
                          </p>
                        </div>
                        <Link href={`/${product.id}`} className="text-sm font-bold text-primary flex items-center gap-2 hover:gap-3 transition-all">
                          XEM CHI TIẾT <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-gray-50 border-2 border-dashed border-gray-200">
                  <Search size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-gray-500 mb-6">Thử thay đổi danh mục hoặc từ khóa tìm kiếm của bạn.</p>
                  <Button onClick={() => {setSearchQuery("");}}>
                    Xem tất cả sản phẩm
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

  if (productMatch) {
    const product = productMatch;
    const relatedProducts = products
      .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
      .slice(0, 4);

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
                  <img src={product.image} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                    {product.categoryName}
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
                  <p>{product.details}</p>
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
                      {product.features?.map((feature, idx) => (
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
                          {Object.entries(product.specs || {}).map(([key, value]) => (
                            <tr key={key} className="hover:bg-gray-50 transition-colors">
                              <th className="px-6 py-4 bg-gray-50 font-bold text-sm text-gray-700 w-1/3 uppercase tracking-wider">{key}</th>
                              <td className="px-6 py-4 text-sm text-gray-600">{value}</td>
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
                      <img src={p.image} alt={p.name} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link href={`/${p.id}`}><Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary rounded-none">Xem chi tiết</Button></Link>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2 block">{p.categoryName}</span>
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

  if (galleryMatch) {
    const gallery = galleryMatch;
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

  // If neither, return notFound
  notFound();
}
