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
export const getBrackPoin = async () => {
  const res = await fetch("https://bancendundesia.undesia.com/api/brackPoin");
  
  if (!res.ok) {
    // TanStack Query butuh error dilempar agar state isError jadi true
    throw new Error("Gagal memuat data template");
  }
  
  return res.json();
};

type UpdateTemaPayload = {
  asset_id: number;
  breakpoint: string;
  plesMinus: string;
};

export const updateTema = async (payload: UpdateTemaPayload) => {
  const res = await fetch(
    "https://bancendundesia.undesia.com/api/tema",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengupdate data template");
  }

  return res.json();
};

export const getOrder = async () => {
  const res = await fetch("https://bancendundesia.undesia.com/api/domains/farhan?slug=agus");
  
  if (!res.ok) {
    // TanStack Query butuh error dilempar agar state isError jadi true
    throw new Error("Gagal memuat data template");
  }
  
  return res.json();
};