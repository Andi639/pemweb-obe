// --- 1. GABUNGAN IMPORT DARI utils.js ---
import { 
  ringkasInventaris,
  hitungTotalUnit, 
  filterInventaris, 
  cariBarangById, 
  buatStatistikLengkap 
} from './utils.js';

// --- DATA INVENTARIS AWAL ---
const inventaris = [
  { id: 1, nama: 'Alat Pres Kemasan Amplang', kategori: 'Pengemasan', jumlah: 4, kondisi: 'Baik' },
  { id: 2, nama: 'Timbangan Digital Batik', kategori: 'Pewarnaan', jumlah: 6, kondisi: 'Baik' },
  { id: 3, nama: 'Mesin Pemotong Batok Kelapa', kategori: 'Kerajinan', jumlah: 3, kondisi: 'Perlu Perbaikan' },
  { id: 4, nama: 'Kuali Besar Pengolahan Fish Crackers', kategori: 'Produksi', jumlah: 10, kondisi: 'Baik' }
];

console.log('--- Data Inventaris awal ---');
console.table(inventaris);

// Filter kondisi Baik
const alatBaik = inventaris.filter(item => item.kondisi === 'Baik');
console.log('--- Alat dengan Kondisi Baik ---');
console.table(alatBaik);

// Map nama alat
const namaAlat = inventaris.map(({ nama }) => nama);
console.log('--- Daftar Nama Alat ---');
console.log(namaAlat);

// Reduce total unit
const totalUnit = inventaris.reduce((total, item) => total + item.jumlah, 0);
console.log('--- Total Seluruh Unit Alat ---');
console.log(`Total unit: ${totalUnit} unit`);

// Panggil fungsi ringkasInventaris dengan Error Handling
try {
  console.log('--- Object Statistik Inventaris (Import dari utils.js) ---');
  console.log(ringkasInventaris(inventaris));
} catch (error) {
  console.error('Terjadi kesalahan:', error.message);
}

// --- DATA INVENTARIS DENGAN LOKASI ---
const inventarisDenganLokasi = [
  { id: 1, nama: 'Alat Pres Kemasan Amplang', kategori: 'Pengemasan', jumlah: 4, kondisi: 'Baik', lokasi: 'Bengkel Produksi' },
  { id: 2, nama: 'Timbangan Digital Batik', kategori: 'Pewarnaan', jumlah: 6, kondisi: 'Baik', lokasi: 'Sentra Kerajinan' },
  { id: 3, nama: 'Mesin Pemotong Batok Kelapa', kategori: 'Kerajinan', jumlah: 3, kondisi: 'Perlu Cek', lokasi: 'Bengkel Produksi' },
  { id: 4, nama: 'Kuali Besar Pengolahan', kategori: 'Produksi', jumlah: 10, kondisi: 'Baik', lokasi: 'Gudang Utama' }
];

// Filter alat berdasarkan lokasi tertentu
const lokasiTarget = 'Bengkel Produksi';
const alatDiBengkel = inventarisDenganLokasi.filter(item => item.lokasi === lokasiTarget);

console.log(`--- Daftar Alat di Lokasi: ${lokasiTarget} ---`);
console.table(alatDiBengkel);

// Fungsi pencarian alat berdasarkan ID
function cariAlatDenganId(data, idCari) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data inventaris harus berupa array');
  }
  const hasil = data.find(item => item.id === idCari);
  return hasil ? hasil : `Alat dengan ID ${idCari} tidak ditemukan.`;
}

console.log('--- Hasil Pencarian ID: 2 ---');
console.log(cariAlatDenganId(inventarisDenganLokasi, 2));

console.log('--- Hasil Pencarian ID: 99 (Tidak Ada) ---');
console.log(cariAlatDenganId(inventarisDenganLokasi, 99));

// Fungsi buat ringkasan alat
function buatRingkasanAlat(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data inventaris harus berupa array');
  }
  return data.map(({ nama, kategori, jumlah, kondisi, lokasi }) => 
    `Alat [${nama}] kategori (${kategori}) berjumlah${jumlah} unit dengan kondisi ${kondisi} tersimpan di${lokasi}.`
  );
}

console.log('--- Ringkasan Setiap Alat ---');
const daftarRingkasan = buatRingkasanAlat(inventarisDenganLokasi);
daftarRingkasan.forEach(ringkasan => console.log(ringkasan));

// Eksekusi pengolahan data dengan Error Handling (try-catch)
try {
  console.log('=== HASIL INVENTARIS ===');

  const statistikLengkap = buatStatistikLengkap(inventarisDenganLokasi);
  console.log('--- Statistik Lengkap Inventaris ---');
  console.log(statistikLengkap);

  const filterDiBengkel = filterInventaris(inventarisDenganLokasi, { lokasi: 'Bengkel Produksi' });
  console.log('--- Filter Lokasi (Bengkel Produksi) ---');
  console.table(filterDiBengkel);

  const barangDitemukan = cariBarangById(inventarisDenganLokasi, 3);
  console.log('--- Pencarian Barang ID 3 ---');
  console.log(`Barang ditemukan: ${barangDitemukan.nama} (${barangDitemukan.lokasi})`);

  console.log('--- Menguji Catch Block Error Handling ---');
  cariBarangById(inventarisDenganLokasi, 999);

} catch (error) {
  console.error('Terjadi Kesalahan Aplikasi:', error.message);
}

// --- (Safe DOM Update, Pencarian & Event Delegation) ---

// 1. Seleksi Elemen DOM
const searchInput = document.querySelector('#search');
const daftarContainer = document.querySelector('#daftar-alat');

// 2. Membuat Elemen Panel Detail Dinamis (Di atas container daftar)
const areaDetail = document.createElement('div');
areaDetail.id = 'area-detail';
areaDetail.style.display = 'none';
areaDetail.style.padding = '1rem';
areaDetail.style.backgroundColor = '#eef6ff';
areaDetail.style.border = '1px solid #b6d4fe';
areaDetail.style.borderRadius = '6px';
areaDetail.style.marginBottom = '1rem';

if (daftarContainer && daftarContainer.parentNode) {
  daftarContainer.parentNode.insertBefore(areaDetail, daftarContainer);
}

// 3. Fungsi Tampilkan Detail
function tampilkanDetail(item) {
  areaDetail.replaceChildren();

  const judul = document.createElement('h4');
  judul.style.marginTop = '0';
  judul.textContent = `Rincian Detail: ${item.nama}`;

  const detailInfo = document.createElement('p');
  detailInfo.textContent = `ID Alat: ${item.id} | Kategori: ${item.kategori} | Total Stok: ${item.jumlah} Unit | Status Kondisi: ${item.kondisi} | Lokasi Penyimpanan: ${item.lokasi}`;

  const btnTutup = document.createElement('button');
  btnTutup.type = 'button';
  btnTutup.textContent = 'Tutup Detail';
  btnTutup.style.marginTop = '0.5rem';
  btnTutup.addEventListener('click', () => {
    areaDetail.style.display = 'none';
  });

  areaDetail.append(judul, detailInfo, btnTutup);
  areaDetail.style.display = 'block';
}

// 4. Fungsi Safe DOM Rendering untuk Daftar Card
function renderItems(items) {
  if (!daftarContainer) return;
  
  daftarContainer.replaceChildren();

  if (items.length === 0) {
    const pesanKosong = document.createElement('p');
    pesanKosong.className = 'pesan-kosong';
    pesanKosong.textContent = 'Alat tidak ditemukan. Coba kata kunci lain.';
    daftarContainer.append(pesanKosong);
    return;
  }

  items.forEach(item => {
    const article = document.createElement('article');
    article.className = 'card';
    article.style.marginBottom = '1rem';

    const title = document.createElement('h3');
    title.textContent = item.nama;

    const info = document.createElement('p');
    info.textContent = `Kategori: ${item.kategori} | Jumlah: ${item.jumlah} unit | Kondisi: ${item.kondisi} | Lokasi: ${item.lokasi}`;

    // Tombol Detail dengan Atribut dataset
    const btnDetail = document.createElement('button');
    btnDetail.type = 'button';
    btnDetail.textContent = 'Detail';
    btnDetail.dataset.detail = item.id;
    btnDetail.style.marginTop = '0.5rem';

    article.append(title, info, btnDetail);
    daftarContainer.append(article);
  });
}

// 5. Render Awal Data
if (typeof inventarisDenganLokasi !== 'undefined') {
  renderItems(inventarisDenganLokasi);
}

// 6. Event Listener Input Pencarian Real-Time (Latihan 1)
if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const keyword = event.target.value.toLowerCase().trim();

    const hasilFilter = inventarisDenganLokasi.filter(item =>
      item.nama.toLowerCase().includes(keyword)
    );

    renderItems(hasilFilter);
  });
}

// 7. Event Delegation untuk Tombol Detail
if (daftarContainer) {
  daftarContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-detail]');
    if (!button) return;

    const idBarang = Number(button.dataset.detail);
    const barangDipilih = inventarisDenganLokasi.find(item => item.id === idBarang);

    if (barangDipilih) {
      tampilkanDetail(barangDipilih);
    }
  });
}

// --- Menyimpan Preferensi Jumlah Item dengan localStorage ---

// 1. Seleksi Elemen Dropdown Limit
const limitSelect = document.querySelector('#limit');

// 2. Ambil nilai preferensi yang tersimpan di localStorage (default '5' jika belum ada)
const savedLimit = localStorage.getItem('limit') ?? '5';

if (limitSelect) {
  // Set nilai dropdown sesuai preferensi tersimpan
  limitSelect.value = savedLimit;

  // Render awal data sesuai batasan jumlah item yang tersimpan
  renderItems(inventarisDenganLokasi.slice(0, Number(savedLimit)));

  // 3. Event Listener ketika Pilihan Jumlah Item Diubah
  limitSelect.addEventListener('change', (event) => {
    const newLimit = event.target.value;
    
    // Simpan pilihan ke localStorage (data non-sensitif)
    localStorage.setItem('limit', newLimit);
    
    // Render ulang kartu sesuai jumlah batas baru
    renderItems(inventarisDenganLokasi.slice(0, Number(newLimit)));
  });
}