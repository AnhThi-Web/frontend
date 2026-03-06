"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Globe, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Trang chủ", path: "/" },
  { name: "Giới thiệu", path: "/gioi-thieu" },
  { 
    name: "Sản phẩm", 
    path: "/danh-muc-san-pham",
    subItems: [
      { name: "CHẤT TẨY RỬA", path: "/chat-tay-rua" },
      { name: "MẠ KẼM", path: "/ma-kem" },
      { name: "MẠ ĐỒNG", path: "/ma-dong" },
      { name: "MẠ NIKEN", path: "/ma-niken" },
      { name: "MẠ CRÔM", path: "/ma-crom" },
      { name: "HOÀN THIỆN BỀ MẶT NHÔM", path: "/hoan-thien-be-mat-nhom" },
      { name: "MẠ TRÊN NỀN NHỰA", path: "/ma-tren-nen-nhua" },
      { name: "CHỐNG ĂN MÒN", path: "/chong-an-mon" },
    ]
  },
  { name: "Tin tức", path: "/tin-tuc" },
  { name: "Thư viện ảnh", path: "/thu-vien-anh" },
  { name: "Liên hệ", path: "/lien-he" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:02723759664" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Phone size={14} />
              <span>0272.375.9664</span>
            </a>
            <a href="mailto:info@mitekvn.com" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Mail size={14} />
              <span>info@mitekvn.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe size={14} />
              <button className="hover:text-secondary transition-colors font-bold">VN</button>
              <span>|</span>
              <button className="hover:text-secondary transition-colors">EN</button>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-secondary transition-colors">
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="https://bizweb.dktcdn.net/100/424/639/themes/823315/assets/logo.png?1763658688907"
              alt="MITEK Logo"
              className="h-12 md:h-16 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  href={item.path}
                  className={cn(
                    "font-oswald uppercase py-2 flex items-center gap-1 transition-colors tracking-wide relative",
                    "before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-primary before:transition-all before:duration-300",
                    hoveredMenu === item.name && "text-primary before:w-full",
                    item.name === "Liên hệ" && hoveredMenu === item.name && "text-primary",
                    hoveredMenu !== item.name && "text-gray-800 hover:text-primary"
                  )}
                >
                  {item.name}
                  {item.subItems && <ChevronDown size={14} />}
                </Link>
                {item.subItems && (
                  <div className="absolute left-0 top-full bg-white shadow-xl border-t-4 border-primary min-w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-0 translate-y-0 group-hover:translate-y-0">
                    <ul className="py-2">
                      {item.subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.path}
                            className="block px-6 py-3 text-sm text-gray-700 hover:bg-primary hover:text-white transition-colors uppercase font-oswald font-medium"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )} onClick={() => setIsOpen(false)} />

      {/* Mobile Menu Content */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-[280px] bg-white z-50 lg:hidden transition-transform duration-300 shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-primary text-white">
          <span className="font-oswald uppercase font-bold">Menu</span>
          <button onClick={() => setIsOpen(false)}><X size={24} /></button>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-60px)]">
          <ul className="py-2">
            {menuItems.map((item) => (
              <li key={item.name} className="border-b border-gray-50 last:border-0">
                <div className="flex justify-between items-center px-4 py-3">
                  <Link
                    href={item.path}
                    className="font-oswald uppercase text-gray-800 font-medium"
                    onClick={() => !item.subItems && setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <button
                      onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                      className="p-1"
                    >
                      <ChevronDown size={20} className={cn("transition-transform", activeSubmenu === item.name && "rotate-180")} />
                    </button>
                  )}
                </div>
                {item.subItems && activeSubmenu === item.name && (
                  <ul className="bg-gray-50 py-2">
                    {item.subItems.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.path}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};
