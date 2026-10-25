import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

const title = "Adioranye Deep Search | Pencarian Riset";
const description = "Ruang pencarian mendalam Adioranye untuk membantu eksplorasi topik, referensi, dan pertanyaan riset.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/deep" },
  robots: { index: false, follow: true },
  openGraph: {
    title,
    description,
    url: "/deep",
    type: "website",
    locale: "id_ID",
    siteName: "Adioranye",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Adioranye Deep Search" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function DeepPage() {
  return (
    <>
      <a className="skip-link" href="#deep-search">Lewati ke pencarian mendalam</a>
      <main id="deep-search" style={{ width: "100%", height: "100dvh", display: "flex", flexDirection: "column" }}>
        <nav aria-label="Navigasi utama" style={{ padding: "12px 20px" }}>
          <Link href="/">Home</Link>
        </nav>
        <iframe
          src="https://udify.app/chat/K12CskGI7xphyRGA"
          title="Adioranye Deep Search"
          style={{ width: "100%", flex: 1, minHeight: 0, border: 0, display: "block" }}
          allow="microphone;clipboard-write"
        />
      </main>
    </>
  );
}
