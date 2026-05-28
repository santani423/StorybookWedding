// types/orderTypes.ts

/**
 * Data Utama Kedua Mempelai beserta Orang Tua
 */
export interface Mempelai {
  id: number;
  id_user: number;
  nama_pria: string;
  nama_panggilan_pria: string;
  nama_ibu_pria: string;
  nama_ayah_pria: string;
  nama_wanita: string;
  nama_panggilan_wanita: string;
  nama_ibu_wanita: string;
  nama_ayah_wanita: string;
  posisi_mempelai: string; // Menggunakan string literal union jika nilainya sudah pasti
  created_at: string;
  updated_at: string;
}

/**
 * Data Media Foto/Galeri Album Undangan
 */
export interface Album {
  id: number;
  id_user: number;
  album: string; // Menyimpan nama file gambar atau URL gambar
}

/**
 * Data Cerita / Kisah Perjalanan Cinta (Love Journey)
 */
export interface Cerita {
  id: number;
  id_user: number;
  tanggal_cerita: string;
  judul_cerita: string;
  isi_cerita: string;
  created_at: string;
  updated_at: string;
}

/**
 * Kutipan / Ucapan Mutiara Pernikahan
 */
export interface Quote {
  id_quote: number;
  isi_quote: string;
  sumber_quote: string;
  id_user: number;
}

/**
 * Data Tambahan Undangan (Aset foto fisik, maps, konfigurasi WhatsApp, dll)
 */
export interface AdditionalData {
  id: number;
  id_user: number;
  foto_pria: string;
  foto_wanita: string;
  maps: string;
  video: string;
  kunci: string;
  salam_pembuka: string;
  token_wa: string | null;
  salam_wa_atas: string;
  salam_wa_bawah: string;
  created_at: string;
  updated_at: string;
}

/**
 * Detail Informasi Acara (Akad, Resepsi, Ngunduh Mantu, dll)
 */
export interface Acara {
  id_acara: number;
  nama_acara: string;
  tgl_acara: string;
  waktu_mulai: string;
  waktu_akhir: string;
  tempat_acara: string;
  alamat_acara: string;
  maps: string;
  set_countdown: string;
  id_user: number;
}

/**
 * Data Rekening untuk Fitur Gift / Amplop Digital
 */
export interface Rekening {
  id: number;
  id_user: number;
  nama_bank: string;
  no_rekening: string;
  nama_pemilik: string;
  qrcode_bank: string;
}

/**
 * Objek User Pemilik Undangan yang Membungkus Semua Relasi Data Pernikahan
 */
export interface User {
  id: number;
  hp: string;
  email: string;
  username: string;
  id_unik: string;
  created_at: string;
  token: string | null;
  created_token: string | null;
  mempelai: Mempelai;
  album: Album[];
  cerita: Cerita[];
  quote: Quote;
  data: AdditionalData;
  acara: Acara[];
  rekening: Rekening[];
  rules: Rolus;
}

/**
 * Informasi Detail Domain dan Tema yang Digunakan oleh Undangan
 */
export interface DomainData {
  id: number;
  id_user: number;
  domain: string;
  theme: string;
  id_paket: number;
  status: number;
  created_at: string;
  updated_at: string;
  user: User; // Relasi ke objek User di atas
}

export interface Komentar {
  id: number;
  id_user: number;
  nama_komentar: string;
  isi_komentar: string;
  created_at: string;
  updated_at: string;
}

export interface GetKomentarResponse {
  message: string;
  total: number;
  data: Komentar[];
}

/**
 * Rolus menentukn settingan tema dan domain yang digunakan untuk menampilkan data di halaman undangan
 */
export interface Rolus {
  id: number;
  id_user: number;
  sampul: number;
  mempelai: number;
  acara: number;
  komen: number;
  gallery: number;
  cerita: number;
  lokasi: number;
  prokes: number;
  qrcode: number;
  hadiah: number;
  quote: number;
  created_at: string;
  updated_at: string;
}

export interface TamuRsvp {
  id: number;
  tamu_id: number;
  massage: string;
  created_at: string;
  updated_at: string;
}

export interface Tamu {
  id_tamu: number;
  nama_tamu: string;
  nama_slug: string;
  alamat_tamu: string;
  alamat_slug: string;
  no_wa: string;
  qrcode: string;
  id_user: number;
  tgl_kirim: string;
  status_kirim: string;
  status: string | null;
  waktu_hadir: string | null;
  rsvp?: TamuRsvp | null;
}

/**
 * Struktur Utama Respons API Saat Melakukan Fetch Detail Domain Undangan
 */
export interface DomainDetailsResponse {
  message: string;
  data: DomainData;
  tamu: Tamu;
}
