export interface Breakpoint {
  id: number;
  name: string;
  code: string;
  sekala: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface SizeTema {
  id: number;
  type: string;
  no: number;
  value: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface AssetSize {
  id: number;
  asset_id: number;
  size_tema_id: number;
  breack_poin_id: number;
  created_at: string;
  updated_at: string;
  breakpoint: Breakpoint;
  size_tema: SizeTema;
}

export interface Asset {
  id: number;
  tema_id: number;
  path: string;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
  asset_sizes: AssetSize[];
}

export interface Theme {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
  assets: Asset[];
}

export interface ThemeListResponse {
  message: string;
  data: Theme[];
}


 