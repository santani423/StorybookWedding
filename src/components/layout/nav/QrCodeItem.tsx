"use client";

import { Button } from "@/components/ui/button";
import QRCodeWithLogo from "@/components/ui/QRCodeWithLogo";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { QrCode } from "lucide-react";

export default function QrCodeItem() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <QrCode className="h-5 w-5 text-white" />
      </DialogTrigger>

      <DialogContent
        className="
          w-[95%]
          sm:max-w-105
          p-0
          overflow-hidden
          border-none
          rounded-3xl
          bg-[#FCDDA6]
          shadow-2xl
        "
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#9F6326]/30 bg-[#9F6326]">
          <DialogTitle className="text-lg font-serif text-white text-center">
            Scan QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6 px-4">
          <div className="rounded-2xl border-2 border-[#9F6326]/30 bg-white p-4 shadow-md">
            <QRCodeWithLogo text="https://undesia.com" />
          </div>

          <p className="text-center text-sm text-[#9F6326]/80 leading-relaxed">
            Scan QR code untuk check-in, RSVP, atau membuka informasi acara.
          </p>
        </div>

        <DialogFooter className="px-4 pb-5 pt-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="w-full rounded-xl border-[#9F6326]/40 text-[#9F6326] bg-white/70 hover:bg-[#9F6326] hover:text-white transition-colors duration-200"
            >
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
