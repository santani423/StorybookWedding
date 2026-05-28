"use client";

import * as React from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { API_BASE_URL } from "@/lib/constants";
import { submitRsvp } from "@/services/api";

import type { CSSProperties } from "react";

export default function Rsvp({
  style = "",
  styleImg = "",
  positionStyle,
  imgStyle,
  isSelected,
  onSelect,
}: Readonly<{
  style?: string;
  styleImg?: string;
  positionStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  isSelected?: boolean;
  onSelect?: () => void;
}>) {
  const [open, setOpen] = React.useState(false);
  const { animationEnabled, apiAssets } = useAppSelector((state) => state.counter);
  const { tamu, additionalData } = useAppSelector((state) => state.order);
  const [name, setName] = React.useState("");
  const [attendance, setAttendance] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [src, setSrc] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [toast, setToast] = React.useState<{ type: "success" | "error"; msg: string } | null>(null);

  React.useEffect(() => {
    if (tamu?.nama_tamu) setName(tamu.nama_tamu);
    if (tamu?.status) setAttendance(tamu.status.toLowerCase().replace(" ", "_"));
    if (tamu?.rsvp?.massage) setMessage(tamu.rsvp.massage);
  }, [tamu]);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;
    if (!attendance) return;

    try {
      setSubmitting(true);
      await submitRsvp({
        id_user: tamu?.id_user ?? additionalData?.id_user ?? 0,
        ...(tamu?.nama_slug ? { slug: tamu.nama_slug } : {}),
        nama: name,
        massage: message,
        kehadiran: attendance === "tidak_hadir" ? "Tidak Hadir" : "Hadir",
      });
      setToast({ type: "success", msg: "RSVP berhasil dikirim, terima kasih!" });
      setTimeout(() => { setToast(null); setOpen(false); }, 2500);
    } catch {
      setToast({ type: "error", msg: "Gagal mengirim RSVP, coba lagi." });
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    const asset = apiAssets.find((a) => a.name === "rsvp");
    if (asset?.src) setSrc(`${API_BASE_URL}${asset.src}`);
  }, [apiAssets]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        className={`${style} ${animationEnabled ? "animate-[floatButton_3s_ease-in-out_infinite]" : ""} outline-none inline-flex items-center justify-center`}
        style={positionStyle}
      >
        <span
          className={`block ring-2 ring-offset-2 rounded ${isSelected ? "ring-white/90" : "ring-transparent ring-offset-transparent"}`}
        >
          {src ? (
            <Image
              src={src}
              alt="RSVP"
              width={300}
              height={300}
              priority
              className={`cursor-pointer ${styleImg}`}
              style={imgStyle}
              onClick={() => { onSelect?.(); setOpen(true); }}
            />
          ) : (
            <span className={styleImg} style={{ display: "block", ...imgStyle }} />
          )}
        </span>
      </button>

      <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-[#FCDDA6] backdrop-blur-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pr-10 pt-6 pb-4 border-b bg-[#9F6326] text-center">
          <DialogTitle className="text-2xl font-serif text-white">RSVP Wedding</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="space-y-2">
            <Label className="text-neutral-700">Nama Lengkap</Label>
            <Input
              type="text"
              placeholder="Masukkan nama Anda"
              value={name}
              onChange={(e) => !tamu?.nama_tamu && setName(e.target.value)}
              readOnly={!!tamu?.nama_tamu}
              className={`h-11 rounded-xl border-neutral-200 ${tamu?.nama_tamu ? "bg-neutral-100 cursor-not-allowed" : ""}`}
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-700">Konfirmasi Kehadiran</Label>
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full h-11 rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Pilih Kehadiran</option>
              <option value="hadir">Hadir</option>
              <option value="tidak_hadir">Tidak Hadir</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="text-neutral-700">Ucapan &amp; Doa</Label>
            <Textarea
              placeholder="Tulis ucapan terbaik..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-30 rounded-2xl border-neutral-200"
            />
          </div>

          {toast && (
            <div className={`w-full rounded-xl px-4 py-3 text-sm text-center font-medium ${
              toast.type === "success"
                ? "bg-[#9F6326]/15 text-[#7a4a1a] border border-[#9F6326]/30"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {toast.msg}
            </div>
          )}

          <Button type="submit" disabled={submitting} className="w-full h-11 rounded-xl bg-[#9F6326] text-white hover:bg-[#9F6326]-800 disabled:opacity-60">
            {submitting ? "Mengirim..." : "Kirim RSVP"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
