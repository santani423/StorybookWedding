"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareText, Send, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getKomentar, postKomentar } from "@/services/api";
import { useAppSelector } from "@/redux/hooks";

function formatWaktu(created_at: string): string {
  const now = new Date();
  const created = new Date(created_at);
  const diffMs = now.getTime() - created.getTime();
  const diffMenit = Math.floor(diffMs / 60000);
  const diffJam = Math.floor(diffMs / 3600000);
  const diffHari = Math.floor(diffMs / 86400000);

  if (diffMenit < 1) return "Baru saja";
  if (diffMenit < 60) return `${diffMenit} menit yang lalu`;
  if (diffJam < 24) return `${diffJam} jam yang lalu`;
  if (diffHari < 7) return `${diffHari} hari yang lalu`;

  return created.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const ID_USER = 310;

interface Komentar {
  id: number;
  id_user: number;
  nama_komentar: string;
  isi_komentar: string;
  created_at: string;
  updated_at: string;
}

export default function Massage() {
  const tamu = useAppSelector((state) => state.order.tamu);
  const namaTamu = tamu?.nama_tamu ?? "";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<Komentar[]>([]);
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const showName = !namaTamu && message.length > 0;

  const fetchComments = () => {
    getKomentar(ID_USER)
      .then((json) => setComments([...(json.data ?? [])].reverse()))
      .catch(() => {});
  };

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const resolvedName = namaTamu || name;
    if (!resolvedName.trim() || !message.trim()) return;
    setSending(true);
    try {
      const json = await postKomentar({ id_user: ID_USER, nama: resolvedName, komen: message });
      if (json.data) {
        setComments((prev) => [json.data, ...prev]);
        setTimeout(() => {
          listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
      }
      setName("");
      setMessage("");
    } catch {
      // gagal kirim, biarkan user coba lagi
    } finally {
      setSending(false);
    }
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
          bg-panel-bg
          shadow-2xl
        "
      >
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-brand-primary/30 bg-brand-primary">
          <DialogTitle className="text-lg font-serif text-white">
            Ucapan & Doa
          </DialogTitle>
          <p className="text-sm text-white/80">
            Sampaikan doa dan ucapan terbaik untuk kedua mempelai.
          </p>
        </DialogHeader>

        {/* Daftar pesan */}
        <div ref={listRef} className="max-h-[38vh] overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
          {comments.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-2xl bg-brand-primary p-3"
            >
              <div className="w-8 h-8 rounded-full bg-panel-bg flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-brand-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-panel-bg">{item.nama_komentar}</p>
                <p className="text-xs text-white/80 leading-relaxed">{item.isi_komentar}</p>
                <p className="text-[10px] text-white/50 mt-0.5">{formatWaktu(item.created_at)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form kirim pesan */}
        <form
          onSubmit={handleSubmit}
          className="px-4 pb-5 pt-3 border-t border-brand-primary/30 space-y-3 bg-panel-bg"
        >
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showName ? "max-h-20 opacity-100 mb-2" : "max-h-0 opacity-0"
            }`}
          >
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary" />
              <Input
                id="msg-name"
                name="name"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={showName}
                className="pl-9 rounded-xl border-brand-primary/40 bg-white/70 focus:border-brand-primary focus:ring-brand-primary text-sm"
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
              className="resize-none rounded-xl border-brand-primary/40 bg-white/70 focus:border-brand-primary focus:ring-brand-primary text-sm flex-1"
            />
            <button
              type="submit"
              className="
                w-10 h-10 shrink-0
                flex items-center justify-center
                rounded-full
                bg-brand-primary
                hover:bg-brand-primary/80
                active:scale-95
                transition-all duration-200
                shadow-md
                disabled:opacity-40
              "
              disabled={!message.trim() || sending}
            >
              {sending
                ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                : <Send className="w-4 h-4 text-white" />
              }
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
