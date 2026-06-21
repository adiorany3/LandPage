import BlogFeed from "@/components/BlogFeed";
import RevealOnScroll from "@/components/RevealOnScroll";
import ThemeAndNav from "@/components/ThemeAndNav";
import { links, navItems, products, stack, stats, workflow } from "@/data/content";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Galuh Adi Insani",
  alternateName: "adiorany3",
  url: "https://adioranye.vercel.app/",
  sameAs: ["https://github.com/adiorany3", "https://catataninsani.wordpress.com", "https://adioranye.streamlit.app/"],
  jobTitle: "AgriTech & Scientific Computing Developer",
  knowsAbout: ["AgriTech", "Scientific Computing", "Statistical Analysis", "Streamlit", "FastAPI", "Next.js"]
};

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <a className="skip-link" href="#main">
        Lewati ke konten utama
      </a>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />

      <header className="site-header" id="top">
        <a className="brand" href="#top" aria-label="Kembali ke bagian atas">
          <img src="/assets/avatar.svg" alt="Monogram Galuh Adi Insani" />
          <span>
            <strong>Galuh Adi Insani</strong>
            <small>@adiorany3</small>
          </span>
        </a>

        <nav className="nav" aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <ThemeAndNav />
      </header>

      <main id="main">
        <section className="hero" id="overview" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">AgriTech • Statistics • Scientific Computing</p>
            <h1 id="hero-title">Portfolio produk riset yang rapi, jelas, dan terasa premium.</h1>
            <p className="lead">
              Saya membangun aplikasi web untuk mengubah rumus peternakan, workflow statistik, dan data penelitian menjadi produk digital yang mudah dipakai oleh peneliti, mahasiswa, peternak, dan praktisi lapangan. Sehingga akan mendapatkan insight dengan mudah dan proses yang cepat.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#projects">
                Lihat showcase
              </a>
              <a className="btn ghost" href="https://github.com/adiorany3" target="_blank" rel="noreferrer">
                Buka GitHub
              </a>
            </div>

            <div className="stats" aria-label="Ringkasan portfolio">
              {stats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Ruminant Nutrition OS live preview">
            <span className="product-pill">Ruminant Nutrition OS</span>
            <img src="/assets/hero-product.svg" alt="Dashboard ransum ruminansia dengan panel nutrisi, biaya, dan rekomendasi" />
            <div className="glass-card avatar-card">
              <img src="/assets/avatar.svg" alt="Avatar Galuh Adi Insani" />
              <div>
                <strong>Galuh Adi</strong>
                <span>Research Tools Builder</span>
              </div>
            </div>
            <div className="floating-tags" aria-hidden="true">
              <span>Formulation</span>
              <span>Analysis</span>
              <span>Export</span>
            </div>
          </div>
        </section>

        <RevealOnScroll className="section intro-section">
          <div className="section-heading">
            <p className="eyebrow">Professional direction</p>
            <h2>Visual dan teks dibuat sinkron: tiap gambar menjelaskan isi produknya.</h2>
            <p>
              Setiap kartu project sekarang punya ilustrasi yang nyambung dengan fungsinya: ransum memakai dashboard nutrisi, karkas memakai estimasi yield, ANOVA memakai chart, dan T-Test memakai perbandingan sampel. Jadi tampilannya bukan tempelan dekorasi doang.
            </p>
          </div>
        </RevealOnScroll>

        <section className="section github-section" id="github" aria-labelledby="github-title">
          <RevealOnScroll className="profile-card">
            <div className="profile-main">
              <img src="/assets/avatar.svg" alt="Monogram Galuh Adi Insani" />
              <div>
                <p className="eyebrow">GitHub Profile</p>
                <h2 id="github-title">Profil developer dibuat seperti product brief, bukan biodata kosong.</h2>
                <h3>Galuh Adi Insani</h3>
                <span>@adiorany3</span>
                <p>
                  Developer dari Indonesia yang fokus pada software AgriTech, statistical analysis, web apps, scientific computing, dan open-source tooling.
                </p>
                <div className="profile-links">
                  {links.slice(0, 3).map((link) => (
                    <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="profile-metrics">
              <div><strong>46</strong><span>Public repos</span></div>
              <div><strong>12</strong><span>GitHub audience</span></div>
              <div><strong>10</strong><span>Open-source network</span></div>
              <div><strong>2</strong><span>YOLO & Pull Shark</span></div>
            </div>
          </RevealOnScroll>
        </section>

        <section className="section" id="projects" aria-labelledby="projects-title">
          <RevealOnScroll className="section-heading">
            <p className="eyebrow">Featured Products</p>
            <h2 id="projects-title">Project GitHub dirapikan sebagai katalog produk.</h2>
            <p>
              Visual, judul, deskripsi, dan tag dibuat satu arah supaya pengunjung langsung paham fungsi tiap project tanpa harus membuka repository satu-satu.
            </p>
          </RevealOnScroll>

          <div className="project-grid">
            {products.map((product) => (
              <RevealOnScroll className="project-card" key={product.name}>
                <img src={product.image} alt={product.alt} />
                <div className="project-body">
                  <p className="eyebrow">{product.eyebrow}</p>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="tag-list">
                    {product.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={product.repo} target="_blank" rel="noreferrer">
                    Repository →
                  </a>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="section workflow-section" id="process" aria-labelledby="process-title">
          <RevealOnScroll className="section-heading">
            <p className="eyebrow">Workflow</p>
            <h2 id="process-title">Dari rumus akademik ke produk yang bisa dipakai.</h2>
          </RevealOnScroll>
          <div className="workflow-grid">
            {workflow.map((item) => (
              <RevealOnScroll className="workflow-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="section stack-section" aria-labelledby="stack-title">
          <RevealOnScroll className="stack-card">
            <p className="eyebrow">Main Stack</p>
            <h2 id="stack-title">Python, TypeScript, Next.js, FastAPI, Streamlit</h2>
            <p>
              Stack disusun untuk kombinasi scientific computing, prototyping cepat, API development, dan product landing page modern.
            </p>
            <div className="tag-list large">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </RevealOnScroll>
        </section>

        <BlogFeed />

        <section className="section contact-section" id="contact" aria-labelledby="contact-title">
          <RevealOnScroll className="contact-card">
            <p className="eyebrow">Connect</p>
            <h2 id="contact-title">Bangun research tool yang terlihat serius dan memang kepakai.</h2>
            <p>
              Cocok untuk kolaborasi open-source, aplikasi riset, dashboard statistik, AgriTech product, dan pengembangan web app berbasis data.
            </p>
            <div className="hero-actions">
              {links.map((link) => (
                <a key={link.href} className="btn ghost" href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </RevealOnScroll>
        </section>
      </main>

      <footer className="site-footer">
        <span>© {year} Galuh Adi Insani. Glass Apple product portfolio.</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
