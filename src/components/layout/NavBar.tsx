"use client";

import {
  Headphones,
  HeadphoneOff,
  Power,
  PowerOff,
  Plus,
  Minus,
  X,
  GripVertical,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  setAnimationEnabled,
  setSelectedComponent,
  setControlTarget,
  adjustComponentStyle,
} from "@/redux/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useUpdateTema } from "@/services/queries";
import { Toast, type ToastData } from "@/components/ui/Toast";

const Massage = dynamic(() => import("./nav/Message"), { ssr: false });
const InfoSection = dynamic(() => import("./nav/InfoSection"), { ssr: false });
const QrCode = dynamic(() => import("./nav/QrCodeItem"), { ssr: false });

const COMPONENT_LABELS: Record<string, string> = {
  clothesRack: "Dress Code",
  addres: "Alamat",
  rsvp: "RSVP",
  couple: "Couple",
  loveStory: "Love Story",
  gift: "Gift",
  gallery: "Gallery",
};

const TARGETS = [
  { key: "top",    label: "T" },
  { key: "bottom", label: "B" },
  { key: "left",   label: "L" },
  { key: "right",  label: "R" },
  { key: "w",      label: "W" },
] as const;

export default function NavBar() {
  const dispatch = useAppDispatch();

  const { device, selectedComponent, controlTarget, apiAssets } = useAppSelector(
    (state) => state.counter,
  );
  const { tamu } = useAppSelector((state) => state.order);

  const [toast, setToast] = useState<ToastData>(null);

  const { mutate: updateTema } = useUpdateTema("TEMA1");

  function handleAdjust(plesMinus: "+" | "-") {
    if (!selectedComponent || !device || !controlTarget) return;

    dispatch(adjustComponentStyle({ delta: plesMinus === "+" ? 1 : -1 }));

    const asset = apiAssets.find((a) => a.name === selectedComponent);
    if (!asset) return;

    updateTema(
      { asset_id: asset.id, breakpoint: device, plesMinus, type: controlTarget },
      {
        onSuccess: (data) => {
          const oldVal = data?.old_size?.value ?? "-";
          const newVal = data?.new_size?.value ?? "-";
          const isOk = data?.new_size != null;
          setToast({
            message: isOk
              ? `Berhasil: ${oldVal} → ${newVal}`
              : (data?.message ?? "Gagal update"),
            type: isOk ? "success" : "error",
          });
        },
        onError: () => {
          setToast({ message: "Gagal terhubung ke server", type: "error" });
        },
      }
    );
  }

  const [musicStatus, setMusicStatus] = useState(true);
  const [powerStatus, setPowerStatus] = useState(true);

  // ── Drag state ──────────────────────────────────────────────────────
  const navRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  // Saat control panel ditutup (selectedComponent → null), kembali ke posisi asal
  const prevSelected = useRef(selectedComponent);
  useEffect(() => {
    if (prevSelected.current !== null && selectedComponent === null) {
      setDragPos(null);
    }
    prevSelected.current = selectedComponent;
  }, [selectedComponent]);

  // Pointer down pada handle → mulai drag
  const onPointerDown = (e: React.PointerEvent) => {
    if (!selectedComponent) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setDragPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  // ── Audio ────────────────────────────────────────────────────────────
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://undesia.com/assets/users/5fe34263026b4ea9b2a6ba1cc5dcb60b/musik.mp3",
      );
      audioRef.current.loop = true;
    }
    if (musicStatus) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [musicStatus]);

  const iconClass = `
    w-11 h-11 md:w-12 md:h-12
    flex items-center justify-center
    rounded-full bg-black/40 hover:bg-black/60
    active:scale-95 transition-all duration-300
    backdrop-blur-md shadow-lg cursor-pointer
  `;

  // Saat drag aktif: pakai inline style fixed position; hapus semua kelas posisi Tailwind
  const isDragged = dragPos !== null;

  return (
    <>
    <div
      ref={navRef}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={
        isDragged
          ? { position: "fixed", left: dragPos.x, top: dragPos.y, transform: "none" }
          : undefined
      }
      className={
        isDragged
          ? // Saat drag: hapus posisi Tailwind, pakai inline style saja
            "z-50 flex flex-row sm:flex-col md:flex-col items-center justify-center gap-2 md:gap-3 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-xl"
          : // Posisi asal
            "fixed left-1/2 bottom-5 sm:left-auto sm:-right-2 md:left-auto md:right-6 md2:right-8 lg:right-14 lg2:right-74 xl:right-94 5xl:right-200 sm:bottom-20 md:top-1/2 md:bottom-auto z-50 flex flex-row sm:flex-col md:flex-col items-center justify-center gap-2 md:gap-3 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-xl -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2"
      }
    >
      {/* ── CONTROL PANEL: info + target selector (saat ada komponen terpilih) ── */}
      {selectedComponent && (
        <div className="flex flex-col items-center gap-1 bg-black/50 rounded-xl p-2 border border-white/20 w-full">
          {/* Handle drag */}
          <div
            onPointerDown={onPointerDown}
            className="flex items-center gap-1 cursor-grab active:cursor-grabbing text-white/40 hover:text-white/80 transition-colors select-none mb-0.5"
            title="Seret untuk pindahkan"
          >
            <GripVertical className="w-4 h-4" />
            <span className="text-[9px]">geser</span>
          </div>

          {/* Nama komponen + breakpoint aktif */}
          <div className="text-white text-[10px] font-medium text-center leading-tight">
            <span className="text-yellow-300">
              {COMPONENT_LABELS[selectedComponent] ?? selectedComponent}
            </span>
            <br />
            <span className="text-white/60">{device ?? "default"}</span>
          </div>

          {/* Target selector: T B L R W */}
          <div className="flex flex-row gap-1 flex-wrap justify-center">
            {TARGETS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => dispatch(setControlTarget(key))}
                className={`w-7 h-7 rounded text-[11px] font-bold transition-all ${
                  controlTarget === key
                    ? "bg-yellow-400 text-black"
                    : "bg-white/20 text-white hover:bg-white/40"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Batal pilih */}
          <button
            type="button"
            onClick={() => dispatch(setSelectedComponent(null))}
            className="flex items-center gap-1 text-white/60 hover:text-white text-[10px] mt-0.5 transition-colors"
          >
            <X className="w-3 h-3" /> Batal pilih
          </button>
        </div>
      )}

      {/* Info */}
      <InfoSection />

      {/* Message */}
      <Massage />

      {/* QR */}
      <div className={`${tamu?.qrcode ? "block" : "hidden"} ${iconClass}`}>
        <QrCode />
      </div>

      {/* Music */}
      <button
        type="button"
        className={iconClass}
        onClick={() => setMusicStatus((prev) => !prev)}
      >
        {musicStatus ? (
          <Headphones className="h-5 w-5 text-white" />
        ) : (
          <HeadphoneOff className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Power / Animation */}
      <button
        type="button"
        className={iconClass}
        onClick={() => {
          const next = !powerStatus;
          setPowerStatus(next);
          dispatch(setAnimationEnabled(next));
        }}
      >
        {powerStatus ? (
          <Power className="h-5 w-5 text-white" />
        ) : (
          <PowerOff className="h-5 w-5 text-white" />
        )}
      </button>

      {/* + / - selalu tampil; aktif saat ada komponen terpilih */}
      <button
        type="button"
        disabled={!selectedComponent}
        className={`${iconClass} ${selectedComponent ? "opacity-100" : "opacity-30 cursor-not-allowed"}`}
        onClick={() => handleAdjust("+")}
      >
        <Plus className="h-5 w-5 text-white" />
      </button>
      <button
        type="button"
        disabled={!selectedComponent}
        className={`${iconClass} ${selectedComponent ? "opacity-100" : "opacity-30 cursor-not-allowed"}`}
        onClick={() => handleAdjust("-")}
      >
        <Minus className="h-5 w-5 text-white" />
      </button>
    </div>

    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}
    </>
  );
}
