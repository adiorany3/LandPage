# Adioranye LandPage

Landing page portfolio Galuh Adi Insani yang diperbarui agar tipografinya lebih nyaman dibaca dan kontennya lebih mudah dipindai.

## Fitur

- Tipografi responsif dengan ukuran judul yang lebih terkontrol.
- Paragraf memakai line-height lega dan panjang baris yang nyaman dibaca.
- Infografis **Research Product Pipeline**.
- Katalog project berbasis data.
- Navigasi desktop dan mobile.
- Light mode dan dark mode.
- Animasi masuk yang menghormati `prefers-reduced-motion`.
- Metadata SEO, structured data, robots.txt, dan sitemap.
- Siap build dan deploy ke Vercel.

## Teknologi

- Next.js 14
- React 18
- TypeScript
- CSS tanpa UI framework
- SVG lokal untuk seluruh ilustrasi

## Menjalankan project

Pastikan Node.js 20 tersedia.

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
  globals.css
  layout.tsx
  page.tsx
components/
  BlogFeed.tsx
  RevealOnScroll.tsx
  ThemeAndNav.tsx
data/
  content.ts
public/
  assets/
    research-product-pipeline.svg
```

## Mengubah konten

- Ubah daftar project, tautan, statistik, workflow, dan stack di `data/content.ts`.
- Ubah konten halaman utama di `app/page.tsx`.
- Ubah ukuran font, warna, spacing, dan responsivitas di `app/globals.css`.
- Ganti aset SVG di `public/assets/` tanpa mengubah path pada komponen.

## Deployment

Lihat panduan lengkap di `DEPLOYMENT.md`.
