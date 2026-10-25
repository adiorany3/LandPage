import type { Metadata } from "next";
import styles from "./page.module.css";
import SubpageHeader from "@/components/SubpageHeader";

const bookingUrl = "https://cal.com/galuh-adi-insani/30min?layout=month_view";

export const metadata: Metadata = {
  title: "Janjian",
  description: "Pilih waktu untuk berbincang dengan Galuh Adi Insani.",
  alternates: { canonical: "/janjian" },
  openGraph: {
    title: "Janjian dengan Galuh Adi Insani",
    description: "Pilih waktu untuk berdiskusi tentang riset, teknologi, atau peluang kolaborasi.",
    url: "/janjian",
    type: "website",
    locale: "id_ID",
    siteName: "Adioranye",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Janjian dengan Galuh Adi Insani" }],
  },
  twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
};

export default function JanjianPage() {
  return (
    <main className={styles.shell}>
      <SubpageHeader activeHref="/janjian" section="RESEARCH &amp; TECHNOLOGY" />

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
