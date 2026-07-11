# Adioranye LandPage

Landing page portfolio Galuh Adi Insani dengan tipografi yang nyaman dibaca, tampilan responsif, dan infografis Research Product Pipeline.

## Fitur

- Tipografi responsif dengan ukuran judul yang terkontrol.
- Paragraf dengan line-height lega dan panjang baris yang nyaman.
- Infografis Research Product Pipeline.
- Katalog project berbasis data.
- Navigasi desktop dan mobile.
- Light mode dan dark mode.
- Animasi yang menghormati `prefers-reduced-motion`.
- Optimasi aset lokal dengan `next/image`.
- Metadata SEO, structured data, `robots.txt`, dan `sitemap.xml`.
- Konfigurasi deployment Vercel untuk Node.js 24.

## Versi utama

- Node.js 24.x
- npm 10.9.2
- Next.js 16.2.10
- React 19.2.7
- TypeScript 5.9.3
- ESLint 9.39.5 dengan flat config

## Menjalankan project

Gunakan Node.js 24.

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`.

## Pemeriksaan kualitas

```bash
npm run check
```

Perintah tersebut menjalankan ESLint, pemeriksaan TypeScript, dan production build.

## Struktur utama

```text
app/
components/
data/
public/
  assets/
eslint.config.mjs
vercel.json
package.json
package-lock.json
```

## Mengubah konten

- Daftar project, tautan, statistik, workflow, dan stack: `data/content.ts`.
- Konten halaman utama: `app/page.tsx`.
- Ukuran font, warna, spacing, dan responsivitas: `app/globals.css`.
- Infografis dan ilustrasi: `public/assets/`.

## Deployment

Baca `DEPLOYMENT.md` sebelum mengunggah project ke Vercel.
