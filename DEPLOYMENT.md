# Panduan Deployment Vercel

Project ini sudah dikonfigurasi untuk menggunakan Node.js 20.x, npm 10, dan perintah instalasi `npm ci`.

## Deployment baru

1. Ekstrak file ZIP.
2. Upload seluruh isi folder project ke repository GitHub.
3. Import repository tersebut di Vercel.
4. Pastikan Root Directory mengarah ke folder yang berisi `package.json`.
5. Framework Preset: Next.js.
6. Node.js Version: 20.x.
7. Install Command: biarkan mengikuti `vercel.json`, yaitu `npm ci --no-audit --no-fund`.
8. Build Command: `npm run build`.
9. Klik Deploy.

Project ini tidak membutuhkan environment variable.

## Memperbaiki deployment lama

Jika repository pernah memakai paket ZIP sebelumnya:

1. Ganti `package-lock.json` lama dengan file dari paket perbaikan ini.
2. Pastikan `.npmrc`, `vercel.json`, dan perubahan `package.json` ikut diunggah.
3. Commit dan push perubahan.
4. Buka Vercel lalu pilih Deployments.
5. Pilih Redeploy.
6. Nonaktifkan opsi Use existing Build Cache atau pilih Clear Cache and Redeploy jika tersedia.

## Uji lokal

```bash
npm ci
npm run typecheck
npm run build
```

`package-lock.json` dalam paket ini hanya memakai registry publik `https://registry.npmjs.org/` dan tidak menyimpan URL registry internal.
