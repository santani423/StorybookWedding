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
  posisi_mempelai: string;
  created_at: string;
  updated_at: string;
}

export interface Album {
  id: number;
  id_user: number;
  album: string;
}

export interface Cerita {
  id: number;
  id_user: number;
  tanggal_cerita: string;
  judul_cerita: string;
  isi_cerita: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id_quote: number;
  isi_quote: string;
  sumber_quote: string;
  id_user: number;
}

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

export interface Rekening {
  id: number;
  id_user: number;
  nama_bank: string;
  no_rekening: string;
  nama_pemilik: string;
  qrcode_bank: string;
}

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
}

export interface DomainData {
  id: number;
  id_user: number;
  domain: string;
  theme: string;
  id_paket: number;
  status: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface DomainDetailsResponse {
  message: string;
  data: DomainData;
}