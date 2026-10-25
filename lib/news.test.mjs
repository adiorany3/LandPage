import assert from "node:assert/strict";
import { getBlogPosts, getNews } from "./news.ts";

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
  const feed = `<rss><channel><item><title>Berita tersedia</title><link>https://example.com/available</link><pubDate>Mon, 12 Oct 2026 00:00:00 GMT</pubDate></item></channel></rss>`;
  for (const failingSource of ["Google News", "Catatan Insani"]) {
    globalThis.fetch = async (url) => {
      const isBlog = url === "https://catataninsani.wordpress.com/feed/";
      if ((isBlog ? "Catatan Insani" : "Google News") === failingSource) {
        if (isBlog) throw new Error("Network unavailable");
        return new Response("", { status: 503 });
      }
      return new Response(feed);
    };
    const items = await getNews();
    assert.deepEqual(items.map(({ title }) => title), ["Berita tersedia"]);
    assert.equal(items[0].source, failingSource === "Google News" ? "Catatan Insani" : "Google News");
  }
  globalThis.fetch = async () => { throw new Error("Network unavailable"); };
  assert.deepEqual(await getNews(), []);
  globalThis.fetch = async (url) => {
    assert.equal(url, "https://catataninsani.wordpress.com/feed/");
    return new Response(`<rss><channel><item><title>Catatan terbaru</title><link>https://catataninsani.wordpress.com/terbaru/</link><pubDate>Mon, 12 Oct 2026 00:00:00 GMT</pubDate></item><item><title>Catatan lama</title><link>https://catataninsani.wordpress.com/lama/</link><pubDate>Mon, 05 Oct 2026 00:00:00 GMT</pubDate></item></channel></rss>`);
  };
  const posts = await getBlogPosts();
  assert.deepEqual(posts.map(({ title }) => title), ["Catatan terbaru", "Catatan lama"]);
  assert.ok(posts.every(({ source }) => source === "Catatan Insani"));
  const descriptions = ["Teks pendek", `Kata `.repeat(40)];
  for (const [index, description] of descriptions.entries()) {
    globalThis.fetch = async () => new Response(`<rss><channel><item><title>Ringkas</title><link>https://catataninsani.wordpress.com/ringkas/</link><description>${description}</description></item></channel></rss>`);
    const [post] = await getBlogPosts();
    assert.ok(description.startsWith(post.excerpt.replace(/…$/, "")));
    assert.equal(post.excerpt.endsWith("…"), index === 1);
    assert.ok(post.excerpt.length <= 141, `excerpt too long: ${post.excerpt.length}`);
  }} finally {
  globalThis.fetch = originalFetch;
}
console.log("News text checks passed");
