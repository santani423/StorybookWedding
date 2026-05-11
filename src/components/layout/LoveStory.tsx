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

const loveStories = [
  {
    date: "Januari 2021",
    title: "Pertama Bertemu",
    description:
      "Tidak ada yang kebetulan di dunia ini. Kami pertama kali dipertemukan dalam sebuah momen sederhana yang kemudian menjadi awal perjalanan panjang penuh cerita.",
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "Agustus 2022",
    title: "Menjalin Hubungan",
    description:
      "Seiring berjalannya waktu, kami semakin mengenal satu sama lain. Banyak tawa, cerita, dan dukungan yang membuat hubungan ini tumbuh semakin erat.",
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "Desember 2024",
    title: "Lamaran",
    description:
      "Dengan restu keluarga dan penuh rasa syukur, kami memutuskan untuk melangkah ke tahap yang lebih serius dalam hubungan ini.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
  },
  {
    date: "Mei 2026",
    title: "Menuju Hari Bahagia",
    description:
      "Kini kami bersiap menyambut hari istimewa untuk memulai perjalanan baru sebagai pasangan suami dan istri.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function LoveStory() {
  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="
              absolute 
              bottom-80 
              xxs:bottom-64 
              xs:bottom-56 
              s:bottom-74 
              s2:bottom-58 
              iphone:bottom-78 
              mobile:bottom-62
              sm:bottom-80 
              md:bottom-70 
              md2:bottom-90
              tb:bottom-90
              lg:bottom-116 
              lg2:bottom-42
              lg3:bottom-52
              xl:bottom-56
              3xl:bottom-70  
              5xl:bottom-100  
              
              -right-8 
              xxs:-right-4 
              xs:-right-4 
              s:-right-2 
              s2:right-2 
              iphone:-right-5 
              mobile:-right-2
              sm:-right-0
              md:-right-3
              md2:-right-6
              tb:-right-8
              lg:-right-6
              lg2:-right-1
              xl:right-0
              3xl:-right-1
              z-12
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer
            "
          >
            <Image
              src="/assets/love-story.png"
              alt="Love Story"
              width={0}
              height={0}
              sizes="100vw"
              className="
                w-40
                xxs:w-36
                s:w-38
                s2:w-36
                iphone:w-44
                mobile:w-34
                sm:w-42
                md:w-50 
                md2:w-58
                tb:w-78
                lg:w-66
                lg2:w-30
                lg3:w-26
                xl:w-32
                3xl:w-40
                5xl:w-54
                h-auto
              "
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent
          className="
            w-[95vw]
            sm:max-w-5xl
            p-0
            overflow-hidden
            border-none
            rounded-3xl
            bg-white
            shadow-2xl
          "
        >
          {/* HEADER */}
          <DialogHeader className="px-6 py-6 border-b bg-neutral-50 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />

              <DialogTitle className="text-2xl md:text-3xl font-semibold text-neutral-800">
                Our Love Story
              </DialogTitle>
            </div>

            <DialogDescription className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto">
              Setiap perjalanan cinta memiliki cerita yang indah. Berikut adalah
              sebagian kecil perjalanan kami hingga menuju hari bahagia.
            </DialogDescription>
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
                        {story.date}
                      </p>

                      <h3 className="text-2xl font-semibold text-neutral-800 mb-3">
                        {story.title}
                      </h3>

                      <p className="text-neutral-600 leading-relaxed">
                        {story.description}
                      </p>
                    </div>

                    {/* IMAGE */}
                    <div
                      className={`
                        pl-12 md:pl-0
                        ${
                          index % 2 === 0
                            ? "md:col-start-2"
                            : "md:row-start-1"
                        }
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
                          src={story.image}
                          alt={story.title}
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