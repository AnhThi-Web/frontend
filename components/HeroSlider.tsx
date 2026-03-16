"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/assets/slider1.jpg",
    title: "GIẢI PHÁP CÔNG NGHỆ",
    subtitle: "HOÀN THIỆN BỀ MẶT",
    cta1Text: "Xem sản phẩm",
    cta1Link: "/danh-muc-san-pham",
    cta2Text: "Liên hệ ngay",
    cta2Link: "/lien-he",
  },
  {
    id: 2,
    image: "/assets/slider2.jpg",
    title: "HÓAA CHẤT XI MẠ",
    subtitle: "CHẤT LƯỢNG QUỐC TẾ",
    cta1Text: "Tìm hiểu thêm",
    cta1Link: "/gioi-thieu",
    cta2Text: "Liên hệ ngay",
    cta2Link: "/lien-he",
  },
  {
    id: 3,
    image: "/assets/slider3.jpg",
    title: "CÔNG NGHỆ TIÊN TIẾN",
    subtitle: "ĐỘI NGŨ CHUYÊN GIA",
    cta1Text: "Xem dự án",
    cta1Link: "/danh-muc-san-pham",
    cta2Text: "Liên hệ tư vấn",
    cta2Link: "/lien-he",
  },
];

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setAutoplay(false);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container relative z-10 px-4 text-white text-center max-w-2xl animate-fade-in-up">
               
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={prev}
          className="bg-white/80 hover:bg-white text-primary p-3 transition-all rounded-full shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="bg-white/80 hover:bg-white text-primary p-3 transition-all rounded-full shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-secondary w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-6 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-oswald z-30 backdrop-blur-sm">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
};
