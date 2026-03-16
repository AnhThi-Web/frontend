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
import { Edit, Trash2, Plus, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Pagination } from "@/components/admin/Pagination";

import { AdminHeader } from "@/components/admin/Header";
import { format } from "date-fns";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  _count?: { products: number };
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 20;
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, [searchTerm, page]);

  async function fetchCategories() {
    try {
      const url = new URL("/api/admin/categories", window.location.origin);
      if (searchTerm) url.searchParams.set("search", searchTerm);
      url.searchParams.set("page", String(page));
      url.searchParams.set("pageSize", String(PAGE_SIZE));
      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setCategories(json.data ?? json);
      setTotalPages(json.totalPages ?? 1);
      setTotal(json.total ?? 0);
    } catch (err) {
      setError("Lỗi khi tải danh mục");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    if (e) e.preventDefault();
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
      setDialogOpen(false);
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

  return (
    <div className="flex flex-col h-full">
      <AdminHeader 
        placeholder="Tìm kiếm danh mục..." 
        onSearch={(term) => setSearchTerm(term)} 
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Quản Lý Danh Mục</h1>
            <p className="text-slate-500">Tạo và quản lý các nhóm sản phẩm của bạn</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingId(null);
              setFormData({ name: "", slug: "", description: "" });
            }
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2 px-6">
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
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-slate-700">
                    Tên Danh Mục
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
                      setFormData({ ...formData, name, slug: editingId ? formData.slug : slug });
                    }}
                    placeholder="VD: Chất tẩy rửa"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-slate-700">
                    Slug (Tự động)
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
                  <label className="block text-sm font-medium mb-1.5 text-slate-700">
                    Mô Tả
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Mô tả danh mục"
                    rows={3}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Hủy</Button>
                  <Button type="submit" className="flex-1">
                    {editingId ? "Cập Nhật" : "Thêm Ngay"}
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

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">ID/Slug</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Tên Danh Mục</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Sản Phẩm</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">Ngày Tạo</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Đang tải dữ liệu...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Không tìm thấy danh mục nào.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">{cat.slug}</code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{cat.name}</div>
                      <div className="text-xs text-slate-500 line-clamp-1 truncate max-w-[200px]">{cat.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {cat._count?.products || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {format(new Date(cat.createdAt), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                          onClick={() => {
                            setEditingId(cat.id);
                            setFormData({
                              name: cat.name,
                              slug: cat.slug,
                              description: cat.description || "",
                            });
                            setDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(cat.id)}
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
