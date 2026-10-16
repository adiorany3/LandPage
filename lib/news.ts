export type NewsItem = { title: string; link: string; published: string; source: string; excerpt?: string };

const BLOG_FEED = "https://catataninsani.wordpress.com/feed/";
// Catatan Insani dipakai saat feed gagal dimuat, supaya bagian Catatan tidak pernah kosong.
const FALLBACK_POSTS: NewsItem[] = [
  {
    title: "Membawa rumus penelitian ke aplikasi web",
    link: "https://catataninsani.wordpress.com",
    published: "",
    source: "Catatan Insani",
    excerpt: "Cara menyusun metode ilmiah menjadi alur input, kalkulasi, validasi, dan hasil yang mudah dipahami."
  },
  {
    title: "Mengapa visualisasi penting dalam alat statistik",
    link: "https://catataninsani.wordpress.com",
    published: "",
    source: "Catatan Insani",
    excerpt: "Visual yang tepat membantu pengguna membaca pola, perbedaan, dan konteks hasil numerik."
  },
  {
    title: "Membangun produk AgriTech yang sederhana",
    link: "https://catataninsani.wordpress.com",
    published: "",
    source: "Catatan Insani",
    excerpt: "Produk riset perlu fokus pada keputusan pengguna, bukan sekadar jumlah fitur."
  }
];
const newsUrl = "https://news.google.com/rss/search?q=%22Galuh+Adi+Insani%22&hl=id&gl=ID&ceid=ID:id";
// ponytail: RSS memangkas deskripsi jadi 140 karakter; naikkan jika excerpt di kartu perlu lebih panjang.
const EXCERPT_LENGTH = 140;
// ponytail: 12 = judul di atas laman; naikkan jika menambah slot di BlogFeed.
const MAX_NEWS = 12;
const MAX_LIVESTOCK = 6;
const FETCH_OPTS = { next: { revalidate: 1800, tags: ["news"] }, signal: AbortSignal.timeout(8000) };
const LIVESTOCK_FEED = "https://news.google.com/rss/search?q=";
const LIVESTOCK_TAIL = "&hl=id&gl=ID&ceid=ID:id";
const LIVESTOCK_QUERIES = [
  '(peternakan OR peternak OR "hewan ternak" OR unggas) when:7d',
  '("pakan ternak" OR "kesehatan hewan" OR "penyakit ternak" OR "peternakan sapi" OR "peternakan ayam") when:7d'
];

export async function getLivestockNews(): Promise<NewsItem[]> {
  const now = Date.now();
  const cutoff = now - 7 * 24 * 60 * 60 * 1000;
  try {
    const responses = await Promise.allSettled(
      LIVESTOCK_QUERIES.map(query => fetch(LIVESTOCK_FEED + encodeURIComponent(query) + LIVESTOCK_TAIL, FETCH_OPTS))
    );
    const merged = new Map<string, NewsItem>();    for (const result of responses) {
      if (result.status !== "fulfilled" || !result.value.ok) continue;
      try {
        for (const item of parseFeed(await result.value.text(), "Google News")) {
          const time = Date.parse(item.published);
          if (!Number.isFinite(time) || time < cutoff || time > now) continue;
          const key = item.title.toLocaleLowerCase("id-ID").replace(/\s+-\s+[^-]+$/, "").trim();
          if (!merged.has(key) || Date.parse(merged.get(key)!.published) < time) merged.set(key, { ...item, excerpt: snippet(item.excerpt) });
        }
      } catch {
        continue;
      }
    }
    if (!merged.size && responses.every(result => result.status === "rejected" || !result.value.ok)) throw new Error("Livestock feed unavailable");
    return [...merged.values()]
      .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
      .slice(0, MAX_LIVESTOCK);
  } catch (error) {
    console.warn("Berita peternakan gagal dimuat.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return [];
  }
}


function snippet(value: string) {
  const words = value.split(/\s+/).filter(Boolean);
  const text = words.join(" ");
  return text.length <= EXCERPT_LENGTH ? text : `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…`;
}

function decode(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function parseFeed(xml: string, defaultSource: string) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    title: decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
    link: decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ""),
    published: decode(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? ""),
    source: decode(item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? defaultSource),
    excerpt: snippet(decode(item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? ""))
  })).filter(item => item.title && /^https?:\/\//.test(item.link));
}

export async function getBlogPosts(): Promise<NewsItem[]> {
  try {
    const response = await fetch(BLOG_FEED, FETCH_OPTS);
    if (!response.ok) throw new Error("Blog feed unavailable");
    return parseFeed(await response.text(), "Catatan Insani")
      .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
      .slice(0, 6);
  } catch (error) {
    console.warn("Catatan Insani gagal dimuat.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return FALLBACK_POSTS;
  }
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const responses = await Promise.all([newsUrl, BLOG_FEED].map(url => fetch(url, FETCH_OPTS)));
    if (responses.some(response => !response.ok)) throw new Error("News feed unavailable");
    const [google, blog] = await Promise.all(responses.map(response => response.text()));
    return [...parseFeed(google, "Google News"), ...parseFeed(blog, "Catatan Insani")].sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).slice(0, MAX_NEWS);
  } catch (error) {
    console.warn("Pencarian berita gagal.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return [];
  }
}
