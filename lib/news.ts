export type NewsItem = { title: string; link: string; published: string; source: string; excerpt?: string };

const newsUrl = "https://news.google.com/rss/search?q=%22Galuh+Adi+Insani%22&hl=id&gl=ID&ceid=ID:id";
const fallback: NewsItem[] = [];

function decode(value: string) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>|<[^>]+>/g, "$1").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

export async function getNews(): Promise<NewsItem[]> {
  try {
    const response = await fetch(newsUrl, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`News request failed: ${response.status}`);
    const xml = await response.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6).map(([, item]) => ({
      title: decode(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? ""),
      link: decode(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? ""),
      published: decode(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? ""),
      source: decode(item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "Berita")
    })).filter(item => item.title && /^https?:\/\//.test(item.link));
  } catch (error) {
    console.warn("Pencarian berita gagal.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return fallback;
  }
}
