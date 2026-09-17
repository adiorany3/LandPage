import assert from "node:assert/strict";
import { parsePrices, getCommodityPrices } from "./prices.ts";

const card = '<a href="/harga-komoditas/telur-ayam-ras"><span>Telur Ayam Ras</span><span>Eceran</span> · <span>17 Sep 2026</span> · <span>/kg</span><svg><path /></svg><span>Rp <!-- -->27.834</span><span>+1,01%</span></a>';
const prices = parsePrices(card + card);
assert.equal(prices.length, 1);
assert.deepEqual(prices[0], { name: "Telur Ayam Ras", level: "Eceran", date: "17 Sep 2026", unit: "kg", price: "27.834", link: "https://sunegg.id/harga-komoditas/telur-ayam-ras" });
assert.deepEqual(parsePrices('<a href="https://evil.example">Rp 100</a>'), []);
assert.deepEqual(parsePrices(card.replace("27.834", "tidak tersedia")), []);
const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
try {
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.next.revalidate, 1800);
    return new Response(card);
  };
  const fetched = await getCommodityPrices();
  assert.equal(fetched.length, 1);
  assert.ok(!fetched[0].fallback);
  console.warn = () => {};
  globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
  const fallback = await getCommodityPrices();
  assert.equal(fallback.length, 5);
  assert.ok(fallback.every(item => item.fallback && item.date === "17 Sep 2026"));
  globalThis.fetch = async () => new Response("Changed markup");
  assert.deepEqual(await getCommodityPrices(), fallback);
  globalThis.fetch = async () => { throw new Error("Network unavailable"); };
  assert.deepEqual(await getCommodityPrices(), fallback);
} finally {
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
}
if (process.argv.includes("--live")) {
  const live = await getCommodityPrices();
  assert.ok(live.length > 0, "Live source must contain recognized prices");
  assert.ok(live.every(item => !item.fallback), "Live check must not use fallback");
  console.log(`${live.length} live commodity prices verified`);
}
console.log("Commodity price checks passed");
