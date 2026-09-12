"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Check,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import { COMPANY_INFO } from "../data/products";

export default function ProductModal({ product, onClose, onAddToCart }) {
  const [activeImage, setActiveImage] = useState(product?.image);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || null);
      setQuantity(1);
    }
  }, [product]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      image: activeImage,
      selectedColor: selectedColor?.name || "Standard",
      selectedSize: selectedSize || "Standard",
      quantity,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const getWhatsAppOrderUrl = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Pak Kiswa!\nI would like to order:\n*${product.name}*\n` +
        `• Quantity: ${quantity}\n` +
        `• Selected Color: ${selectedColor?.name || "Standard"}\n` +
        `• Size: ${selectedSize || "Standard"}\n` +
        `• Price: Rs. ${(product.price * quantity).toLocaleString()}\n` +
        `Please confirm Cash on Delivery availability and dispatch time.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            
            {/* Left Column: Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#0E3E29] text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails if available */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImage === img
                          ? "border-[#0E3E29] ring-2 ring-[#0E3E29]/20 scale-95"
                          : "border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumb ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Local Guarantee Callouts */}
              <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-3.5 space-y-2 mt-4 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#0E3E29]" />
                  <span>
                    <strong>Cash on Delivery:</strong> Karachi (24-48 hrs), All other cities (2-4 days).
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0E3E29]" />
                  <span>
                    <strong>7-Day Replacement:</strong> In case of any defect or size mismatch.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Specs & Ordering */}
            <div className="space-y-4">
              
              {/* Category & Ratings */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  Export Textile Series
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
                  <Star className="w-4 h-4 fill-[#C5A059]" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400 font-normal">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3 py-2 border-y border-stone-100">
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0E3E29]">
                  Rs. {(product.price * quantity).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    Rs. {(product.originalPrice * quantity).toLocaleString()}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs font-bold px-2 py-0.5 bg-[#FAF7EE] text-[#C5A059] border border-[#EADBBD] rounded-md">
                    Save {product.discount}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {product.description}
              </p>

              {/* Color Variation Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                    <span>Selected Color:</span>
                    <span className="font-normal text-stone-500">{selectedColor?.name}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor?.name === c.name;
                      return (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            isSelected
                              ? "border-[#0E3E29] bg-[#E8F3EE] text-[#0E3E29] ring-1 ring-[#0E3E29]"
                              : "border-stone-200 bg-white hover:bg-stone-50 text-stone-700"
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700">
                    Select Size / Option:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            isSelected
                              ? "bg-[#0E3E29] text-white border-[#0E3E29]"
                              : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Counter & Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 py-1 text-sm font-semibold text-stone-900 min-w-[36px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <button
                    onClick={handleAdd}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 ${
                      addedAnimation
                        ? "bg-emerald-600 text-white"
                        : "bg-[#0E3E29] hover:bg-[#092a1c] text-white"
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#F4D393]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Technical Specifications Breakdown */}
              {product.specs && (
                <div className="mt-4 pt-4 border-t border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Specifications &amp; Standards
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="bg-stone-50 p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-400 block text-[10px] uppercase font-semibold">
                          {key}
                        </span>
                        <span className="text-stone-800 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
