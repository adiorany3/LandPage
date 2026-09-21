import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adioranye.vercel.app"),
  title: {
    default: "Galuh Adi Insani | Inovasi Peternakan & AgriTech",
    template: "%s | Galuh Adi Insani",
  },
  description:
    "Galuh Adi Insani mengembangkan Ransum Ruminansia, aplikasi formulasi pakan, analisis statistik, dan komputasi ilmiah untuk inovasi peternakan dan AgriTech.",
  authors: [{ name: "Galuh Adi Insani", url: "https://adioranye.vercel.app/" }],
  creator: "Galuh Adi Insani",
  keywords: [
    "Galuh Adi Insani",
    "Adioranye",
    "AgriTech software",
    "livestock nutrition software",
    "statistical analysis app",
    "scientific computing",
    "Python developer Indonesia",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Galuh Adi Insani | Inovasi Peternakan & AgriTech",
    description:
      "Ransum Ruminansia, formulasi pakan ternak, analisis statistik, dan aplikasi riset karya Galuh Adi Insani.",
    url: "https://adioranye.vercel.app",
    siteName: "Adioranye",
    locale: "id_ID",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==="light")document.body.classList.add("light")}catch(e){}document.documentElement.classList.add("js");`,
          }}
        />
        <Script
          id="dify-chatbot-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.difyChatbotConfig={baseUrl:"https://udify.app",token:"s8pa4tyZ2EdkN1Bf"};`,
          }}
        />
        <link rel="preconnect" href="https://udify.app" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://acadstaff.ugm.ac.id" />
        <link rel="dns-prefetch" href="https://sunegg.id" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          id="dify-chatbot"
          src="https://udify.app/embed.min.js"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
