import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Revntrix — Premium Web Design Showcase",
    template: "%s | Revntrix",
  },
  description:
    "Discover 60 stunning website designs across 6 industries. Choose your perfect design and connect with our team via WhatsApp.",
  keywords: [
    "web design",
    "website showcase",
    "interior design websites",
    "clinic websites",
    "real estate websites",
    "jewellery websites",
    "restaurant websites",
    "ecommerce websites",
  ],
  authors: [{ name: "Revntrix" }],
  openGraph: {
    title: "Revntrix — Premium Web Design Showcase",
    description:
      "Discover 60 stunning website designs across 6 industries.",
    type: "website",
    siteName: "Revntrix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
