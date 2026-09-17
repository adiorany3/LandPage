import assert from "node:assert/strict";
import { parseEggPrice, getEggPrice } from "./egg-price.ts";
const html = '<main><time dateTime="2026-09-17T00:00:00.000Z">22 jam lalu</time><b>Rp 24.070</b> / kg 0,0% vs kemarin Rata-rata nasional</main>';
assert.deepEqual(parseEggPrice(html), { price: "24.070", date: "2026-09-17", fallback: false });
assert.throws(() => parseEggPrice(html.replace("Rata-rata nasional", "Jakarta")));
assert.throws(() => parseEggPrice("Unavailable"));
const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
try {
  globalThis.fetch = async () => new Response(html);
  assert.equal((await getEggPrice()).fallback, false);
  console.warn = () => {};
  globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
  assert.equal((await getEggPrice()).fallback, true);
} finally {
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
}
if (process.argv.includes("--live")) assert.equal((await getEggPrice()).fallback, false);
console.log("Egg price checks passed");
