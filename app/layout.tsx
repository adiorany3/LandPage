import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adioranye.vercel.app"),
  title: {
    default: "Galuh Adi Insani | Inovasi Peternakan & AgriTech",
    template: "%s | Galuh Adi Insani"
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
    "Python developer Indonesia"
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
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: "Galuh Adi Insani | Inovasi Peternakan & AgriTech",
    description: "Ransum Ruminansia, formulasi pakan ternak, analisis statistik, dan aplikasi riset karya Galuh Adi Insani."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.theme==="light")document.body.classList.add("light")}catch(e){}document.documentElement.classList.add("js");`
          }}
        />
        {children}
        <Script id="dify-chatbot-config" strategy="afterInteractive">
          {`window.difyChatbotConfig = {
            token: "s8pa4tyZ2EdkN1Bf",
            baseUrl: "https://udify.app",
            inputs: {},
            systemVariables: {},
            userVariables: {}
          };`}
        </Script>
        <Script
          id="s8pa4tyZ2EdkN1Bf"
          src="https://udify.app/embed.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
