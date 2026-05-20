"use client";

import * as React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { Album, Cerita } from "@/types/orderTypes";

const defaultImages = [
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
];

export default function LoveStory({ style = "", styleImg = "" }) {
  const [loveStories, setLoveStories] = React.useState<Cerita[]>([]);

  // Ambil data cerita dari Redux state order

  const { key, mempelai, posisiMempelai, album, cerita } = useAppSelector(
    (state) => state.order,
  );

  useEffect(() => {
    console.log("Cerita dari Redux:", cerita);
    if (cerita && cerita.length > 0) {
      setLoveStories(cerita);
    } else {
      setLoveStories([]);
    }
  }, [cerita]);

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={` ${style} z-12
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer`}
          >
            <Image
              src="/assets/love-story.webp"
              alt="Love Story"
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
          <DialogHeader className="px-6 py-6 border-b bg-[#9F6326] text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />

              <DialogTitle className="text-2xl md:text-3xl font-semibold text-white">
                Our Love Story
              </DialogTitle>
            </div>

            {/* <DialogDescription className="text-sm md:text-base text-white max-w-2xl mx-auto">
              Setiap perjalanan cinta memiliki cerita yang indah. Berikut adalah
              sebagian kecil perjalanan kami hingga menuju hari bahagia.
            </DialogDescription> */}
          </DialogHeader>

          {/* CONTENT */}
          <div
            className="
              max-h-[80vh]
              overflow-y-auto
              p-6
            "
          >
            <div className="relative">
              {/* TIMELINE LINE */}
              <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-rose-200 -translate-x-1/2" />

              <div className="space-y-12">
                {loveStories.map((story, index) => (
                  <div
                    key={index}
                    className={`
                      relative grid md:grid-cols-2 gap-6 items-center
                    `}
                  >
                    {/* DOT */}
                    <div
                      className="
                        absolute
                        left-4
                        md:left-1/2
                        top-5
                        w-4
                        h-4
                        rounded-full
                        bg-rose-500
                        border-4
                        border-white
                        shadow-md
                        -translate-x-1/2
                        z-10
                      "
                    />

                    {/* TEXT */}
                    <div
                      className={`
                        pl-12 md:pl-0
                        ${
                          index % 2 === 0
                            ? "md:pr-16 text-left md:text-right"
                            : "md:col-start-2 md:pl-16 text-left"
                        }
                      `}
                    >
                      <p className="text-sm text-rose-500 font-medium mb-2">
                        {story.tanggal_cerita}
                      </p>

                      <h3 className="text-2xl font-semibold text-neutral-800 mb-3">
                        {story.judul_cerita}
                      </h3>

                      <p className="text-neutral-600 leading-relaxed">
                        {story.isi_cerita}
                      </p>
                    </div>

                    {/* IMAGE */}
                    <div
                      className={`
                        pl-12 md:pl-0
                        ${index % 2 === 0 ? "md:col-start-2" : "md:row-start-1"}
                      `}
                    >
                      <div
                        className="
                          relative
                          overflow-hidden
                          rounded-3xl
                          shadow-lg
                          group
                        "
                      >
                        <Image
                          src={defaultImages[index % defaultImages.length]}
                          alt={story.judul_cerita}
                          width={1200}
                          height={800}
                          className="
                            w-full
                            h-[250px]
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />

                        <div
                          className="
                            absolute
                            inset-0
                            bg-black/10
                            group-hover:bg-black/20
                            transition
                          "
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
