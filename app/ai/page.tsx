import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import SubpageHeader from "@/components/SubpageHeader";
import aiLogo from "../../pic/adioranyeai.jpg";

const title = "Adioranye AI | Asisten Riset dan Produktivitas";
const description = "Gunakan Adioranye AI sebagai ruang bantu untuk riset, produktivitas, dan eksplorasi ide berbasis percakapan.";

const capabilities = [
  { icon: "◇", label: "Riset cepat", detail: "Rangkum topik, susun kerangka tulisan, dan gali sudut pandang baru." },
  { icon: "▦", label: "Olah data", detail: "Bantu baca data peternakan, susun rumus, dan cek logika perhitungan." },
  { icon: "✎", label: "Draf konten", detail: "Susun draf artikel, caption, dan materi edukasi siap disunting ulang." },
  { icon: "?", label: "Eksplorasi ide", detail: "Diskusikan ide produk AgriTech dari sisi teknis maupun pengguna." }
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ai" },
  robots: { index: false, follow: true },
  openGraph: {
    title,
    description,
    url: "/ai",
    type: "website",
    locale: "id_ID",
    siteName: "Adioranye",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Adioranye AI" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function AiPage() {
  return (
    <main className={styles.shell}>
      <SubpageHeader activeHref="/ai" section="INTELLIGENCE SYSTEM" />
      <section className={styles.workspace} aria-label="Adioranye AI workspace">
        <div className={styles.panelTop}>
          <div><Image className={styles.panelIcon} src={aiLogo} alt="" width={32} height={32} /><div><strong>ADIORANYE AI</strong><small>Asisten riset dan produktivitas</small></div></div>
          <span className={styles.live}>
            <svg className={styles.heartbeat} viewBox="0 0 120 32" fill="none" aria-hidden="true">
              <path d="M0 16h35l8-9 9 19 10-22 10 12h48" />
            </svg>
            ASISTEN AI
          </span>
        </div>
        <iframe
          className={styles.chat}
          src="https://udify.app/chat/s8pa4tyZ2EdkN1Bf"
          title="Adioranye AI"
          allow="microphone;clipboard-write"
        />
      </section>
      <section className={styles.info} aria-label="Kemampuan dan catatan penggunaan">
        <ul className={styles.caps}>
          {capabilities.map((item) => (
            <li key={item.label}>
              <span className={styles.capIcon} aria-hidden="true">{item.icon}</span>
              <span><strong>{item.label}</strong><small>{item.detail}</small></span>
            </li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link className="btn ghost" href="/edukasi-peternakan">Materi edukasi peternakan</Link>
          <Link className="btn ghost" href="/inovasi/ransum-ruminansia">Aplikasi Ransum Ruminansia</Link>
          <a className="btn primary" href="https://www.adioranye.my.id/download">Unduh aplikasi Android <span aria-hidden="true">↓</span></a>
        </div>
        <p className={styles.note}>Jawaban bersifat bantu, bukan pengganti dokter hewan, ahli nutrisi, atau keputusan resmi. Periksa kembali informasi penting sebelum digunakan.</p>
      </section>
      <footer className={styles.footer}><span>AGROTECH <b>·</b> DATA <b>·</b> AI</span><span>Periksa kembali informasi penting sebelum digunakan.</span></footer>
    </main>
  );
}
