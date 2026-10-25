import type { Metadata } from "next";
import Image from "next/image";
import QRCode from "qrcode";
import styles from "./page.module.css";
import SubpageHeader from "@/components/SubpageHeader";

const apkUrl = "https://simpan.ugm.ac.id/s/RJ7fSgwdX2GHlO3/download";
const virusTotalUrl = "https://www.virustotal.com/gui/url/d28404a1a9750e72d2d23e5348c3e90f8b5c953b619e9f074ebbf013fef7f746?nocache=1";

export const metadata: Metadata = {
  title: "Download Aplikasi Android",
  description: "Unduh aplikasi Android melalui SIMPAN UGM. Tersedia tautan langsung, kode QR, dan panduan pemasangan.",
  alternates: { canonical: "/download" },
  openGraph: {
    title: "Download Aplikasi Android",
    description: "Unduh aplikasi Android melalui SIMPAN UGM. Tersedia tautan langsung, kode QR, dan panduan pemasangan.",
    url: "/download",
    type: "website",
    locale: "id_ID",
    siteName: "Adioranye",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Download aplikasi Android" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default async function DownloadPage() {
  const qr = await QRCode.toDataURL(apkUrl, { width: 240, margin: 2 });
  return (
    <main className={styles.shell}>
      <SubpageHeader section="RESEARCH &amp; TECHNOLOGY" />

      <div className={styles.content}>
        <section className={styles.intro} aria-labelledby="download-title">
          <p className={styles.eyebrow}>APLIKASI / ANDROID</p>
          <h1 id="download-title">Akses lebih mudah <span>dari ponsel.</span></h1>
          <p>Unduh aplikasi Android melalui SIMPAN UGM dan pasang di perangkat Anda. Pilih tautan langsung atau pindai kode QR dari ponsel.</p>
        </section>

        <div className={styles.grid}>
          <section className={styles.downloadCard} aria-labelledby="file-title">
            <div className={styles.cardHeading}>
              <span className={styles.icon} aria-hidden="true">↓</span>
              <div><p className={styles.label}>UNDUHAN RESMI</p><h2 id="file-title">Aplikasi Android</h2></div>
            </div>
            <p>File aplikasi tersedia melalui layanan penyimpanan SIMPAN UGM. Unduhan akan dibuka dari layanan tersebut.</p>
            <a className={styles.downloadButton} href={apkUrl}>Unduh untuk Android <span aria-hidden="true">↗</span></a>
            <p className={styles.note}>Khusus perangkat Android. Unduh hanya dari tautan yang tercantum di halaman ini.</p>
          </section>

          <section className={styles.qrCard} aria-labelledby="qr-title">
            <div><p className={styles.label}>AKSES DARI PONSEL</p><h2 id="qr-title">Pindai kode QR</h2><p>Buka kamera ponsel, arahkan ke kode, lalu ikuti tautan unduhan.</p></div>
            <div className={styles.qrFrame}>
              <Image src={qr} alt="Kode QR menuju unduhan aplikasi Android di SIMPAN UGM" width={240} height={240} unoptimized />
            </div>
          </section>
        </div>

        <section className={styles.scanCard} aria-labelledby="scan-title">
          <div>
            <p className={styles.label}>PEMERIKSAAN TAUTAN</p>
            <h2 id="scan-title">Laporan VirusTotal</h2>
            <p>Tautan unduhan SIMPAN UGM telah memiliki halaman laporan di VirusTotal. Buka laporan untuk melihat hasil pemindaian dan tanggal analisis terbaru langsung dari sumbernya.</p>
            <p className={styles.note}>Laporan ini memeriksa URL unduhan, bukan menjamin keamanan file APK. Hasil dapat berubah; periksa kembali sebelum memasang.</p>
          </div>
          <a className={styles.scanLink} href={virusTotalUrl} target="_blank" rel="noopener noreferrer">Lihat hasil pemindaian <span aria-hidden="true">↗</span></a>
        </section>

        <section className={styles.steps} aria-labelledby="steps-title">
          <div><p className={styles.label}>PANDUAN SINGKAT</p><h2 id="steps-title">Cara memasang</h2></div>
          <ol>
            <li><strong>Unduh</strong><span>Gunakan tombol di atas atau pindai kode QR.</span></li>
            <li><strong>Buka file</strong><span>Temukan file unduhan di perangkat Android Anda.</span></li>
            <li><strong>Pasang aplikasi</strong><span>Ikuti petunjuk di layar. Jika diminta, izinkan pemasangan dari sumber ini hanya setelah memastikan file berasal dari tautan di atas.</span></li>
          </ol>
        </section>
      </div>
    </main>
  );
}
