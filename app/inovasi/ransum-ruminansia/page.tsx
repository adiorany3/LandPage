import type { Metadata } from "next";
import Link from "next/link";

const title = "Ransum Ruminansia: Aplikasi Formulasi Pakan Ternak";
const description = "Ransum Ruminansia karya Galuh Adi Insani membantu formulasi pakan sapi, kambing, dan domba melalui analisis nutrisi, biaya, dan optimasi pemrograman linear.";
const url = "https://www.adioranye.my.id/inovasi/ransum-ruminansia";
const repository = "https://github.com/adiorany3/ransumruminansia";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title, description, url, type: "website", locale: "id_ID", siteName: "Adioranye",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Galuh Adi Insani — Inovasi Peternakan dan AgriTech" }]
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] }
};

const schema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${url}#application`,
  name: "Ransum Ruminansia",
  description,
  url,
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web browser",
  author: {
    "@type": "Person",
    "@id": "https://www.adioranye.my.id/#person",
    name: "Galuh Adi Insani",
    url: "https://www.adioranye.my.id/"
  },
  sameAs: repository,
  featureList: ["Formulasi ransum manual", "Optimasi biaya dengan pemrograman linear", "Analisis nutrisi dan kebutuhan mineral", "Perhitungan biaya ransum"]
};

export default function RansumRuminansiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#main">Lewati ke konten utama</a>
      <header className="site-header">
        <Link className="brand" href="/">Galuh Adi Insani</Link>
        <nav aria-label="Navigasi halaman"><Link href="/#projects">Semua proyek</Link></nav>
      </header>
      <main id="main">
        <article className="section" aria-labelledby="innovation-title">
          <div className="section-heading">
            <p className="eyebrow">Inovasi peternakan • AgriTech</p>
            <h1 id="innovation-title">Ransum Ruminansia: aplikasi formulasi pakan ternak</h1>
            <p className="lead">Karya <Link href="/">Galuh Adi Insani</Link> untuk membantu penyusunan pakan sapi, kambing, dan domba dengan mempertimbangkan kebutuhan nutrisi, bahan pakan, dan biaya.</p>
          </div>
          <div className="workflow-grid">
            <section className="workflow-card">
              <h2>Masalah yang ditangani</h2>
              <p>Perubahan komposisi atau harga bahan dapat memengaruhi keseimbangan nutrisi dan biaya ransum. Pengguna perlu meninjau keduanya sebelum memilih formulasi.</p>
            </section>
            <section className="workflow-card">
              <h2>Fitur dan metode</h2>
              <p>Susun ransum secara manual atau gunakan optimasi pemrograman linear untuk mencari biaya minimum sesuai batasan nutrisi. Tinjau komposisi, analisis nutrisi, kebutuhan mineral, dan biaya hasil formulasi.</p>
            </section>
            <section className="workflow-card">
              <h2>Teknologi aplikasi</h2>
              <p>Python dan Streamlit menyediakan antarmuka aplikasi. Pandas, NumPy, dan SciPy mendukung pengolahan data serta perhitungan ilmiah.</p>
            </section>
            <section className="workflow-card">
              <h2>Pengguna dan batasan</h2>
              <p>Ditujukan bagi mahasiswa, peneliti, peternak, dan praktisi. Hasil bergantung pada kualitas data bahan, harga, dan batasan nutrisi. Validasi bersama ahli nutrisi ternak sebelum penerapan; belum ada klaim dampak lapangan terukur pada halaman ini.</p>
            </section>
          </div>
          <section className="section-heading">
            <h2>Cara mempelajari aplikasi</h2>
            <p>Buka dokumentasi proyek untuk petunjuk penggunaan, kebutuhan perangkat lunak, dan kode sumber. Ringkasan fitur di halaman ini merujuk pada dokumentasi tersebut.</p>
            <div className="hero-actions">
              <a className="btn primary" href={repository} target="_blank" rel="noreferrer">Kode sumber dan dokumentasi</a>
              <Link className="btn ghost" href="/#contact">Kontak pengembang</Link>
            </div>
          </section>
        </article>
      </main>
      <footer className="site-footer"><Link href="/">Kembali ke portofolio Galuh Adi Insani</Link></footer>
    </>
  );
}
