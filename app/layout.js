import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0E3E29",
};

export const metadata = {
  title: "Pak Kiswa Global Enterprises | Export Quality Bedding, Towels & Baby Care in Pakistan",
  description:
    "Official local e-commerce store of Pak Kiswa Global Enterprise Pvt Ltd. Luxury 100% combed cotton towels, 400 TC bedsheets, cloud pillows, and essential infant care bedding sets. Cash on Delivery across Pakistan.",
  keywords: [
    "Pak Kiswa",
    "Pak Kiswa Global Enterprises",
    "Luxury Towels Pakistan",
    "Baby Bedding Mosquito Net Pakistan",
    "Egyptian Cotton Bedsheets Karachi",
    "Wholesale Textile Pakistan",
    "Kashif Khan Pak Kiswa",
  ],
  authors: [{ name: "Pak Kiswa Global Enterprises Pvt Ltd" }],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF9F6] text-[#1E293B] font-sans selection:bg-[#0E3E29] selection:text-[#FAF9F6]">
        {children}
      </body>
    </html>
  );
}
