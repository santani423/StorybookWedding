"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";

import { Gift as GiftIcon, Copy, WalletCards, Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface GiftProps {
  style?: string;
  styleImg?: string;
}

import type { CSSProperties } from "react";

export default function Gift({
  style = "",
  styleImg = "",
  positionStyle,
  imgStyle,
  isSelected,
  onSelect,
}: GiftProps & {
  positionStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  isSelected?: boolean;
  onSelect?: () => void;
}) {
  const [copied, setCopied] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { rekening, key } = useAppSelector((state: any) => state.order);
  const { animationEnabled, apiAssets } = useAppSelector(
    (state: any) => state.counter,
  );
  const [src, setSrc] = useState("");
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

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://undangan.undesia.com";

  useEffect(() => {
    const giftAsset = apiAssets.find((asset: any) => asset.name === "gift");
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      "https://bancendundesia.undesia.com";
    if (giftAsset && giftAsset.src) {
      setSrc(`${baseUrl}${giftAsset.src}`);
    }
  }, [apiAssets]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* BUTTON OPEN */}
        <button
          type="button"
          className={`
            ${style}
            ${animationEnabled ? "animate-[floatButton_3s_ease-in-out_infinite]" : ""}
             outline-none inline-flex items-center justify-center
          `}
          style={positionStyle}
        >
          <span
            className={`
              block
              ring-2 ring-offset-2 rounded
              ${isSelected ? "ring-white/90" : "ring-transparent ring-offset-transparent"}
            `}
          >
            {src ? (
              <Image
                src={src}
                onClick={() => { onSelect?.(); setOpen(true); }}
                alt="Gift"
                width={300}
                height={300}
                priority
                className={`cursor-pointer ${styleImg}`}
                style={imgStyle}
              />
            ) : (
              <span
                className={styleImg}
                style={{ display: "block", ...imgStyle }}
              />
            )}
          </span>
        </button>

      {/* DIALOG */}
      <DialogContent
        className="
          sm:max-w-3xl
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
            px-6 pr-10
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

          {/* <p
            className="
              text-sm
              md:text-base
              text-white/90
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Kehadiran dan doa restu Anda sudah menjadi hadiah terbaik bagi kami.
            Namun jika ingin memberikan tanda kasih, dapat melalui informasi
            berikut.
          </p> */}
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
          {!rekening || rekening.length === 0 ? (
            <div
              className="
                bg-white
                rounded-3xl
                p-8
                text-center
                shadow-sm
              "
            >
              <p className="text-neutral-500">Belum ada data rekening.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {rekening.map((item: any) => {
                const qr = key
                  ? `${baseUrl}/assets/users/${key}/rekening/${item.qrcode_bank}`
                  : "";

                return (
                  <div
                    key={item.id}
                    className="
                      rounded-3xl
                      border
                      p-5
                      bg-white
                      shadow-sm
                    "
                  >
                    {/* HEADER CARD */}
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
                          {item.nama_bank}
                        </h3>

                        <p className="text-sm text-neutral-500">
                          a.n. {item.nama_pemilik}
                        </p>
                      </div>
                    </div>

                    {/* NOMOR REKENING */}
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
                          break-all
                        "
                      >
                        {item.no_rekening}
                      </p>

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="shrink-0"
                        onClick={() => copyToClipboard(item.no_rekening)}
                      >
                        {copied === item.no_rekening ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>

                    {/* QR CODE */}
                    {item.qrcode_bank && (
                      <div
                        className="
                          mt-5
                          flex
                          flex-col
                          items-center
                          justify-center
                          rounded-3xl
                          bg-neutral-50
                          border
                          border-dashed
                          border-neutral-200
                          p-5
                        "
                      >
                        <div
                          className="
                            w-[180px]
                            h-[180px]
                            rounded-2xl
                            bg-white
                            border
                            shadow-sm
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                          "
                        >
                          <Image
                            src={qr}
                            alt="QR Code"
                            width={160}
                            height={160}
                            className="object-contain"
                          />
                        </div>

                        <p className="text-sm text-neutral-500 mt-3 text-center">
                          Scan QR Code untuk transfer
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}

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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
