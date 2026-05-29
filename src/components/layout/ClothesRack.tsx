"use client";

import * as React from "react";
import Image from "next/image";
import { Shirt } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { API_BASE_URL } from "@/lib/constants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { CSSProperties } from "react";
import type { DressCodeItem, DressCodePalette } from "@/types/orderTypes";


export default function ClothesRack({
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
  const { dressCode } = useAppSelector((state) => state.order);
  const [src, setSrc] = React.useState("");

  React.useEffect(() => {
    const asset = apiAssets.find((a) => a.name === "clothes-rack");
    if (asset?.src) setSrc(`${API_BASE_URL}${asset.src}`);
  }, [apiAssets]);

  const items: DressCodeItem[] = dressCode?.code_item ?? [];
  const palettes: DressCodePalette[] = dressCode?.code_palette ?? [];

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
            <DialogTitle className="text-2xl font-semibold text-white">
              {dressCode?.title || "Dress Code"}
            </DialogTitle>
          </div>
          {dressCode?.description ? (
            <p className="text-sm text-white/80 mt-1 text-left">{dressCode.description}</p>
          ) : null}
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-5">
          {/* Color Palette */}
          {palettes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">Color Palette</h2>
              <div className="flex flex-wrap gap-4">
                {palettes.map((p) => (
                  <div key={p.id} className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 h-16 rounded-2xl border shadow-sm"
                      style={{ backgroundColor: p.color_hex }}
                    />
                    <span className="text-xs text-neutral-500">{p.color_hex}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dress Code Items */}
          {items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-3xl border bg-[#9F6326] shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {item.image && (
                    <div className="relative overflow-hidden">
                      <Image
                        src={`${API_BASE_URL}${item.image}`}
                        alt={item.title}
                        width={1200}
                        height={800}
                        className="w-full h-[260px] object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-white/60 uppercase tracking-widest mb-1">{item.type}</p>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white leading-relaxed mt-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
