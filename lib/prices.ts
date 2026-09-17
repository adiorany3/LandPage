export const pricesUrl = "https://sunegg.id/harga-komoditas";
export type CommodityPrice = { name: string; level: string; date: string; unit: string; price: string; link: string };

export function parsePrices(html: string): CommodityPrice[] {
  const items = new Map<string, CommodityPrice>();
  // ponytail: parser terbatas pada kartu HTML Sun Egg; ganti dengan API resmi jika tersedia.
  for (const [, slug, body] of html.matchAll(/<a\b[^>]*href="\/harga-komoditas\/([a-z0-9-]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const text = body.replace(/<svg\b[\s\S]*?<\/svg>/g, "").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    const match = text.match(/^(.+?)\s+(Eceran|Grosir|Peternak)\s*·?\s*(\d{1,2}\s+[A-Za-z]+\s+\d{4})\s*·?\s*\/(kg|butir|ekor|liter)\s+Rp\s*([\d.]+(?:,\d+)?)(?:\s|$)/);
    if (!match) continue;
    const [, name, level, date, unit, price] = match;
    items.set(slug, { name, level, date, unit, price, link: `${pricesUrl}/${slug}` });
  }
  return [...items.values()];
}

export async function getCommodityPrices(): Promise<CommodityPrice[]> {
  try {
    const response = await fetch(pricesUrl, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const prices = parsePrices(await response.text());
    if (!prices.length) throw new Error("Format harga tidak dikenali");
    return prices;
  } catch (error) {
    console.warn("Harga komoditas tidak tersedia.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return [];
  }
}
