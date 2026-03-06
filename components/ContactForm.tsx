"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

interface FormData {
  name: string;
  email: string;
  phone: string;
  body: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    setFormData((prev) => ({
      ...prev,
      phone: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.phone || !formData.body) {
        setMessage({ type: "error", text: "Vui lòng điền đầy đủ thông tin các trường bắt buộc" });
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;
      if (!emailRegex.test(formData.email)) {
        setMessage({ type: "error", text: "Vui lòng nhập địa chỉ email hợp lệ" });
        setLoading(false);
        return;
      }

      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      console.log("Form submitted:", formData);
      
      setMessage({ type: "success", text: "Cảm ơn bạn! Chúng tôi sẽ liên hệ với bạn sớm nhất." });
      setFormData({ name: "", email: "", phone: "", body: "" });
    } catch (error) {
      setMessage({ type: "error", text: "Đã có lỗi xảy ra. Vui lòng thử lại." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-oswald uppercase font-bold text-gray-800 mb-6">Liên hệ</h2>
      
      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === "success" 
            ? "bg-green-100 text-green-700 border border-green-300" 
            : "bg-red-100 text-red-700 border border-red-300"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Họ tên*"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Điện thoại*"
            value={formData.phone}
            onChange={handlePhoneInput}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <textarea
            name="body"
            placeholder="Nhập nội dung*"
            value={formData.body}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="bg-primary text-white font-oswald uppercase font-bold px-12 py-3 hover:bg-primary/90 transition-colors"
        >
          {loading ? "Đang gửi..." : "Gửi liên hệ"}
        </Button>
      </form>
    </div>
  );
};
