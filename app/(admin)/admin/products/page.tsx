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
import { Edit, Trash2, Plus, ArrowLeft, Search, Package } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import slugify from "slugify";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import { AdminHeader } from "@/components/admin/Header";
import { format } from "date-fns";

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
  imageUrl?: string;
  details?: string;
  features?: string;
  specs?: string;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [uploading, setUploading] = useState(false);
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
  }, [searchTerm, selectedCategoryId]);

  async function fetchData() {
    try {
      const productUrl = new URL("/api/admin/products", window.location.origin);
      if (searchTerm) productUrl.searchParams.append("search", searchTerm);
      if (selectedCategoryId !== "all") productUrl.searchParams.append("categoryId", selectedCategoryId);

      const [productsRes, categoriesRes] = await Promise.all([
        fetch(productUrl.toString()),
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (!res.ok) throw new Error("Thêm ảnh thất bại");

      const data = await res.json();
      setFormData((prev) => ({ ...prev, imageUrl: data.url }));
    } catch (err) {
      setError("Lỗi khi tải ảnh lên");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    if (e) e.preventDefault();
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

  return (
    <div className="flex flex-col h-full">
      <AdminHeader 
        placeholder="Tìm kiếm sản phẩm..." 
        onSearch={(term) => setSearchTerm(term)} 
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Quản Lý Sản Phẩm</h1>
            <p className="text-slate-500">Danh mục kho hàng và thông số kỹ thuật</p>
          </div>
          <div className="flex items-center gap-3">
             <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                <SelectTrigger className="w-[200px] bg-white">
                  <SelectValue placeholder="Tất cả danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) {
                setEditingId(null);
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
              }
            }}>
              <DialogTrigger asChild>
                <Button className="gap-2 px-6">
                  <Plus className="w-4 h-4" />
                  Thêm Sản Phẩm
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingId ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tên Sản Phẩm</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          const slug = slugify(name, { lower: true, locale: "vi" });
                          setFormData({ ...formData, name, slug: editingId ? formData.slug : slug });
                        }}
                        placeholder="VD: Xi mạ kẽm lạnh"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <Input
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          placeholder="vd: xi-ma-kem-lanh"
                          required
                        />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Danh Mục</label>
                      <Select
                        value={formData.categoryId}
                        onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Ảnh Đại Diện</label>
                        <div className="space-y-3">
                          {formData.imageUrl && (
                            <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-slate-50">
                              <img src={formData.imageUrl} alt="Product" className="w-full h-full object-contain" />
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                              >✕</button>
                            </div>
                          )}
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="cursor-pointer"
                          />
                          {uploading && <p className="text-xs text-slate-500">Đang tải ảnh lên...</p>}
                        </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mô Tả Ngắn</label>
                    <Input
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Tóm tắt về sản phẩm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Chi Tiết Sản Phẩm</label>
                    <div className="border rounded-md min-h-[300px] overflow-hidden">
                      <ReactQuill
                        theme="snow"
                        value={formData.details}
                        onChange={(val) => setFormData({ ...formData, details: val })}
                        className="h-[250px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Đặc Điểm Nổi Bật</label>
                      <Textarea
                        value={formData.features}
                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        placeholder={`VD (mỗi dòng một điểm):\nChống ăn mòn cao\nBền màu lâu dài\nAn toàn môi trường`}
                        rows={6}
                        className="resize-none text-sm"
                      />
                      <p className="text-xs text-slate-400">Mỗi dòng là một đặc điểm nổi bật</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Thông Số Kỹ Thuật</label>
                      <Textarea
                        value={formData.specs}
                        onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                        placeholder={`VD (mỗi dòng một thông số):\nNhiệt độ: 20-30°C\npH: 6.5-7.5\nMật độ dòng: 1-3 A/dm²`}
                        rows={6}
                        className="resize-none text-sm"
                      />
                      <p className="text-xs text-slate-400">Mỗi dòng là một thông số kỹ thuật</p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>Hủy</Button>
                    <Button type="submit" className="flex-1" disabled={uploading}>
                      {editingId ? "Cập Nhật" : "Thêm Sản Phẩm"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
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
                <th className="px-6 py-4 font-semibold text-slate-600">Sản Phẩm</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Danh Mục</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Đặc Điểm / Thông Số</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Ngày Tạo</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Đang tải dữ liệu...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Không tìm thấy sản phẩm nào.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-100 border overflow-hidden shrink-0">
                          {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300"><Package size={20} /></div>
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{product.name}</div>
                          <div className="text-xs text-slate-500 font-mono">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                        {product.category?.name || "N/A"}
                       </span>
                    </td>
                    <td className="px-6 py-4 max-w-[220px]">
                      {product.features ? (
                        <div className="space-y-1">
                          {product.features.split('\n').slice(0, 2).map((f, i) => (
                            <div key={i} className="text-xs text-slate-600 flex items-start gap-1">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span className="line-clamp-1">{f}</span>
                            </div>
                          ))}
                          {product.features.split('\n').length > 2 && (
                            <span className="text-xs text-slate-400">+{product.features.split('\n').length - 2} thêm</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                      {product.specs && (
                        <div className="mt-2 text-xs text-slate-500 line-clamp-1">📋 {product.specs.split('\n')[0]}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(product.createdAt), "dd/MM/yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50"
                          onClick={() => {
                            setEditingId(product.id);
                            setFormData({
                              name: product.name,
                              slug: product.slug,
                              description: product.description || "",
                              categoryId: product.categoryId,
                              details: product.details || "",
                              imageUrl: product.imageUrl || "",
                              features: product.features || "",
                              specs: product.specs || "",
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
                          onClick={() => handleDelete(product.id)}
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
      </main>
    </div>
  );
}
