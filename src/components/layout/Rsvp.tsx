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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Rsvp() {
  const [name, setName] = React.useState("");
  const [attendance, setAttendance] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      attendance,
      message,
    });

    alert("RSVP berhasil dikirim ✨");

    setName("");
    setAttendance("");
    setMessage("");
  };

  return (
    <>
      {/* BUTTON OPEN */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="
              absolute 
              left-3 
              xxs:left-12 
              md:left-20
              lg2:left-10
              xl:left-12
              3xl:left-16
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer
            "
          >
            <Image
              src="/assets/rsvp.png"
              alt="RSVP"
              width={0}
              height={0}
              sizes="100vw"
              className="
                w-24 
                xxs:min-w-16 
                s:w-26
                s2:w-20
                iphone:w-28
                mobile:w-20
                sm:w-28 
                md:w-30 
                md2:w-32 
                tb:w-40
                lg:w-40 
                lg2:w-18 
                xl:w-20
                3xl:w-24
                5xl:w-32
                h-auto
              "
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-white/95 backdrop-blur-md p-0 overflow-hidden">
          {/* HEADER */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-neutral-50 text-center">
            <DialogTitle className="text-2xl font-serif text-neutral-800">
              RSVP Wedding
            </DialogTitle>

            <DialogDescription className="text-neutral-500">
              Konfirmasi kehadiran dan kirim doa terbaik Anda ✨
            </DialogDescription>
          </DialogHeader>

          {/* CONTENT */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6"
          >
            {/* NAME */}
            <div className="space-y-2">
              <Label className="text-neutral-700">
                Nama Lengkap
              </Label>

              <Input
                type="text"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl border-neutral-200"
                required
              />
            </div>

            {/* ATTENDANCE */}
            <div className="space-y-2">
              <Label className="text-neutral-700">
                Konfirmasi Kehadiran
              </Label>

              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                required
                className="
                  w-full
                  h-11
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  px-3
                  text-sm
                  outline-none
                  focus:ring-2
                  focus:ring-black
                "
              >
                <option value="">Pilih Kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="space-y-2">
              <Label className="text-neutral-700">
                Ucapan & Doa
              </Label>

              <Textarea
                placeholder="Tulis ucapan terbaik..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] rounded-2xl border-neutral-200"
              />
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="
                w-full
                h-11
                rounded-xl
                bg-black
                text-white
                hover:bg-neutral-800
              "
            >
              Kirim RSVP
            </Button>
          </form> 
        </DialogContent>
      </Dialog>
    </>
  );
}