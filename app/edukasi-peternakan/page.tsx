import type { Metadata } from "next";
import Link from "next/link";
import BlogFeed from "@/components/BlogFeed";
import { educationModules } from "@/data/education";
import { getLivestockNews } from "@/lib/news";
import styles from "./page.module.css";

export const revalidate = 1800;

const title = "Edukasi Peternakan: Pakan, Kesehatan, dan Data";
const description =
  "Ringkasan materi edukasi peternakan tentang dasar nutrisi ruminansia, kesehatan ternak, dan pembacaan data peternakan untuk mahasiswa, peternak, dan penyuluh lapangan.";
const url = "https://www.adioranye.my.id/edukasi-peternakan";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    locale: "id_ID",
    siteName: "Adioranye",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Galuh Adi Insani - Edukasi peternakan"
      }
    ]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
};

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${url}#collection`,
  name: title,
  description,
  url,
  inLanguage: "id-ID",
  isPartOf: { "@id": "https://www.adioranye.my.id/#website" },
  author: {
    "@type": "Person",
    "@id": "https://www.adioranye.my.id/#person",
    name: "Galuh Adi Insani",
    url: "https://www.adioranye.my.id/"
  },
  hasPart: educationModules.map((module, index) => ({
    "@type": "TechArticle",
    position: index + 1,
    name: module.title,
    description: module.summary,
    url: `${url}#${module.slug}`
  }))
};

export default async function EdukasiPeternakanPage() {
  const livestockNews = await getLivestockNews();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <a className="skip-link" href="#main">
        Lewati ke konten utama
      </a>
      <header className="site-header">
        <Link className="brand" href="/">Galuh Adi Insani</Link>
        <nav aria-label="Navigasi halaman">
          <Link href="/">&larr; Kembali ke beranda</Link>
        </nav>
      </header>
      <main id="main">
        <article className="section" aria-labelledby="education-title">
          <div className="section-heading">
            <p className="eyebrow">Edukasi - Peternakan</p>
            <h1 id="education-title">Edukasi peternakan: pakan, kesehatan, dan data</h1>
            <p className="lead">
              Ringkasan konseptual untuk mahasiswa, peternak, dan penyuluh lapangan. Materi ini
              membantu memahami dasar peternakan sebelum masuk ke formulasi ransum atau protokol
              kesehatan. Artikel terbaru bidang peternakan dimuat otomatis di bawah.
            </p>
          </div>

          <nav className={styles.index} aria-label="Daftar modul">
            <span className={styles.indexTitle}>Modul</span>
            {educationModules.map((module) => (
              <a key={module.slug} href={`#${module.slug}`}>
                {module.field}
                <small>{module.title}</small>
              </a>
            ))}
          </nav>

          <div className={styles.moduleGrid}>
            {educationModules.map((module) => (
              <section key={module.slug} className={styles.module} id={module.slug} aria-labelledby={`${module.slug}-title`}>
                <header>
                  <span className={styles.field}>{module.field}</span>
                  <h2 id={`${module.slug}-title`}>{module.title}</h2>
                  <p className={styles.summary}>{module.summary}</p>
                  <p className={styles.audience}>
                    <strong>Sasaran:</strong> {module.audience}
                  </p>
                </header>
                <ol className={styles.lessons}>
                  {module.lessons.map((lesson, index) => (
                    <li className={styles.lesson} key={lesson.title}>
                      <h3>
                        {index + 1}. {lesson.title}
                      </h3>
                      <ul className={styles.points}>
                        {lesson.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>

          <BlogFeed news={livestockNews} livestock />

          <section className="section-heading">
            <h2>Batasan penggunaan materi</h2>
            <p>
              Materi ini bersifat konseptual dan tidak menggantikan pemeriksaan dokter hewan,
              penilaian ahli nutrisi ternak, maupun standar pakan resmi untuk spesies dan tahap
              produksi tertentu.
            </p>
            <div className="hero-actions">
              <Link className="btn primary" href="/inovasi/ransum-ruminansia">
                Aplikasi ransum ruminansia
              </Link>
              <Link className="btn ghost" href="/harga-peternakan">
                Harga komoditas peternakan
              </Link>
            </div>
          </section>
        </article>
      </main>
      <footer className="site-footer">
        <Link href="/">Kembali ke portofolio Galuh Adi Insani</Link>
      </footer>
    </>
  );
}
