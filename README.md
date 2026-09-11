# Portal UMKM Pesisir Tarakan - Pemrograman Web (OBE)

## Identitas Mahasiswa
- **Mata Kuliah:** Praktikum Pemrograman Web (26TJ453127)
- **Nama:** Andi Muhammad Arsa
- **NIM:** 2440304037

---

## Deskripsi Proyek
Proyek ini merupakan repositori proyek individu praktikum Pemrograman Web berbasis Outcome-Based Education (OBE). Halaman `index.html` dikembangkan sebagai portal informasi UMKM Pesisir Tarakan yang dibangun menggunakan struktur HTML5 semantik dan menerapkan prinsip aksesibilitas web dasar.

## Teknologi & Environment
- HTML5 Semantik
- PHP 8.4
- Laragon 5 (`C:\laragon\www\pemweb-obe`)

## Cara Menjalankan Proyek
1. Jalankan aplikasi **Laragon 5**, lalu klik tombol **Start All**.
2. Pastikan server Apache aktif.
3. Buka browser dan akses URL lokal berikut:
   `http://localhost/pemweb-obe/`

---

## Sitemap / Wireframe Awal (Modul 02)
```text
[Header & Skip-Link]
   └── [Navigasi Utama]
[Main Content]
   ├── Section 1: Beranda (Informasi UMKM Pesisir & Foto)
   ├── Section 2: Produk Unggulan (Article: Krupuk Amplang)
   ├── Section 3: Layanan Pendampingan Usaha
   └── Section 4: Formulir Pertanyaan & Kontak
[Footer]

---

## Dokumentasi Modul 03 - Responsive Landing Page (Tugas OBE)

### 1. Penerapan CSS Modern & Responsivitas
- **Flexbox Layout:** Diterapkan pada navigasi (`nav ul`) dengan properti `flex-wrap: wrap` agar item menu tidak *overflow* dan berpindah baris saat diakses dari layar sempit.
- **CSS Grid Layout:** Diterapkan pada kartu produk (`.cards`) menggunakan `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` untuk menghasilkan layout dinamis (1 kolom di mobile, 3 kolom di desktop).
- **Custom Properties (Variables):** Menggunakan `:root` (`--primary`, `--bg-color`, `--space`, `--radius`) untuk menjaga konsistensi desain secara terpusat.
- **Fluid Typography:** Menggunakan fungsi `clamp(1.5rem, 4vw, 2.5rem)` pada judul *hero* agar ukuran font menyesuaikan ukuran layar secara mulus tanpa *media query* berlebih.

### 2. Komponen Reusable & Aksesibilitas
- **3 Komponen Reusable:** `.container` (pembatas lebar), `.card` (wadah produk/layanan), dan `nav a` (navigasi interaktif).
- **Focus State:** Menggunakan pseudo-class `:focus-visible` dengan *outline* jelas untuk pengguna yang bernavigasi menggunakan keyboard.

### 3. Ringkasan Pengujian Responsif
- **Mobile (< 768px):** Menu berurut rapi, kartu produk menyusun 1 kolom ke bawah tanpa *horizontal scrollbar*.
- **Tablet (768px - 1024px):** Layout *hero* terbagi 2 kolom, kartu produk mulai sejajar secara fleksibel.
- **Desktop (> 1024px):** Tampilan penuh 3 kolom kartu produk dengan kontainer maksimal `1000px`.