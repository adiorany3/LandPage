import RevealOnScroll from "./RevealOnScroll";
import type { NewsItem } from "@/lib/news";

const posts = [
  {
    title: "Membawa rumus penelitian ke aplikasi web",
    excerpt: "Cara menyusun metode ilmiah menjadi alur input, kalkulasi, validasi, dan hasil yang mudah dipahami."
  },
  {
    title: "Mengapa visualisasi penting dalam alat statistik",
    excerpt: "Visual yang tepat membantu pengguna membaca pola, perbedaan, dan konteks hasil numerik."
  },
  {
    title: "Membangun produk AgriTech yang sederhana",
    excerpt: "Produk riset perlu fokus pada keputusan pengguna, bukan sekadar jumlah fitur."
  }
];

export default function BlogFeed({ news, livestock = false }: { news: NewsItem[]; livestock?: boolean }) {
  const titleId = livestock ? "livestock-title" : "journal-title";
  const items = news.length || livestock ? news : posts.map((post) => ({ ...post, link: "https://catataninsani.wordpress.com", published: "", source: "Catatan Insani" }));
  const sectionName = livestock ? "Berita peternakan" : "Catatan tentang riset, data, dan proses membangun produk";
  return (
    <section className="section" aria-labelledby={titleId}>
      <RevealOnScroll className="section-heading">
        <p className="eyebrow">{livestock ? "Berita peternakan" : news.length ? "Berita terkait" : "Catatan Insani"}</p>
        <h2 id={titleId}>{livestock ? "Kabar terbaru dunia peternakan." : "Catatan tentang riset, data, dan proses membangun produk."}</h2>
        {livestock && <p>Berita tujuh hari terakhir. Pembaruan otomatis setiap 30 menit saat halaman diakses.</p>}
      </RevealOnScroll>
      {livestock && !items.length && <p>Berita peternakan terbaru belum tersedia. Silakan coba lagi nanti.</p>}
      <div className="blog-grid">
        {items.map((post) => {
          const excerpt = post.excerpt || `Berita terbaru ${livestock ? "bidang peternakan" : "terkait Galuh Adi Insani"} dari ${post.source}.`;
          const published = post.published && !Number.isNaN(Date.parse(post.published)) ? new Date(post.published).toISOString() : undefined;
          const schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: excerpt,
            url: post.link,
            ...(published ? { datePublished: published, dateModified: published } : {}),
            author: { "@type": "Person", "@id": "https://www.adioranye.my.id/#person", name: "Galuh Adi Insani" },
            publisher: { "@type": "Person", "@id": "https://www.adioranye.my.id/#person", name: "Galuh Adi Insani" },
            isPartOf: { "@type": "WebSite", name: "Adioranye", url: "https://www.adioranye.my.id/" },
            articleSection: sectionName,
            inLanguage: "id-ID"
          };
          return (
            <RevealOnScroll className="blog-card" key={`${post.title}-${post.link}`}>
              <article>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
                <span className="journal-label">Sumber: {post.source}{published ? <> · <time dateTime={published}>{new Date(published).toLocaleDateString("id-ID")}</time></> : ""}</span>
                <h3><a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a></h3>
                <p>{excerpt}</p>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  {news.length ? "Baca berita ↗" : "Baca catatan ↗"}
                </a>
              </article>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
