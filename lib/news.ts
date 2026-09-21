export type NewsItem = { title: string; link: string; published: string; source: string; excerpt?: string };

const newsUrl = "https://news.google.com/rss/search?q=%22Galuh+Adi+Insani%22&hl=id&gl=ID&ceid=ID:id";
const blogUrl = "https://catataninsani.wordpress.com/feed/";
// ponytail: 12 = judul di atas laman; naikkan jika menambah slot di BlogFeed.
const MAX_NEWS = 12;
const MAX_LIVESTOCK = 6;
const FETCH_OPTS = { next: { revalidate: 1800, tags: ["news"] }, signal: AbortSignal.timeout(8000) };

export async function getLivestockNews(): Promise<NewsItem[]> {
  const url = "https://news.google.com/rss/search?q=" + encodeURIComponent("(peternakan OR ternak OR pakan OR kesehatan hewan) when:7d") + "&hl=id&gl=ID&ceid=ID:id";
  try {
    const response = await fetch(url, FETCH_OPTS);
    if (!response.ok) throw new Error("Livestock feed unavailable");
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return parseFeed(await response.text(), "Google News")
      .filter(item => Date.parse(item.published) >= cutoff && Date.parse(item.published) <= Date.now())
      .sort((a, b) => Date.parse(b.published) - Date.parse(a.published))
      .slice(0, MAX_LIVESTOCK);
  } catch (error) {
    console.warn("Berita peternakan gagal dimuat.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return [];
  }
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
    excerpt: decode(item.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? "")
  })).filter(item => item.title && /^https?:\/\//.test(item.link));
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const responses = await Promise.all([newsUrl, blogUrl].map(url => fetch(url, FETCH_OPTS)));
    if (responses.some(response => !response.ok)) throw new Error("News feed unavailable");
    const [google, blog] = await Promise.all(responses.map(response => response.text()));
    return [...parseFeed(google, "Google News"), ...parseFeed(blog, "Catatan Insani")].sort((a, b) => Date.parse(b.published) - Date.parse(a.published)).slice(0, MAX_NEWS);
  } catch (error) {
    console.warn("Pencarian berita gagal.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return [];
  }
}
