"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/Header";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Trash2, Mail, Phone, User, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export default function ContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [searchTerm]);

  async function fetchMessages() {
    try {
      const url = searchTerm 
        ? `/api/admin/contacts?search=${encodeURIComponent(searchTerm)}` 
        : "/api/admin/contacts";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      setMessages(await res.json());
    } catch (err) {
      setError("Lỗi khi tải tin nhắn");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) return;

    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchMessages();
      setSelectedMessage(null);
    } catch (err) {
      setError("Lỗi khi xóa tin nhắn");
    }
  }

  return (
    <div className="flex flex-col h-full">
      <AdminHeader 
        placeholder="Tìm kiếm tin nhắn..." 
        onSearch={(term) => setSearchTerm(term)} 
      />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Tin Nhắn Liên Hệ</h1>
          <p className="text-slate-500">Quản lý phản hồi và yêu cầu từ khách hàng</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 font-semibold text-slate-600">Khách Hàng</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Chủ Đề</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Ngày Gửi</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Đang tải dữ liệu...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Chưa có tin nhắn nào.</td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr 
                    key={msg.id} 
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{msg.name}</div>
                      <div className="text-xs text-slate-500">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="text-slate-700 font-medium truncate max-w-[300px]">
                        {msg.subject || "(Không có tiêu đề)"}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(msg.createdAt), "dd/MM/yyyy HH:mm")}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                       <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(msg.id)}
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

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Chi Tiết Tin Nhắn</DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-6 bg-slate-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-semibold">Khách hàng:</span>
                    </div>
                    <div className="text-sm text-slate-900 font-medium pl-6">{selectedMessage.name}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm font-semibold">Email:</span>
                    </div>
                    <div className="text-sm text-slate-900 font-medium pl-6">{selectedMessage.email}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-semibold">Điện thoại:</span>
                    </div>
                    <div className="text-sm text-slate-900 font-medium pl-6">{selectedMessage.phone || "N/A"}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-semibold">Thời gian:</span>
                    </div>
                    <div className="text-sm text-slate-900 font-medium pl-6">{format(new Date(selectedMessage.createdAt), "dd/MM/yyyy HH:mm")}</div>
                  </div>
                </div>

                <div className="space-y-3">
                   <div className="text-sm font-semibold text-slate-600">Chủ đề:</div>
                   <div className="text-base text-slate-900 font-bold">{selectedMessage.subject || "(Không có tiêu đề)"}</div>
                </div>

                <div className="space-y-3">
                   <div className="text-sm font-semibold text-slate-600">Nội dung:</div>
                   <div className="text-sm text-slate-800 bg-slate-50 p-4 rounded-lg leading-relaxed whitespace-pre-wrap">
                    {selectedMessage.message}
                   </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedMessage(null)}>Đóng</Button>
                  <Button variant="destructive" onClick={() => handleDelete(selectedMessage.id)}>Xóa Tin Nhắn</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
