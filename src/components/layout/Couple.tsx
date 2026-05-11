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

export default function Couple() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="
              absolute
          
              xxs:bottom-72
              xs:bottom-60
              s:bottom-86
              s2:bottom-72
              iphone:bottom-90
              mobile:bottom-70
              sm:bottom-96
              md:bottom-90
              md2:top-100
              md3:top-[110px]
              tb:top-115
              lg:top-130
              lg2:top-56
              lg3:top-62
              xl:top-66
              3xl:top-[340px]
              5xl:top-118
          
              xxs:right-24
              xs:right-28
              s2:right-38
              iphone:right-34
              mobile:right-26
              sm:right-44
              md:right-38
              md2:right-40
              tb:right-68
              lg:right-48
              lg2:right-28
              lg3:right-18
              xl:right-30
              3xl:right-30
              5xl:right-46
          
              z-10
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer
            "
          >
            <Image
              src="/assets/couple.png"
              alt="Couple"
              width={420}
              height={420}
              sizes="100vw"
              className="
                h-auto
                max-w-none
          
                w-32
                xxs:w-36
                xs:w-40
                s:w-34
                s2:w-30
                iphone:w-38
                mobile:w-30
                sm:w-42
                md:w-46
                md2:w-50
                md3:w-54
                tb:w-60
                lg:w-60
                lg2:w-28
                xl:w-[120px]
                3xl:w-34
                5xl:w-50
              "
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-white/95 backdrop-blur-md">
          {/* HEADER */}
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-serif text-neutral-800">
              The Bride & Groom
            </DialogTitle>

            <DialogDescription className="text-neutral-500">
              Dengan penuh cinta kami memperkenalkan mempelai
            </DialogDescription>
          </DialogHeader>

          {/* CONTENT */}
          <div className="mt-6 space-y-6">
            {/* GROOM */}
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/assets/groom.jpg"
                  alt="Mempelai Pria"
                  width={120}
                  height={120}
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                />

                <h2 className="mt-4 text-2xl font-semibold text-neutral-800">
                  Ahmad Fauzan
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Putra Pertama dari
                </p>

                <p className="text-sm font-medium text-neutral-700">
                  Bapak Lorem & Ibu Ipsum
                </p>
              </div>
            </div>

            {/* BRIDE */}
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/assets/bride.jpg"
                  alt="Mempelai Wanita"
                  width={120}
                  height={120}
                  className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                />

                <h2 className="mt-4 text-2xl font-semibold text-neutral-800">
                  Siti Aisyah
                </h2>

                <p className="mt-1 text-sm text-neutral-500">
                  Putri Kedua dari
                </p>

                <p className="text-sm font-medium text-neutral-700">
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