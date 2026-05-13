"use client";

import * as React from "react";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Couple({ style = "",styleImg="" }) {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={` absolute
              ${style}
             
          
              z-10
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer`}
          >
            <Image
              src="/assets/couple.webp"
              alt="Couple"
              width={420}
              height={420}
              sizes="100vw"
              className={styleImg}
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

            {/* <DialogDescription className="text-neutral-500">
              Dengan penuh cinta kami memperkenalkan mempelai
            </DialogDescription> */}
          </DialogHeader>

          {/* CONTENT */}
          <div className="mt-6 space-y-6">
            {/* GROOM */}
            <div className="rounded-3xl border border-neutral-200 bg-[#9F6326] p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/assets/groom.jpg"
                  alt="Mempelai Pria"
                  width={120}
                  height={120}
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                />

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Ahmad Fauzan
                </h2>

                <p className="mt-1 text-sm text-white">Putra Pertama dari</p>

                <p className="text-sm font-medium text-white">
                  Bapak Lorem & Ibu Ipsum
                </p>
              </div>
            </div>

            {/* BRIDE */}
            <div className="rounded-3xl border border-neutral-200 bg-[#9F6326] p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/assets/bride.jpg"
                  alt="Mempelai Wanita"
                  width={120}
                  height={120}
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                />

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  Siti Aisyah
                </h2>

                <p className="mt-1 text-sm text-white">Putri Kedua dari</p>

                <p className="text-sm font-medium text-white">
                  Bapak Lorem & Ibu Ipsum
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
