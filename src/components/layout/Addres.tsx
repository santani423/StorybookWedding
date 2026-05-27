"use client";

import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { CSSProperties } from "react";

export default function Addres({
  style = "",
  styleImg = "",
  positionStyle,
  imgStyle,
  isSelected,
  onSelect,
}: {
  style?: string;
  styleImg?: string;
  positionStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  isSelected?: boolean;
  onSelect?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");

  const { acara, additionalData } = useAppSelector((state) => state.order);
  const { animationEnabled, apiAssets } = useAppSelector((state) => state.counter);

  useEffect(() => {
    const asset = apiAssets.find((a) => a.name === "address");
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bancendundesia.undesia.com";
    if (asset?.src) setSrc(`${baseUrl}${asset.src}`);
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
              alt="Alamat"
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

      <DialogContent className="w-[95vw] sm:max-w-3xl p-0 overflow-hidden border-none rounded-3xl bg-[#FCDDA6] shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-5 border-b bg-[#9F6326] text-center">
          <DialogTitle className="text-2xl font-serif text-white">Informasi Acara</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          {additionalData?.maps && (
            <div className="overflow-hidden rounded-3xl shadow-md">
              <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: additionalData.maps }} />
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            {acara?.map((item) => (
              <div key={item.id_acara} className="rounded-3xl border border-neutral-200 p-5 bg-[#9F6326]">
                <h2 className="text-xl font-semibold text-white mb-4">{item.nama_acara}</h2>
                <div className="space-y-4 text-sm text-white">
                  <div className="flex items-start gap-3">
                    <CalendarDays size={18} className="mt-0.5 text-white" />
                    <div>
                      <p className="font-medium text-white">{item.tgl_acara}</p>
                      <p>{item.waktu_mulai}{item.waktu_akhir ? ` – ${item.waktu_akhir}` : ""} WIB</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 text-white" />
                    <div>
                      <p className="font-medium text-white">{item.tempat_acara}</p>
                      <p>{item.alamat_acara}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
