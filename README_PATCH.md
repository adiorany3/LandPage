# Patch Apple Glass untuk LandPage

File ini dibuat agar CSS Apple-style glass yang ditempel dapat dipakai langsung pada repo `adiorany3/LandPage` tanpa framework tambahan.

## Cara pakai

1. Clone repo Anda:

```bash
git clone https://github.com/adiorany3/LandPage.git
cd LandPage
git checkout -b style/apple-glass
```

2. Backup file lama:

```bash
cp styles.css styles.backup.css
cp script.js script.backup.js
```

3. Salin file dari paket ini ke root repo:

```bash
cp path/to/styles.css ./styles.css
cp path/to/script.js ./script.js
cp path/to/styles.min.css ./styles.min.css
cp path/to/script.min.js ./script.min.js
```

4. Pastikan `index.html` masih memanggil file berikut:

```html
<link rel="stylesheet" href="styles.css">
<script src="script.js" defer></script>
```

5. Untuk dark-mode dan menu mobile, pastikan tombol di HTML memiliki salah satu class/id berikut:

```html
<button id="themeToggle" class="theme-toggle" type="button" aria-label="Gunakan tema gelap">◐</button>
<button id="menuToggle" class="menu-toggle" type="button" aria-label="Buka menu navigasi">☰</button>
```

6. Commit perubahan:

```bash
git add styles.css script.js styles.min.css script.min.js
git commit -m "Apply Apple glass landing page theme"
git push origin style/apple-glass
```

## Catatan penyesuaian

- CSS ini mendukung class umum dari landing page seperti `.hero`, `.hero-card`, `.project-card`, `.about-card`, `.contact-card`, `.nav-links`, `.theme-toggle`, dan beberapa alias agar lebih aman terhadap struktur repo.
- Jika kartu di halaman Anda memakai class berbeda, tambahkan class tersebut ke blok selector glass base di `styles.css`.
- Form kontak belum otomatis terhubung ke backend. Isi atribut `action` bila memakai Formspree, Netlify Forms, atau endpoint sendiri.
