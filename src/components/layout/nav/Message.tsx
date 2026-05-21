"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareText, Send, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const mockMessages = [
  { name: "Budi Santoso", message: "Selamat menempuh hidup baru, semoga langgeng dan bahagia selalu! 🎉" },
  { name: "Siti Rahayu", message: "Barakallah, semoga menjadi keluarga yang sakinah mawaddah warahmah." },
  { name: "Andi Wijaya", message: "Congrats! Semoga pernikahan kalian menjadi awal dari kebahagiaan yang tak terhingga." },
  { name: "Dewi Lestari", message: "Turut berbahagia atas pernikahan kalian. Semoga selalu diberkahi." },
  { name: "Rizky Pratama", message: "Selamat dan bahagia! Semoga rumah tangga kalian penuh cinta dan kebahagiaan." },
];

export default function Massage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const showName = message.length > 0;

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: kirim data ke API
    setName("");
    setMessage("");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-11 h-11
          md:w-12 md:h-12
          flex items-center justify-center
          rounded-full
          bg-black/40
          hover:bg-black/60
          active:scale-95
          transition-all duration-300
          backdrop-blur-md
          shadow-lg
          cursor-pointer"
        >
          <MessageSquareText className="w-5 h-5 text-white" />
        </div>
      </DialogTrigger>

      <DialogContent
        className="
          w-[95%]
          sm:max-w-[420px]
          p-0
          overflow-hidden
          border-none
          rounded-3xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-neutral-50">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Ucapan & Doa
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Sampaikan doa dan ucapan terbaik untuk kedua mempelai.
          </p>
        </DialogHeader>

        {/* Daftar pesan */}
        <div className="max-h-[38vh] overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
          {mockMessages.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-2xl bg-neutral-50 border p-3"
            >
              <div className="w-8 h-8 rounded-full bg-[#FCDDA6] flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-[#9F6326]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{item.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form kirim pesan */}
        <form
          onSubmit={handleSubmit}
          className="px-4 pb-5 pt-3 border-t space-y-3 bg-white"
        >
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showName ? "max-h-20 opacity-100 mb-2" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9F6326]" />
              <Input
                id="msg-name"
                name="name"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={showName}
                className="pl-9 rounded-xl border-neutral-200 focus:border-[#FCDDA6] focus:ring-[#FCDDA6] text-sm"
              />
            </div>
          </div>

          <div className="flex gap-2 items-end">
            <Textarea
              id="msg-message"
              name="message"
              placeholder="Tulis ucapan atau doa..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={2}
              className="resize-none rounded-xl border-neutral-200 focus:border-[#FCDDA6] focus:ring-[#FCDDA6] text-sm flex-1"
            />
            <button
              type="submit"
              className="
                w-10 h-10 shrink-0
                flex items-center justify-center
                rounded-full
                bg-[#9F6326]
                hover:bg-[#8a5420]
                active:scale-95
                transition-all duration-200
                shadow-md
                disabled:opacity-40
              "
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
