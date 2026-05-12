"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
];

export default function GalleryDialog({
  style = "",
  styleImg = "",
}) {
  const [open, setOpen] = React.useState(false);

  // gunakan number bukan string
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

  // touch swipe
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  // ambil image aktif
  const selectedImage =
    selectedIndex >= 0 ? galleryImages[selectedIndex] : null;

  /* =========================
     NEXT
  ========================= */
  const nextImage = React.useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === -1) return prev;

      return prev === galleryImages.length - 1 ? 0 : prev + 1;
    });
  }, []);

  /* =========================
     PREV
  ========================= */
  const prevImage = React.useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === -1) return prev;

      return prev === 0 ? galleryImages.length - 1 : prev - 1;
    });
  }, []);

  /* =========================
     CLOSE PREVIEW
  ========================= */
  const closePreview = React.useCallback(() => {
    setSelectedIndex(-1);
  }, []);

  /* =========================
     KEYBOARD
  ========================= */
  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === -1) return;

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        prevImage();
      }

      if (e.key === "Escape") {
        closePreview();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, nextImage, prevImage, closePreview]);

  /* =========================
     SWIPE
  ========================= */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    // swipe kiri
    if (distance > 50) {
      nextImage();
    }

    // swipe kanan
    if (distance < -50) {
      prevImage();
    }
  };

  return (
    <>
      {/* DIALOG */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          // reset preview saat dialog close
          if (!value) {
            setSelectedIndex(-1);
          }
        }}
      >
        {/* BUTTON OPEN */}
        <DialogTrigger asChild>
          <div
            className={`
              ${style}
              cursor-pointer
              animate-[floatButton_3s_ease-in-out_infinite]
            `}
          >
            <Image
              src="/assets/gallery.png"
              alt="Gallery"
              width={0}
              height={0}
              sizes="100vw"
              className={styleImg}
            />
          </div>
        </DialogTrigger>

        {/* CONTENT */}
        <DialogContent
          onInteractOutside={(e) => {
            // cegah dialog close saat preview aktif
            if (selectedIndex !== -1) {
              e.preventDefault();
            }
          }}
          className="
            w-[95vw]
            md:w-[45vw]
            sm:max-w-6xl

            p-0
            overflow-hidden

            border-none
            rounded-3xl

            bg-[#FCDDA6]
            shadow-2xl
          "
        >
          {/* HEADER */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-[#9F6326] text-center">
            <DialogTitle className="text-2xl font-bold text-white">
              Wedding Gallery
            </DialogTitle>

            <DialogDescription className="text-sm text-white">
              Kumpulan momen indah perjalanan cinta kami.
            </DialogDescription>
          </DialogHeader>

          {/* BODY */}
          <div className="max-h-[80vh] overflow-y-auto p-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {galleryImages.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(index);
                  }}
                  className="
                    relative
                    aspect-square
                    overflow-hidden
                    rounded-3xl
                    group

                    shadow-[0_10px_30px_rgba(0,0,0,0.25)]

                    transition-all
                    duration-500

                    hover:-translate-y-2
                    hover:scale-[1.03]
                  "
                >
                  <Image
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    fill
                    unoptimized
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* overlay */}
                  <div
                    className="
                      absolute inset-0
                      bg-black/10
                      group-hover:bg-black/30
                      transition-all duration-500
                    "
                  />

                  {/* text */}
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
                      "
                    >
                      VIEW
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
            fixed inset-0 z-[9999]
            bg-black/95
            backdrop-blur-md

            flex items-center justify-center
            overflow-hidden
          "
        >
          {/* CLOSE */}
          <button
            type="button"
            onClick={closePreview}
            className="
              absolute top-5 right-5 z-[10000]

              w-12 h-12
              rounded-full

              bg-white/10
              hover:bg-red-500

              flex items-center justify-center

              text-white

              transition-all duration-300
            "
          >
            <X className="w-6 h-6" />
          </button>

          {/* PREV */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="
              absolute left-2 md:left-6 z-[10000]

              w-12 h-12
              rounded-full

              bg-white/10
              hover:bg-white/20

              flex items-center justify-center

              text-white

              transition-all duration-300
            "
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* NEXT */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="
              absolute right-2 md:right-6 z-[10000]

              w-12 h-12
              rounded-full

              bg-white/10
              hover:bg-white/20

              flex items-center justify-center

              text-white

              transition-all duration-300
            "
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* IMAGE CONTAINER */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="
              relative
              w-full
              h-full

              flex items-center justify-center
              px-16
            "
          >
            <div
              className="
                relative
                w-full
                max-w-6xl
                h-[80vh]
              "
            >
              <Image
                key={selectedImage}
                src={selectedImage}
                alt="Preview"
                fill
                priority
                unoptimized
                className="
                  object-contain
                  select-none
                  pointer-events-none

                  animate-[fadeIn_0.3s_ease]
                "
              />
            </div>
          </div>

          {/* COUNTER */}
          <div
            className="
              absolute bottom-6 left-1/2
              -translate-x-1/2

              px-4 py-2
              rounded-full

              bg-white/10
              text-white
              text-sm
              backdrop-blur-md
            "
          >
            {selectedIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  );
}