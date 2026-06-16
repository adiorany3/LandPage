# LandPage Tech + SEO Patch

Paket ini berisi pengganti file utama untuk membuat landing page lebih techie, profesional, dan SEO-ready.

## File yang diganti / ditambahkan

- `index.html` — struktur baru, semantic heading, meta SEO, Open Graph, Twitter Card, JSON-LD Person + project list.
- `styles.css` — visual tech/professional, dark-first, responsive, glass terminal, project cards, dan layout ringan tanpa external font.
- `script.js` — mobile nav, theme toggle, reveal animation, back-to-top.
- `robots.txt` — izin crawling.
- `sitemap.xml` — sitemap halaman utama.

## Cara pasang

1. Extract ZIP ini.
2. Copy semua file ke root repository `LandPage`.
3. Pastikan folder `assets/` lama tetap ada karena halaman memakai SVG lokal dari repository.
4. Jika domain bukan `https://adioranye.vercel.app/`, ganti URL di:
   - `index.html` bagian canonical, og:url, og:image, twitter:image, JSON-LD url.
   - `robots.txt`
   - `sitemap.xml`
5. Commit dan push ke GitHub.

## Catatan SEO

SEO tidak bisa dijamin langsung ranking tinggi, tetapi patch ini sudah menambahkan fondasi penting: satu H1, heading H2/H3 rapi, meta description, canonical, OG/Twitter card, schema JSON-LD, alt text, lazy loading, robots, sitemap, dan konten use case dengan keyword natural.
