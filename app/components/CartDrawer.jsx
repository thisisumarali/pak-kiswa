"use client";

import React, { useState } from "react";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  ArrowRight,
  MessageCircle,
  Tag,
  Check,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_INFO } from "../data/products";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3500;
  const STANDARD_SHIPPING = 200;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const isFreeShipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD || cartItems.length === 0;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING;
  const grandTotal = discountedSubtotal + shippingFee;

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - discountedSubtotal
  );
  const progressPercent = Math.min(
    100,
    Math.round((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );

  const applyCoupon = () => {
    setCouponError("");
    if (couponCode.trim().toUpperCase() === "KISWA10") {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else if (couponCode.trim().toUpperCase() === "WELCOME") {
      setDiscountPercent(5);
      setCouponApplied(true);
    } else {
      setCouponError("Invalid promo code. Try 'KISWA10'");
    }
  };

  const generateWhatsAppCartOrderUrl = () => {
    let message = `Assalam o Alaikum Pak Kiswa!\nI would like to place an order for Cash on Delivery:\n\n`;
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n   Color: ${item.selectedColor} | Size: ${item.selectedSize}\n   Qty: ${item.quantity} x Rs. ${item.price.toLocaleString()} = Rs. ${(
        item.price * item.quantity
      ).toLocaleString()}\n\n`;
    });
    message += `----------------------------\n`;
    message += `Subtotal: Rs. ${subtotal.toLocaleString()}\n`;
    if (discountAmount > 0) {
      message += `Discount (${discountPercent}%): -Rs. ${discountAmount.toLocaleString()}\n`;
    }
    message += `Delivery Fee: ${isFreeShipping ? "FREE" : `Rs. ${STANDARD_SHIPPING}`}\n`;
    message += `*Total Payable (COD): Rs. ${grandTotal.toLocaleString()}*\n\n`;
    message += `Please confirm my order and dispatch details.`;

    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#0E3E29] rounded-xl text-white">
                <ShoppingBag className="w-5 h-5 text-[#F4D393]" />
              </div>
              <div>
                <h2 className="text-base font-serif font-bold text-stone-900">
                  Shopping Cart
                </h2>
                <p className="text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-full hover:bg-stone-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF7EE] border-b border-[#EADBBD] p-3.5">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-[#0E3E29]">
                <Truck className="w-4 h-4 text-[#C5A059]" />
                {isFreeShipping ? (
                  <span className="text-[#0E3E29] font-bold">
                    🎉 You unlocked FREE Nationwide Delivery!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-[#0E3E29]">Rs. {remainingForFreeShipping.toLocaleString()}</strong> more for FREE Shipping!
                  </span>
                )}
              </span>
              <span className="text-[11px] text-stone-500 font-bold">{progressPercent}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#0E3E29] to-[#C5A059] h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
            {cartItems.length > 0 ? (
              cartItems.map((item, idx) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="py-3.5 flex gap-3.5 group">
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl border border-stone-200 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item)}
                          className="text-stone-400 hover:text-red-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-500 mt-1">
                        {item.selectedColor && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-stone-100 px-2 py-0.5 rounded">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-[#0E3E29]">
                          Rs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Discover our export baby care, towels, and Egyptian bedsheets!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#0E3E29] text-white rounded-full text-xs font-semibold hover:bg-[#092a1c] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer with Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-[#FAF9F6] space-y-3">
              
              {/* Promo Coupon Code */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code (e.g. KISWA10)"
                    disabled={couponApplied}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#0E3E29]"
                  />
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  onClick={applyCoupon}
                  disabled={couponApplied || !couponCode.trim()}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  {couponApplied ? <Check className="w-4 h-4 text-emerald-400" /> : "Apply"}
                </button>
              </div>
              {couponApplied && (
                <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Coupon &apos;{couponCode.toUpperCase()}&apos; applied ({discountPercent}% OFF)
                </p>
              )}
              {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs pt-1 border-t border-stone-200/80">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>- Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Nationwide Shipping</span>
                  <span className={isFreeShipping ? "text-emerald-700 font-semibold" : ""}>
                    {isFreeShipping ? "FREE" : `Rs. ${STANDARD_SHIPPING}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total (Cash on Delivery)</span>
                  <span className="font-serif text-[#0E3E29]">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onProceedCheckout({
                      items: cartItems,
                      subtotal,
                      discountAmount,
                      shippingFee,
                      grandTotal,
                    });
                  }}
                  className="w-full py-3 px-4 bg-[#0E3E29] hover:bg-[#092a1c] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <span>Proceed to COD Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#F4D393]" />
                </button>

                <a
                  href={generateWhatsAppCartOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to Kashif Khan on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badge */}
              <div className="text-center pt-1">
                <span className="text-[10px] text-stone-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#0E3E29]" />
                  Pay cash only after inspecting your parcel at your doorstep
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
