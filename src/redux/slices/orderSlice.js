import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indexPy: 0,
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

    setIndexPy: (state, action) => {
      state.indexPy = action.payload;
    },
  },
});

export const { increment, decrement, setIndexPy } =
  orderSlice.actions;

export default orderSlice.reducer;