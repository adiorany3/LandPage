import assert from "node:assert/strict";
import { getLivestockNews } from "./news.ts";

const originalFetch = globalThis.fetch;
const originalWarn = console.warn;
const now = Date.now();
const item = (title, age) => `<item><title>${title}</title><link>https://example.com/${title}</link><pubDate>${new Date(now - age * 86400000).toUTCString()}</pubDate><source>Penerbit</source></item>`;
try {
  globalThis.fetch = async (url, options) => {
    assert.match(new URL(url).searchParams.get("q"), /peternakan.*when:7d/);
    assert.equal(options.next.revalidate, 1800);
    return new Response(`<rss>${item("lama", 8)}${item("kemarin", 1)}${item("terbaru", 0)}${item("masa-depan", -1)}</rss>`);
  };
  const news = await getLivestockNews();
  assert.deepEqual(news.map(entry => entry.title), ["terbaru", "kemarin"]);
  assert.equal(news[0].source, "Penerbit");
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
