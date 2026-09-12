"use client";

import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Mail,
  Phone,
  MessageCircle,
  FileSpreadsheet,
  Globe2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_INFO } from "../data/products";

export default function WholesaleSection() {
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phone: "",
    itemType: "Towels (Hotel & Spa)",
    quantity: "50 - 200 Pieces",
    city: "Karachi",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getDirectWhatsAppB2BUrl = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Mr. Kashif Khan!\nI am requesting a Wholesale / Bulk Textile Quote for my business:\n` +
        `• Business: ${formData.businessName || "Local Enterprise"}\n` +
        `• Contact Person: ${formData.contactPerson || "Manager"}\n` +
        `• Phone: ${formData.phone || "N/A"}\n` +
        `• Products Needed: ${formData.itemType}\n` +
        `• Estimated Quantity: ${formData.quantity}\n` +
        `• City: ${formData.city}\n` +
        `• Requirement Notes: ${formData.notes || "Please send wholesale catalog and rate sheet."}`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <section id="wholesale" className="py-16 sm:py-20 bg-[#FAF9F6] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F3EE] text-[#0E3E29] text-xs font-bold uppercase tracking-wider border border-[#C7E6D7]">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional Supply &bull; B2B &bull; Global Export</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0E3E29]">
            Wholesale Inquiries &amp; Bulk Orders
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Supplying 5-star hotels, guest houses, hospitals, baby boutiques, and departmental stores across Pakistan and internationally with custom branding, embroidery, and factory-direct wholesale pricing.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Business Card & Enterprise Credentials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Business Card Display */}
            <div className="relative bg-[#092a1c] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#C5A059]/30 overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-2xl" />
              
              <div className="flex items-start justify-between border-b border-emerald-900/60 pb-5">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#F4D393] font-semibold">
                    Global Leadership
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                    {COMPANY_INFO.ceo}
                  </h3>
                  <p className="text-xs text-stone-300">{COMPANY_INFO.title}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0E3E29] border border-[#C5A059]/40 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#C5A059]" />
                </div>
              </div>

              {/* Direct Contact Points */}
              <div className="py-5 space-y-3 text-xs text-stone-200">
                <a
                  href={`tel:${COMPANY_INFO.whatsappRaw}`}
                  className="flex items-center gap-3 hover:text-[#F4D393] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{COMPANY_INFO.whatsapp}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-3 hover:text-[#F4D393] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
                <div className="flex items-center gap-3">
                  <Globe2 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>{COMPANY_INFO.location} &bull; Export to 15+ Countries</span>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-stone-300">
                <span className="flex items-center gap-1.5 text-[#F4D393]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#4ade80]" />
                  Verified Textile Exporter
                </span>
                <span className="uppercase tracking-wider text-[10px] text-stone-400">
                  Govt. Registered Pvt. Ltd.
                </span>
              </div>
            </div>

            {/* Enterprise Highlights */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200">
                <h4 className="font-bold text-xs text-stone-900">Custom Dyeing &amp; Logo</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Embroidery &amp; jacquard woven crests for hotels &amp; clubs.
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-stone-200">
                <h4 className="font-bold text-xs text-stone-900">Bulk Tier Discounts</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Volume tiers starting from 50 pcs up to 20,000+ container loads.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Fast Quote Request Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-stone-200">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-100 text-[#0E3E29] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Wholesale Inquiry Submitted
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Thank you! Mr. Kashif Khan and our enterprise export team will contact you within 2-4 business hours with custom pricing.
                </p>
                <div className="pt-3">
                  <a
                    href={getDirectWhatsAppB2BUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Speed up via Direct WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Request a Direct Factory Quote
                  </h3>
                  <span className="text-[11px] text-stone-400">Response within 4 hrs</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Business / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData({ ...formData, businessName: e.target.value })
                      }
                      placeholder="e.g. Pearl Continental, Serene Spa, etc."
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Contact Person &amp; Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) =>
                        setFormData({ ...formData, contactPerson: e.target.value })
                      }
                      placeholder="e.g. Kashif / Procurement Manager"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="03xx-xxxxxxx"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      placeholder="e.g. Karachi, Lahore, Islamabad"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Products of Interest
                    </label>
                    <select
                      value={formData.itemType}
                      onChange={(e) =>
                        setFormData({ ...formData, itemType: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none bg-white"
                    >
                      <option value="Towels (Hotel & Spa 650 GSM)">
                        Luxury Towels (Hotel &amp; Spa 650 GSM)
                      </option>
                      <option value="Baby Net Beds & Nursery Suites">
                        Baby Net Beds &amp; Nursery Suites
                      </option>
                      <option value="400 TC Egyptian Satin Bedsheets">
                        400 TC Egyptian Satin Bedsheets
                      </option>
                      <option value="Hotel Microfiber Sleeping Pillows">
                        Hotel Microfiber Sleeping Pillows
                      </option>
                      <option value="Mixed Institutional Supply">
                        Mixed Institutional / Full Hotel Setup
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Estimated Order Volume
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none bg-white"
                    >
                      <option value="50 - 200 Pieces">50 - 200 Pieces</option>
                      <option value="200 - 1,000 Pieces">200 - 1,000 Pieces</option>
                      <option value="1,000 - 5,000 Pieces">1,000 - 5,000 Pieces</option>
                      <option value="Full Export Container (FCL)">
                        Full Export Container (FCL)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Special Specifications / Custom Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Provide details on custom sizes, GSM, custom logo embroidery, delivery timeline, etc."
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#0E3E29] focus:outline-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto py-3 px-6 bg-[#0E3E29] hover:bg-[#092a1c] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>Submit Wholesale Request</span>
                    <ArrowRight className="w-4 h-4 text-[#F4D393]" />
                  </button>

                  <a
                    href={getDirectWhatsAppB2BUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs text-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Quote</span>
                  </a>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
