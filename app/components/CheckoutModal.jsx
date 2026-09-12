"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle2,
  Truck,
  Building2,
  ShieldCheck,
  MessageCircle,
  Phone,
  MapPin,
  User,
  CreditCard,
  Banknote,
  ArrowRight,
} from "lucide-react";
import { COMPANY_INFO } from "../data/products";

const POPULAR_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Quetta",
  "Abbottabad",
  "Bahawalpur",
  "Other City",
];

export default function CheckoutModal({
  isOpen,
  onClose,
  checkoutData,
  onOrderSuccess,
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "Karachi",
    customCity: "",
    address: "",
    notes: "",
    paymentMethod: "cod", // 'cod' or 'raast'
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const effectiveCity =
    formData.city === "Other City" ? formData.customCity : formData.city;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `PK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setOrderConfirmed(true);
      setIsSubmitting(false);
      onOrderSuccess();
    }, 1000);
  };

  const getWhatsAppReceiptUrl = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum Pak Kiswa!\nI have placed an order on your website:\n` +
        `• *Order ID:* ${orderId}\n` +
        `• *Customer:* ${formData.fullName}\n` +
        `• *Phone:* ${formData.phone}\n` +
        `• *City:* ${effectiveCity}\n` +
        `• *Address:* ${formData.address}\n` +
        `• *Total Payable (COD):* Rs. ${checkoutData?.grandTotal?.toLocaleString()}\n` +
        `• *Items:* ${checkoutData?.items?.map((i) => `${i.quantity}x ${i.name} (${i.selectedColor})`).join(", ")}\n\n` +
        `Please confirm receipt and courier tracking details.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => !orderConfirmed && onClose()}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden z-10 my-auto">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0E3E29]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
              {orderConfirmed ? "Order Confirmed!" : "Fast Checkout (Cash on Delivery)"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation State */
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-[#0E3E29] rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                Order Placed Successfully
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                Thank You, {formData.fullName}!
              </h3>
              <p className="text-sm text-stone-600 mt-1">
                Your order reference number is{" "}
                <strong className="text-[#0E3E29] font-mono text-base">{orderId}</strong>
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-stone-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between border-b border-stone-200/80 pb-2 font-semibold text-stone-700">
                <span>Shipping Destination:</span>
                <span>{effectiveCity}, Pakistan</span>
              </div>
              <div className="flex justify-between border-b border-stone-200/80 pb-2 text-stone-600">
                <span>Delivery Address:</span>
                <span className="truncate max-w-[220px]">{formData.address}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#0E3E29] pt-1">
                <span>Payable Amount (Cash on Delivery):</span>
                <span>Rs. {checkoutData?.grandTotal?.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-stone-500 max-w-md mx-auto">
              Our dispatch team in Karachi is preparing your parcel. You will receive an SMS/call before delivery.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={getWhatsAppReceiptUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Order on WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="py-3 px-5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs sm:text-sm font-semibold"
              >
                Return to Shop
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Delivery Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                1. Delivery Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Kashif Khan"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0E3E29]/20 focus:border-[#0E3E29]"
                    />
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0316-8844335"
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0E3E29]/20 focus:border-[#0E3E29]"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    City *
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0E3E29]/20 focus:border-[#0E3E29] bg-white"
                  >
                    {POPULAR_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.city === "Other City" ? (
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Specify City Name *
                    </label>
                    <input
                      type="text"
                      name="customCity"
                      required
                      value={formData.customCity}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="For digital order invoice"
                      className="w-full px-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Complete Delivery Address *
                </label>
                <div className="relative">
                  <textarea
                    name="address"
                    rows={2}
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Plot/Flat No, Street, Sector or Area Landmark..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#0E3E29]/20 focus:border-[#0E3E29]"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                2. Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "cod" })}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "cod"
                      ? "border-[#0E3E29] bg-[#E8F3EE] ring-1 ring-[#0E3E29]"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleChange}
                    className="accent-[#0E3E29]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-stone-900">
                      <Banknote className="w-4 h-4 text-[#0E3E29]" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      Pay cash when the rider arrives
                    </span>
                  </div>
                </label>

                <label
                  onClick={() => setFormData({ ...formData, paymentMethod: "raast" })}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === "raast"
                      ? "border-[#0E3E29] bg-[#E8F3EE] ring-1 ring-[#0E3E29]"
                      : "border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="raast"
                    checked={formData.paymentMethod === "raast"}
                    onChange={handleChange}
                    className="accent-[#0E3E29]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-stone-900">
                      <Building2 className="w-4 h-4 text-[#0E3E29]" />
                      <span>Bank / Raast Instant</span>
                    </div>
                    <span className="text-[11px] text-stone-500 block">
                      Transfer via any banking app
                    </span>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === "raast" && (
                <div className="bg-[#FAF7EE] border border-[#EADBBD] rounded-xl p-3 text-xs text-stone-700 space-y-1 animate-in fade-in duration-200">
                  <p className="font-semibold text-[#0E3E29]">Pak Kiswa Enterprise Raast Details:</p>
                  <p>Raast ID: <strong>03168844335</strong> (Mr. Kashif Khan)</p>
                  <p className="text-[11px] text-stone-500">
                    You can confirm the order now and send screenshot on WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Total Summary */}
            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-stone-500 block">Total Payable:</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-[#0E3E29]">
                  Rs. {checkoutData?.grandTotal?.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 bg-[#0E3E29] hover:bg-[#092a1c] disabled:opacity-60 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>{isSubmitting ? "Placing Order..." : "Confirm & Place Order"}</span>
                <ArrowRight className="w-4 h-4 text-[#F4D393]" />
              </button>
            </div>

            <div className="text-center pt-1">
              <span className="text-[10px] text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#0E3E29]" />
                Zero risk &bull; Inspect package upon delivery &bull; 7-Day Doorstep Exchange
              </span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
