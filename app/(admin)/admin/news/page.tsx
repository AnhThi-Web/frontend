"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import slugify from "slugify";
import { Pagination } from "@/components/admin/Pagination";

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 20;
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    published: false,
  });

  useEffect(() => {
    fetchNews();
  }, [searchTerm, page]);

  async function fetchNews() {
    try {
      const url = new URL("/api/admin/news", window.location.origin);
      if (searchTerm) url.searchParams.set("search", searchTerm);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(PAGE_SIZE));
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setNews(json.data ?? json);
      setTotalPages(json.totalPages ?? 1);
      setTotal(json.total ?? 0);
    } catch (err) {
      setError("Lỗi khi tải tin tức");
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setFormData({ ...formData, imageUrl: data.url });
    } catch (err) {
      setError("Lỗi khi tải ảnh");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    if (e) e.preventDefault();
    setError("");

    try {
      const url = editingId
        ? `/api/admin/news/${editingId}`
        : "/api/admin/news";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      setFormData({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        imageUrl: "",
        published: false,
      });
      setEditingId(null);
      setDialogOpen(false);
      fetchNews();
    } catch (err) {
      setError("Lỗi khi lưu tin tức");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchNews();
    } catch (err) {
      setError("Lỗi khi xóa tin tức");
    }
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader 
        placeholder="Tìm kiếm tin tức..." 
        onSearch={(term) => setSearchTerm(term)} 
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Quản Lý Tin Tức</h1>
            <p className="text-slate-500">Viết và cập nhật tin hoạt động, kỹ thuật</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingId(null);
              setFormData({
                title: "",
                slug: "",
                content: "",
                excerpt: "",
                imageUrl: "",
                published: false,
              });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 px-6">
                <Plus className="w-4 h-4" />
                Thêm Tin Tức
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Chỉnh Sửa Tin Tức" : "Viết Tin Mới"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tiêu Đề</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = slugify(title, { lower: true, locale: "vi" });
                        setFormData({ ...formData, title, slug: editingId ? formData.slug : slug });
                      }}
                      placeholder="VD: MITEK ra mắt sản phẩm mới"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Slug</label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="vd: mitek-ra-mat-san-pham-moi"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tóm Tắt (Excerpt)</label>
                    <Input
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Thông tin ngắn gọn về bài viết"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ảnh Đại Diện</label>
                    <div className="flex gap-2">
                      <Input type="file" onChange={handleImageUpload} disabled={uploading} className="cursor-pointer" />
                      {formData.imageUrl && <div className="h-10 w-10 shrink-0 border rounded-md overflow-hidden bg-slate-100"><img src={formData.imageUrl} className="w-full h-full object-cover" /></div>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Nội Dung Chi Tiết</label>
                  <div className="border rounded-md min-h-[400px] overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(val) => setFormData({ ...formData, content: val })}
                      className="h-[350px]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                  />
                  <label htmlFor="published" className="text-sm font-medium text-slate-700">Công khai bài viết này</label>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Hủy</Button>
                  <Button type="submit" className="flex-1" disabled={uploading}>
                    {editingId ? "Cập Nhật Bài Viết" : "Đăng Tin Ngay"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
           <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
             {error}
           </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-semibold text-slate-600">Bài Viết</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Trạng Thái</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Ngày Tạo</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Đang tải dữ liệu...</td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Chưa có bài viết nào.</td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-semibold text-slate-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-slate-500 font-mono">/{item.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      {item.published ? (
                        <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                          Công khai
                        </span>
                      ) : (
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 w-fit">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                          Bản nháp
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(item.createdAt), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                          onClick={() => {
                            setEditingId(item.id);
                            // Fetches content specifically if needed, but for now we assume it's in the list or fetch one
                            fetch(`/api/admin/news/${item.id}`).then(res => res.json()).then(data => {
                                setFormData({
                                  title: data.title,
                                  slug: data.slug,
                                  content: data.content || "",
                                  excerpt: data.excerpt || "",
                                  imageUrl: data.imageUrl || "",
                                  published: data.published,
                                });
                                setDialogOpen(true);
                            });
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </main>
    </div>
  );
}
