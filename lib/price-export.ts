import { eggArchiveUrl, getEggArchive } from "./egg-price";
import { getCommodityPrices, pricesUrl } from "./prices";
import { parseCommodityHistory, matchesLatestPrice, type PriceRecord } from "./price-history";

export async function getPriceHistory(): Promise<PriceRecord[]> {
  const [commodities, eggs] = await Promise.all([getCommodityPrices(), getEggArchive()]);
  const historicalEggs: PriceRecord[] = eggs.map(item => ({
    product: "Telur Ayam Ras — referensi pasar", level: "Rata-rata nasional", date: item.date,
    price: Number(item.price.replaceAll(".", "")), unit: "kg", source: `${eggArchiveUrl}/${item.date}`,
  }));
  const histories = await Promise.all(commodities.filter(item => !item.fallback && item.link.startsWith(`${pricesUrl}/`)).map(async item => {
    try {
      const response = await fetch(item.link, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) });
      if (!response.ok) return [];
      const history = parseCommodityHistory(await response.text(), item.name, item.level, item.unit, item.link);
      return matchesLatestPrice(item, history) ? history : [];
    } catch {
      return [];
    }
  }));
  return [...historicalEggs, ...histories.flat()];
}
