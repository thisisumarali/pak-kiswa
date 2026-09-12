"use client";

import React from "react";
import {
  Factory,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Award,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export default function WhyUs() {
  const pillars = [
    {
      icon: <Factory className="w-6 h-6 text-[#C5A059]" />,
      title: "Direct From Export Factory",
      description:
        "No retailer markups. Enjoy genuine export-grade towels, 400 TC bedsheets, and baby care directly from our Karachi manufacturing facilities.",
    },
    {
      icon: <Truck className="w-6 h-6 text-[#C5A059]" />,
      title: "100% Cash on Delivery",
      description:
        "Shop with complete peace of mind. Pay cash to the courier only after receiving and inspecting your package at your doorstep across Pakistan.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C5A059]" />,
      title: "Certified Baby-Safe & Pure",
      description:
        "Our Essential Care infant bedding and net beds use chemical-free, breathable cotton and OEKO-TEX certified skin-friendly dyes.",
    },
    {
      icon: <RotateCcw className="w-6 h-6 text-[#C5A059]" />,
      title: "7-Day Easy Doorstep Exchange",
      description:
        "Size doesn't fit or color isn't right? Contact our team via WhatsApp for an effortless doorstep swap with zero hassle.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            The Pak Kiswa Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E3E29]">
            Why Pakistani Families Trust Us
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Bringing international hotel and export specifications directly to Pakistani homes at honest prices.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-[#FAF9F6] border border-stone-200/80 hover:border-[#C5A059]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0E3E29] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#0E3E29] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#0E3E29]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Pak Kiswa Assurance</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
