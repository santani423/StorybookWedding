// src/redux/slices/orderSlice.js (atau ubah ekstensi ke .ts jika menggunakan TypeScript murni)

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Album,
  Mempelai,
  Cerita,
  DomainData,
  AdditionalData,
  Acara,
  Rekening,
  Rolus,
  Tamu,
} from "@/types/orderTypes";
import { clear } from "console";

export interface OrderState {
  indexPy: number;
  posisiMempelai: string;
  key: string;
  mempelai: Mempelai; // Mendefinisikan sebagai Array dari objek Mempelai
  album: Album[];
  cerita: Cerita[];
  data?: DomainData;
  additionalData?: AdditionalData;
  acara?: Acara[];
  rekening?: Rekening[];
  rolus?: Rolus;
  tamu?: Tamu;
}

// Initial state yang sudah sinkron dengan interface (menggunakan array kosong [])
const initialState: OrderState = {
  indexPy: 0,
  posisiMempelai: "",
  key: "",
  mempelai: {} as Mempelai, // Inisialisasi sebagai objek kosong yang di-cast ke tipe Mempelai
  album: [],
  cerita: [],
  data: undefined,
  additionalData: {} as AdditionalData,
  acara: [],
  rekening: [],
  rolus: {} as Rolus,
  tamu: {} as Tamu,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state) => {
      state.indexPy += 1;
    },

    decrement: (state) => {
      state.indexPy -= 1;
    },

    // Menggunakan PayloadAction untuk typing payload yang lebih aman di TypeScript
    setIndexPy: (state, action: PayloadAction<number>) => {
      state.indexPy = action.payload;
    },

    setKey: (state, action: PayloadAction<string>) => {
      state.key = action.payload;
    },

    setMempelai: (state, action: PayloadAction<Mempelai>) => {
      state.mempelai = action.payload;
    },

    clearMempelai: (state) => {
      state.mempelai = {} as Mempelai;
    },
    setPosisiMempelai: (state, action: PayloadAction<string>) => {
      state.posisiMempelai = action.payload;
    },
    setAlbum: (state, action: PayloadAction<Album[]>) => {
      state.album = action.payload;
    },
    setCerita: (state, action: PayloadAction<Cerita[]>) => {
      state.cerita = action.payload;
    },
    clearAlbum: (state) => {
      state.album = [];
    },
    clearCerita: (state) => {
      state.cerita = [];
    },
    setData: (state, action: PayloadAction<DomainData>) => {
      state.data = action.payload;
    },
    setAdditionalData: (state, action: PayloadAction<AdditionalData>) => {
      state.additionalData = action.payload;
    },
    setAcara: (state, action: PayloadAction<Acara[]>) => {
      state.acara = action.payload;
    },
    clearAcara: (state) => {
      state.acara = [];
    },
    setRekening: (state, action: PayloadAction<Rekening[]>) => {
      state.rekening = action.payload;
    },
    clearRekening: (state) => {
      state.rekening = [];
    },

    setRolus: (state, action: PayloadAction<Rolus>) => {
      state.rolus = action.payload;
    },
    setTamu: (state, action: PayloadAction<Tamu>) => {
      state.tamu = action.payload;
    },

  },
});

export const {
  increment,
  decrement,
  setIndexPy,
  setKey,
  setMempelai,
  clearMempelai,
  setPosisiMempelai,
  setAlbum,
  setCerita,
  clearAlbum,
  clearCerita,
  setData,
  setAdditionalData,
  setAcara,
  clearAcara,
  setRekening,
  clearRekening,
  setRolus,
  setTamu,
} = orderSlice.actions;

export default orderSlice.reducer;
