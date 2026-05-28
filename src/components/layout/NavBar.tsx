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
import { resolveStyle } from "@/utils/breakpoint";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useUpdateTema } from "@/services/queries";
import { Toast, type ToastData } from "@/components/ui/Toast";

const Massage = dynamic(() => import("./nav/Message"), { ssr: false });
const InfoSection = dynamic(() => import("./nav/InfoSection"), { ssr: false });
const QrCode = dynamic(() => import("./nav/QrCodeItem"), { ssr: false });

const COMPONENT_LABELS: Record<string, string> = {
  "clothes-rack": "Dress Code",
  address: "Alamat",
  rsvp: "RSVP",
  couple: "Couple",
  "love-story": "Love Story",
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

const EDIT_MODE = process.env.NEXT_PUBLIC_EDIT_MODE === "true";

export default function NavBar() {
  const dispatch = useAppDispatch();

  const { device, selectedComponent, controlTarget, apiAssets, componentStyles } = useAppSelector(
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
            message: isOk ? `Berhasil: ${oldVal} → ${newVal}` : (data?.message ?? "Gagal update"),
            type: isOk ? "success" : "error",
          });
        },
        onError: () => setToast({ message: "Gagal terhubung ke server", type: "error" }),
      }
    );
  }

  const [musicStatus, setMusicStatus] = useState(true);
  const [powerStatus, setPowerStatus] = useState(true);

  // ── Drag ────────────────────────────────────────────────────────────
  const navRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);

  const onDragHandlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setDragPos({
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    });
  };

  const onPointerUp = () => { isDragging.current = false; };

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

  // Posisi: saat di-drag pakai inline style; saat idle pakai Tailwind
  const isDragged = dragPos !== null;

  const navStyle: React.CSSProperties = isDragged
    ? { position: "fixed", left: dragPos.x, top: dragPos.y, transform: "none", touchAction: "none" }
    : { touchAction: "none" };

  const navClass = [
    "z-50 flex items-center gap-2 border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl",
    // mobile: horizontal pill di bawah tengah
    "flex-row rounded-full px-3 py-2",
    // md+: vertikal pill di kanan tengah
    "md:flex-col md:rounded-2xl md:px-2 md:py-2",
    !isDragged
      ? "fixed bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
      : "",
  ].join(" ");

  // resolved values untuk target selector
  const allStyles = componentStyles as Record<string, Record<string, any>> | undefined;
  const resolved = selectedComponent && device
    ? resolveStyle(allStyles?.[selectedComponent] ?? {}, device)
    : {};

  return (
    <>
      <div
        ref={navRef}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={navStyle}
        className={navClass}
      >
        {/* ── DRAG HANDLE — hanya di md+, di mobile nav sudah fixed bottom center ── */}
        <div
          onPointerDown={onDragHandlePointerDown}
          className="hidden md:flex w-full items-center justify-center gap-1 py-1 cursor-grab active:cursor-grabbing text-white/50 hover:text-white/90 transition-colors select-none rounded-lg hover:bg-white/10"
        >
          <GripVertical className="w-5 h-5" />
        </div>

        {/* ── EDIT MODE CONTROL PANEL ── */}
        {EDIT_MODE && (
          <div className="flex flex-col items-center gap-1.5 bg-black/50 rounded-xl p-2 border border-white/20 md:w-full">

            {/* Select item */}
            <select
              value={selectedComponent ?? ""}
              onChange={(e) => dispatch(setSelectedComponent(e.target.value || null))}
              className="w-full rounded-lg bg-white/10 text-white text-[11px] px-2 py-1.5 border border-white/20 outline-none cursor-pointer hover:bg-white/20 transition-colors"
            >
              <option value="" className="bg-neutral-900 text-white/60">— Pilih item —</option>
              {apiAssets.map((asset) => (
                <option key={asset.name} value={asset.name} className="bg-neutral-900 text-white">
                  {COMPONENT_LABELS[asset.name] ?? asset.name}
                </option>
              ))}
            </select>

            {/* Breakpoint aktif */}
            {selectedComponent && (
              <span className="text-[9px] text-white/50">{device ?? "default"}</span>
            )}

            {/* Target selector T B L R W */}
            {selectedComponent && (
              <div className="flex flex-row gap-1 flex-wrap justify-center w-full">
                {TARGETS.map(({ key, label }) => {
                  const val = (resolved as any)[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => dispatch(setControlTarget(key))}
                      className={`flex flex-col items-center justify-center w-9 h-9 rounded text-[10px] font-bold transition-all ${
                        controlTarget === key
                          ? "bg-yellow-400 text-black"
                          : "bg-white/20 text-white hover:bg-white/40"
                      }`}
                    >
                      <span>{label}</span>
                      <span className={`text-[9px] font-normal leading-none ${controlTarget === key ? "text-black/70" : "text-white/60"}`}>
                        {val !== undefined ? val : "–"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* + / - */}
            <div className="flex gap-1 w-full">
              <button
                type="button"
                disabled={!selectedComponent || !controlTarget}
                onClick={() => handleAdjust("-")}
                className="flex-1 flex items-center justify-center h-9 rounded bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={!selectedComponent || !controlTarget}
                onClick={() => handleAdjust("+")}
                className="flex-1 flex items-center justify-center h-9 rounded bg-white/20 hover:bg-white/40 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Batal pilih */}
            {selectedComponent && (
              <button
                type="button"
                onClick={() => dispatch(setSelectedComponent(null))}
                className="flex items-center gap-1 text-white/50 hover:text-white text-[10px] transition-colors"
              >
                <X className="w-3 h-3" /> Batal pilih
              </button>
            )}
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
        <button type="button" className={iconClass} onClick={() => setMusicStatus((p) => !p)}>
          {musicStatus ? <Headphones className="h-5 w-5 text-white" /> : <HeadphoneOff className="h-5 w-5 text-white" />}
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
          {powerStatus ? <Power className="h-5 w-5 text-white" /> : <PowerOff className="h-5 w-5 text-white" />}
        </button>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
