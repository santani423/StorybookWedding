import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  itemEdit: null,
  device: null,
  assets: [
    {
      name: "dress-code",
      src: "/assets/dress-code.png",
      style: {
        position: "top",
        size: "left",
        xMedia: [
          {
            device: "default",
            position: "72",
            size: "32",
          },
          {
            device: "xxs",
            py: "72",
            size: "32",
          },
          {
            device: "xs",
            py: "72",
            size: "32",
          },
          {
            device: "s",
            py: "72",
            size: "32",
          },
          {
            device: "iphone",
            py: "72",
            size: "32",
          },
          {
            device: "md",
            py: "72",
            size: "32",
          },
          {
            device: "md2",
            py: "72",
            size: "32",
          },
          {
            device: "md3",
            py: "72",
            size: "32",
          },
          {
            device: "tb",
            py: "72",
            size: "32",
          },
          {
            device: "lg",
            py: "72",
            size: "32",
          },
          {
            device: "xl",
            py: "72",
            size: "32",
          },
          {
            device: "2xl",
            py: "72",
            size: "32",
          },
        ],
      },
    },
    // {
    //   name: "alamat",
    //   src: "/assets/alamat.png",
    // },
    // {
    //   name: "rsvp",
    //   src: "/assets/rsvp.png",
    // },
    // {
    //   name: "couple",
    //   src: "/assets/couple.png",
    // },
    // {
    //   name: "love-story",
    //   src: "/assets/love-story.png",
    // },
    // {
    //   name: "gift",
    //   src: "/assets/gift.png",
    // },
    // {
    //   name: "gallery",
    //   src: "/assets/gallery.png",
    // },
  ],
  style: {
    dressCode: {
      name: "Dress Code",
      xMedia: {
        name: "XMedia",
      },
    },
    assets: [
      {
        name: "dress-code",
        xMedia: [
          {
            name: "default",
            posession: "72",
            size: "32",
          },
          {
            name: "xxs",
            posession: "72",
            size: "32",
          },
          {
            name: "xs",
            posession: "72",
            size: "32",
          },
          {
            name: "s",
            posession: "72",
            size: "32",
          },
          {
            name: "iphone",
            posession: "72",
            size: "32",
          },
          {
            name: "md",
            posession: "72",
            size: "32",
          },
          {
            name: "md2",
            posession: "72",
            size: "32",
          },
          {
            name: "md3",
            posession: "72",
            size: "32",
          },
          {
            name: "tb",
            posession: "72",
            size: "32",
          },
          {
            name: "lg",
            posession: "72",
            size: "32",
          },
          {
            name: "xl",
            posession: "72",
            size: "32",
          },
          {
            name: "2xl",
            posession: "72",
            size: "32",
          },
        ],
      },
      {
        name: "alamat",
        xMedia: [
          {
            name: "default",
            posession: "72",
            size: "32",
          },
          {
            name: "xxs",
            posession: "72",
            size: "32",
          },
          {
            name: "xs",
            posession: "72",
            size: "32",
          },
          {
            name: "s",
            posession: "72",
            size: "32",
          },
          {
            name: "iphone",
            posession: "72",
            size: "32",
          },
          {
            name: "md",
            posession: "72",
            size: "32",
          },
          {
            name: "md2",
            posession: "72",
            size: "32",
          },
          {
            name: "md3",
            posession: "72",
            size: "32",
          },
          {
            name: "tb",
            posession: "72",
            size: "32",
          },
          {
            name: "lg",
            posession: "72",
            size: "32",
          },
          {
            name: "xl",
            posession: "72",
            size: "32",
          },
          {
            name: "2xl",
            posession: "72",
            size: "32",
          },
        ],
      },
    ],
  },
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setItemEdit: (state, action) => {
      state.itemEdit = action.payload;
    },
    setDevice: (state, action) => {
      state.device = action.payload;
    },
  },
});

export const { increment, decrement, setItemEdit, setDevice } =
  counterSlice.actions;
export default counterSlice.reducer;
