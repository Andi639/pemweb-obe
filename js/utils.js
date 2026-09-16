// Fungsi statistik inventaris dengan export (ES Module)
export function ringkasInventaris(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data harus berupa array');
  }

  return {
    jenisAlat: data.length,
    totalUnit: data.reduce((sum, item) => sum + item.jumlah, 0),
    perluCek: data.filter(item => item.kondisi !== 'Baik').length
  };
}

// --- menambahkan Fungsi Utilitas untuk Tugas OBE ---

// Validasi array dasar
function validasiArray(data) {
  if (!Array.isArray(data)) {
    throw new TypeError('Data yang dimasukkan harus berupa array.');
  }
}

// Hitung total unit inventaris
export function hitungTotalUnit(data) {
  validasiArray(data);
  return data.reduce((total, item) => total + item.jumlah, 0);
}

// Filter data berdasarkan kriteria (kondisi/lokasi)
export function filterInventaris(data, kriteria) {
  validasiArray(data);
  const { kondisi, lokasi } = kriteria;
  return data.filter(item => {
    const cocokKondisi = kondisi ? item.kondisi === kondisi : true;
    const cocokLokasi = lokasi ? item.lokasi === lokasi : true;
    return cocokKondisi && cocokLokasi;
  });
}

// Cari barang spesifik berdasarkan ID
export function cariBarangById(data, id) {
  validasiArray(data);
  const item = data.find(bar => bar.id === id);
  if (!item) {
    throw new Error(`Barang dengan ID ${id} tidak ditemukan.`);
  }
  return item;
}

// Ringkasan statistik lengkap inventaris
export function buatStatistikLengkap(data) {
  validasiArray(data);
  return {
    totalJenis: data.length,
    totalUnit: hitungTotalUnit(data),
    kondisiBaik: data.filter(item => item.kondisi === 'Baik').length,
    perluPerbaikan: data.filter(item => item.kondisi !== 'Baik').length,
    daftarNama: data.map(item => item.nama)
  };
}