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

export default function BlogFeed({ news }: { news: NewsItem[] }) {
  const items = news.length ? news : posts.map((post) => ({ ...post, link: "https://catataninsani.wordpress.com", published: "", source: "Catatan Insani" }));
  return (
    <section className="section" aria-labelledby="journal-title">
      <RevealOnScroll className="section-heading">
        <p className="eyebrow">{news.length ? "Berita terkait" : "Catatan Insani"}</p>
        <h2 id="journal-title">Catatan tentang riset, data, dan proses membangun produk.</h2>
      </RevealOnScroll>
      <div className="blog-grid">
        {items.map((post) => (
          <RevealOnScroll className="blog-card" key={post.title}>
            <span className="journal-label">Sumber: {post.source}{post.published ? ` · ${new Date(post.published).toLocaleDateString("id-ID")}` : ""}</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt ?? `Berita terbaru terkait Galuh Adi Insani dari ${post.source}.`}</p>
            <a href={post.link} target="_blank" rel="noreferrer">
              {news.length ? "Baca berita ↗" : "Baca catatan ↗"}
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
