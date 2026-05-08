import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  indexPy: 0,
  valuepy: [
    "1",
    "1.5",
    "2",
    "2.5",
    "3",
    "3.5",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "20",
    "24",
    "28",
    "32",
    "36",
    "40",
    "44",
    "48",
    "52",
    "56",
    "60",
    "64",
    "72",
    "80",
    "96",
    "112",
    "128",
    "144",
    "160",
    "176",
    "192",
    "200",
    "224",
    "240",
    "256",
    "288",
    "320",
    "360",
    "384",
    "400",
    "448",
    "512",
  ],
  value: 12,
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
            py: "top-72",
            size: "32",
          },
          {
            device: "xxs",
            py: "top-72",
            size: "32",
          },
          {
            device: "xs",
            py: "top-72",
            size: "32",
          },
          {
            device: "s",
            py: "top-72",
            size: "32",
          },
          {
            device: "iphone",
            py: "top-72",
            size: "32",
          },
          {
            device: "md",
            py: "top-72",
            size: "32",
          },
          {
            device: "md2",
            py: "top-72",
            size: "32",
          },
          {
            device: "md3",
            py: "top-72",
            size: "32",
          },
          {
            device: "tb",
            py: "top-72",
            size: "32",
          },
          {
            device: "lg",
            py: "top-72",
            size: "32",
          },
          {
            device: "xl",
            py: "top-72",
            size: "32",
          },
          {
            device: "2xl",
            py: "top-1",
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
            posession: "top-72",
            size: "32",
          },
          {
            name: "xxs",
            posession: "top-72",
            size: "32",
          },
          {
            name: "xs",
            posession: "top-72",
            size: "32",
          },
          {
            name: "s",
            posession: "top-72",
            size: "32",
          },
          {
            name: "iphone",
            posession: "top-72",
            size: "32",
          },
          {
            name: "md",
            posession: "top-72",
            size: "32",
          },
          {
            name: "md2",
            posession: "top-72",
            size: "32",
          },
          {
            name: "md3",
            posession: "top-72",
            size: "32",
          },
          {
            name: "tb",
            posession: "top-72",
            size: "32",
          },
          {
            name: "lg",
            posession: "top-72",
            size: "32",
          },
          {
            name: "xl",
            posession: "top-72",
            size: "32",
          },
          {
            name: "2xl",
            posession: "top-72",
            size: "32",
          },
        ],
      },
      {
        name: "alamat",
        xMedia: [
          {
            name: "default",
            posession: "top-72",
            size: "32",
          },
          {
            name: "xxs",
            posession: "top-72",
            size: "32",
          },
          {
            name: "xs",
            posession: "top-72",
            size: "32",
          },
          {
            name: "s",
            posession: "top-72",
            size: "32",
          },
          {
            name: "iphone",
            posession: "top-72",
            size: "32",
          },
          {
            name: "md",
            posession: "top-72",
            size: "32",
          },
          {
            name: "md2",
            posession: "top-72",
            size: "32",
          },
          {
            name: "md3",
            posession: "top-72",
            size: "32",
          },
          {
            name: "tb",
            posession: "top-72",
            size: "32",
          },
          {
            name: "lg",
            posession: "top-72",
            size: "32",
          },
          {
            name: "xl",
            posession: "top-72",
            size: "32",
          },
          {
            name: "2xl",
            posession: "top-72",
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
    setDevice: (state, action) => {
      state.device = action.payload;
    },
    setStyle: (state, action) => {
      const { indexPy, assetName = "dress-code", size } = action.payload || {};

      if (indexPy !== undefined) {
        state.indexPy = indexPy;
      }

      const py = state.valuepy?.[state.indexPy];
      const device = state.device;

      if (!py || !device) return;

      const asset = state.assets.find((a) => a.name === assetName);
      if (!asset) return;

      const xMedia = asset.style?.xMedia;
      if (!Array.isArray(xMedia)) return;

      const media = xMedia.find((m) => m.device === device);
      if (!media) return;

      // ✅ gunakan field yang konsisten
      media.position = `top-${py}`;

      if (size) {
        media.size = size;
      }
    },
  },
});

export const { increment, decrement, setItemEdit, setDevice, setStyle } =
  counterSlice.actions;
export default counterSlice.reducer;
