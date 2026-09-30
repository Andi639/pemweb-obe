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

---

## Dokumentasi Modul 05 - DOM, Event, dan Web Storage (Tugas OBE)

### 1. Penerapan Manipulasi DOM & Event Handling

| Fitur / Interaksi | Event & Teknik DOM | Fungsi & Dampak UI |
| :--- | :--- | :--- |
| **Pencarian Real-Time** | `input` event + `filter()` | Menyaring daftar alat inventaris secara instan sesuai ketikan pengguna secara *case-insensitive*. |
| **Safe DOM Update** | `replaceChildren()`, `createElement()`, `textContent` | Me-render ulang elemen kartu tanpa `innerHTML` untuk mencegah celah keamanan XSS. |
| **Tombol Detail Dinamis** | Event Delegation (`closest('[data-detail]')`) | Memasang 1 listener pada container induk (`#daftar-alat`) untuk menampilkan rincian barang yang diklik. |
| **Preferensi Jumlah Item** | `change` event + `localStorage` | Menyimpan batas jumlah tampilan item (2/5/10) sehingga preferensi bertahan saat *reload*. |

### 2. Pengujian Alur Interaksi & State (DevTools)

* **Real-Time Filtering**: Saat mengetik kata kunci pada `#search`, UI langsung memperbarui daftar kartu. Jika tidak ada hasil, pesan ramah ditampilkan.
* **Event Delegation & Rincian**: Mengetuk tombol **Detail** pada kartu apa pun (termasuk hasil pencarian) akan menampilkan panel biru berisi detail lengkap barang dan tombol **Tutup Detail**.
* **Web Storage Verification**: Pilihan jumlah item tersimpan di `localStorage` bawah kunci `'limit'`. Setelah halaman dimuat ulang (*reload*), status pilihan dan jumlah kartu otomatis dipulihkan.

---

## Dokumentasi Modul 06 – Form Aksesibel dan Validasi (Tugas OBE)

### 1. Penerapan HTML Validation, JavaScript Business Validation & Aksesibilitas

| Fitur / Validasi | Event & Teknik Implementation | Fungsi & Dampak UI / Aksesibilitas |
| :--- | :--- | :--- |
| **Validasi Tanggal Perolehan** | Logical comparison (`inputDate > today`) | Memblokir pengisian tanggal di masa depan dan memicu pesan kesalahan spesifik. |
| **Whitelist Kategori** | Array Whitelist (`kategoriValid.includes()`) | Mencegah manipulasi opsi dropdown melalui *Inspect Element* (DevTools). |
| **Pesan Error Spesifik** | Branching Logic (`if-else` terpisah) | Membedakan umpan balik visual secara jelas antara field kosong dengan format tidak valid. |
| **Indikator Aksesibilitas** | Atribut `aria-invalid` & `aria-describedby` | Menghubungkan input *error* dengan pesan kesalahan agar terbaca oleh *screen reader*. |
| **Autofocus Error** | Event Listener `submit` + `.focus()` | Secara otomatis memindahkan fokus kursor ke elemen input tidak valid pertama saat disubmit. |

### 2. Pengujian Alur Interaksi, DevTools & Aksesibilitas

* **Validation & Whitelist Testing:** Pengujian manipulasi nilai opsi `<option value="Hack">` pada DevTools berhasil ditangkal oleh sistem dengan menampilkan pesan *"Format tidak valid: Pilih kategori dari opsi yang tersedia."*
* **Error Messaging & Border State:** Ketika input kosong disubmit, field ditandai dengan *border* merah 2px, atribut `aria-invalid="true"`, dan pesan kesalahan *"wajib diisi"* ditayangkan di bawah input.
* **Accessible Focus Management:** Saat pengiriman formulir gagal akibat data tidak valid, fokus keyboard (*autofocus*) langsung berpindah ke bidang input bermasalah paling atas untuk memudahkan navigasi pengguna.