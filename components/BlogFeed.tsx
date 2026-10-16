import NewsFilters from "./NewsFilters";
import RevealOnScroll from "./RevealOnScroll";
import { FALLBACK_POSTS, type NewsItem } from "@/lib/news";

export type FeedKind = "journal" | "news" | "livestock";

const LABELS: Record<FeedKind, { eyebrow: string; heading: string; id: string; section: string; empty: string; note?: string }> = {
  journal: {
    eyebrow: "Catatan Insani",
    heading: "Catatan tentang riset, data, dan proses membangun produk.",
    id: "journal-title",
    section: "Catatan Insani",
    empty: "Catatan Insani belum tersedia. Silakan coba lagi nanti."
  },
  news: {
    eyebrow: "Berita terkait",
    heading: "Berita terbaru yang menyebut Galuh Adi Insani.",
    id: "news-title",
    section: "Berita terkait",
    empty: "Berita terkait belum tersedia. Silakan coba lagi nanti."
  },
  livestock: {
    eyebrow: "Berita peternakan",
    heading: "Kabar terbaru dunia peternakan.",
    id: "livestock-title",
    section: "Berita peternakan",
    empty: "Berita peternakan terbaru belum tersedia. Silakan coba lagi nanti.",
    note: "Berita peternakan dari berbagai penerbit dalam tujuh hari terakhir, diurutkan dari yang terbaru. Diperbarui saat halaman diakses setelah 30 menit."
  }
};

export default function BlogFeed({ news, kind = "journal" }: { news: NewsItem[]; kind?: FeedKind }) {
  const labels = LABELS[kind];
  // Catatan Insani dan berita penelusuran selalu punya isi; berita peternakan memang bergantung feed eksternal.
  const items = news.length ? news : kind === "livestock" ? [] : FALLBACK_POSTS;
  const fallback = news.length === 0 && kind !== "livestock";
  return (
    <section className="section" aria-labelledby={labels.id}>
      <RevealOnScroll className={kind === "journal" ? "section-heading journal-note" : "section-heading"}>
        <p className="eyebrow">{labels.eyebrow}</p>
        <h2 id={labels.id}>{labels.heading}</h2>
        {labels.note && <p>{labels.note}</p>}
      </RevealOnScroll>
      {items.length === 0 && <p>{labels.empty}</p>}
      {items.length > 0 && kind === "news" && <NewsFilters items={items} />}
      {items.length > 0 && kind !== "news" && (
        <div className="blog-grid">
          {items.map((post) => {
            const excerpt = post.excerpt || (fallback ? "" : `Berita terbaru terkait Galuh Adi Insani dari ${post.source}.`);
            const published = post.published && !Number.isNaN(Date.parse(post.published)) ? new Date(post.published).toISOString() : undefined;
            const schema = {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              ...(excerpt ? { description: excerpt } : {}),
              url: post.link,
              ...(published ? { datePublished: published } : {}),
              isPartOf: { "@type": "WebPage", "@id": "https://www.adioranye.my.id/#articles" },
              articleSection: labels.section,
              inLanguage: "id-ID"
            };
            return (
              <RevealOnScroll className="blog-card" key={`${post.title}-${post.link}`}>
                <article>
                  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
                  <span className="journal-label">
                    Sumber: {post.source}
                    {published && <> · <time dateTime={published}>{new Date(published).toLocaleDateString("id-ID")}</time></>}
                  </span>
                  <h3><a href={post.link} target="_blank" rel="noopener noreferrer">{post.title}</a></h3>
                  {excerpt && <p>{excerpt}</p>}
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {fallback ? "Baca catatan ↗" : "Baca berita ↗"}
                  </a>
                </article>
              </RevealOnScroll>
            );
          })}
        </div>
      )}
    </section>
  );
}
