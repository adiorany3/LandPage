# Changelog

## 1.2.1

- Menghapus kelas dan DOM yang tidak punya aturan CSS: pointer tilt/glow, orbit kartu, baris kode, ambient background.
- Memulihkan CSS reveal dan animasi masuk kartu (`--card-delay`) yang sebelumnya tidak berpengaruh, dengan penjaga `prefers-reduced-motion` dan tanpa JS.
- Menerapkan tema tersimpan sebelum paint agar light mode tidak berkedip gelap.
- Kartu project tidak lagi dirender ulang setiap ketikan pencarian.
- QR halaman download dibuat lokal dengan `qrcode`, tidak lagi memakai `api.qrserver.com`.
- Menambahkan script `npm test`, `"type": "module"`, entri `/ai` dan `/download` di sitemap.
- Menghapus aset SVG yang tidak dipakai dan mengeluarkan `.DS_Store` dari repository.

## 1.2.0

- Mengganti daftar project statis dengan sinkronisasi GitHub otomatis.
- Memperbarui jumlah repository publik menjadi data dinamis dari GitHub.
- Menambahkan fallback repository terbaru dari profil GitHub.
- Menambahkan kategori project otomatis.
- Menambahkan pencarian dan filter project.
- Menambahkan tombol tampilkan lebih banyak.
- Menambahkan ticker repository bergerak.
- Menambahkan animasi stagger, orbit, code pulse, pointer glow, dan 3D card tilt.
- Menambahkan dukungan `prefers-reduced-motion`.
- Menambahkan dukungan environment variable `GITHUB_TOKEN`.
- Menambahkan cache ISR selama satu jam.
