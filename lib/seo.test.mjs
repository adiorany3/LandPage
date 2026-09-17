import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// ponytail: checks production HTML after npm run build; add browser checks for interactive features.
const root = new URL("../", import.meta.url);
const html = await readFile(new URL(".next/server/app/inovasi/ransum-ruminansia.html", root), "utf8");
const home = await readFile(new URL(".next/server/app/index.html", root), "utf8");
const sitemap = await readFile(new URL("public/sitemap.xml", root), "utf8");
const url = "https://adioranye.vercel.app/inovasi/ransum-ruminansia";
assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
assert.match(html, /<h1[^>]*>Ransum Ruminansia:/);
assert.match(html, /name="twitter:card" content="summary_large_image"/);
assert.match(html, /property="og:image" content="https:\/\/adioranye.vercel.app\/opengraph-image/);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const app = schemas.find(schema => schema["@type"] === "SoftwareApplication");
assert.ok(app);
assert.equal(app.url, url);
assert.equal(app.author.name, "Galuh Adi Insani");
assert.equal(app.author["@id"], "https://adioranye.vercel.app/#person");
assert.match(home, /href="\/inovasi\/ransum-ruminansia"/);
assert.match(home, /id="contact"/);
assert.ok(sitemap.includes(`<loc>${url}</loc>`));
console.log("Production SEO checks passed");
