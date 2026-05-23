"use client";

import * as React from "react";
import Image from "next/image";
import { Shirt, X } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const dressCodes = [
  {
    title: "Pria",
    desc: "Kemeja putih / beige dengan celana bahan formal.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Wanita",
    desc: "Dress atau kebaya bernuansa earth tone dan pastel.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Warna Utama",
    desc: "Cream, beige, sage green, dusty pink, dan putih.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Hindari",
    desc: "Warna terlalu mencolok seperti neon dan motif berlebihan.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
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
  const { animationEnabled } = useAppSelector((state) => state.counter);
  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={` ${style} ${animationEnabled ? "animate-[floatButton_3s_ease-in-out_infinite]" : ""}
              cursor-pointer ${isSelected ? "ring-2 ring-white/90 ring-offset-2 rounded" : ""}`}
            style={positionStyle}
            onClick={onSelect}
          >
            <Image
              src="/assets/clothes-rack.webp"
              alt="Dress Code"
              width={0}
              height={0}
              sizes="100vw"
              className={styleImg}
              style={imgStyle}
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent
         className="
            w-[95vw]
            sm:max-w-3xl
            p-0
            overflow-hidden
            border-none
            rounded-3xl
            bg-[#FCDDA6]
            shadow-2xl
          "
        >
          {/* HEADER */}
           <DialogHeader className="px-6 pt-6 pb-5 border-b bg-[#9F6326] text-center">
            <div className="flex items-center gap-3">
              <div className="bg-black text-white p-3 rounded-2xl">
                <Shirt className="w-5 h-5" />
              </div>

              <div>
                <DialogTitle className="text-2xl font-semibold text-white">
                  Dress Code
                </DialogTitle>

                {/* <DialogDescription className="text-white mt-1">
                  Kami mengundang tamu untuk mengenakan pakaian formal dengan
                  nuansa warna lembut dan elegan.
                </DialogDescription> */}
              </div>
            </div>
          </DialogHeader>

          {/* CONTENT */}
          <div
            className="
              max-h-[80vh]
              overflow-y-auto
              p-5
            "
          >
            {/* COLOR PALETTE */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                Color Palette
              </h2>

              <div className="flex flex-wrap gap-4">
                {[
                  "#F5E6D3",
                  "#DCC5B2",
                  "#E8DCCF",
                  "#A8B5A2",
                  "#F8F5F0",
                ].map((color, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl border shadow-sm"
                      style={{ backgroundColor: color }}
                    />

                    <span className="text-xs text-neutral-500">
                      {color}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GRID CONTENT */}
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
              "
            >
              {dressCodes.map((item, index) => (
                <div
                  key={index}
                  className="
                    group
                    overflow-hidden
                    rounded-3xl
                    border
                    bg-[#9F6326]
                    shadow-sm
                    hover:shadow-xl
                    transition-all
                    duration-500
                  "
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1200}
                      height={800}
                      className="
                        w-full
                        h-[260px]
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-700
                      "
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white">
                      {item.title}
                    </h3>

                    <p className="text-sm text-white leading-relaxed mt-2">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER NOTE */}
            <div
              className="
                mt-8
                rounded-3xl
                bg-[#9F6326]
                p-5
                text-center
              "
            >
              <p className="text-sm text-white leading-relaxed">
                Kehadiran dan kenyamanan Anda adalah yang utama.  
                Dress code ini dibuat untuk menciptakan suasana pernikahan yang
                hangat, harmonis, dan elegan  
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}