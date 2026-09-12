"use client";

import React, { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CategoryBar from "./components/CategoryBar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import WholesaleSection from "./components/WholesaleSection";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { PRODUCTS, COMPANY_INFO } from "./data/products";
import {
  Sparkles,
  SlidersHorizontal,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  Truck,
  Heart,
  ShoppingBag,
} from "lucide-react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, rating
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart handler
  const handleAddToCart = (itemToAdd) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.id === itemToAdd.id &&
          item.selectedColor === itemToAdd.selectedColor &&
          item.selectedSize === itemToAdd.selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += itemToAdd.quantity || 1;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            ...itemToAdd,
            quantity: itemToAdd.quantity || 1,
          },
        ];
      }
    });

    showToast(`Added "${itemToAdd.name}" to cart`);
  };

  // Update quantity
  const handleUpdateQuantity = (itemToUpdate, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemToUpdate);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemToUpdate.id &&
        item.selectedColor === itemToUpdate.selectedColor &&
        item.selectedSize === itemToUpdate.selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (itemToRemove) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.selectedColor === itemToRemove.selectedColor &&
            item.selectedSize === itemToRemove.selectedSize
          )
      )
    );
    showToast("Item removed from cart");
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to wishlist");
        return [...prev, productId];
      }
    });
  };

  // Proceed from cart to checkout
  const handleProceedCheckout = (data) => {
    setCheckoutData(data);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Order placed
  const handleOrderSuccess = () => {
    setCartItems([]);
    showToast("Order placed successfully!");
  };

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [activeCategory, sortBy]);

  const totalCartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] overflow-x-hidden w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 bg-[#0E3E29] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-[#C5A059]/40 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-[#F4D393] shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenQuickView={setQuickViewProduct}
        wishlistCount={wishlist.length}
      />

      {/* Hero Section with Responsive Background Slider */}
      <Hero
        onExploreCategory={(cat) => {
          setActiveCategory(cat);
          const el = document.getElementById("catalog");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onOpenQuickView={setQuickViewProduct}
      />

      {/* Interactive Category Filter Bar */}
      <CategoryBar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* Main Catalog Section */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-14 w-full flex-1">
        
        {/* Catalog Subheader with Counts & Sorting */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-6 sm:pb-8 border-b border-stone-200/80">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              Export Collection &bull; Factory Prices
            </span>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">
              {activeCategory === "all"
                ? "All Export Textiles"
                : activeCategory === "baby"
                ? "Essential Care Baby Bedding & Cots"
                : activeCategory === "towels"
                ? "Axis Linens & Royal Bath Towels"
                : activeCategory === "bedsheets"
                ? "Egyptian Cotton Bedsheet Sets"
                : "Hotel Cloud Sleeping Pillows"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Showing {filteredProducts.length} items &bull; Available with Cash on Delivery
            </p>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:border-[#0E3E29]"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onOpenQuickView={setQuickViewProduct}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>

        {/* Local Assurance Banner within Shop */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#E8F3EE] via-[#FAF9F6] to-[#FAF4E6] border border-stone-200/90 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0E3E29] text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4D393]" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-lg text-stone-900">
                Karachi Dispatch &bull; Nationwide COD
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                Dispatched directly from our Karachi mills. Open and inspect your parcel before paying.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Hi%20Kashif%20Sahab%2C%20I%20have%20a%20question%20about%20your%20products.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-2.5 sm:py-3 bg-[#0E3E29] hover:bg-[#092a1c] text-white text-xs sm:text-sm font-bold rounded-full shadow-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#4ade80]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </main>

      {/* Why Choose Pak Kiswa Value Props */}
      <WhyUs />

      {/* B2B Wholesale / Institutional Supply Section */}
      <WholesaleSection />

      {/* Pakistani Customer Testimonials */}
      <Testimonials />

      {/* Rich Footer with CEO Kashif Khan details */}
      <Footer onSelectCategory={setActiveCategory} />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(item) => {
            handleAddToCart(item);
            setQuickViewProduct(null);
          }}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutData={checkoutData}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating WhatsApp Quick-Contact Button (Bottom Right) */}
      <aside
        aria-label="Contact via WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center group"
      >
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=Assalam%20o%20Alaikum%20Pak%20Kiswa!`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 sm:p-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ring-4 ring-[#25D366]/20"
          aria-label="Direct WhatsApp Chat with CEO Kashif Khan"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </aside>

    </div>
  );
}
