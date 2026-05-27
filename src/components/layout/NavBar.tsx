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

  // Reset dragPos saat komponen di-deselect atau baru dipilih
  const prevSelected = useRef(selectedComponent);
  useEffect(() => {
    if (prevSelected.current !== selectedComponent) {
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

  const isDragged = dragPos !== null;
  const isActive = EDIT_MODE && !!selectedComponent;

  // Tentukan inline style posisi
  const navStyle: React.CSSProperties = isDragged
    ? { position: "fixed", left: dragPos.x, top: dragPos.y, transform: "none" }
    : isActive
    ? { position: "fixed", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
    : {};

  // Kelas posisi Tailwind hanya aktif saat idle (tidak active, tidak drag)
  const navClass = [
    "z-50 flex flex-row sm:flex-col md:flex-col items-center justify-center gap-2 md:gap-3 rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-xl",
    !isDragged && !isActive
      ? "fixed left-1/2 bottom-5 sm:left-auto sm:-right-2 md:left-auto md:right-6 md2:right-8 lg:right-14 lg2:right-74 xl:right-94 5xl:right-200 sm:bottom-20 md:top-1/2 md:bottom-auto -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2"
      : "",
  ].join(" ");

  return (
    <>
    <div
      ref={navRef}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={navStyle}
      className={navClass}
    >
      {/* ── CONTROL PANEL: hanya tampil jika EDIT_MODE aktif ── */}
      {EDIT_MODE && selectedComponent && (
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
          {(() => {
            const allStyles = componentStyles as Record<string, Record<string, any>> | undefined;
            const resolved = selectedComponent && device
              ? resolveStyle(allStyles?.[selectedComponent] ?? {}, device)
              : {};
            return (
              <div className="flex flex-row gap-1 flex-wrap justify-center">
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
            );
          })()}

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

      {/* + / - hanya tampil jika EDIT_MODE aktif */}
      {EDIT_MODE && (
        <>
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
        </>
      )}
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
