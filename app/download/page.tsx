import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";

const apkUrl = "https://simpan.ugm.ac.id/s/RJ7fSgwdX2GHlO3/download";

export const metadata: Metadata = {
  title: "Download Aplikasi Android",
  description: "Unduh aplikasi Android melalui SIMPAN UGM.",
  alternates: { canonical: "/download" },
};

export default async function DownloadPage() {
  const qr = await QRCode.toDataURL(apkUrl, { width: 240, margin: 2 });
  return (
    <main style={{ maxWidth: 640, paddingBlock: "64px" }}>
      <nav aria-label="Navigasi utama">
        <Link href="/">← Beranda</Link>
      </nav>
      <h1>Download Aplikasi Android</h1>
      <p>Unduh aplikasi Android melalui tautan berikut, dan install di HP Android Anda, untuk mendapatkan akses yang lebih mudah.</p>
      <a
        href={apkUrl}
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
        src={qr}
        alt="QR code untuk mengunduh aplikasi Android"
        width={240}
        height={240}
        unoptimized
        style={{ display: "block", marginTop: 24 }}
      />
    </main>
  );
}
