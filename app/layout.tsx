import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adioranye.vercel.app"),
  title: "Galuh Adi Insani — AgriTech & Scientific Computing Developer",
  description:
    "Portfolio produk AgriTech, statistik, dan scientific computing untuk optimasi ransum ternak, dashboard penelitian, dan automation workflow.",
  authors: [{ name: "Galuh Adi Insani" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://adioranye.vercel.app/",
    title: "Galuh Adi Insani — AgriTech & Scientific Computing Developer",
    description:
      "Aplikasi web untuk optimasi ransum ternak, statistik penelitian, scientific computing, dan automation workflow.",
    images: ["/assets/hero-product.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Galuh Adi Insani — AgriTech & Scientific Computing Developer",
    description:
      "Aplikasi web untuk optimasi ransum ternak, statistik penelitian, scientific computing, dan automation workflow.",
    images: ["/assets/hero-product.svg"]
  },
  icons: {
    icon: "/assets/favicon.svg",
    apple: "/assets/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest",
  themeColor: "#08111f"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
