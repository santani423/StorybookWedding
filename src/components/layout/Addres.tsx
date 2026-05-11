"use client";

import * as React from "react";
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

export default function Addres({ style = `` }) {
  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`
              ${style}
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer
            `}
          >
            <Image
              src="/assets/alamat.png"
              alt="Alamat"
              width={0}
              height={0}
              sizes="100vw"
              className="
                w-26 
                sm:w-32 
                md:w-36  
                lg:w-52 
                lg2:w-20
                tb:w-40
                xl:w-22
                3xl:w-26 
                5xl:w-40 
                h-auto
              "
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
            bg-white
            shadow-2xl
          "
        >
          {/* HEADER */}
          <DialogHeader className="px-6 pt-6 pb-5 border-b bg-neutral-50 text-center">
            <DialogTitle className="text-2xl font-serif text-neutral-800">
              Informasi Acara
            </DialogTitle>

            <DialogDescription className="text-neutral-500">
              Dengan hormat kami mengundang Anda untuk hadir
            </DialogDescription>
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
              <Image
                src="/assets/maps.jpg"
                alt="Lokasi Acara"
                width={1200}
                height={700}
                className="w-full h-[220px] object-cover"
              />
            </div>

            {/* CARD */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* AKAD */}
              <div className="rounded-3xl border border-neutral-200 p-5 bg-neutral-50">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Akad Nikah
                </h2>

                <div className="space-y-4 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      size={18}
                      className="mt-0.5 text-black"
                    />

                    <div>
                      <p className="font-medium text-neutral-800">
                        Minggu, 20 Oktober 2026
                      </p>

                      <p>08.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 text-black"
                    />

                    <div>
                      <p className="font-medium text-neutral-800">
                        Gedung Serbaguna Bahagia
                      </p>

                      <p>
                        Jl. Mawar No. 12, Jakarta Selatan,
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RESEPSI */}
              <div className="rounded-3xl border border-neutral-200 p-5 bg-neutral-50">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Resepsi
                </h2>

                <div className="space-y-4 text-sm text-neutral-600">
                  <div className="flex items-start gap-3">
                    <Clock
                      size={18}
                      className="mt-0.5 text-black"
                    />

                    <div>
                      <p className="font-medium text-neutral-800">
                        Minggu, 20 Oktober 2026
                      </p>

                      <p>11.00 WIB - Selesai</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="mt-0.5 text-black"
                    />

                    <div>
                      <p className="font-medium text-neutral-800">
                        Ballroom Grand Wedding
                      </p>

                      <p>
                        Jl. Melati Indah No. 45, Jakarta
                        Selatan, Indonesia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON MAPS */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="
                  w-full
                  h-12
                  rounded-2xl
                  bg-black
                  text-white
                  hover:bg-neutral-800
                "
              >
                Buka Google Maps
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}