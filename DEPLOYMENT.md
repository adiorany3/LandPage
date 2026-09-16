# Panduan Deployment Vercel

Project memakai Node.js 24.x, npm 10, Next.js 16.2.10, dan instalasi bersih melalui `npm ci`.

## Deployment baru

1. Ekstrak file ZIP.
2. Upload seluruh isi folder ke repository GitHub.
3. Import repository tersebut di Vercel.
4. Pastikan Root Directory berisi `package.json`.
5. Pilih Framework Preset `Next.js`.
6. Pilih Node.js Version `24.x`.
7. Gunakan Install Command `npm ci --no-audit --no-fund`.
8. Gunakan Build Command `npm run build`.
9. Jalankan deployment.

## Environment variable opsional

Project dapat berjalan tanpa environment variable. Namun, token GitHub direkomendasikan agar rate limit API lebih besar.

Tambahkan di Vercel Project Settings, lalu buka Environment Variables:

```text
Name: GITHUB_TOKEN
Value: token GitHub Anda
Environment: Production, Preview, Development
```

Token hanya membutuhkan akses baca untuk repository publik. Jangan menyimpan token di repository.

## Cara pembaruan data bekerja

- Next.js mengambil daftar repository dari GitHub REST API.
- Hasil disimpan melalui ISR selama satu jam.
- Setelah satu jam, Next.js mengambil data terbaru ketika halaman kembali diakses.
- Jika API gagal atau rate limit tercapai, website memakai daftar fallback di `lib/github.ts`.
- Jumlah repository publik ditarik dari profil GitHub.

## Memperbarui deployment lama

1. Ganti seluruh file lama dengan file dari paket ini.
2. Pastikan folder `lib` dan file `components/ProjectShowcase.tsx` ikut diunggah.
3. Pastikan `.nvmrc`, `.npmrc`, `eslint.config.mjs`, dan `vercel.json` ikut diunggah.
4. Commit dan push perubahan.
5. Pilih Node.js `24.x` di Vercel Project Settings.
6. Pilih `Clear Cache and Redeploy`.

## Uji lokal

```bash
npm ci --no-audit --no-fund
npm run check
```

## Catatan keamanan dan dependency

- Lockfile memakai `https://registry.npmjs.org/`.
- `GITHUB_TOKEN` hanya dibaca pada server.
- Token tidak dikirim ke browser.
- Source code tidak bergantung pada library animasi eksternal.
- Animasi dibuat dengan CSS dan React event handling agar bundle tetap ringan.
