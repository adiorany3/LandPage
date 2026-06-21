"use client";

import { useEffect, useState } from "react";

type Post = {
  title: string;
  link: string;
  date: string;
  excerpt: string;
};

const fallbackPosts: Post[] = [
  {
    date: "2026-05-21",
    title: "Nutrisi Ruminansia: Kunci Kesehatan, Produksi, dan Efisiensi Pakan",
    excerpt:
      "Ringkasan tentang pengelolaan pakan ruminansia, kesehatan rumen, produksi, efisiensi pakan, dan keseimbangan nutrisi ternak.",
    link: "https://catataninsani.wordpress.com/"
  },
  {
    date: "2026-05-03",
    title: "Inovasi Peternakan Ayam Broiler Modern",
    excerpt:
      "Membahas precision livestock farming, sensor, kamera, software, efisiensi pakan, welfare, dan peluang modernisasi broiler.",
    link: "https://catataninsani.wordpress.com/"
  },
  {
    date: "2026-02-04",
    title: "Peternakan Modern di Indonesia: Inovasi, Teknologi, dan Peluang Pengembangan",
    excerpt:
      "Ulasan transformasi peternakan Indonesia, teknologi IoT, AI, otomatisasi kandang, pakan berkelanjutan, dan peluang pengembangan.",
    link: "https://catataninsani.wordpress.com/"
  }
];

const stripHtml = (html = "") => html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Artikel terbaru";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
};

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [status, setStatus] = useState("Fallback SEO aktif");

  useEffect(() => {
    let cancelled = false;

    async function loadPosts() {
      try {
        setStatus("Mengambil artikel terbaru dari Catatan Insani…");
        const response = await fetch(
          "https://public-api.wordpress.com/wp/v2/sites/catataninsani.wordpress.com/posts?per_page=3&_fields=date,link,title,excerpt",
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response");

        const normalized = data.slice(0, 3).map((post: any) => ({
          date: post.date,
          link: post.link || "https://catataninsani.wordpress.com/",
          title: stripHtml(post.title?.rendered || post.title || "Artikel Catatan Insani"),
          excerpt: stripHtml(post.excerpt?.rendered || post.excerpt || "Ringkasan artikel terbaru.").slice(0, 170)
        }));

        if (!cancelled && normalized.length) {
          setPosts(normalized);
          setStatus("Update otomatis aktif · WordPress API");
        }
      } catch {
        if (!cancelled) setStatus("Fallback SEO aktif · API belum terbaca di browser ini");
      }
    }

    loadPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section" id="insights" aria-labelledby="insights-title">
      <div className="section-heading reveal visible">
        <p className="eyebrow">Live knowledge feed</p>
        <h2 id="insights-title">Ringkasan web terbaru dari Catatan Insani.</h2>
        <p>
          Section ini memakai fallback SEO lalu memperbarui kartu artikel dari WordPress REST API saat website dibuka.
        </p>
      </div>

      <div className="blog-console">
        <span>fetch-catatan-insani.ts</span>
        <code>{'const sources = ["wp.com API", "wp-json", "rss"];'}</code>
        <code>{'for (const source of sources) renderSummary(posts);'}</code>
      </div>

      <div className="blog-status">{status}</div>
      <div className="blog-grid">
        {posts.map((post) => (
          <article className="blog-card" key={`${post.date}-${post.title}`}>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <a href={post.link} target="_blank" rel="noreferrer">
              Baca ringkasan →
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
