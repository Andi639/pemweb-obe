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

// 1. Seleksi Elemen DOM Inventaris
const searchInput = document.querySelector('#search');
const daftarContainer = document.querySelector('#daftar-alat');

// 2. Membuat Elemen Panel Detail Dinamis
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

    const btnDetail = document.createElement('button');
    btnDetail.type = 'button';
    btnDetail.textContent = 'Detail';
    btnDetail.dataset.detail = item.id;
    btnDetail.style.marginTop = '0.5rem';

    article.append(title, info, btnDetail);
    daftarContainer.append(article);
  });
}

// 5. Render Awal Data Inventaris
if (typeof inventarisDenganLokasi !== 'undefined') {
  renderItems(inventarisDenganLokasi);
}

// 6. Event Listener Input Pencarian Real-Time Inventaris
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
const limitSelect = document.querySelector('#limit');
const savedLimit = localStorage.getItem('limit') ?? '5';

if (limitSelect) {
  limitSelect.value = savedLimit;
  renderItems(inventarisDenganLokasi.slice(0, Number(savedLimit)));

  limitSelect.addEventListener('change', (event) => {
    const newLimit = event.target.value;
    localStorage.setItem('limit', newLimit);
    renderItems(inventarisDenganLokasi.slice(0, Number(newLimit)));
  });
}

// ==========================================
// MODUL 06: FORM VALIDATION & HANDLER SUBMIT
// ==========================================

function validateForm(formData) {
  const errors = {};
  const kategoriValid = ['Pengemasan', 'Pewarnaan', 'Kerajinan', 'Produksi'];

  const nama = String(formData.get('nama') ?? '').trim();
  const kategori = String(formData.get('kategori') ?? '').trim();
  const jumlahVal = formData.get('jumlah');
  const jumlah = jumlahVal !== '' && jumlahVal !== null ? Number(jumlahVal) : NaN;
  const kondisi = String(formData.get('kondisi') ?? '').trim();
  const tanggal = String(formData.get('tanggal_perolehan') ?? '').trim();

  // 1. Validasi Nama Alat
  if (!nama) {
    errors.nama = 'Nama alat wajib diisi.';
  } else if (nama.length < 3) {
    errors.nama = 'Format tidak valid: Nama alat minimal 3 karakter.';
  }

  // 2. Validasi Kategori
  if (!kategori) {
    errors.kategori = 'Pilih kategori alat.';
  } else if (!kategoriValid.includes(kategori)) {
    errors.kategori = 'Format tidak valid: Pilih kategori dari opsi yang tersedia.';
  }

  // 3. Validasi Jumlah
  if (jumlahVal === '' || jumlahVal === null) {
    errors.jumlah = 'Jumlah alat wajib diisi.';
  } else if (!Number.isInteger(jumlah) || jumlah < 0) {
    errors.jumlah = 'Format tidak valid: Jumlah harus berupa angka bulat 0 atau lebih.';
  }

  // 4. Validasi Kondisi
  if (!kondisi) {
    errors.kondisi = 'Pilih kondisi alat.';
  }

  // 5. Validasi Tanggal Perolehan
  if (!tanggal) {
    errors.tanggal_perolehan = 'Tanggal perolehan wajib diisi.';
  } else {
    const inputDate = new Date(tanggal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(inputDate.getTime())) {
      errors.tanggal_perolehan = 'Format tidak valid: Tanggal tidak sah.';
    } else if (inputDate > today) {
      errors.tanggal_perolehan = 'Format tidak valid: Tanggal perolehan tidak boleh melebihi tanggal hari ini.';
    }
  }

  return errors;
}

const formAlat = document.querySelector('#form-alat');
const statusForm = document.querySelector('#form-status');
const previewData = document.querySelector('#preview-data');

if (formAlat) {
  formAlat.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formAlat);
    const errors = validateForm(formData);

    // Reset error
    document.querySelectorAll('.error').forEach((el) => {
      el.textContent = '';
    });

    formAlat.querySelectorAll('input, select').forEach((el) => {
      el.removeAttribute('aria-invalid');
      el.style.border = '1px solid #ccc';
    });

    if (previewData) previewData.style.display = 'none';

    // Jika ada Error
    if (Object.keys(errors).length > 0) {
      for (const [field, message] of Object.entries(errors)) {
        const errorEl = document.querySelector(`#error-${field}`);
        if (errorEl) {
          errorEl.textContent = message;
        }

        const inputEl = formAlat.elements[field];
        if (inputEl) {
          inputEl.setAttribute('aria-invalid', 'true');
          inputEl.style.border = '2px solid red';
        }
      }

      const firstErrorField = Object.keys(errors)[0];
      if (formAlat.elements[firstErrorField]) {
        formAlat.elements[firstErrorField].focus();
      }

      if (statusForm) {
        statusForm.textContent = '⚠ Periksa kembali data yang belum valid.';
        statusForm.style.color = 'red';
      }
      return;
    }

    // Jika Valid
    if (statusForm) {
      statusForm.textContent = '✅ Data valid dan berhasil diproses!';
      statusForm.style.color = 'green';
    }

    if (previewData) {
      previewData.style.display = 'block';
      previewData.innerHTML = `
        <h3 style="margin-top:0; color:#0d6efd;">Preview Data Alat Baru:</h3>
        <ul style="margin:0; padding-left:1.2rem; line-height:1.6;">
          <li><strong>Nama Alat:</strong> ${formData.get('nama')}</li>
          <li><strong>Kategori:</strong> ${formData.get('kategori')}</li>
          <li><strong>Jumlah:</strong> ${formData.get('jumlah')} Unit</li>
          <li><strong>Kondisi:</strong> ${formData.get('kondisi')}</li>
          <li><strong>Tanggal Perolehan:</strong> ${formData.get('tanggal_perolehan')}</li>
        </ul>
      `;
    }
  });
}

// ==========================================
// TUGAS OBE: MINI DASHBOARD INTEGRASI REST API
// ==========================================

const USE_LOCAL_DATA = false;
const endpoint = USE_LOCAL_DATA
  ? './data/users.json'
  : 'https://jsonplaceholder.typicode.com/users';

const output = document.querySelector('#api-output');
const message = document.querySelector('#api-message');
const btnRetry = document.querySelector('#btn-retry');
const searchUserInput = document.querySelector('#search-user');

let allUsers = [];

// Fungsi Render dengan Handling Status Pesan Dinamis
function renderUsers(usersList) {
  if (!output) return;
  output.replaceChildren();

  // EMPTY STATE: Jika data kosong / pencarian tidak ditemukan
  if (usersList.length === 0) {
    // Sembunyikan atau ubah pesan status hijau
    if (message) {
      message.textContent = 'Data tidak ditemukan.';
      message.style.color = '#856404'; // Warna netral/peringatan
    }

    const emptyCard = document.createElement('li');
    emptyCard.style.padding = '12px';
    emptyCard.style.backgroundColor = '#fff3cd';
    emptyCard.style.color = '#856404';
    emptyCard.style.borderRadius = '6px';
    emptyCard.style.listStyle = 'none'; // Hilangkan titik bullet
    emptyCard.textContent = '⚠️ Data pengguna tidak ditemukan.';
    output.append(emptyCard);
    return;
  }

  // SUCCESS STATE: Kembalikan pesan status hijau dengan jumlah data yang sesuai
  if (message) {
    message.textContent = `✅ Berhasil memuat ${usersList.length} data dari REST API.`;
    message.style.color = 'green';
  }

  // Render daftar pengguna
  usersList.forEach((user) => {
    const li = document.createElement('li');
    li.style.padding = '10px 15px';
    li.style.borderBottom = '1px solid #eee';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';

    li.innerHTML = `
      <div>
        <strong>👤 ${user.name}</strong> <br>
        <small style="color: #666;">✉️ ${user.email}</small>
      </div>
      <span style="font-size: 0.8rem; background: #e2e3e5; padding: 2px 6px; border-radius: 4px;">ID: ${user.id}</span>
    `;
    output.append(li);
  });
}

// Fungsi utama Fetch dengan Handling Loading & Error State
async function loadUsers() {
  if (!output || !message) return;

  // LOADING STATE
  if (btnRetry) btnRetry.style.display = 'none';
  message.textContent = '⏳ Memuat data dari server API...';
  message.style.color = '#007bff';

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP Error status: ${response.status}`);
    }

    allUsers = await response.json();
    renderUsers(allUsers); // Success state

    message.textContent = `✅ Berhasil memuat ${allUsers.length} data dari REST API.`;
    message.style.color = 'green';
  } catch (error) {
    // ERROR STATE
    console.error('Terjadi kesalahan Fetch:', error);
    message.textContent = '❌ Gagal terhubung ke API. Silakan periksa koneksi internet Anda.';
    message.style.color = 'red';
    if (btnRetry) btnRetry.style.display = 'inline-block';
  }
}

// Event Listeners
if (searchUserInput) {
  searchUserInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const filteredUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(keyword)
    );
    renderUsers(filteredUsers);
  });
}

if (btnRetry) {
  btnRetry.addEventListener('click', loadUsers);
}

// Jalankan fungsi saat modul dimuat
loadUsers();

// ==========================================
// LATIHAN NO 3: POST REQUEST EXAMPLE
// ==========================================

async function createUser(userData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const data = await response.json();
    console.log('--- Hasil POST Request (User Baru Berhasil Dibuat) ---');
    console.log(data);
    return data;
  } catch (error) {
    console.error('Gagal mengirim data POST:', error.message);
  }
}

// Uji coba mengirim data dummy user baru
createUser({
  name: 'Andi Muhammad Arsa',
  username: 'arsa',
  email: 'AndiMuhammadArsa@gmail.com'
});