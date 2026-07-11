# LandPage Astro

Konversi mandiri dari portfolio `adiorany3/LandPage` ke Astro static site. Project ini siap dijalankan lokal dan di-deploy ke Vercel.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:4321`.

## Build produksi

```bash
npm run build
npm run preview
```

Output produksi berada di folder `dist/`.

## Deploy ke Vercel

1. Push folder ini ke GitHub.
2. Import repository di Vercel.
3. Framework preset: Astro.
4. Build command: `npm run build`.
5. Output directory: `dist`.

`vercel.json` sudah disertakan. Project memakai static output, jadi tidak membutuhkan server adapter.

## Struktur penting

- `src/pages/index.astro`: halaman utama.
- `src/layouts/BaseLayout.astro`: metadata dan layout HTML.
- `src/components/ResearchMap.astro`: scrollytelling SVG.
- `src/components/ProjectCard.astro`: kartu project.
- `src/components/BlogFeed.astro`: WordPress API dengan fallback.
- `src/data/site.ts`: seluruh data konten.
- `src/styles/global.css`: sistem visual, responsive, dan dark mode.
- `public/assets/`: ilustrasi SVG lokal.

## Mengubah domain

Ganti nilai `site` di `astro.config.mjs`. Perbarui juga URL profil di `src/pages/index.astro` bila perlu.
