import assert from "node:assert/strict";
import { getNews } from "./news.ts";

const originalFetch = globalThis.fetch;
try {
  for (const description of [
    '<![CDATA[<a href="https://news.google.com/rss/articles/example?oc=5" target="_blank">Judul &amp; berita</a>]]>',
    '&lt;a href=&quot;https://news.google.com/rss/articles/example?oc=5&quot; target=&quot;_blank&quot;&gt;Judul &amp; berita&lt;/a&gt;'
  ]) {
    globalThis.fetch = async () => new Response(`<rss><channel><item><title>Judul berita</title><link>https://example.com/news</link><description>${description}</description></item></channel></rss>`);
    const items = await getNews();
    assert.equal(items.length, 2);
    for (const item of items) {
      assert.equal(item.excerpt, "Judul & berita");
      assert.equal(item.link, "https://example.com/news");
    }
  }
} finally {
  globalThis.fetch = originalFetch;
}
console.log("News text checks passed");
