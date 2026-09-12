"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Award,
  Sparkles,
  Eye,
  CheckCircle2,
} from "lucide-react";
import { COMPANY_INFO, PRODUCTS } from "../data/products";

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

  const activeSlideData = SLIDES[currentSlide];
  const activeProduct = PRODUCTS.find((p) => p.id === activeSlideData.productId);

  const getWhatsAppSlideUrl = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Pak Kiswa!\nI saw your offer for:\n*${activeSlideData.headline}*\nPrice: Rs. ${activeSlideData.price.toLocaleString()}\nPlease share details for Cash on Delivery ordering.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-[#FAF9F6] border-b border-stone-200"
    >
      {/* Background Image Slider */}
      <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {/* Background Slide Images with smooth Crossfade */}
        {SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive
                  ? "opacity-100 scale-100 z-0"
                  : "opacity-0 scale-105 -z-10 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                className="w-full h-full object-cover object-center sm:object-right"
              />
            </div>
          );
        })}

        {/* Ambient Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-white/70 sm:bg-gradient-to-r sm:from-white sm:via-white/90 sm:to-white/20 lg:to-transparent z-1 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
          
          {/* Mobile Floating Card Wrapper */}
          <div className="max-w-xl xl:max-w-2xl bg-white/90 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl sm:rounded-none border border-stone-200/70 sm:border-0 shadow-sm sm:shadow-none space-y-3.5 sm:space-y-5">
            
            {/* Top Category Tag & Badge */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#0E3E29] text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4D393] animate-ping" />
                {activeSlideData.badge}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#8B6B2B] bg-[#FAF3E4] border border-[#EADBBD] px-2 py-0.5 rounded-full">
                COD Available
              </span>
            </div>

            {/* Headline & Subtitle */}
            <div className="space-y-1.5 sm:space-y-2.5">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#0E3E29] leading-tight tracking-tight">
                {activeSlideData.headline}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-stone-600 leading-relaxed font-normal">
                {activeSlideData.subhead}
              </p>
            </div>

            {/* Price Highlight Badge */}
            <div className="inline-flex flex-wrap items-baseline gap-2 sm:gap-3 py-1.5 sm:py-2 px-3 sm:px-4 rounded-xl sm:rounded-2xl bg-white sm:bg-white/90 border border-stone-200 shadow-2xs">
              <span className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Factory Price:
              </span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#0E3E29]">
                Rs. {activeSlideData.price.toLocaleString()}
              </span>
              {activeSlideData.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  Rs. {activeSlideData.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Save {Math.round(((activeSlideData.originalPrice - activeSlideData.price) / activeSlideData.originalPrice) * 100)}%
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => onExploreCategory(activeSlideData.categoryId)}
                className="flex-1 sm:flex-initial px-5 sm:px-7 py-2.5 sm:py-3 bg-[#0E3E29] hover:bg-[#092a1c] text-white rounded-full font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 group cursor-pointer whitespace-nowrap"
              >
                <span>Shop {activeSlideData.categoryName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F4D393] group-hover:translate-x-1 transition-transform" />
              </button>

              {activeProduct && (
                <button
                  onClick={() => onOpenQuickView(activeProduct)}
                  className="px-3.5 sm:px-4 py-2.5 sm:py-3 bg-white hover:bg-stone-50 text-[#0E3E29] border border-stone-300 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Quick View</span>
                </button>
              )}

              <a
                href={getWhatsAppSlideUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-3.5 py-2 sm:py-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#0d6e3c] border border-[#25D366]/40 rounded-full font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order</span>
              </a>
            </div>

          </div>
        </div>

        {/* Desktop Prev / Next Chevron Buttons (Hidden on mobile to avoid overlapping content) */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="hidden sm:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/85 hover:bg-white text-stone-800 hover:text-[#0E3E29] shadow-md backdrop-blur-xs items-center justify-center transition-all border border-stone-200 cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="hidden sm:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/85 hover:bg-white text-stone-800 hover:text-[#0E3E29] shadow-md backdrop-blur-xs items-center justify-center transition-all border border-stone-200 cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>

        {/* Bottom Interactive Thumbnail Cards (Desktop only) */}
        <div className="hidden md:flex absolute bottom-6 right-8 z-20 items-center gap-2 bg-white/85 backdrop-blur-md p-2 rounded-2xl border border-stone-200/90 shadow-lg">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0E3E29] text-white shadow-xs"
                    : "text-stone-700 hover:bg-stone-100/80"
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
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? "w-7 h-2 bg-[#0E3E29]"
                    : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
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
