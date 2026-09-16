import Image from "next/image";
import BlogFeed from "@/components/BlogFeed";
import ProjectShowcase from "@/components/ProjectShowcase";
import RevealOnScroll from "@/components/RevealOnScroll";
import ThemeAndNav from "@/components/ThemeAndNav";
import { links, navItems, stack, stats, workflow } from "@/data/content";
import { getGitHubPortfolio } from "@/lib/github";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Galuh Adi Insani",
  alternateName: "adiorany3",
  url: "https://adioranye.vercel.app/",
  sameAs: [
    "https://github.com/adiorany3",
    "https://catataninsani.wordpress.com",
    "https://adioranye.streamlit.app/"
  ],
  jobTitle: "AgriTech & Scientific Computing Developer",
  knowsAbout: ["AgriTech", "Scientific Computing", "Statistical Analysis", "Streamlit", "Next.js"]
};

const infographicSteps = [
  { number: "01", label: "Masalah", detail: "Rumus, data, dan kebutuhan lapangan", icon: "?" },
  { number: "02", label: "Metode", detail: "Asumsi, satuan, dan aturan validasi", icon: "∑" },
  { number: "03", label: "Engine", detail: "Kalkulasi, optimasi, dan pengujian", icon: "{ }" },
  { number: "04", label: "Interface", detail: "Input, visual, dan laporan", icon: "▦" },
  { number: "05", label: "Keputusan", detail: "Insight yang dapat langsung dipakai", icon: "✓" }
];

export const revalidate = 3600;

export default async function HomePage() {
  const year = new Date().getFullYear();
  const portfolio = await getGitHubPortfolio();
  const portfolioStats = stats.map((item, index) =>
    index === 0 ? { ...item, value: String(portfolio.totalRepositories) } : item
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <a className="skip-link" href="#main">Lewati ke konten utama</a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Kembali ke bagian atas">
          <Image src="/assets/avatar.svg" alt="Monogram Galuh Adi Insani" width={120} height={120} />
          <span>
            <strong>Galuh Adi Insani</strong>
            <small>@adiorany3</small>
          </span>
        </a>
        <nav className="nav" aria-label="Navigasi utama">
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <ThemeAndNav />
      </header>

      <main id="main">
        <section className="hero" id="overview" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">AgriTech • Statistika • Komputasi Ilmiah</p>
            <h1 id="hero-title">Aplikasi riset untuk memahami data dan mendukung keputusan.</h1>
            <p className="lead">
              Saya membangun aplikasi web untuk perhitungan peternakan, analisis statistik,
              dan pengolahan data penelitian. Dirancang untuk peneliti, mahasiswa, peternak,
              dan praktisi lapangan.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#studi-kasus">Baca studi kasus</a>
              <a className="btn ghost" href="#projects">
                Lihat proyek
              </a>
            </div>
            <div className="stats" aria-label="Ringkasan portfolio">
              {portfolioStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Ilustrasi jaringan IoT pertanian">
            <span className="product-pill">AgriTech / IoT</span>
            <Image
              src="/assets/iot-network.svg"
              alt="Ilustrasi IoT: sensor suhu, kelembapan, dan kondisi tanah terhubung melalui gateway ke analisis data dan dasbor. Bukan data sensor nyata."
              width={760}
              height={620}
              priority
            />
            <div className="glass-card avatar-card">
              <Image src="/assets/avatar.svg" alt="Avatar Galuh Adi Insani" width={120} height={120} />
              <div><strong>Galuh Adi</strong><span>Research Tools Builder</span></div>
            </div>
            <div className="floating-tags" aria-hidden="true">
              <span>Formulation</span><span>Analysis</span><span>Export</span>
            </div>
          </div>
        </section>

        <section className="section intro-section" id="studi-kasus" aria-labelledby="case-study-title">
          <RevealOnScroll className="section-heading">
            <p className="eyebrow">Studi kasus • AgriTech</p>
            <h2 id="case-study-title">Menyusun ransum dengan kebutuhan nutrisi dan biaya yang jelas.</h2>
            <p>
              Ransum Ruminansia membantu pengguna menyusun pakan sapi, kambing, dan domba.
              Ringkasan ini mengacu pada fitur yang dijelaskan dalam dokumentasi proyek.
            </p>
          </RevealOnScroll>
          <div className="workflow-grid">
            <RevealOnScroll className="workflow-card">
              <span>01</span><h3>Masalah</h3>
              <p>Komposisi pakan perlu mempertimbangkan kebutuhan nutrisi ternak, ketersediaan bahan, dan biaya. Perubahan satu bahan dapat memengaruhi keseimbangan ransum.</p>
            </RevealOnScroll>
            <RevealOnScroll className="workflow-card">
              <span>02</span><h3>Pendekatan</h3>
              <p>Pengguna memilih bahan dan menyusun ransum secara manual, atau memakai optimasi pemrograman linear untuk mencari biaya minimum sesuai batasan nutrisi.</p>
            </RevealOnScroll>
            <RevealOnScroll className="workflow-card">
              <span>03</span><h3>Teknologi</h3>
              <p>Python dan Streamlit menyediakan antarmuka aplikasi. Pandas, NumPy, dan SciPy mendukung pengolahan data serta perhitungan.</p>
            </RevealOnScroll>
            <RevealOnScroll className="workflow-card">
              <span>04</span><h3>Keluaran</h3>
              <p>Komposisi ransum, analisis nutrisi, perhitungan biaya, dan evaluasi kebutuhan mineral membantu pengguna meninjau formulasi. Dampak di lapangan belum disajikan sebagai hasil terukur.</p>
            </RevealOnScroll>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="https://github.com/adiorany3/ransumruminansia" target="_blank" rel="noreferrer">Lihat kode dan dokumentasi</a>
            <a className="btn ghost" href="#projects">Jelajahi proyek lainnya</a>
          </div>
        </section>

        <section className="section github-section" id="github" aria-labelledby="github-title">
          <RevealOnScroll className="profile-card">
            <div className="profile-main">
              <Image src="/assets/avatar.svg" alt="Monogram Galuh Adi Insani" width={120} height={120} />
              <div>
                <p className="eyebrow">Profil GitHub</p>
                <h2 id="github-title">Perangkat lunak untuk pertanian dan penelitian.</h2>
                <h3>Galuh Adi Insani</h3>
                <span>@adiorany3</span>
                <p>
                  Pengembang dari Indonesia dengan fokus pada AgriTech, analisis statistik,
                  aplikasi web, komputasi ilmiah, dan perangkat lunak sumber terbuka.
                </p>
                <div className="profile-links">
                  {links.slice(0, 3).map((link) => (
                    <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="profile-metrics">
              <div><strong>{portfolio.totalRepositories}</strong><span>Public repos</span></div>
              <div><strong>6</strong><span>Featured products</span></div>
              <div><strong>9</strong><span>Main technologies</span></div>
              <div><strong>1</strong><span>Clear product focus</span></div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="section infographic-section" id="infografis" aria-labelledby="infographic-title">
          <RevealOnScroll className="section-heading infographic-heading">
            <p className="eyebrow">Research Product Pipeline</p>
            <h2 id="infographic-title">Dari persoalan ilmiah menuju keputusan yang bisa dipakai.</h2>
            <p>
              Infografis ini menunjukkan jalur kerja utama. Setiap tahap menghasilkan keluaran
              yang menjadi dasar bagi tahap berikutnya.
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="pipeline-card">
            <div className="pipeline-topline">
              <span>Scientific method</span>
              <span>Product engineering</span>
            </div>
            <div className="pipeline" role="list" aria-label="Alur pengembangan produk riset">
              {infographicSteps.map((item, index) => (
                <div className="pipeline-item" role="listitem" key={item.number}>
                  <div className="pipeline-number">{item.number}</div>
                  <div className="pipeline-icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                  {index < infographicSteps.length - 1 && <span className="pipeline-arrow" aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
            <div className="pipeline-outcomes">
              <div><strong>Input terstruktur</strong><span>Data dan satuan tervalidasi</span></div>
              <div><strong>Proses transparan</strong><span>Metode dapat ditelusuri</span></div>
              <div><strong>Output operasional</strong><span>Hasil mudah dibaca dan diekspor</span></div>
            </div>
          </RevealOnScroll>
        </section>

        <ProjectShowcase
          projects={portfolio.projects}
          totalRepositories={portfolio.totalRepositories}
          source={portfolio.source}
        />

        <section className="section workflow-section" id="process" aria-labelledby="process-title">
          <RevealOnScroll className="section-heading">
            <p className="eyebrow">Workflow</p>
            <h2 id="process-title">Dari rumus akademik ke produk yang bisa dipakai.</h2>
          </RevealOnScroll>
          <div className="workflow-grid">
            {workflow.map((item) => (
              <RevealOnScroll className="workflow-card" key={item.step}>
                <span>{item.step}</span><h3>{item.title}</h3><p>{item.description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="section stack-section" aria-labelledby="stack-title">
          <RevealOnScroll className="stack-card">
            <p className="eyebrow">Main Stack</p>
            <h2 id="stack-title">Scientific computing bertemu product engineering.</h2>
            <p>Stack mendukung kalkulasi ilmiah, prototyping cepat, API development, dan landing page modern.</p>
            <div className="tag-list large">{stack.map((item) => <span key={item}>{item}</span>)}</div>
          </RevealOnScroll>
        </section>

        <BlogFeed />

        <section className="section" id="chat" aria-labelledby="chat-title">
          <div className="section-heading">
            <p className="eyebrow">Asisten AI</p>
            <h2 id="chat-title">Adioranye AI</h2>
            <p>Tanyakan apa saja yang ingin kamu ketahui, biarkan Adioranye AI yang akan mencari jawabannya.</p>
          </div>
          <iframe
            src="https://udify.app/chatbot/s8pa4tyZ2EdkN1Bf"
            title="Aplikasi obrolan AI"
            style={{ width: "100%", height: "100%", minHeight: 700, border: 0 }}
            allow="microphone;clipboard-write"
            loading="lazy"
          />
          <p>
            <a href="https://udify.app/chatbot/s8pa4tyZ2EdkN1Bf" target="_blank" rel="noreferrer">
              Buka obrolan di tab baru
            </a>
          </p>
        </section>

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <RevealOnScroll className="contact-card">
            <p className="eyebrow">Connect</p>
            <h2 id="contact-title">Bangun research tool yang terlihat serius dan memang dipakai.</h2>
            <p>Cocok untuk kolaborasi open-source, aplikasi riset, dashboard statistik, produk AgriTech, dan web app berbasis data.</p>
            <div className="profile-links">
              {links.map((link) => <a href={link.href} key={link.href} target="_blank" rel="noreferrer">{link.label}</a>)}
            </div>
          </RevealOnScroll>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {year} Galuh Adi Insani.</span>
        <a href="#top">Kembali ke atas ↑</a>
      </footer>
    </>
  );
}
