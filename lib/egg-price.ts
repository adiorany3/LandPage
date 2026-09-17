export const eggPriceUrl = "https://sunegg.id/harga-telur-ayam-ras-hari-ini";
export const eggArchiveUrl = "https://sunegg.id/harga-telur/arsip";

export function parseEggArchive(html: string) {
  const entries = new Map<string, { date: string; price: string }>();
  for (const [, date, body] of html.matchAll(/<a\b[^>]*href="\/harga-telur\/arsip\/(\d{4}-\d{2}-\d{2})"[^>]*>([\s\S]*?)<\/a>/g)) {
    const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const price = text.match(/Rp\s+([\d.]+)\s+Rata-rata nasional/)?.[1];
    const parsedDate = new Date(date);
    if (!price || !Number.isFinite(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date || !/^[1-9]\d{0,2}(?:\.\d{3})*$/.test(price)) continue;
    entries.set(date, { date, price });
  }
  return [...entries.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getEggArchive() {
  try {
    const response = await fetch(eggArchiveUrl, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const entries = parseEggArchive(await response.text());
    if (!entries.length) throw new Error("Format arsip tidak dikenali");
    return entries;
  } catch (error) {
    console.warn("Arsip telur gagal dimuat.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return [];
  }
}

export function parseEggPrice(html: string) {
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? html;
  const date = main.match(/<time\b[^>]*datetime="(\d{4}-\d{2}-\d{2})T/i)?.[1];
  // ponytail: hanya ringkasan nasional HTML Sun Egg; gunakan API resmi jika tersedia.
  const text = main.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  const price = text.match(/Rp\s+([\d.]+)\s*\/\s*kg\s+[+−-]?[\d.,]+%\s+vs kemarin\s+Rata-rata nasional/i)?.[1];
  if (!date || !price || !Number.isFinite(Date.parse(date)) || Number(price.replaceAll(".", "")) <= 0) throw new Error("Format ringkasan harga telur tidak dikenali");
  return { price, date, fallback: false };
}

export async function getEggPrice() {
  try {
    const response = await fetch(eggPriceUrl, { next: { revalidate: 1800 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parseEggPrice(await response.text());
  } catch (error) {
    console.warn("Harga telur gagal dimuat.", error instanceof Error ? error.message : "Kesalahan jaringan");
    return { price: "24.070", date: "2026-09-17", fallback: true };
  }
}
