import assert from "node:assert/strict";
import { getLivestockNews } from "./news.ts";

const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
const now = Date.now();
const item = (title, age) => `<item><title>${title}</title><link>https://example.com/${title}</link><pubDate>${new Date(now - age * 86400000).toUTCString()}</pubDate><source>Penerbit</source></item>`;
try {
  let requests = 0;
  globalThis.fetch = async (url, options) => {
    assert.match(new URL(url).searchParams.get("q"), /when:7d/);
    assert.equal(options.next.revalidate, 1800);
    requests++;
    return new Response(requests === 1
      ? `<rss>${item("lama", 8)}${item("kemarin", 1)}${item("terbaru", 0)}${item("masa-depan", -1)}${item("tanpa-tanggal", NaN)}</rss>`
      : `<rss>${item("kemarin", 1)}${item("dua-hari", 2)}</rss>`);
  };
  const news = await getLivestockNews();
  assert.equal(requests, 2);
  assert.deepEqual(news.map(entry => entry.title), ["terbaru", "kemarin", "dua-hari"]);
  assert.equal(news[0].source, "Penerbit");
  assert.equal(news[0].excerpt, "");
  globalThis.fetch = async (url) => {
    if (new URL(url).searchParams.get("q").includes("peternakan OR")) throw new Error("Feed unavailable");
    return new Response(`<rss>${item("cadangan", 1)}</rss>`);
  };
  assert.deepEqual((await getLivestockNews()).map(entry => entry.title), ["cadangan"]);
  globalThis.fetch = async (url) => new URL(url).searchParams.get("q").includes("peternakan OR")
    ? { ok: true, text: async () => { throw new Error("Body unreadable"); } }
    : new Response(`<rss>${item("tetap-tampil", 1)}</rss>`);
  assert.deepEqual((await getLivestockNews()).map(entry => entry.title), ["tetap-tampil"]);
  globalThis.fetch = async () => new Response("<rss/>");
  assert.deepEqual(await getLivestockNews(), []);
  console.warn = () => {};
  globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
  assert.deepEqual(await getLivestockNews(), []);
  globalThis.fetch = async () => { throw new Error("Network unavailable"); };
  assert.deepEqual(await getLivestockNews(), []);
} finally {
  globalThis.fetch = originalFetch;
  console.warn = originalWarn;
}
console.log("Livestock news checks passed");
