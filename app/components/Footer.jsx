"use client";

import React from "react";
import PakKiswaLogo from "./PakKiswaLogo";
import { COMPANY_INFO } from "../data/products";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-[#092A1C] text-stone-300 pt-16 pb-12 border-t-4 border-[#C5A059]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <PakKiswaLogo light={true} size="large" />
            
            <p className="text-xs sm:text-sm text-stone-300/80 leading-relaxed pt-2">
              Pak Kiswa Global Enterprise Pvt. Ltd. is a registered textile manufacturer and global exporter based in Karachi, Pakistan. We produce world-class bath towels, luxury Egyptian bedsheets, orthopedic cloud pillows, and essential infant care bedding.
            </p>

            {/* Social Channels from Business Card */}
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#F4D393] font-semibold block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                {/* Instagram Icon */}
                <a
                  href={COMPANY_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center hover:text-[#F4D393] hover:border-[#C5A059] transition-all text-stone-300"
                  title="Instagram /Pakkiswa"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                {/* TikTok Icon */}
                <a
                  href={COMPANY_INFO.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center hover:text-[#F4D393] hover:border-[#C5A059] transition-all text-stone-300"
                  title="TikTok @pakkiswa"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.93-4.46V8.75a8.28 8.28 0 0 0 3.84 1.39V6.69z"/>
                  </svg>
                </a>

                {/* Facebook Icon */}
                <a
                  href={COMPANY_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center hover:text-[#F4D393] hover:border-[#C5A059] transition-all text-stone-300"
                  title="Facebook Pak Kiswa"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Salam%20Pak%20Kiswa!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                  title="WhatsApp Chat"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#F4D393]">
              Collections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory("baby")}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Baby Bedding &amp; Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory("towels")}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Axis Linens Towels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory("bedsheets")}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  400 TC Bedsheets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory("bedsheets")}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Bridal Bedding Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory("pillows")}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Hotel Cloud Pillows
                </button>
              </li>
              <li>
                <a href="#wholesale" className="hover:text-[#F4D393] transition-colors">
                  Wholesale &amp; Bulk
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service & Guarantees */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#F4D393]">
              Local Services
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Nationwide Cash on Delivery (COD)</span>
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>7-Day Doorstep Replacement</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Zero Risk: Open &amp; Check Policy</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>Custom Logo Embroidery for Hotels</span>
              </li>
            </ul>
          </div>

          {/* Authentic Contact Card Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#F4D393]">
              Headquarters
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="font-semibold text-white">
                {COMPANY_INFO.name}
              </p>
              <p className="text-[#E6C687]">
                Executive: <strong>{COMPANY_INFO.ceo}</strong> ({COMPANY_INFO.title})
              </p>
              
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Karachi &ndash; Pakistan</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${COMPANY_INFO.whatsappRaw}`} className="hover:text-white">
                  {COMPANY_INFO.whatsapp}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white truncate">
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payment Logos & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px]">
            <span className="text-stone-300 font-semibold">Payment Methods:</span>
            <span className="px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800 text-stone-200">
              Cash on Delivery (COD)
            </span>
            <span className="px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800 text-stone-200">
              Raast Instant
            </span>
            <span className="px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800 text-stone-200">
              Bank Transfer
            </span>
            <span className="px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800 text-stone-200">
              EasyPaisa / JazzCash
            </span>
          </div>

          <p className="text-center sm:text-right">
            &copy; 2026 Pak Kiswa Global Enterprise Pvt. Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
