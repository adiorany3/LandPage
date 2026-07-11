# Adioranye LandPage

Landing page portfolio Galuh Adi Insani dengan tipografi yang lebih nyaman dibaca, tampilan responsif, serta infografis Research Product Pipeline.

## Fitur

- Tipografi responsif dengan ukuran judul yang lebih terkontrol.
- Paragraf dengan line-height lega dan panjang baris yang nyaman.
- Infografis Research Product Pipeline.
- Katalog project berbasis data.
- Navigasi desktop dan mobile.
- Light mode dan dark mode.
- Animasi yang menghormati `prefers-reduced-motion`.
- Metadata SEO, structured data, `robots.txt`, dan `sitemap.xml`.
- Konfigurasi deployment Vercel.

## Versi utama

- Node.js 20.x
- npm 10.9.2
- Next.js 14.2.35
- React 18.3.1
- TypeScript 5.6.2

## Menjalankan project

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`.

## Pemeriksaan kualitas

```bash
npm run lint
npm run typecheck
npm run build
```

## Struktur utama

```text
app/
components/
data/
public/
  assets/
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
