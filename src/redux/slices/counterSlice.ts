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

const BP_ORDER = [
  "default","xxxs","xxs","xs","s","s2","iphone","mobile","sm",
  "md","md2","md3","tb","lg","lg2","lg3","xl","2xl","3xl","4xl","5xl",
];

const initialState = {
  device: templateData.device as string | null,
  editSize: templateData.editSize,
  animationEnabled: templateData.animationEnabled,
  selectedComponent: templateData.selectedComponent as string | null,
  controlTarget: templateData.controlTarget,
  componentStyles: templateData.componentStyles as Record<string, Record<string, Record<string, number>>>,
  apiAssets: [] as ApiAsset[],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDevice: (state, action) => {
      state.device = action.payload;
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
      const bp = state.device;
      const target = state.controlTarget;

      if (!component || !bp || !target) return;

      const compStyles = state.componentStyles?.[component];
      if (!compStyles) return;

      const idx = BP_ORDER.indexOf(bp);
      if (idx === -1) return;

      let currentValue = 0;
      for (let i = 0; i <= idx; i++) {
        const bpData = compStyles[BP_ORDER[i]];
        if (bpData && bpData[target] !== undefined) {
          currentValue = bpData[target];
        }
      }

      if (!compStyles[bp]) compStyles[bp] = {};
      compStyles[bp][target] = currentValue + delta;
    },
  },
});

export const {
  setDevice, setEditSize, setAnimationEnabled,
  setSelectedComponent, setControlTarget, adjustComponentStyle, setApiData,
} = counterSlice.actions;
export default counterSlice.reducer;
