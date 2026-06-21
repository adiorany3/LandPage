# LandPage Next.js — siap deploy ke Vercel

Versi ini adalah konversi landing page `adiorany3/LandPage` ke **Next.js App Router** dengan struktur siap deploy.

## Isi utama

- `app/page.tsx` — halaman utama portfolio.
- `app/layout.tsx` — metadata SEO, Open Graph, Twitter card, manifest, favicon.
- `app/globals.css` — styling glass Apple product, responsive, light/dark mode.
- `components/ThemeAndNav.tsx` — theme toggle, mobile nav, tombol back-to-top.
- `components/RevealOnScroll.tsx` — animasi reveal berbasis IntersectionObserver.
- `components/BlogFeed.tsx` — fallback artikel + update WordPress API di browser.
- `data/content.ts` — data project, workflow, link, stack.
- `public/assets/` — aset SVG lokal agar ringan dan tidak tergantung gambar eksternal.
- `vercel.json` — Vercel otomatis memakai Next.js dan `npm run build`.

## Cara deploy paling mudah

1. Upload isi folder ini ke repository GitHub baru.
2. Buka Vercel → Add New Project → pilih repository.
3. Vercel akan mendeteksi Next.js otomatis. Tidak perlu mengubah Build Command, Output Directory, atau Install Command.
4. Klik Deploy.

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Build production

```bash
npm run build
npm start
```

## Catatan

Aset PNG/MP3 dari repo lama tidak disalin byte-per-byte karena environment pembuatan ZIP tidak dapat mengunduh file biner GitHub secara langsung. Semua ilustrasi penting dibuat ulang sebagai SVG lokal di `public/assets/`, sehingga tetap ringan dan siap build di Vercel.


## Readability update

Versi ini sudah disesuaikan agar lebih nyaman dibaca: heading tidak terlalu besar, line-height lebih lega, paragraf lebih pendek, kartu lebih seimbang, dan ukuran font mobile lebih terkendali. Aset dari ZIP asli juga sudah dimasukkan ke folder `public/`.
