"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Eye,
  Star,
  Check,
  MessageCircle,
  Truck,
} from "lucide-react";
import { COMPANY_INFO } from "../data/products";

export default function ProductCard({
  product,
  onAddToCart,
  onOpenQuickView,
  isWishlisted,
  onToggleWishlist,
}) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor: selectedColor?.name || "Standard",
      selectedSize: selectedSize || "Standard",
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const generateWhatsAppProductUrl = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Pak Kiswa!\nI want to order:\n*${product.name}*\nPrice: Rs. ${product.price.toLocaleString()}\nColor: ${
        selectedColor?.name || "Default"
      }\nSize: ${selectedSize || "Standard"}\nPlease share delivery details for Cash on Delivery.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="group relative bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Media Container */}
      <div
        onClick={() => onOpenQuickView(product)}
        className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#0E3E29] text-white rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#C5A059] text-white rounded-md shadow-xs self-start">
              {product.discount}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          aria-label="Save to Wishlist"
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? "bg-red-50 text-red-500 shadow-sm"
              : "bg-white/80 text-stone-600 hover:text-red-500 hover:bg-white"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${isWishlisted ? "fill-red-500 stroke-red-500" : ""}`}
          />
        </button>

        {/* Quick View Hover Pill on Desktop */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="w-full py-2 px-3 bg-white/95 hover:bg-white text-stone-800 text-xs font-semibold rounded-xl shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-[#0E3E29]" />
            <span>Quick View &amp; Specs</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
              {product.category === "baby"
                ? "Baby Care"
                : product.category === "towels"
                ? "Bath Linen"
                : product.category === "bedsheets"
                ? "Bedding"
                : "Pillows"}
            </span>

            <div className="flex items-center gap-1 text-[#C5A059] font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="font-serif font-bold text-stone-900 text-base sm:text-lg group-hover:text-[#0E3E29] transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[11px] text-stone-400 font-medium">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.map((c) => {
                  const isSelected = selectedColor?.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedColor(c);
                      }}
                      title={c.name}
                      className={`w-4 h-4 rounded-full border transition-all ${
                        isSelected
                          ? "ring-2 ring-[#0E3E29] ring-offset-1 scale-110"
                          : "border-stone-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-4 mt-4 border-t border-stone-100 flex flex-col gap-3">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold font-serif text-[#0E3E29]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              COD Available
            </span>
          </div>

          {/* Dual Action: Add to Cart & WhatsApp */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                justAdded
                  ? "bg-emerald-600 text-white"
                  : "bg-[#0E3E29] hover:bg-[#092a1c] text-white active:scale-95 shadow-xs"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#F4D393]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <a
              href={generateWhatsAppProductUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl text-xs font-semibold bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] border border-[#25D366]/30 flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
