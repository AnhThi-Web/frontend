import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, User, Facebook, Twitter, MessageCircle, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { newsId: string } }): Promise<Metadata> {
  const { newsId } = params;
  
  const news = await db.news.findUnique({
    where: { slug: newsId }
  });

  if (!news || !news.published) {
    return {
      title: "Không tìm thấy trang",
    };
  }

  return {
    title: news.title,
    description: news.excerpt || news.title,
    openGraph: {
      title: news.title,
      description: news.excerpt || news.title,
      url: `/tin-tuc/${newsId}`,
      type: "article",
      images: news.imageUrl ? [{ url: news.imageUrl }] : undefined,
    },
  };
}

export default async function NewsDetail({ params }: { params: { newsId: string } }) {
  const { newsId } = params;
  
  const news = await db.news.findUnique({
    where: { slug: newsId }
  });

  if (!news || !news.published) {
    notFound();
  }

  const relatedNews = await db.news.findMany({
    where: { published: true, NOT: { id: news.id } },
    orderBy: { createdAt: "desc" },
    take: 2
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="container px-4">
          <nav className="flex items-center gap-2 text-xs text-gray-500 uppercase font-oswald tracking-widest">
            <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link href="/tin-tuc" className="hover:text-primary transition-colors">Tin tức</Link>
            <ChevronRight size={12} />
            <span className="text-primary font-bold truncate max-w-[200px] md:max-w-none">{news.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Content */}
            <div className="lg:w-3/4">
              <article>
                {/* News Title */}
                <h1 className="text-3xl md:text-5xl font-oswald uppercase font-bold text-gray-900 mb-8 leading-tight">
                  {news.title}
                </h1>

                {/* News Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-10 pb-6 border-b border-gray-100 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-2 text-primary">
                    <Calendar size={18} /> {new Date(news.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={18} /> ANH THI Admin
                  </span>
                  <span className="flex items-center gap-2">
                    <Share2 size={18} /> 0 Shares
                  </span>
                </div>

                {/* Article Body */}
                {news.imageUrl && (
                  <figure className="my-10 group">
                    <div className="overflow-hidden border border-gray-100 shadow-sm">
                      <img src={news.imageUrl} alt={news.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </figure>
                )}

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
                  <div dangerouslySetInnerHTML={{ __html: news.content }} />
                </div>

                {/* Social Share Footer */}
                <div className="mt-16 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-oswald uppercase font-bold text-sm tracking-widest text-gray-500">Chia sẻ bài viết:</span>
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
                  <Link href="/tin-tuc">
                    <Button variant="ghost" className="uppercase font-oswald font-bold tracking-widest text-primary flex gap-2 hover:bg-primary/5">
                      <ArrowLeft size={18} /> Quay lại tin tức
                    </Button>
                  </Link>
                </div>
              </article>
            </div>

            {/* Sidebar (Similar to listing but simplified) */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-12">
                {/* Related Posts */}
                <div className="bg-gray-50 p-8 border border-gray-100">
                  <h4 className="font-oswald uppercase font-bold text-lg mb-6 border-l-4 border-primary pl-4">Bài viết liên quan</h4>
                  <div className="space-y-8">
                    {relatedNews.map((n) => (
                      <div key={n.id} className="group">
                        <div className="aspect-[16/10] overflow-hidden mb-4 border border-white">
                          <img src={n.imageUrl as string} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <h5 className="text-sm font-oswald uppercase font-bold leading-tight group-hover:text-primary transition-colors">
                          <Link href={`/tin-tuc/${n.slug}`}>{n.title}</Link>
                        </h5>
                        <p className="text-[10px] text-gray-400 mt-2 font-bold">{new Date(n.createdAt).toLocaleDateString("vi-VN")}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-primary p-10 text-white text-center">
                  <h4 className="font-oswald uppercase text-xl font-bold mb-4">ANH THI SOLUTIONS</h4>
                  <p className="text-sm opacity-80 mb-8 leading-relaxed">Chúng tôi cung cấp các giải pháp công nghệ xi mạ tiên tiến và thân thiện môi trường.</p>
                  <Link href="/lien-he">
                    <Button className="bg-white text-primary hover:bg-secondary hover:text-primary font-bold w-full h-12 rounded-none uppercase font-oswald tracking-widest text-xs">
                      Liên hệ ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
