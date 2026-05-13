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

export default function Rsvp({style="",styleImg=""}) {
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
            className={`
              ${style}
              animate-[floatButton_3s_ease-in-out_infinite]
              cursor-pointer`}
          >
            <Image
              src="/assets/rsvp.webp"
              alt="RSVP"
              width={0}
              height={0}
              sizes="100vw"
              className={styleImg}
            />
          </div>
        </DialogTrigger>

        {/* DIALOG */}
        <DialogContent className="sm:max-w-md rounded-3xl border-0 bg-[#FCDDA6] backdrop-blur-md p-0 overflow-hidden">
          {/* HEADER */}
          <DialogHeader className="px-6 pt-6 pb-4 border-b bg-[#9F6326] text-center">
            <DialogTitle className="text-2xl font-serif text-white">
              RSVP Wedding
            </DialogTitle>

            {/* <DialogDescription className="text-white">
              Konfirmasi kehadiran dan kirim doa terbaik Anda ✨
            </DialogDescription> */}
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
                bg-[#9F6326]
                text-white
                hover:bg-[#9F6326]-800
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