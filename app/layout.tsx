import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://adioranye.vercel.app"),
  title: "Galuh Adi Insani | AgriTech & Scientific Computing",
  description:
    "Portfolio aplikasi AgriTech, statistik, scientific computing, dan open-source research tools.",
  openGraph: {
    title: "Galuh Adi Insani | Research Tools Builder",
    description: "Aplikasi riset yang jelas, terukur, dan mudah digunakan.",
    url: "https://adioranye.vercel.app",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
