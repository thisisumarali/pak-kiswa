"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

const SLIDES = [
  {
    id: "slide-baby",
    productId: "pk-baby-01",
    categoryId: "baby",
    badge: "Pak Kiswa Essential Care",
    headline: "Infant Net Bed & Ergonomic Pillow Suite",
    subhead:
      "Breathable fine-mesh mosquito protection, ergonomic neck contour pillow, and soft hypoallergenic mattress for newborn care.",
    price: 2850,
    originalPrice: 3600,
    image: "/images/baby-care-sleeping-bed.png",
    categoryName: "Baby Care",
    thumbnailLabel: "Baby Net Bed",
  },
  {
    id: "slide-axis-towels",
    productId: "pk-towel-01",
    categoryId: "towels",
    badge: "Axis Linens Luxury Export",
    headline: "650 GSM Combed Cotton Bath Towels",
    subhead:
      "Our flagship 5-star hotel line. 100% long-staple ring-spun cotton engineered for instant absorption and cloud-like fluffiness.",
    price: 2950,
    originalPrice: 3800,
    image: "/images/axis-linens-towel-collection.jpg",
    categoryName: "Axis Linens",
    thumbnailLabel: "Axis Towels",
  },
  {
    id: "slide-royal-towels",
    productId: "pk-towel-02",
    categoryId: "towels",
    badge: "Royal Spa Heritage",
    headline: "Presidential Gold-Trim Spa Ensemble",
    subhead:
      "Crafted with 700 GSM zero-twist Turkish cotton and woven gold jacquard crest detailing. Indulgent spa luxury from our Karachi mills.",
    price: 4650,
    originalPrice: 5900,
    image: "/images/pak-kiswa-luxury-towels.png",
    categoryName: "Spa Towels",
    thumbnailLabel: "Royal Spa",
  },
  {
    id: "slide-bedsheets",
    productId: "pk-bed-01",
    categoryId: "bedsheets",
    badge: "5-Star Hotel Deluxe",
    headline: "400 TC Egyptian Cotton Satin Stripe Bedsheet",
    subhead:
      "Silky sateen damask weave with natural cooling breathability. Perfect for deep restful sleep through Pakistani summers.",
    price: 4850,
    originalPrice: 6200,
    image: "/images/luxury-bedsheet-set.jpg",
    categoryName: "Egyptian Bedding",
    thumbnailLabel: "Satin Bedsheets",
  },
  {
    id: "slide-bridal",
    productId: "pk-bed-02",
    categoryId: "bedsheets",
    badge: "Pakistani Bridal Heritage",
    headline: "Royal Bridal Embroidered Damask Suite",
    subhead:
      "Handcrafted master bridal bedding with delicate champagne gold embroidery on 500 TC heavy cotton sateen.",
    price: 9800,
    originalPrice: 13500,
    image: "/images/bridal-duvet-set.jpg",
    categoryName: "Bridal Bedding",
    thumbnailLabel: "Bridal Suite",
  },
];

export default function Hero({ onExploreCategory, onOpenQuickView }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance slides every 5.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-[#FAF9F6] border-b border-stone-200"
    >
      {/* Background Image Slider */}
      <div className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] lg:h-[620px] flex items-center">
        
        {/* Background Slide Images with smooth Crossfade */}
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              onClick={() => onExploreCategory(slide.categoryId)}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer ${
                isActive
                  ? "opacity-100 scale-100 z-0"
                  : "opacity-0 scale-105 -z-10 pointer-events-none"
              }`}
              title={`Explore ${slide.categoryName}`}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover object-center opacity-80 transition-opacity duration-500"
              />
            </div>
          );
        })}

        {/* Prev / Next Chevron Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous Slide"
          className="flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-[#0E3E29] shadow-md backdrop-blur-xs items-center justify-center transition-all border border-stone-200 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next Slide"
          className="flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/80 hover:bg-white text-stone-800 hover:text-[#0E3E29] shadow-md backdrop-blur-xs items-center justify-center transition-all border border-stone-200 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Interactive Thumbnail Cards (Desktop only) */}
        <div className="hidden md:flex absolute bottom-6 right-8 z-20 items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-stone-200 shadow-md">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0E3E29] text-white shadow-xs"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.thumbnailLabel}
                  className="w-7 h-7 object-cover rounded-md border border-white/30"
                />
                <span className="truncate max-w-[90px]">{slide.thumbnailLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Slide Indicators / Dots */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-xs px-3 py-1.5 rounded-full">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-7 h-2 bg-white shadow-xs"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            );
          })}
        </div>

      </div>

      {/* Trust Badges Strip Under Hero Slider */}
      <div className="bg-white border-t border-stone-200/80 py-3 px-3.5 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#E8F3EE] text-[#0E3E29] shrink-0">
              <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-stone-900 leading-tight truncate">100% Cash on Delivery</p>
              <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">Nationwide doorstep pay</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FAF3E4] text-[#C5A059] shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-stone-900 leading-tight truncate">650+ GSM Pure Cotton</p>
              <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">Combed export grade</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#E8F3EE] text-[#0E3E29] shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-stone-900 leading-tight truncate">Baby Safe &amp; Gentle</p>
              <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">Hypoallergenic mesh</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FAF3E4] text-[#C5A059] shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-stone-900 leading-tight truncate">Karachi Mill Dispatch</p>
              <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">7-Day doorstep swap</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
