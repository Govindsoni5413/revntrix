import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
