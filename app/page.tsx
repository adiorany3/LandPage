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
            <p className="eyebrow">AgriTech • Statistics • Scientific Computing</p>
            <h1 id="hero-title">Produk riset yang jelas, terukur, dan nyaman digunakan.</h1>
            <p className="lead">
              Saya membangun aplikasi web yang mengubah rumus peternakan, workflow statistik,
              dan data penelitian menjadi produk digital untuk peneliti, mahasiswa, peternak,
              dan praktisi lapangan.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#projects">Lihat showcase</a>
              <a className="btn ghost" href="https://github.com/adiorany3" target="_blank" rel="noreferrer">
                Buka GitHub
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

          <div className="hero-visual" aria-label="Pratinjau dashboard nutrisi">
            <span className="product-pill">Ruminant Nutrition OS</span>
            <Image
              src="/assets/hero-product.svg"
              alt="Dashboard nutrisi, biaya, dan rekomendasi ransum"
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

        <RevealOnScroll className="section intro-section">
          <div className="section-heading">
            <p className="eyebrow">Professional direction</p>
            <h2>Visual dan teks bergerak ke tujuan yang sama.</h2>
            <p>
              Setiap bagian menjelaskan fungsi produk. Pengunjung dapat memahami konteks,
              metode, dan hasil tanpa membuka setiap repository.
            </p>
          </div>
        </RevealOnScroll>

        <section className="section github-section" id="github" aria-labelledby="github-title">
          <RevealOnScroll className="profile-card">
            <div className="profile-main">
              <Image src="/assets/avatar.svg" alt="Monogram Galuh Adi Insani" width={120} height={120} />
              <div>
                <p className="eyebrow">GitHub Profile</p>
                <h2 id="github-title">Profil developer disusun seperti product brief.</h2>
                <h3>Galuh Adi Insani</h3>
                <span>@adiorany3</span>
                <p>
                  Developer dari Indonesia yang fokus pada software AgriTech, statistical analysis,
                  web apps, scientific computing, dan open-source tooling.
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
