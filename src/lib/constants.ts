/* URL aset (gambar, dsb.) — tetap absolut karena dipakai di <Image> */
export const API_URL      = process.env.NEXT_PUBLIC_API_URL      || "https://undangan.undesia.com";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://beundesia.undesia.com";

/*
  API_PROXY_BASE — dipakai untuk semua fetch() dari browser.
  Next.js rewrite di next.config.ts meneruskan /api/proxy/** → backend.
  Same-origin → tidak ada CORS, tidak ada "Failed to fetch".
*/
export const API_PROXY_BASE =
  typeof window !== "undefined"
    ? "/api/proxy"          // browser: lewat proxy Next.js
    : API_BASE_URL;         // server-side render: langsung ke backend

export const EDIT_MODE = process.env.NEXT_PUBLIC_EDIT_MODE === "true";
