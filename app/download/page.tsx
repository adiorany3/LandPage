import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import styles from "./page.module.css";

const apkUrl = "https://simpan.ugm.ac.id/s/RJ7fSgwdX2GHlO3/download";

export const metadata: Metadata = {
  title: "Download Aplikasi Android",
  description: "Unduh aplikasi Android melalui SIMPAN UGM. Tersedia tautan langsung, kode QR, dan panduan pemasangan.",
  alternates: { canonical: "/download" },
};

export default async function DownloadPage() {
  const qr = await QRCode.toDataURL(apkUrl, { width: 240, margin: 2 });
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Adioranye, kembali ke beranda">
          <span className={styles.mark}>A<span>.</span></span>
          <span><strong>ADIORANYE</strong><small>RESEARCH &amp; TECHNOLOGY</small></span>
        </Link>
        <nav aria-label="Navigasi utama"><Link className={styles.home} href="/">← Kembali ke beranda</Link></nav>
      </header>

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
