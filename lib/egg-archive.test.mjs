import assert from "node:assert/strict";
import { parseEggArchive, getEggArchive } from "./egg-price.ts";
const card = (date, price = "24.070") => `<a href="/harga-telur/arsip/${date}"><span>Rp ${price}</span><span>Rata-rata nasional</span></a>`;
assert.deepEqual(parseEggArchive(card("2026-09-16") + card("2026-09-17") + card("2026-09-17") + card("2026-02-30") + card("2026-09-15", "...")), [{ date: "2026-09-17", price: "24.070" }, { date: "2026-09-16", price: "24.070" }]);
assert.deepEqual(parseEggArchive("unavailable"), []);
const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
try {
  globalThis.fetch = async (_url, options) => {
    assert.equal(options.next.revalidate, 1800);
    return new Response(card("2026-09-17"));
  };
  assert.equal((await getEggArchive()).length, 1);
  console.warn = () => {};
  globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
  assert.deepEqual(await getEggArchive(), []);
} finally {
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
}
if (process.argv.includes("--live")) {
  const archive = await getEggArchive();
  assert.ok(archive.length > 0);
  console.log(`${archive.length} archive dates verified`);
}
console.log("Egg archive checks passed");
