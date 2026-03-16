import type { Metadata } from "next";
import { Providers } from "../../providers";
import "../../globals.css";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export const metadata: Metadata = {
  title: "ANH THI Admin Dashboard",
  description: "Hệ thống quản trị ANH THI",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-slate-50 antialiased">
        <Providers>
          <AdminLayoutClient>
            {children}
          </AdminLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
