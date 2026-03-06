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

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  categoryId: string;
  category: Category;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    categoryId: "",
    details: "",
    imageUrl: "",
    features: "",
    specs: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/admin/categories"),
      ]);

      if (!productsRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch");

      setProducts(await productsRes.json());
      setCategories(await categoriesRes.json());
    } catch (err) {
      setError("Lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const url = editingId
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      setFormData({
        name: "",
        slug: "",
        description: "",
        categoryId: "",
        details: "",
        imageUrl: "",
        features: "",
        specs: "",
      });
      setEditingId(null);
      setDialogOpen(false);
      fetchData();
    } catch (err) {
      setError("Lỗi khi lưu sản phẩm");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");
      fetchData();
    } catch (err) {
      setError("Lỗi khi xóa sản phẩm");
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
            <h1 className="text-2xl font-bold text-gray-900">
              Quản Lý Sản Phẩm
            </h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Thêm Sản Phẩm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Tên Sản Phẩm
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="VD: METCLEAN® SC10"
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
                    placeholder="vd: metclean-sc10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Danh Mục
                  </label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoryId: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mô Tả Ngắn
                  </label>
                  <Input
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Mô tả ngắn gọn"
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
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Chi Tiết
                  </label>
                  <Textarea
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    placeholder="Thông tin chi tiết về sản phẩm"
                    rows={3}
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
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  /{product.slug} • {product.category.name}
                </p>
                {product.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingId(product.id);
                    setFormData({
                      name: product.name,
                      slug: product.slug,
                      description: product.description || "",
                      categoryId: product.categoryId,
                      details: "",
                      imageUrl: "",
                      features: "",
                      specs: "",
                    });
                    setDialogOpen(true);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
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
