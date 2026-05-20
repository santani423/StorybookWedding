"use client";

import Image from "next/image";
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

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Scan QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[60vh] justify-center overflow-y-auto py-4">
          {/* Ganti src dengan QR asli */}
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <QRCodeWithLogo text="https://undesia.com" />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Scan QR code untuk check-in, RSVP, atau membuka informasi acara.
        </p>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
