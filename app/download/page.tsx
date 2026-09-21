import type { Metadata } from "next";
import Image from "next/image";
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
      <p>Unduh aplikasi Android melalui tautan berikut, dan install di HP Android Anda, untuk mendapatkan akses yang lebih mudah.</p>
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
      <Image
        src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=https%3A%2F%2Fsimpan.ugm.ac.id%2Fs%2FRJ7fSgwdX2GHlO3%2Fdownload"
        alt="QR code untuk mengunduh aplikasi Android"
        width={240}
        height={240}
        style={{ display: "block", marginTop: 24 }}
      />
    </main>
  );
}
