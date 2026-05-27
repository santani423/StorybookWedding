"use client";

import * as React from "react";
import Image from "next/image";
import { Shirt } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const dressCodes = [
  {
    title: "Pria",
    desc: "Kemeja putih / beige dengan celana bahan formal.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Wanita",
    desc: "Dress atau kebaya bernuansa earth tone dan pastel.",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Warna Utama",
    desc: "Cream, beige, sage green, dusty pink, dan putih.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Hindari",
    desc: "Warna terlalu mencolok seperti neon dan motif berlebihan.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
];

import type { CSSProperties } from "react";

export default function ClothesRack({
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
  const [open, setOpen] = React.useState(false);
  const { animationEnabled, apiAssets } = useAppSelector((state) => state.counter);
  const [src, setSrc] = React.useState("");

  React.useEffect(() => {
    const asset = apiAssets.find((a) => a.name === "clothes-rack");
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
              alt="Dress Code"
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
        <DialogHeader className="px-6 pr-10 pt-6 pb-5 border-b bg-[#9F6326] text-center">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-3 rounded-2xl">
              <Shirt className="w-5 h-5" />
            </div>
            <DialogTitle className="text-2xl font-semibold text-white">Dress Code</DialogTitle>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-5">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Color Palette</h2>
            <div className="flex flex-wrap gap-4">
              {["#F5E6D3", "#DCC5B2", "#E8DCCF", "#A8B5A2", "#F8F5F0"].map((color, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-2xl border shadow-sm" style={{ backgroundColor: color }} />
                  <span className="text-xs text-neutral-500">{color}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {dressCodes.map((item, index) => (
              <div key={index} className="group overflow-hidden rounded-3xl border bg-[#9F6326] shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1200}
                    height={800}
                    className="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white leading-relaxed mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-[#9F6326] p-5 text-center">
            <p className="text-sm text-white leading-relaxed">
              Kehadiran dan kenyamanan Anda adalah yang utama. Dress code ini dibuat untuk menciptakan suasana pernikahan yang hangat, harmonis, dan elegan
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
