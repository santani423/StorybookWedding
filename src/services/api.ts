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

export const getTemaDetail = async (code: string) => {
  const res = await fetch(`https://bancendundesia.undesia.com/api/tema/${code}`);

  if (!res.ok) {
    throw new Error("Gagal memuat detail tema");
  }

  return res.json();
};

type UpdateTemaPayload = {
  asset_id: number;
  breakpoint: string;
  plesMinus: string;
  type: string;
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

export const getKomentar = async (id_user: number) => {
  const res = await fetch(`https://bancendundesia.undesia.com/api/komentar?id_user=${id_user}`);

  if (!res.ok) {
    throw new Error("Gagal memuat data komentar");
  }

  return res.json();
};

type PostKomentarPayload = {
  id_user: number;
  nama: string;
  komen: string;
};

export const postKomentar = async (payload: PostKomentarPayload) => {
  const res = await fetch("https://bancendundesia.undesia.com/api/komentar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Gagal mengirim komentar");
  }

  return res.json();
};

type SubmitRsvpPayload = {
  id_user?: number;
  slug?: string;
  nama: string;
  massage: string;
  kehadiran: string;
};

export const submitRsvp = async (payload: SubmitRsvpPayload) => {
  const res = await fetch("https://bancendundesia.undesia.com/api/tamu", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Gagal mengirim RSVP");
  }

  return res.json();
};

export const getOrder = async (name: string, slug?: string) => {
  const res = await fetch(`https://bancendundesia.undesia.com/api/domains/${name}${slug ? `?slug=${slug}` : ''}`);
  
  if (!res.ok) {
    // TanStack Query butuh error dilempar agar state isError jadi true
    throw new Error("Gagal memuat data template");
  }
  
  return res.json();
};