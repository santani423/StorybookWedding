"use client";

import * as React from "react";
import Image from "next/image";
import { X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const galleryImages = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
];

export default function GalleryDialog() {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(
    null
  );

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`absolute top-40 
            xxs:top-32 
            iphone:top-44 
            mobile:top-32
            xs:top-20 
            s:top-40 
            s2:top-28 
            sm:top-42 
            md:top-32 
            md2:top-44 
            md3:top-44 
            tb:top-36 
            lg:top-62 
            lg2:top-20 
            lg3:top-30 
            xl:top-26
            3xl:top-36
            5xl:top-58

            left-6 
            xxs:left-10 
            iphone:left-12 
            mobile:left-8
            xs:left-12 
            s:left-12 
            sm:left-14 
            md:left-16 
            tb:left-26 
            lg:left-20 
            lg2:left-10 
            lg3:left-6 
            xl:left-10
            3xl:left-10
            5xl:left-22

            animate-[floatButton_3s_ease-in-out_infinite]
            cursor-pointer
          `}
          >
            <Image
              src="/assets/gallery.png"
              alt="Gallery"
              width={0}
              height={0}
              sizes="100vw"
              className="
                w-32 
                iphone:w-36 
                mobile:w-32
                sm:w-42 
                md:w-40 
                lg:w-56 
                lg2:w-26 
                md2:w-48 
                md3:w-56 
                xl:w-30
                3xl:w-36
                5xl:w-42
                h-auto

                drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]
                hover:drop-shadow-[0_0_40px_rgba(255,255,255,1)]

                transition-all
                duration-500
                hover:scale-110
              "
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent
          className="
            w-[95vw]
            sm:max-w-6xl
            p-0
            overflow-hidden
            border-none
            rounded-3xl
            bg-white
            shadow-2xl
          "
        >
          {/* HEADER */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-neutral-50">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Wedding Gallery
            </DialogTitle>

            <DialogDescription className="text-sm text-gray-500">
              Kumpulan momen indah perjalanan cinta kami.
            </DialogDescription>
          </DialogHeader>

          {/* CONTENT */}
          <div
            className="
              max-h-[80vh]
              overflow-y-auto
              p-5
            "
          >
            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-3
                gap-5
              "
            >
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                  className="
                    relative
                    aspect-square
                    overflow-hidden
                    rounded-3xl
                    group
                    cursor-pointer

                    shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                    hover:shadow-[0_25px_60px_rgba(255,192,203,0.45)]

                    transition-all
                    duration-700

                    hover:-translate-y-4
                    hover:scale-[1.04]

                    animate-[float_4s_ease-in-out_infinite]
                  "
                >
                  {/* IMAGE */}
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    unoptimized
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-125
                    "
                  />

                  {/* OVERLAY */}
                  <div
                    className="
                      absolute inset-0
                      bg-black/10
                      group-hover:bg-black/30
                      transition-all duration-500
                    "
                  />

                  {/* GLOW BORDER */}
                  <div
                    className="
                      absolute inset-0
                      rounded-3xl
                      border border-white/10

                      group-hover:border-pink-300/70
                      group-hover:shadow-[0_0_40px_rgba(255,192,203,0.8)]

                      transition-all duration-500
                    "
                  />

                  {/* TEXT */}
                  <div
                    className="
                      absolute inset-0
                      flex items-center justify-center

                      opacity-0
                      group-hover:opacity-100

                      transition-all duration-500
                    "
                  >
                    <span
                      className="
                        text-white
                        text-lg
                        font-semibold
                        tracking-widest
                        drop-shadow-lg
                      "
                    >
                      VIEW PHOTO
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* PREVIEW */}
      {selectedImage && (
        <div
          className="
            fixed inset-0 z-[999]
            bg-black/90
            backdrop-blur-sm

            flex items-center justify-center
            p-4
          "
          onClick={() => setSelectedImage(null)}
        >
          {/* CLOSE */}
          <button
            className="
              absolute top-5 right-5
              w-12 h-12
              rounded-full

              bg-white/10
              hover:bg-red-500

              flex items-center justify-center

              text-white

              transition-all duration-300
              hover:rotate-90
            "
          >
            <X className="w-6 h-6" />
          </button>

          {/* IMAGE */}
          <div
            className="
              relative
              w-full
              max-w-5xl
              h-[80vh]

              animate-[zoomIn_0.4s_ease]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage}
              alt="Preview"
              fill
              unoptimized
              className="
                object-contain
                rounded-3xl

                shadow-[0_0_50px_rgba(255,255,255,0.25)]
              "
            />
          </div>
        </div>
      )}
    </>
  );
}