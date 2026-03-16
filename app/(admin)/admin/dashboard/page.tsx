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
  Mail,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/admin/login");
    return null;
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          ANH THI Admin Panel
        </h1>
        <p className="text-slate-500">
          Xin chào, <span className="font-semibold text-primary">{session?.user?.name}</span>. Chúc bạn một ngày làm việc hiệu quả!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <h3 className="text-lg font-semibold text-blue-900 mb-2 font-oswald uppercase">
          📝 Hướng Dẫn Sử Dụng
        </h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>• <strong>Sản phẩm:</strong> Quản lý kho hàng, thông số kỹ thuật và hình ảnh sản phẩm.</li>
          <li>• <strong>Danh mục:</strong> Phân loại sản phẩm để khách hàng dễ dàng tìm kiếm.</li>
          <li>• <strong>Tin tức:</strong> Viết bài chia sẻ kỹ thuật, tin hoạt động công ty.</li>
          <li>• <strong>Liên hệ:</strong> Theo dõi và phản hồi yêu cầu từ khách hàng.</li>
        </ul>
      </div>
    </div>
  );
}
