import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// ponytail: checks production HTML after npm run build; add browser checks for interactive features.
const root = new URL("../", import.meta.url);
const html = await readFile(new URL(".next/server/app/inovasi/ransum-ruminansia.html", root), "utf8");
const home = await readFile(new URL(".next/server/app/index.html", root), "utf8");
const prices = await readFile(new URL(".next/server/app/harga-peternakan.html", root), "utf8");
const education = await readFile(new URL(".next/server/app/edukasi-peternakan.html", root), "utf8");
const sitemap = await readFile(new URL(".next/server/app/sitemap.xml.body", root), "utf8");
const url = "https://www.adioranye.my.id/inovasi/ransum-ruminansia";
assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
assert.match(html, /<h1[^>]*>Ransum Ruminansia:/);
assert.match(html, /name="twitter:card" content="summary_large_image"/);
assert.match(html, /property="og:image" content="https:\/\/www.adioranye.my.id\/opengraph-image/);
const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const app = schemas.find(schema => schema["@type"] === "SoftwareApplication");
assert.ok(app);
assert.equal(app.url, url);
assert.equal(app.author.name, "Galuh Adi Insani");
assert.equal(app.author["@id"], "https://www.adioranye.my.id/#person");
assert.match(home, /href="\/inovasi\/ransum-ruminansia"/);
assert.match(home, /id="contact"/);
assert.match(home, /<link rel="canonical" href="https:\/\/www\.adioranye\.my\.id"/);
assert.match(home, /<meta name="description" content="(?:Artikel terbaru:|Artikel AgriTech,)/);
const homeSchemas = [...home.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const itemList = homeSchemas.flatMap(schema => schema["@graph"] ?? []).find(schema => schema["@type"] === "ItemList");
assert.ok(itemList);
assert.equal(itemList.numberOfItems, itemList.itemListElement.length);
assert.equal(new Set(itemList.itemListElement.map(item => item.url)).size, itemList.numberOfItems);
assert.ok(sitemap.includes(`<loc>${url}</loc>`));
assert.ok(sitemap.includes("<loc>https://www.adioranye.my.id/janjian</loc>"));
assert.ok(sitemap.includes("<loc>https://www.adioranye.my.id/harga-peternakan</loc>"));
assert.match(home, /href="\/harga-peternakan"/);
assert.doesNotMatch(home, /id="prices-title"/);
assert.match(prices, /<link rel="canonical" href="https:\/\/www\.adioranye\.my\.id\/harga-peternakan"/);
assert.match(prices, /id="prices-title"/);
assert.ok(!sitemap.includes("catataninsani.wordpress.com"));

const educationUrl = "https://www.adioranye.my.id/edukasi-peternakan";
assert.ok(sitemap.includes(`<loc>${educationUrl}</loc>`));
assert.match(home, /href="\/edukasi-peternakan"/);
assert.ok(education.includes(`<link rel="canonical" href="${educationUrl}"`));
assert.match(education, /<h1[^>]*>Edukasi peternakan: pakan, kesehatan, dan data</);
assert.match(education, /name="twitter:card" content="summary_large_image"/);
assert.match(education, /property="og:image" content="https:\/\/www.adioranye.my.id\/opengraph-image/);
assert.match(education, /id="nutrisi-ruminansia"/);
assert.match(education, /id="kesehatan-ternak"/);
assert.match(education, /id="data-peternakan"/);
const educationSchemas = [...education.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const collection = educationSchemas.find(schema => schema["@type"] === "CollectionPage");
assert.ok(collection);
assert.equal(collection.url, educationUrl);
assert.equal(collection.author["@id"], "https://www.adioranye.my.id/#person");
assert.deepEqual(
  collection.hasPart.map(part => part.url.replace(`${educationUrl}#`, "")),
  ["nutrisi-ruminansia", "kesehatan-ternak", "data-peternakan"]
);
assert.deepEqual(
  [...education.matchAll(/id="(nutrisi-ruminansia|kesehatan-ternak|data-peternakan)"/g)].map(match => match[1]).sort(),
  ["data-peternakan", "kesehatan-ternak", "nutrisi-ruminansia"]
);
console.log("Production SEO checks passed");
