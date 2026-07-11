# Deployment

## Vercel

1. Upload project ini ke repository GitHub.
2. Masuk ke Vercel dan pilih **Add New Project**.
3. Import repository tersebut.
4. Framework akan terdeteksi sebagai **Next.js**.
5. Gunakan pengaturan bawaan lalu klik **Deploy**.

Tidak diperlukan environment variable untuk versi ini.

## Jalankan secara lokal

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`.

## Pemeriksaan sebelum deploy

```bash
npm run lint
npm run typecheck
npm run build
```
