// services/api.ts
export const getTemplates = async () => {
  const res = await fetch("https://bancendundesia.undesia.com/api/template");
  
  if (!res.ok) {
    // TanStack Query butuh error dilempar agar state isError jadi true
    throw new Error("Gagal memuat data template");
  }
  
  return res.json();
};
export const getTema = async () => {
  const res = await fetch("https://bancendundesia.undesia.com/api/tema");
  
  if (!res.ok) {
    // TanStack Query butuh error dilempar agar state isError jadi true
    throw new Error("Gagal memuat data template");
  }
  
  return res.json();
};