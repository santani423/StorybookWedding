"use client";

import * as React from "react";
import Image from "next/image";
import { Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const infoItems = [
  {
    img: "/assets/rsvp.png",
    title: "RSVP",
    description: "Konfirmasi kehadiran Anda melalui formulir reservasi online.",
  },
  {
    img: "/assets/clothes-rack.png",
    title: "Dress Code",
    description: "Gunakan pakaian dengan tema warna yang telah ditentukan.",
  },
  {
    img: "/assets/alamat.png",
    title: "Lokasi",
    description:
      "Klik ikon peta untuk melihat detail alamat dan petunjuk arah.",
  },
  {
    img: "/assets/couple.png",
    title: "Mempelai",
    description: "Mengenal lebih dekat pasangan yang sedang berbahagia.",
  },
  {
    img: "/assets/love-story.png",
    title: "Love Story",
    description: "Simak perjalanan cinta kami dari awal hingga saat ini.",
  },
  {
    img: "/assets/gift.png",
    title: "Wedding Gift",
    description:
      "Kirimkan kado digital atau lihat wishlist sebagai tanda kasih.",
  },
  {
    img: "/assets/gallery.png",
    title: "Gallery",
    description: "Lihat momen-momen indah prainikah (pre-wedding) kami.",
  },
];

function Content() {
  return (
    <div className="max-h-[450px] overflow-y-auto p-4 space-y-4">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="
            flex items-start gap-4
            rounded-2xl
            bg-white
            p-3
            shadow-sm
            border
          "
        >
          <div className="relative w-14 h-14 shrink-0">
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-900">
              {item.title}
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InfoSection() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="
            w-11 h-11
            md:w-12 md:h-12
            flex items-center justify-center
            rounded-full
            bg-black/40
            hover:bg-black/60
            active:scale-95
            transition-all duration-300
            backdrop-blur-md
            shadow-lg
            cursor-pointer
          "
        >
          <Info className="w-5 h-5 text-white" />
        </div>
      </DialogTrigger>

      <DialogContent
        className="
          w-[95%]
          sm:max-w-[420px]
          p-0
          overflow-hidden
          border-none
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-neutral-50">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Informasi Undangan
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-500">
            Berikut beberapa fitur dan informasi penting pada undangan digital.
          </DialogDescription>
        </DialogHeader>

        <Content />
      </DialogContent>
    </Dialog>
  );
}