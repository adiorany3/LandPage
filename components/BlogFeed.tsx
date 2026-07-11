import RevealOnScroll from "./RevealOnScroll";

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

export default function BlogFeed() {
  return (
    <section className="section" aria-labelledby="journal-title">
      <RevealOnScroll className="section-heading">
        <p className="eyebrow">Catatan Insani</p>
        <h2 id="journal-title">Catatan tentang riset, data, dan proses membangun produk.</h2>
      </RevealOnScroll>
      <div className="blog-grid">
        {posts.map((post) => (
          <RevealOnScroll className="blog-card" key={post.title}>
            <span className="journal-label">Journal</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <a href="https://catataninsani.wordpress.com" target="_blank" rel="noreferrer">
              Baca catatan ↗
            </a>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
