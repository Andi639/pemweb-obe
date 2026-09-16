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
```
---

## Dokumentasi Modul 03 - Responsive Landing Page (Tugas OBE)

### 1. Penerapan CSS Modern & Responsivitas

| Konsep CSS | Implementasi Kode | Fungsi & Dampak Layout |
| :--- | :--- | :--- |
| **Flexbox Layout** | `nav ul { flex-wrap: wrap; }` | Mencegah item menu *overflow* dengan memindahkan tombol ke baris baru saat layar sempit. |
| **CSS Grid Layout** | `.cards { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }` | Menghasilkan tata letak otomatis (1 kolom di mobile, 3 kolom di desktop). |
| **Custom Properties** | `:root { --primary: #455fad; ... }` | Memudahkan pengelolaan warna, *spacing*, dan *border-radius* secara konsisten dari satu tempat. |
| **Fluid Typography** | `.hero h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }` | Mengatur ukuran judul *hero* agar membesar/mencetus secara dinamis tanpa *media query* berlebih. |

---

### 2. Komponen Reusable & Aksesibilitas

* **3 Komponen Reusable:**
  * `.container` — Pembatas lebar maksimum halaman (`1000px`).
  * `.card` — Wadah komponen modular untuk produk dan layanan.
  * `nav a` — Komponen tombol navigasi interaktif.
* **Aksesibilitas (`Focus State`):**
  Menggunakan pseudo-class `:focus-visible` untuk memberikan garis fokus (*outline*) yang jelas saat pengguna bernavigasi menggunakan tombol `Tab` keyboard.

---

### 3. Ringkasan Pengujian Responsif

* **Mobile (< 768px):** Menu berurut rapi ke bawah, kartu produk menyusun 1 kolom vertikal tanpa *horizontal scrollbar*.
* **Tablet (768px – 1024px):** Layout *hero* terbagi menjadi 2 kolom, kartu produk menyesuaikan lebar layar secara fleksibel.
* **Desktop (> 1024px):** Tampilan penuh 3 kolom kartu produk dengan kontainer terpusat di tengah layar.

---

## Dokumentasi Modul 04 - Pemrograman JavaScript Modern (Tugas OBE)

### 1. Penerapan Fitur ES6+ & Pengolahan Data

| Fitur ES6+ | Implementasi Kode | Fungsi & Dampak Pengolahan Data |
| :--- | :--- | :--- |
| **Array Filter** | `inventaris.filter(item => item.kondisi === 'Baik')` | Menyaring dan menyajikan data alat yang siap digunakan tanpa merubah data asli. |
| **Array Map** | `inventaris.map(({ nama }) => nama)` | Mengambil properti spesifik untuk menghasilkan daftar nama seluruh alat secara ringkas. |
| **Array Reduce** | `data.reduce((sum, item) => sum + item.jumlah, 0)` | Mengkalkulasi total akumulasi seluruh unit inventaris UMKM secara otomatis. |
| **Array Find** | `data.find(item => item.id === idCari)` | Mencari dan mengembalikan objek alat secara spesifik berdasarkan parameter ID. |
| **Destructuring & Template Literals** | `({ nama, lokasi }) => ``Alat [${nama}] di ${lokasi}`` ` | Mengekstrak properti objek secara langsung dan menyusun string ringkasan yang rapi. |

### 2. Arsitektur Modul (ES Modules) & Error Handling

* **ES Modules (`js/utils.js` & `js/app.js`)**:
  * `js/utils.js` — Memisahkan fungsi utilitas pengolahan data inventaris (`ringkasInventaris`, `hitungTotalUnit`, `filterInventaris`, `cariBarangById`, `buatStatistikLengkap`) menggunakan kata kunci `export`.
  * `js/app.js` — Mengimpor fungsi utilitas menggunakan `import { ... } from './utils.js'` untuk menjaga struktur kode tetap modular dan *reusable*.
* **Error Handling & Validasi Data**:
  * Menggunakan pemeriksaan `Array.isArray(data)` dan melemparkan `TypeError` jika format data tidak valid.
  * Membungkus eksekusi sistem dalam blok `try...catch` di `app.js` untuk menangkap kesalahan *runtime* (misal: ID tidak ditemukan) secara aman tanpa menghentikan sistem.

### 3. Ringkasan Pengujian Console & Network (DevTools)

* **Tab Console**: Menampilkan seluruh statistik inventaris, tabel saringan lokasi, hasil pencarian ID, serta berhasil menangkap pesan error pada *catch block* saat menguji ID yang tidak terdaftar.
* **Tab Network**: Mengonfirmasi bahwa file `app.js` dan `utils.js` dimuat dengan status HTTP **200 OK**, membuktikan bahwa jalur (*path*) antar-modul berjalan sempurna pada lingkungan HTTP lokal.