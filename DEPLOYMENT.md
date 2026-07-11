# Panduan Deployment Vercel

Project ini menggunakan Node.js 24.x, npm 10, Next.js 16.2.10, dan perintah instalasi `npm ci`.

## Deployment baru

1. Ekstrak file ZIP.
2. Upload seluruh isi folder project ke repository GitHub.
3. Import repository tersebut di Vercel.
4. Pastikan Root Directory mengarah ke folder yang berisi `package.json`.
5. Pilih Framework Preset `Next.js`.
6. Pilih Node.js Version `24.x` di Project Settings.
7. Gunakan Install Command `npm ci --no-audit --no-fund`.
8. Gunakan Build Command `npm run build`.
9. Jalankan deployment.

Project ini tidak membutuhkan environment variable.

## Memperbarui deployment lama

1. Ganti `package.json` dan `package-lock.json` lama dengan file dari paket ini.
2. Hapus file `.eslintrc.json` lama jika masih ada.
3. Pastikan `.nvmrc`, `.npmrc`, `eslint.config.mjs`, dan `vercel.json` ikut diunggah.
4. Commit dan push perubahan.
5. Buka Vercel Project Settings, lalu pilih Node.js `24.x`.
6. Buka Deployments dan pilih Redeploy.
7. Nonaktifkan `Use existing Build Cache`, atau pilih `Clear Cache and Redeploy` jika tersedia.

## Uji lokal

```bash
npm ci --no-audit --no-fund
npm run check
```

## Catatan dependency

- Lockfile memakai registry publik `https://registry.npmjs.org/`.
- Dependency lama `glob@10.3.10` tidak lagi ada dalam dependency tree.
- Next.js 16 tidak memakai perintah `next lint`. Project ini menjalankan ESLint langsung melalui `eslint .`.
