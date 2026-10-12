export type PriceRecord = { product: string; level: string; date: string; price: number; unit: string; source: string };

// ponytail: sumber hanya menyediakan jendela riwayat grafik; butuh penyimpanan persisten untuk arsip tanpa batas.
export function parseCommodityHistory(html: string, product: string, level: string, unit: string, source: string): PriceRecord[] {
  const match = html.match(/initialChartData\\?":\s*(\[[\s\S]*?\])[,}]/);
  if (!match) return [];
  try {
    const points: unknown = JSON.parse(match[1].replace(/\\"/g, '"'));
    if (!Array.isArray(points)) return [];
    const records = new Map<string, PriceRecord>();
    for (const point of points) {
      if (!point || typeof point !== "object") continue;
      const { date, price } = point;
      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(Date.parse(`${date}T00:00:00Z`)) ||
        new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date ||
        typeof price !== "number" || !Number.isFinite(price) || price <= 0) continue;
      records.set(date, { product, level, date, price, unit, source });
    }
    return [...records.values()].sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
}

