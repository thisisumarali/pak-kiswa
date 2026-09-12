import React from "react";

export default function PakKiswaLogo({ size = "default", light = false, showTagline = false }) {
  const isSmall = size === "small";
  const isLarge = size === "large";

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 select-none shrink-0">
      {/* Intricately rendered woven knot emblem matching the business card & towel branding */}
      <div
        className={`relative flex items-center justify-center shrink-0 rounded-xl transition-transform duration-300 hover:rotate-3 ${
          isSmall
            ? "w-8 h-8"
            : isLarge
            ? "w-13 h-13"
            : "w-10 h-10"
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle gold outer glow ring */}
          <circle cx="50" cy="50" r="46" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 3" opacity="0.4" />
          
          <defs>
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1B5E3C" />
              <stop offset="50%" stopColor="#0E3E29" />
              <stop offset="100%" stopColor="#08281A" />
            </linearGradient>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9E498" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9C7726" />
            </linearGradient>
            <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Interlacing Celtic-textile weave ribbons */}
          <g filter="url(#shadowGlow)">
            {/* Emerald Diagonal Ribbons */}
            <path
              d="M26 38 L42 22 C44 20 48 20 50 22 L66 38 C68 40 68 44 66 46 L50 62 C48 64 44 64 42 62 L26 46 C24 44 24 40 26 38 Z"
              stroke="url(#emeraldGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Gold Cross Ribbons */}
            <path
              d="M38 26 L22 42 C20 44 20 48 22 50 L38 66 C40 68 44 68 46 66 L62 50 C64 48 64 44 62 42 L46 26 C44 24 40 24 38 26 Z"
              stroke="url(#goldGrad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner diamond highlights for woven knot effect */}
            <path
              d="M44 32 L56 44 L44 56 L32 44 Z"
              stroke="url(#goldGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="44" cy="44" r="3" fill="#0E3E29" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col whitespace-nowrap leading-none">
        <span
          className={`font-serif tracking-[0.16em] font-bold uppercase transition-colors ${
            light ? "text-white" : "text-[#0E3E29]"
          } ${isSmall ? "text-sm" : isLarge ? "text-xl sm:text-2xl" : "text-base sm:text-lg"}`}
        >
          Pak Kiswa
        </span>
        <span
          className={`tracking-[0.22em] font-semibold uppercase text-[8px] sm:text-[9px] mt-0.5 ${
            light ? "text-[#E6C687]" : "text-[#C5A059]"
          }`}
        >
          Global Enterprises
        </span>
        {showTagline && (
          <span
            className={`text-[8px] tracking-[0.14em] font-normal uppercase mt-0.5 ${
              light ? "text-stone-400" : "text-stone-500"
            }`}
          >
            Export Textiles &bull; Essential Care
          </span>
        )}
      </div>
    </div>
  );
}
