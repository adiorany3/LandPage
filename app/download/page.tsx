import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Download Aplikasi Android",
  description: "Unduh aplikasi Android melalui SIMPAN UGM.",
  alternates: { canonical: "/download" },
};

export default function DownloadPage() {
  return (
    <main style={{ maxWidth: 640, paddingBlock: "64px" }}>
      <nav aria-label="Navigasi utama">
        <Link href="/">← Beranda</Link>
      </nav>
      <h1>Download Aplikasi Android</h1>
      <p>Unduh aplikasi Android melalui tautan SIMPAN UGM berikut.</p>
      <a
        href="https://simpan.ugm.ac.id/s/RJ7fSgwdX2GHlO3/download"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          borderRadius: 12,
          background: "var(--accent)",
          color: "var(--bg)",
          fontWeight: 700,
        }}
      >
        Download untuk Android
      </a>
    </main>
  );
}
