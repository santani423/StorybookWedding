import { createSlice } from "@reduxjs/toolkit";
import templateData from "@/data/template.json"; 

type ApiAsset = {
  id: number;
  name: string;
  src: string | null;
  xMedia: Array<{ device: string; py: string | null; size: string }>;
};

function parseSizeString(size: string): { type: string; value: number } | null {
  if (!size) return null;
  const neg = size.startsWith("-");
  const s = neg ? size.slice(1) : size;
  const dash = s.indexOf("-");
  if (dash === -1) return null;
  const type = s.slice(0, dash);
  const val = parseFloat(s.slice(dash + 1));
  if (isNaN(val)) return null;
  return { type, value: neg ? -val : val };
}

function buildComponentStyles(
  assets: ApiAsset[]
): Record<string, Record<string, Record<string, number>>> {
  const styles: Record<string, Record<string, Record<string, number>>> = {};
  for (const asset of assets) {
    styles[asset.name] = {};
    for (const xm of asset.xMedia) {
      const parsed = parseSizeString(xm.size);
      if (!parsed) continue;
      if (!styles[asset.name][xm.device]) styles[asset.name][xm.device] = {};
      styles[asset.name][xm.device][parsed.type] = parsed.value;
    }
  }
  return styles;
}

const initialState = {
  indexPy: templateData.indexPy,
  value: templateData.value,
  itemEdit: templateData.itemEdit as null,
  device: templateData.device as string | null,
  styleGallery: templateData.styleGallery,
  editSize: templateData.editSize,
  animationEnabled: templateData.animationEnabled,
  selectedComponent: templateData.selectedComponent as string | null,
  controlTarget: templateData.controlTarget,
  valuepy: templateData.valuepy,
  assets: templateData.assets as Array<any>,
  style: templateData.style,
  componentStyles: templateData.componentStyles as Record<string, Record<string, Record<string, number>>>,
  apiAssets: [] as ApiAsset[],
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
    setStyle: (state, action) => {
      const { indexPy, assetName = "dress-code", size } = action.payload || {};

      // Perbarui indexPy jika dikirim, sebagai indeks nilai posisi vertikal (py)
      if (indexPy !== undefined) {
        state.indexPy = indexPy;
      }

      // Ambil nilai py dari array valuepy berdasarkan indexPy aktif
      const py = state.valuepy?.[state.indexPy];
      // Device menentukan breakpoint mana yang akan diubah posisinya
      const device = state.device;

      if (!py || !device) return;

      // Cari asset berdasarkan nama untuk mendapatkan konfigurasi style-nya
      const asset = state.assets.find((a) => a.name === assetName);
      if (!asset) return;

      // xMedia adalah array konfigurasi posisi per device/breakpoint
      const xMedia = asset.style?.xMedia;
      if (!Array.isArray(xMedia)) return;

      // Pilih entry xMedia yang cocok dengan device aktif
      const media = xMedia.find((m: any) => m.device === device);
      if (!media) return;

      // Terapkan posisi vertikal sebagai kelas Tailwind (misal: "top-8")
      media.position = `top-${py}`;

      if (size) {
        media.size = size;
      }
    },

    setStyleGallery: (state, action) => {
      state.styleGallery = action.payload;
    },
    setEditSize: (state, action) => {
      state.editSize = action.payload;
    },
    setAnimationEnabled: (state, action) => {
      state.animationEnabled = action.payload;
    },

    setSelectedComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },

    setControlTarget: (state, action) => {
      state.controlTarget = action.payload;
    },

    setApiData: (state, action: { payload: { assets: ApiAsset[] } }) => {
      state.apiAssets = action.payload.assets;
      state.componentStyles = buildComponentStyles(action.payload.assets);
    },

    adjustComponentStyle: (state, action) => {
      const { delta } = action.payload;
      const component = state.selectedComponent;
      // bp = breakpoint aktif, menentukan ukuran layar yang sedang diedit
      const bp = state.device;
      // target = properti posisi yang diubah (misal: "top", "left", "x", "y")
      const target = state.controlTarget;

      if (!component || !bp || !target) return;

      const compStyles = state.componentStyles?.[component];
      if (!compStyles) return;

      // Urutan breakpoint dari terkecil ke terbesar untuk cascading inheritance
      const order = [
        'default','xxxs','xxs','xs','s','s2','iphone','mobile','sm',
        'md','md2','md3','tb','lg','lg2','lg3','xl','2xl','3xl','4xl','5xl',
      ];
      const idx = order.indexOf(bp);
      if (idx === -1) return;

      // Hitung nilai posisi saat ini dengan cascade: ambil nilai dari breakpoint
      // terkecil hingga breakpoint aktif (breakpoint lebih besar meng-override yang kecil)
      let currentValue = 0;
      for (let i = 0; i <= idx; i++) {
        const bpData = compStyles[order[i]];
        if (bpData && bpData[target] !== undefined) {
          currentValue = bpData[target];
        }
      }

      // Simpan nilai baru hanya pada breakpoint aktif, bukan menimpa semua breakpoint
      if (!compStyles[bp]) compStyles[bp] = {};
      compStyles[bp][target] = currentValue + delta;
    },
  },
});

export const {
  increment, decrement, setItemEdit, setDevice, setStyle,
  setStyleGallery, setEditSize, setAnimationEnabled,
  setSelectedComponent, setControlTarget, adjustComponentStyle, setApiData,
} = counterSlice.actions;
export default counterSlice.reducer;
