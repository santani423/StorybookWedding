"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { setSelectedComponent } from "@/redux/slices/counterSlice";
import AssetItem from "@/components/layout/AssetItem";

/*
  ┌──────────── TOKEN UKURAN ─────────────────────────────────────┐
  │  Ubah nilai di sini untuk mengubah ukuran semua komponen      │
  │                                                               │
  │  CARD_SIZE   → lebar & tinggi komponen biasa (6 kartu bawah)  │
  │  COUPLE_SIZE → lebar & tinggi komponen Couple (fokus utama)   │
  │  CARD_GAP    → jarak antar kartu dalam satu baris (horizontal)│
  └───────────────────────────────────────────────────────────────┘

  Layout:
  ┌──────────────────────────────────┐
  │          [  Couple  ]            │  ← COUPLE_SIZE, center
  ├────────────┬─────────┬───────────┤  ← space-evenly (otomatis)
  │  Gallery   │LoveStory│   RSVP    │  ← CARD_SIZE, 3 kolom
  ├────────────┼─────────┼───────────┤  ← space-evenly (otomatis)
  │   Gift     │DressCode│  Address  │  ← CARD_SIZE, 3 kolom
  └────────────┴─────────┴───────────┘

  Jarak antar baris diatur oleh `alignContent: "space-evenly"` —
  otomatis menyesuaikan tinggi layar tanpa overflow.
  Padding simetris di semua sisi agar tidak menempel tepi container.
*/

const CARD_SIZE   = "clamp(68px, 20vw, 100px)";
const COUPLE_SIZE = "clamp(128px, 42vw, 188px)";
const CARD_GAP    = "clamp(6px, 1.8vw, 12px)";

/* Padding simetris semua sisi:
   - Atas: lebih besar untuk memberi ruang navbar
   - Kiri/Kanan/Bawah: sama agar tidak menempel tepi */
const PAD_TOP    = "clamp(120px, 28vw, 180px)";
const PAD_SIDE   = "clamp(12px, 4vw, 24px)";
const PAD_BOTTOM = "clamp(8px, 2vw, 16px)";

const ROLUS_GUARD: Record<string, (rolus: any, hasSlug: boolean) => boolean> = {
  address:        (rolus)          => rolus?.lokasi === 1,
  rsvp:           (rolus, hasSlug) => rolus?.komen === 1 || hasSlug,
  gift:           (rolus)          => rolus?.hadiah === 1,
  gallery:        (rolus)          => rolus?.gallery === 1,
  couple:         (rolus)          => rolus?.mempelai === 1,
  "clothes-rack": (rolus)          => rolus?.dress_code === 1,
  "love-story":   ()               => true,
};

export default function Fiture() {
  const dispatch     = useAppDispatch();
  const searchParams = useSearchParams();

  const { selectedComponent } = useAppSelector((state) => state.counter);
  const { rolus }             = useAppSelector((state) => state.order);
  const hasSlug               = !!searchParams.get("tamu");

  function isVisible(name: string) {
    const guard = ROLUS_GUARD[name];
    return guard ? guard(rolus, hasSlug) : true;
  }

  function selectHandler(key: string) {
    return () =>
      dispatch(setSelectedComponent(selectedComponent === key ? null : key));
  }

  /** Satu sel kartu biasa — CARD_SIZE × CARD_SIZE, konten di-center */
  function cardCell(name: string) {
    return (
      <div
        key={name}
        style={{
          width:          CARD_SIZE,
          height:         CARD_SIZE,
          flexShrink:     0,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
        }}
      >
        {isVisible(name) ? (
          <AssetItem
            name={name}
            isSelected={selectedComponent === name}
            onSelect={selectHandler(name)}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      /* Outer container: grid 3 baris, jarak antar baris otomatis (space-evenly)
         sehingga konten tidak pernah overflow atau berdempetan di tepi */
      style={{
        width:          "100%",
        height:         "100%",
        display:        "grid",
        gridTemplateRows: "auto auto auto",
        alignContent:   "space-evenly",
        justifyContent: "center",
        justifyItems:   "center",
        paddingTop:     PAD_TOP,
        paddingBottom:  PAD_BOTTOM,
        paddingLeft:    PAD_SIDE,
        paddingRight:   PAD_SIDE,
        boxSizing:      "border-box",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(setSelectedComponent(null));
      }}
    >
      {/* ── Baris 1: Couple — lebih besar, fokus utama ───────────────────── */}
      <div
        style={{
          width:      COUPLE_SIZE,
          height:     COUPLE_SIZE,
          flexShrink: 0,
        }}
      >
        {isVisible("couple") ? (
          <AssetItem
            name="couple"
            isSelected={selectedComponent === "couple"}
            onSelect={selectHandler("couple")}
          />
        ) : null}
      </div>

      {/* ── Baris 2: Gallery | LoveStory | RSVP ─────────────────────────── */}
      <div style={{ display: "flex", gap: CARD_GAP }}>
        {cardCell("gallery")}
        {cardCell("love-story")}
        {cardCell("rsvp")}
      </div>

      {/* ── Baris 3: Gift | DressCode | Address ──────────────────────────── */}
      <div style={{ display: "flex", gap: CARD_GAP }}>
        {cardCell("gift")}
        {cardCell("clothes-rack")}
        {cardCell("address")}
      </div>
    </div>
  );
}
