export type NewsItem = { title: string; link: string; published: string; source: string; excerpt?: string };

const newsUrl = "https://news.google.com/rss/search?q=%22Galuh+Adi+Insani%22&hl=id&gl=ID&ceid=ID:id";
const blogUrl = "https://catataninsani.wordpress.com/feed/";
const fallback: NewsItem[] = [];

function decode(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function parseFeed(xml: string, defaultSource: string) {
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => ({
    title: decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
    link: decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ""),
    published: decode(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? ""),
    source: decode(item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? defaultSource),
    excerpt: decode(item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? "")
  })).filter(item => item.title && /^https?:\/\//.test(item.link));
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const responses = await Promise.all([newsUrl, blogUrl].map(url => fetch(url, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) })));
    if (responses.some(response => !response.ok)) throw new Error("News feed unavailable");
    const [google, blog] = await Promise.all(responses.map(response => response.text()));
    return [...parseFeed(google, "Google News"), ...parseFeed(blog, "Catatan Insani")].sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).slice(0, 12);
  } catch (error) {
    console.warn("Pencarian berita gagal.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return fallback;
  }
}
