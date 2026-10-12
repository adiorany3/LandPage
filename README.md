# Adioranye LandPage

Portfolio Galuh Adi Insani dengan katalog repository GitHub otomatis, animasi interaktif, tipografi nyaman dibaca, dan infografis Research Product Pipeline.

## Fitur utama

- Daftar repository diambil dari akun `github.com/adiorany3` melalui GitHub REST API.
- Data diperbarui otomatis setiap satu jam melalui Next.js ISR.
- Data cadangan lokal tetap tampil jika GitHub API tidak dapat diakses.
- Enam repository pinned ditempatkan sebagai project unggulan.
- Filter AgriTech, Statistics, AI & Vision, serta Web & Tools.
- Pencarian berdasarkan nama, deskripsi, bahasa, kategori, dan topic GitHub.
- Tombol tampilkan lebih banyak untuk katalog berukuran besar.
- Ticker repository bergerak dengan pause saat hover.
- Ticker tetap di bawah halaman menampilkan judul Catatan Insani terbaru dan berhenti saat disorot atau difokuskan.
- Animasi stagger, orbit, code pulse, pointer glow, dan card tilt.
- Animasi otomatis dinonaktifkan saat pengguna memakai `prefers-reduced-motion`.
- Light mode dan dark mode.
- Tampilan responsif untuk desktop, tablet, dan mobile.
- Menu Harga komoditas membuka halaman `/harga-peternakan` dengan harga telur, daging, ternak, pakan, susu, dan tautan sumber yang diperbarui berkala.
- Dashboard harga menampilkan grafik tren responsif dengan pilihan komoditas, rentang 7/30 hari atau semua data yang tersedia, ringkasan harga, serta tabel riwayat yang dapat dibaca tanpa grafik.
- Tombol Unduh XLSX mengambil arsip telur dan riwayat grafik komoditas yang tersedia dari sumber saat file diminta. Tanggal baru ikut masuk saat sumber memperbaruinya; ini bukan arsip permanen dan tidak memuat tanggal yang sudah tidak tersedia di sumber.
- Metadata SEO beranda mengikuti judul artikel terbaru yang berhasil dimuat; daftar artikel pada structured data diperbarui bersama feed, sementara tautan artikel tetap mengarah ke penerbit asal.
- `robots.txt` dan `sitemap.xml` mencantumkan halaman milik situs ini (bukan artikel di domain pihak ketiga).

## Stack

- Node.js 24.x
- npm 10.9.2
- Next.js 16.3.5
- React 19.2.7
- TypeScript 5.9.3
- ESLint 9.39.5

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

## Sinkronisasi GitHub

Logika pengambilan repository berada di:

```text
lib/github.ts
```

Secara default, project memakai API publik GitHub. Anda dapat menambahkan token agar batas permintaan lebih besar:

```bash
GITHUB_TOKEN=github_pat_xxx
```

Token tidak boleh ditulis langsung di source code atau diunggah ke GitHub.

## Struktur utama

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  ProjectShowcase.tsx
  RevealOnScroll.tsx
  ThemeAndNav.tsx
data/
  content.ts
lib/
  github.ts
public/
  assets/
eslint.config.mjs
vercel.json
package.json
package-lock.json
```

## Mengubah tampilan project

- Data GitHub, kategori, featured project, dan fallback: `lib/github.ts`.
- Komponen filter, pencarian, dan kartu project: `components/ProjectShowcase.tsx`.
- Animasi, warna kategori, layout kartu, dan responsivitas: `app/globals.css`.
- Konten umum, tautan, workflow, dan stack: `data/content.ts`.

## Deployment

Baca `DEPLOYMENT.md` sebelum mengunggah project ke Vercel.
