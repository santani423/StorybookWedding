"use client";

import { useAppSelector } from "@/redux/hooks";
import * as React from "react";
import Image from "next/image";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { CSSProperties } from "react";

interface CoupleProps {
  style?: string;
  styleImg?: string;
  positionStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function Couple({
  style = "",
  styleImg = "",
  positionStyle,
  imgStyle,
  isSelected,
  onSelect,
}: CoupleProps) {
  // Ambil key dari Redux state order
  const { key, mempelai, posisiMempelai } = useAppSelector(
    (state) => state.order,
  );
  const { animationEnabled } = useAppSelector((state) => state.counter);
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://undangan.undesia.com";

  // Gambar fallback atau kosong jika key dari Redux belum di-load
  const groomSrc = key ? `${baseUrl}/assets/users/${key}/groom.png` : "";
  const brideSrc = key ? `${baseUrl}/assets/users/${key}/bride.png` : "";

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`absolute ${style} z-10 ${animationEnabled ? "animate-[floatButton_3s_ease-in-out_infinite]" : ""} cursor-pointer ${isSelected ? "ring-2 ring-white/90 ring-offset-2 rounded" : ""}`}
            style={positionStyle}
            onClick={onSelect}
          >
            <Image
              src="/assets/couple.webp"
              alt="Couple"
              width={420}
              height={420}
              sizes="100vw"
              className={styleImg}
              style={imgStyle}
              priority
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-[#FCDDA6] backdrop-blur-md">
          {/* HEADER */}
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-serif text-neutral-800">
              The Bride & Groom
            </DialogTitle>

            {/* Mengamankan aksesibilitas Radix agar konsol bersih dari warning */}
            <VisuallyHidden.Root>
              <DialogDescription>
                Detail informasi mempelai pria dan mempelai wanita.
              </DialogDescription>
            </VisuallyHidden.Root>
          </DialogHeader>

          {/* CONTENT */}
          <div className="mt-6 space-y-6">
            {/* GROOM */}
            <div className="rounded-3xl border border-neutral-200 bg-[#9F6326] p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                { groomSrc ? (
                  <Image
                    src={posisiMempelai === "0" ? groomSrc : brideSrc}
                    alt="Mempelai Pria"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-neutral-300 animate-pulse border-4 border-white shadow-md" />
                )}

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {posisiMempelai === "0"
                    ? mempelai?.nama_pria
                    : mempelai?.nama_wanita || " "}
                </h2>

                <p className="mt-1 text-sm text-white">
                  {posisiMempelai === "0" ? "Putra dari" : "Putri dari"}
                </p>

                <p className="text-sm font-medium text-white">
                  {posisiMempelai === "0"
                    ? `${mempelai.nama_ayah_pria} & ${mempelai.nama_ibu_pria}`
                    : `${mempelai.nama_ayah_wanita} & ${mempelai.nama_ibu_wanita}`}
                </p>
              </div>
            </div>

            {/* BRIDE */}
            <div className="rounded-3xl border border-neutral-200 bg-[#9F6326] p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                {brideSrc ? (
                  <Image
                    src={posisiMempelai === "0" ? brideSrc : groomSrc}
                    alt="Mempelai Wanita"
                    width={120}
                    height={120}
                    className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-neutral-300 animate-pulse border-4 border-white shadow-md" />
                )}

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {posisiMempelai === "0"
                    ? mempelai?.nama_wanita
                    : mempelai?.nama_pria || " "}
                </h2>

                <p className="mt-1 text-sm text-white">
                  {posisiMempelai === "0" ? "Putri dari" : "Putra dari"}
                </p>

                <p className="text-sm font-medium text-white">
                  {posisiMempelai === "0"
                    ? `${mempelai.nama_ayah_wanita} & ${mempelai.nama_ibu_wanita}`
                    : `${mempelai.nama_ayah_pria} & ${mempelai.nama_ibu_pria}`}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
