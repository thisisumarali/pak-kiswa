"use client";

import React, { useState, useEffect, useRef } from "react";
import PakKiswaLogo from "./PakKiswaLogo";
import { PRODUCTS, COMPANY_INFO } from "../data/products";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Navbar({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  onOpenQuickView,
  wishlistCount,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (mobileSearchRef.current && !mobileSearchRef.current.contains(e.target)) {
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered search results
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { id: "all", label: "All Items" },
    { id: "baby", label: "Baby Care" },
    { id: "towels", label: "Towels" },
    { id: "bedsheets", label: "Bedsheets" },
    { id: "pillows", label: "Pillows" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar - Mobile Safe */}
      <div className="bg-[#0E3E29] text-white border-b border-[#175238]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between text-[10px] sm:text-xs">
          
          {/* Announcement Text */}
          <div className="flex items-center gap-1.5 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start truncate">
            <span className="flex items-center gap-1 font-medium text-[#F4D393] shrink-0">
              <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A059]" />
              <span>Cash on Delivery Nationwide</span>
            </span>
            <span className="text-emerald-300/40 shrink-0">•</span>
            <span className="text-stone-200 truncate">
              Free Delivery over Rs. 3,500
            </span>
          </div>

          {/* Desktop Right Links */}
          <div className="hidden sm:flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hi%20Pak%20Kiswa%2C%20I%20am%20interested%20in%20your%20textiles.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-100 hover:text-[#F4D393] transition-colors whitespace-nowrap"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#4ade80]" />
              <span className="hidden md:inline">WhatsApp:</span>
              <span className="font-semibold text-white">{COMPANY_INFO.whatsapp}</span>
            </a>
            <span className="hidden lg:inline-block text-emerald-300/40">•</span>
            <a
              href="#wholesale"
              className="hidden lg:inline-flex items-center gap-1 text-[#F4D393] hover:underline font-medium whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              Wholesale B2B
            </a>
          </div>

        </div>
      </div>

      {/* Main Luxury Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-xs border-stone-200 py-2 sm:py-2.5"
            : "bg-[#FAF9F6] border-stone-200 py-2.5 sm:py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Mobile Menu Toggle & Logo */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 text-stone-700 hover:text-[#0E3E29] rounded-lg active:bg-stone-200 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer shrink-0"
            >
              <PakKiswaLogo size="small" showTagline={false} />
            </a>
          </div>

          {/* Center: Desktop Clean Editorial Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 whitespace-nowrap">
            {navLinks.map((link) => {
              const isActive = activeCategory === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    const catalogEl = document.getElementById("catalog");
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-sm font-medium tracking-wide transition-all relative py-1 cursor-pointer select-none ${
                    isActive
                      ? "text-[#0E3E29] font-bold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#0E3E29] after:rounded-full"
                      : "text-stone-600 hover:text-[#0E3E29]"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* B2B Link */}
            <a
              href="#wholesale"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#0E3E29] bg-[#FAF7EE] border border-[#EADBBD] hover:bg-[#F3EDE0] transition-colors shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-[#C5A059]" />
              <span>B2B / Wholesale</span>
            </a>
          </div>

          {/* Right: Search, Wishlist & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Mobile Search Toggle Button (visible only on mobile) */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-[#0E3E29] rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Toggle search input"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Search Input (hidden on mobile, visible lg:block) */}
            <div ref={searchRef} className="relative hidden lg:block">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search textiles..."
                  className="w-36 xl:w-52 pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0E3E29]/20 focus:border-[#0E3E29] placeholder:text-stone-400 text-stone-800 transition-all"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setIsSearchOpen(false);
                    }}
                    className="absolute right-2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Desktop Search Dropdown */}
              {isSearchOpen && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50">
                  <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-100 text-xs font-semibold text-stone-500 uppercase tracking-wider flex justify-between items-center">
                    <span>Products Found ({searchResults.length})</span>
                    <span className="text-[10px] text-stone-400">Click to view</span>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onOpenQuickView(product);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-[#FAF9F6] transition-colors cursor-pointer group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border border-stone-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-medium text-stone-900 group-hover:text-[#0E3E29] transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-stone-500 truncate">
                              {product.tagline}
                            </p>
                            <span className="text-xs font-bold text-[#0E3E29]">
                              Rs. {product.price.toLocaleString()}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-[#0E3E29] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-sm text-stone-500">
                        No textiles matching &quot;{searchQuery}&quot; found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button (hidden on tiny screens, visible sm:flex) */}
            <button
              onClick={() => {
                const catalog = document.getElementById("catalog");
                if (catalog) catalog.scrollIntoView({ behavior: "smooth" });
              }}
              title="Saved items"
              className="relative p-2 text-stone-600 hover:text-[#0E3E29] hover:bg-stone-100 rounded-full transition-colors hidden sm:flex items-center justify-center shrink-0"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#C5A059] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-[#0E3E29] hover:bg-[#092a1c] text-white rounded-full transition-all duration-200 shadow-xs active:scale-95 shrink-0 cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#F4D393]" />
              <span className="text-xs sm:text-sm font-semibold hidden md:inline">Cart</span>
              <span className="bg-[#C5A059] text-white text-[11px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full min-w-[18px] text-center leading-tight">
                {cartCount}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Search Expandable Tray */}
        {isMobileSearchOpen && (
          <div ref={mobileSearchRef} className="lg:hidden px-3 pt-2 pb-3 border-t border-stone-200/80 bg-white shadow-md animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search towels, bedsheets, baby net bed..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:border-[#0E3E29] text-stone-900"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-stone-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile search results preview */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-2 max-h-60 overflow-y-auto divide-y divide-stone-100 bg-white rounded-xl border border-stone-200">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onOpenQuickView(product);
                        setIsMobileSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-2.5 hover:bg-stone-50 active:bg-stone-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded-md border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-stone-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] font-bold text-[#0E3E29]">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-xs text-stone-500">
                    No results for &quot;{searchQuery}&quot;
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6]">
              <PakKiswaLogo size="small" showTagline={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-500 hover:text-stone-800 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="p-4 flex-1 overflow-y-auto space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-2">
                Explore Collections
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    setMobileMenuOpen(false);
                    const catalogEl = document.getElementById("catalog");
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                    activeCategory === link.id
                      ? "bg-[#E8F3EE] text-[#0E3E29] font-bold"
                      : "text-stone-700 hover:bg-stone-50"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              ))}

              <a
                href="#wholesale"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-[#FAF7EE] border border-[#EADBBD] text-[#0E3E29] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Wholesale &amp; B2B Supply</span>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </a>

              {/* Local Pakistan Assurance Highlights */}
              <div className="mt-6 pt-4 border-t border-stone-100 space-y-3 px-3">
                <div className="flex items-center gap-2.5 text-xs text-stone-600">
                  <Truck className="w-4 h-4 text-[#0E3E29] shrink-0" />
                  <span>Cash on Delivery (Karachi &amp; Nationwide)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-[#0E3E29] shrink-0" />
                  <span>7-Day Doorstep Replacement Guarantee</span>
                </div>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="p-4 border-t border-stone-200 bg-stone-50">
              <p className="text-xs text-stone-500 mb-2">Need assistance with your order?</p>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hi%20Kashif%20Bhai%2C%20I%20want%20to%20place%20an%20order%20for%20Pak%20Kiswa%20textiles.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp ({COMPANY_INFO.whatsapp})</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
