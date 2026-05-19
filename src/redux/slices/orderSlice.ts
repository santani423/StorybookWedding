// src/redux/slices/orderSlice.js (atau ubah ekstensi ke .ts jika menggunakan TypeScript murni)

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Album, Mempelai } from "@/types/orderTypes";
import { clear } from "console";

export interface OrderState {
  indexPy: number;
  posisiMempelai: string;
  key: string;
  mempelai: Mempelai; // Mendefinisikan sebagai Array dari objek Mempelai
  album: Album[];
}

// Initial state yang sudah sinkron dengan interface (menggunakan array kosong [])
const initialState: OrderState = {
  indexPy: 0,
  posisiMempelai: "",
  key: "",
  mempelai: {} as Mempelai, // Inisialisasi sebagai objek kosong yang di-cast ke tipe Mempelai
  album: [],
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
    clearAlbum: (state) => {
      state.album = [];
    }

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
  clearAlbum } =
  orderSlice.actions;

export default orderSlice.reducer;