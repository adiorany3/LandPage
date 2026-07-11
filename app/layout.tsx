import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adioranye.vercel.app"),
  title: {
    default: "Galuh Adi Insani | AgriTech & Scientific Computing",
    template: "%s | Galuh Adi Insani"
  },
  description:
    "Portfolio Galuh Adi Insani yang menampilkan aplikasi AgriTech, nutrisi ternak, analisis statistik, computer vision, dan scientific computing dari GitHub.",
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
    title: "Galuh Adi Insani | Research Tools Builder",
    description:
      "Katalog project open-source untuk AgriTech, statistik, AI, dan scientific computing.",
    url: "https://adioranye.vercel.app",
    siteName: "Adioranye",
    locale: "id_ID",
    type: "website"
  },
  twitter: {
    card: "summary",
    title: "Galuh Adi Insani | Research Tools Builder",
    description: "Project open-source untuk AgriTech, statistik, AI, dan scientific computing."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
