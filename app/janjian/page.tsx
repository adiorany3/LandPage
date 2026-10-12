import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

const bookingUrl = "https://cal.com/galuh-adi-insani/30min?layout=month_view";

export const metadata: Metadata = {
  title: "Janjian",
  description: "Pilih waktu untuk berbincang dengan Galuh Adi Insani.",
  alternates: { canonical: "/janjian" },
};

export default function JanjianPage() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/" aria-label="Adioranye, kembali ke beranda">
          <span className={styles.mark}>A<span>.</span></span>
          <span><strong>ADIORANYE</strong><small>RESEARCH &amp; TECHNOLOGY</small></span>
        </Link>
        <nav aria-label="Navigasi utama">
          <Link className={styles.home} href="/">← Kembali ke beranda</Link>
        </nav>
      </header>

      <section className={styles.intro} aria-labelledby="booking-title">
        <div>
          <p className={styles.eyebrow}><span className={styles.dot} /> CONNECT / 01</p>
          <h1 id="booking-title">Mari <span>berbincang.</span></h1>
          <p>Pilih waktu yang sesuai untuk diskusi riset, teknologi, atau peluang kolaborasi.</p>
        </div>
        <span className={styles.duration}>◷ &nbsp; Sesi 30 menit</span>
      </section>

      <section className={styles.workspace} aria-label="Kalender pemesanan">
        <div className={styles.panelTop}>
          <div><span className={styles.panelIcon} aria-hidden="true">▦</span><span><strong>JADWALKAN PERTEMUAN</strong><small>Galuh Adi Insani · Kalender ketersediaan</small></span></div>
          <span className={styles.panelLabel}>CAL.COM / BOOKING</span>
        </div>
        <iframe
          className={styles.calendar}
          src={bookingUrl}
          title="Janjian dengan Galuh Adi Insani"
        />
        <div className={styles.panelFooter}>Pilih tanggal dan waktu di kalender</div>
      </section>
    </main>
  );
}
