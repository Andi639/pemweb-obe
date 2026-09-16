// Import fungsi dari utils.js di baris paling atas
import { ringkasInventaris } from './utils.js';

// Data Inventaris
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

// Panggil fungsi yang di-import dari utils.js dengan Error Handling
try {
  console.log('--- Object Statistik Inventaris (Import dari utils.js) ---');
  console.log(ringkasInventaris(inventaris));
} catch (error) {
  console.error('Terjadi kesalahan:', error.message);
}
// Filter Alat Berdasarkan Lokasi ---

// Menambahkan properti 'lokasi' pada array inventaris
const inventarisDenganLokasi = [
  { id: 1, nama: 'Alat Pres Kemasan Amplang', kategori: 'Pengemasan', jumlah: 4, kondisi: 'Baik', lokasi: 'Bengkel Produksi' },
  { id: 2, nama: 'Timbangan Digital Batik', kategori: 'Pewarnaan', jumlah: 6, kondisi: 'Baik', lokasi: 'Sentra Kerajinan' },
  { id: 3, nama: 'Mesin Pemotong Batok Kelapa', kategori: 'Kerajinan', jumlah: 3, kondisi: 'Perlu Cek', lokasi: 'Bengkel Produksi' },
  { id: 4, nama: 'Kuali Besar Pengolahan', kategori: 'Produksi', jumlah: 10, kondisi: 'Baik', lokasi: 'Gudang Utama' }
];

// MenFilter alat berdasarkan lokasi tertentu (Contoh: "Bengkel Produksi")
const lokasiTarget = 'Bengkel Produksi';
const alatDiBengkel = inventarisDenganLokasi.filter(item => item.lokasi === lokasiTarget);

console.log(`--- Daftar Alat di Lokasi: ${lokasiTarget} ---`);
console.table(alatDiBengkel);

// Mencari Alat Berdasarkan ID Menggunakan find ---

function cariAlatDenganId(data, idCari) {
  // Error handling jika data bukan array
  if (!Array.isArray(data)) {
    throw new TypeError('Data inventaris harus berupa array');
  }

  // Cari item menggunakan method find
  const hasil = data.find(item => item.id === idCari);

  // Return objek alat jika ketemu, atau pesan jika tidak ada
  return hasil ? hasil : `Alat dengan ID ${idCari} tidak ditemukan.`;
}

// Uji fungsi ke Console
console.log('--- Hasil Pencarian ID: 2 ---');
console.log(cariAlatDenganId(inventarisDenganLokasi, 2));

console.log('--- Hasil Pencarian ID: 99 (Tidak Ada) ---');
console.log(cariAlatDenganId(inventarisDenganLokasi, 99));

// Ringkasan Alat dengan Destructuring & Template Literal ---

function buatRingkasanAlat(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data inventaris harus berupa array');
  }

  // Iterasi dan ekstrak properti dengan destructuring, lalu buat kita string dengan template literal
  return data.map(({ nama, kategori, jumlah, kondisi, lokasi }) => 
    `Alat [${nama}] kategori (${kategori}) berjumlah${jumlah} unit dengan kondisi ${kondisi} tersimpan di${lokasi}.`
  );
}

// Tampilkan hasil ringkasan ke Console
console.log('--- Ringkasan Setiap Alat ---');
const daftarRingkasan = buatRingkasanAlat(inventarisDenganLokasi);
daftarRingkasan.forEach(ringkasan => console.log(ringkasan));

// --- Mengolahan Data & Import dari utils.js ---

// Import fungsi-fungsi baru dari utils.js
import { 
  hitungTotalUnit, 
  filterInventaris, 
  cariBarangById, 
  buatStatistikLengkap 
} from './utils.js';

// Eksekusi pengolahan data dengan Error Handling (try-catch)
try {
  console.log('=== HASIL INVENTARIS ===');

  // Menampilkan statistik lengkap
  const statistikLengkap = buatStatistikLengkap(inventarisDenganLokasi);
  console.log('--- Statistik Lengkap Inventaris ---');
  console.log(statistikLengkap);

  // Menyaring alat berdasarkan lokasi spesifik
  const alatDiBengkel = filterInventaris(inventarisDenganLokasi, { lokasi: 'Bengkel Produksi' });
  console.log('--- Filter Lokasi (Bengkel Produksi) ---');
  console.table(alatDiBengkel);

  // Uji pencarian ID yang ada (ID: 3)
  const barangDitemukan = cariBarangById(inventarisDenganLokasi, 3);
  console.log('--- Pencarian Barang ID 3 ---');
  console.log(`Barang ditemukan: ${barangDitemukan.nama} (${barangDitemukan.lokasi})`);

  // Uji Error Handling (Mencari ID yang tidak terdaftar untuk memicu catch)
  console.log('--- Menguji Catch Block Error Handling ---');
  cariBarangById(inventarisDenganLokasi, 999);

} catch (error) {
  console.error('Terjadi Kesalahan Aplikasi:', error.message);
}