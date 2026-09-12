"use client";

import React from "react";
import { CATEGORIES } from "../data/products";
import { Sparkles, Baby, Bath, BedDouble, Feather } from "lucide-react";

export default function CategoryBar({ activeCategory, onSelectCategory }) {
  const getCategoryIcon = (id) => {
    switch (id) {
      case "baby":
        return <Baby className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "towels":
        return <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "bedsheets":
        return <BedDouble className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "pillows":
        return <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <div id="catalog" className="w-full bg-white border-b border-stone-200 sticky top-[57px] sm:top-[70px] z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Scrollable category pills with touch momentum */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 w-full -mx-1 px-1">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-[#0E3E29] text-white shadow-xs"
                      : "bg-[#FAF9F6] text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
                  }`}
                >
                  <span className={isActive ? "text-[#F4D393]" : "text-stone-500"}>
                    {getCategoryIcon(cat.id)}
                  </span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.2 rounded-full ${
                      isActive
                        ? "bg-[#175338] text-white"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
