"use client";

import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Album, Cerita } from "@/types/orderTypes";
import Image from "next/image";
import { MapPin, CalendarDays, Clock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function extractMapsUrl(embedHtml?: string): string {
  if (!embedHtml) return "https://maps.google.com";
  const srcMatch = embedHtml.match(/src="([^"]+)"/);
  if (!srcMatch) return "https://maps.google.com";
  const embedSrc = srcMatch[1];
  // Dalam pb, koordinat pin utama selalu muncul berurutan: !2d[lng]!3d[lat]
  const pairMatch = embedSrc.match(/!2d(-?\d+\.\d+)!3d(-?\d+\.\d+)/);
  if (pairMatch) {
    const lng = pairMatch[1];
    const lat = pairMatch[2];
    return `https://www.google.com/maps?q=${lat},${lng}`;
  }
  return "https://maps.google.com";
}

export default function Addres({ style = ``, styleImg = `` }) {
  const { key, mempelai, posisiMempelai, acara, additionalData } =
    useAppSelector((state) => state.order);
  const { animationEnabled } = useAppSelector((state) => state.counter);
  const mapsUrl = extractMapsUrl(additionalData?.maps);
  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`
              ${style}
              ${animationEnabled ? "animate-[floatButton_3s_ease-in-out_infinite]" : ""}
              cursor-pointer
            `}
          >
            <Image
              src="/assets/alamat.webp"
              alt="Alamat"
              width={0}
              height={0}
              sizes="100vw"
              className={styleImg}
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
            <DialogTitle className="text-2xl font-serif text-white">
              Informasi Acara
            </DialogTitle>

            {/* <DialogDescription className="text-white">
              Dengan hormat kami mengundang Anda untuk hadir
            </DialogDescription> */}
          </DialogHeader>

          {/* CONTENT */}
          <div
            className="
              max-h-[80vh]
              overflow-y-auto
              p-6
              space-y-6
            "
          >
            {/* IMAGE */}
            <div className="overflow-hidden rounded-3xl shadow-md">
              {additionalData?.maps && (
                <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: additionalData.maps }} />
              )}
            </div>

            {/* CARD */}
            <div className="grid gap-5 md:grid-cols-2">
              {acara?.map((item) => (
                <div key={item.id_acara} className="rounded-3xl border border-neutral-200 p-5 bg-[#9F6326]">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {item.nama_acara}
                  </h2>

                  <div className="space-y-4 text-sm text-white">
                    <div className="flex items-start gap-3">
                      <CalendarDays size={18} className="mt-0.5 text-white" />

                      <div>
                        <p className="font-medium text-white">
                          {item.tgl_acara}
                        </p>

                        <p>
                          {item.waktu_mulai}
                          {item.waktu_akhir ? ` – ${item.waktu_akhir}` : ""} WIB
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-0.5 text-white" />

                      <div>
                        <p className="font-medium text-white">
                          {item.tempat_acara}
                        </p>

                        <p>{item.alamat_acara}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON MAPS */}
            {/* <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="
                  w-full
                  h-12
                  rounded-2xl
                  bg-[#9F6326]
                  text-white
                  hover:bg-[#9F6326]
                "
              >
                Buka Google Maps
              </Button>
            </a> */}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
