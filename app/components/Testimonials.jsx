"use client";

import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dr. Ayesha Siddiqui",
      city: "Karachi (DHA Phase 6)",
      product: "Infant Net Bed & Pillow Suite (Blue Polka)",
      rating: 5,
      comment:
        "Living in Karachi, mosquitoes were my biggest fear for my newborn baby. This net bed is an absolute lifesaver! The pop-up mechanism is very smooth, the mattress is sufficiently soft yet firm, and the side bolsters keep my 3-month baby snug. Delivered in just 24 hours on COD.",
    },
    {
      name: "Salman Tariq",
      city: "Lahore (Gulberg III)",
      product: "Axis Linens Supreme 650 GSM Towel Set",
      rating: 5,
      comment:
        "I was tired of buying overpriced imported towels that become rough after 3 washes. Axis Linens by Pak Kiswa is legit 5-star hotel quality. The thickness and water absorption are incredible. You can feel the ring-spun cotton quality immediately.",
    },
    {
      name: "Zainab Malik",
      city: "Islamabad (F-7/2)",
      product: "400 TC Egyptian Cotton Satin Bedsheet",
      rating: 5,
      comment:
        "The silky sateen finish and cooling texture are exceptional. Fits my deep king mattress with mattress topper without sliding off. Truly export standard at almost half the price of big retail brands in Pakistan.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Real Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E3E29]">
            Customer Reviews Across Pakistan
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Rated 4.9/5 stars by thousands of homes from Karachi to Islamabad.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Rating & Quote mark */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#C5A059]/30" />
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">{rev.city}</p>
                  <p className="text-[10px] text-[#0E3E29] font-semibold mt-0.5">
                    Verified Purchase: {rev.product}
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
