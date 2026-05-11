"use client";

import * as React from "react";
import Image from "next/image";
import {
  Gift as GiftIcon,
  Copy,
  QrCode,
  WalletCards,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function Gift() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="
              absolute 
              bottom-56 
              xxs:bottom-44 
              xs:bottom-36 
              iphone:bottom-54 
              mobile:bottom-44
              s:bottom-40 
              sm:bottom-56 
              md:bottom-48 
              md2:bottom-62
              tb:bottom-58 
              lg:bottom-82
              lg2:bottom-28
              lg3:bottom-40
              xl:bottom-38
              3xl:bottom-53
              5xl:bottom-74
              
              right-0 
              xxs:right-4 
              s:right-6 
              iphone:right-3 
              sm:right-12
              md:right-10
              tb:right-10
              lg2:right-6
              3xl:right-8
              5xl:right-10
              z-12
            "
          >
            <Image
              src="/assets/gift.png"
              alt="Gift"
              width={0}
              height={0}
              sizes="100vw"
              className="
                w-28 
                xxs:w-24 
                s:w-24 
                iphone:w-30 
                mobile:w-24
                s2:w-24 
                sm:w-30 
                md:w-30 
                md2:w-35
                tb:w-42
                lg:w-40 
                lg2:w-16 
                xl:w-20
                3xl:w-24
                5xl:w-32
                h-auto
                animate-[floatButton_3s_ease-in-out_infinite]
                cursor-pointer
              "
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent
          className="
            w-[95vw]
            sm:max-w-4xl
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
              <GiftIcon className="w-5 h-5 text-rose-500" />

              <DialogTitle className="text-2xl md:text-3xl font-semibold text-neutral-800">
                Wedding Gift
              </DialogTitle>
            </div>

            <DialogDescription className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto">
              Kehadiran dan doa restu Anda sudah menjadi hadiah terbaik bagi
              kami. Namun jika ingin memberikan tanda kasih, dapat melalui
              informasi berikut.
            </DialogDescription>
          </DialogHeader>

          {/* CONTENT */}
          <div className="max-h-[80vh] overflow-y-auto p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* QR CODE */}
              <div
                className="
                  bg-neutral-50
                  rounded-3xl
                  border
                  p-6
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >
                <div
                  className="
                    w-56
                    h-56
                    rounded-3xl
                    border-2
                    border-dashed
                    border-neutral-300
                    flex
                    items-center
                    justify-center
                    bg-white
                    mb-5
                  "
                >
                  <QrCode className="w-24 h-24 text-neutral-400" />
                </div>

                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Scan QR Code
                </h3>

                <p className="text-sm text-neutral-500 leading-relaxed">
                  Silakan scan QR Code untuk mengirim hadiah digital kepada
                  mempelai.
                </p>
              </div>

              {/* BANK INFO */}
              <div className="space-y-5">
                {/* CARD 1 */}
                <div
                  className="
                    rounded-3xl
                    border
                    p-5
                    bg-white
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-rose-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <WalletCards className="w-6 h-6 text-rose-500" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-neutral-800">
                        Bank BCA
                      </h3>

                      <p className="text-sm text-neutral-500">
                        a.n. Nama Mempelai
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      bg-neutral-50
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >
                    <p className="font-medium tracking-wider text-neutral-700">
                      1234567890
                    </p>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard("1234567890")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* CARD 2 */}
                <div
                  className="
                    rounded-3xl
                    border
                    p-5
                    bg-white
                    shadow-sm
                  "
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-rose-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <WalletCards className="w-6 h-6 text-rose-500" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-neutral-800">
                        Bank Mandiri
                      </h3>

                      <p className="text-sm text-neutral-500">
                        a.n. Nama Mempelai
                      </p>
                    </div>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      bg-neutral-50
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >
                    <p className="font-medium tracking-wider text-neutral-700">
                      9876543210
                    </p>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard("9876543210")}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* FOOTNOTE */}
                <div
                  className="
                    rounded-3xl
                    bg-rose-50
                    border
                    border-rose-100
                    p-5
                  "
                >
                  <p className="text-sm text-rose-700 leading-relaxed">
                    Terima kasih atas doa, restu, dan hadiah yang diberikan.
                    Semoga kebaikan Anda dibalas dengan kebahagiaan dan
                    keberkahan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}