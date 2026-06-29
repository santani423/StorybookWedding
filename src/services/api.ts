// services/api.ts
import { API_PROXY_BASE } from "@/lib/constants";
import { buildEncryptedApiKey } from "@/lib/crypto";

async function buildAuthHeader(): Promise<Record<string, string>> {
  const encrypted = await buildEncryptedApiKey();
  return { "X-Api-Key": encrypted };
}

async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const authHeader = await buildAuthHeader();
  return fetch(url, {
    ...options,
    headers: {
      ...authHeader,
      ...(options.headers as Record<string, string>),
    },
  });
}

export const getTemplates = async () => {
  const res = await apiFetch(`${API_PROXY_BASE}/template`);
  if (!res.ok) throw new Error("Gagal memuat data template");
  return res.json();
};

export const getTema = async () => {
  const res = await apiFetch(`${API_PROXY_BASE}/tema`);
  if (!res.ok) throw new Error("Gagal memuat data template");
  return res.json();
};

export const getBrackPoin = async () => {
  const res = await apiFetch(`${API_PROXY_BASE}/brackPoin`);
  if (!res.ok) throw new Error("Gagal memuat data template");
  return res.json();
};

export const getTemaDetail = async (code: string) => {
  const res = await apiFetch(`${API_PROXY_BASE}/tema/${code}`);
  if (!res.ok) throw new Error("Gagal memuat detail tema");
  return res.json();
};

type UpdateTemaPayload = {
  asset_id: number;
  breakpoint: string;
  plesMinus: string;
  type: string;
};

export const updateTema = async (payload: UpdateTemaPayload) => {
  const res = await apiFetch(`${API_PROXY_BASE}/tema`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal mengupdate data template");
  return res.json();
};

export const getKomentar = async (id_user: number) => {
  const res = await apiFetch(
    `${API_PROXY_BASE}/komentar?id_user=${id_user}`
  );
  if (!res.ok) throw new Error("Gagal memuat data komentar");
  return res.json();
};

type PostKomentarPayload = {
  id_user: number;
  nama: string;
  komen: string;
};

export const postKomentar = async (payload: PostKomentarPayload) => {
  const res = await apiFetch(`${API_PROXY_BASE}/komentar`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal mengirim komentar");
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
  const res = await apiFetch(`${API_PROXY_BASE}/tamu`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Gagal mengirim RSVP");
  return res.json();
};

export const getOrder = async (name: string, slug?: string) => {
  const res = await apiFetch(
    `${API_PROXY_BASE}/domains/${name}${slug ? `?slug=${slug}` : ""}`
  );
  if (!res.ok) throw new Error("Gagal memuat data order");
  return res.json();
};
