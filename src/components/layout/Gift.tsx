"use client";

import * as React from "react";
import Image from "next/image";
import {
  Gift as GiftIcon,
  Copy,
  QrCode,
  WalletCards,
  Check,
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

interface GiftProps {
  style?: string;
  styleImg?: string;
}

export default function Gift({
  style = "",
  styleImg = "",
}: GiftProps) {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(text);

      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const bankAccounts = [
    {
      bank: "Bank BCA",
      name: "Nama Mempelai",
      number: "1234567890",
    },
    {
      bank: "Bank Mandiri",
      name: "Nama Mempelai",
      number: "9876543210",
    },
  ];

  return (
    <Dialog>
      {/* BUTTON OPEN */}
      <DialogTrigger asChild>
        <button
          type="button"
          className={`
            ${style}
            animate-[floatButton_3s_ease-in-out_infinite]
            cursor-pointer
            outline-none
          `}
        >
          <Image
            src="/assets/gift.png"
            alt="Gift"
            width={300}
            height={300}
            priority
            className={styleImg}
          />
        </button>
      </DialogTrigger>

      {/* DIALOG */}
      <DialogContent
        className="
          sm:max-w-4xl
          rounded-3xl
          border-0
          bg-[#FCDDA6]
          p-0
          overflow-hidden
        "
      >
        {/* HEADER */}
        <DialogHeader
          className="
            px-6
            pt-6
            pb-5
            bg-[#9F6326]
            text-center
          "
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <GiftIcon className="w-5 h-5 text-white" />

            <DialogTitle className="text-2xl md:text-3xl font-semibold text-white">
              Wedding Gift
            </DialogTitle>
          </div>

          {/* <DialogDescription
            className="
              text-sm
              md:text-base
              text-white/90
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Kehadiran dan doa restu Anda sudah menjadi hadiah terbaik
            bagi kami. Namun jika ingin memberikan tanda kasih, dapat
            melalui informasi berikut.
          </DialogDescription> */}
        </DialogHeader>

        {/* CONTENT */}
        <div
          className="
            max-h-[80vh]
            overflow-y-auto
            p-5
            md:p-6
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  w-52
                  h-52
                  md:w-60
                  md:h-60
                  rounded-3xl
                  border-2
                  border-dashed
                  border-neutral-300
                  flex
                  items-center
                  justify-center
                  bg-white
                  mb-5
                  overflow-hidden
                "
              >
                {/* GANTI DENGAN QR ASLI */}
                {/* 
                  <Image
                    src="/assets/qr-code.png"
                    alt="QR Code"
                    width={240}
                    height={240}
                    className="object-contain"
                  /> 
                */}

                <QrCode className="w-24 h-24 text-neutral-400" />
              </div>

              <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                Scan QR Code
              </h3>

              <p className="text-sm text-neutral-500 leading-relaxed">
                Silakan scan QR Code untuk mengirim hadiah digital
                kepada mempelai.
              </p>
            </div>

            {/* BANK INFO */}
            <div className="space-y-5">
              {bankAccounts.map((item) => (
                <div
                  key={item.number}
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
                        shrink-0
                      "
                    >
                      <WalletCards className="w-6 h-6 text-rose-500" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-neutral-800">
                        {item.bank}
                      </h3>

                      <p className="text-sm text-neutral-500">
                        a.n. {item.name}
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
                    <p
                      className="
                        font-medium
                        tracking-wider
                        text-neutral-700
                        text-sm
                        md:text-base
                      "
                    >
                      {item.number}
                    </p>

                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="shrink-0"
                      onClick={() =>
                        copyToClipboard(item.number)
                      }
                    >
                      {copied === item.number ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}

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
                  Terima kasih atas doa, restu, dan hadiah yang
                  diberikan. Semoga kebaikan Anda dibalas dengan
                  kebahagiaan dan keberkahan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}