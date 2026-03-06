"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Package,
  Folder,
  Newspaper,
  LogOut,
  Settings,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              MITEK Admin Panel
            </h1>
            <p className="text-sm text-gray-500">
              Xin chào, {session?.user?.name}
            </p>
          </div>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Đăng Xuất
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Products Card */}
          <Card className="p-6 hover:shadow-lg transition cursor-pointer">
            <Link href="/admin/products" className="block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Sản Phẩm
                  </h2>
                  <p className="text-sm text-gray-500">
                    Quản lý sản phẩm
                  </p>
                </div>
              </div>
            </Link>
          </Card>

          {/* Categories Card */}
          <Card className="p-6 hover:shadow-lg transition cursor-pointer">
            <Link href="/admin/categories" className="block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Folder className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Danh Mục
                  </h2>
                  <p className="text-sm text-gray-500">
                    Quản lý danh mục sản phẩm
                  </p>
                </div>
              </div>
            </Link>
          </Card>

          {/* News Card */}
          <Card className="p-6 hover:shadow-lg transition cursor-pointer">
            <Link href="/admin/news" className="block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Newspaper className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Tin Tức
                  </h2>
                  <p className="text-sm text-gray-500">
                    Quản lý bài viết tin tức
                  </p>
                </div>
              </div>
            </Link>
          </Card>

          {/* Settings Card */}
          <Card className="p-6 hover:shadow-lg transition cursor-pointer opacity-50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Cài Đặt
                </h2>
                <p className="text-sm text-gray-500">
                  Coming Soon
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            📝 Hướng Dẫn Sử Dụng
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Click vào từng mục để quản lý sản phẩm, danh mục, tin tức</li>
            <li>• Bạn có thể thêm, sửa, xóa và xuất bản nội dung</li>
            <li>• Tất cả thay đổi được lưu trực tiếp vào database</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
