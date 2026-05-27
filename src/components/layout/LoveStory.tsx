"use client";

import * as React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
import { Cerita } from "@/types/orderTypes";

const defaultImages = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
];

import type { CSSProperties } from "react";

export default function LoveStory({
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
  const [src, setSrc] = React.useState("");
  const [loveStories, setLoveStories] = React.useState<Cerita[]>([]);

  const { cerita } = useAppSelector((state) => state.order);
  const { animationEnabled, apiAssets } = useAppSelector((state) => state.counter);

  React.useEffect(() => {
    if (cerita && cerita.length > 0) {
      setLoveStories(cerita);
    } else {
      setLoveStories([]);
    }
  }, [cerita]);

  React.useEffect(() => {
    const asset = apiAssets.find((a) => a.name === "love-story");
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bancendundesia.undesia.com";
    if (asset?.src) setSrc(`${baseUrl}${asset.src}`);
  }, [apiAssets]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        className={`${style} z-12 ${animationEnabled ? "animate-[floatButton_3s_ease-in-out_infinite]" : ""} outline-none inline-flex items-center justify-center`}
        style={positionStyle}
      >
        <span
          className={`block ring-2 ring-offset-2 rounded ${isSelected ? "ring-white/90" : "ring-transparent ring-offset-transparent"}`}
        >
          {src ? (
            <Image
              src={src}
              alt="Love Story"
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
        <DialogHeader className="px-6 pr-10 py-6 border-b bg-[#9F6326] text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <DialogTitle className="text-2xl md:text-3xl font-semibold text-white">Our Love Story</DialogTitle>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-rose-200 -translate-x-1/2" />
            <div className="space-y-12">
              {loveStories.map((story, index) => (
                <div key={index} className="relative grid md:grid-cols-2 gap-6 items-center">
                  <div className="absolute left-4 md:left-1/2 top-5 w-4 h-4 rounded-full bg-rose-500 border-4 border-white shadow-md -translate-x-1/2 z-10" />

                  <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? "md:pr-16 text-left md:text-right" : "md:col-start-2 md:pl-16 text-left"}`}>
                    <p className="text-sm text-rose-500 font-medium mb-2">{story.tanggal_cerita}</p>
                    <h3 className="text-2xl font-semibold text-neutral-800 mb-3">{story.judul_cerita}</h3>
                    <p className="text-neutral-600 leading-relaxed">{story.isi_cerita}</p>
                  </div>

                  <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? "md:col-start-2" : "md:row-start-1"}`}>
                    <div className="relative overflow-hidden rounded-3xl shadow-lg group">
                      <Image
                        src={defaultImages[index % defaultImages.length]}
                        alt={story.judul_cerita}
                        width={1200}
                        height={800}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
