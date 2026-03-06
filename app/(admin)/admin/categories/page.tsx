"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: { products: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/admin/categories");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError("Lỗi khi tải danh mục");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const url = editingId
        ? `/api/admin/categories/${editingId}`
        : "/api/admin/categories";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      setFormData({ name: "", slug: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError("Lỗi khi lưu danh mục");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchCategories();
    } catch (err) {
      setError("Lỗi khi xóa danh mục");
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
            <h1 className="text-2xl font-bold text-gray-900">Quản Lý Danh Mục</h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Thêm Danh Mục
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Chỉnh Sửa Danh Mục" : "Thêm Danh Mục Mới"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tên Danh Mục
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="VD: Chất tẩy rửa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Slug
                  </label>
                  <Input
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="vd: chat-tay-rua"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mô Tả
                  </label>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Mô tả danh mục"
                  />
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
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                <p className="text-sm text-gray-500">/{cat.slug}</p>
                {cat._count && (
                  <p className="text-xs text-gray-400 mt-1">
                    {cat._count.products} sản phẩm
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(cat.id);
                    setFormData({
                      name: cat.name,
                      slug: cat.slug,
                      description: cat.description || "",
                    });
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(cat.id)}
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
