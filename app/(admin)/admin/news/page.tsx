"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published: boolean;
  createdAt: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch("/api/admin/news");
      if (!res.ok) throw new Error("Failed to fetch");
      setNews(await res.json());
    } catch (err) {
      setError("Lỗi khi tải tin tức");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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

  if (loading) return <div className="p-8">Đang tải...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay Lại
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Tin Tức</h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Thêm Bài Viết
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Chỉnh Sửa Bài Viết" : "Thêm Bài Viết Mới"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tiêu Đề
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Tiêu đề bài viết"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="vd: bai-viet-moi"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Excerpt (Tóm tắt)
                  </label>
                  <Input
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Một dòng tóm tắt nội dung"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nội Dung
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    placeholder="Nội dung bài viết"
                    rows={6}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    URL Hình Ảnh
                  </label>
                  <Input
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="rounded"
                  />
                  <label htmlFor="published" className="text-sm font-medium">
                    Xuất Bản
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  {editingId ? "Cập Nhật" : "Thêm"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">/{item.slug}</p>
                {item.excerpt && (
                  <p className="text-sm text-gray-600 mt-1">{item.excerpt}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      item.published
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.published ? "✓ Xuất bản" : "Bản nháp"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(item.id);
                    setFormData({
                      title: item.title,
                      slug: item.slug,
                      content: "",
                      excerpt: item.excerpt || "",
                      imageUrl: "",
                      published: item.published,
                    });
                    setDialogOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
