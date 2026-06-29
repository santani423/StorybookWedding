"use client";

import type { CSSProperties, ComponentType } from "react";
import ClothesRack from "@/components/layout/ClothesRack";
import Gallery from "@/components/layout/Gallery";
import Addres from "@/components/layout/Addres";
import Rsvp from "@/components/layout/Rsvp";
import Couple from "@/components/layout/Couple";
import LoveStory from "@/components/layout/LoveStory";
import Gift from "@/components/layout/Gift";

export type AssetItemProps = {
  style?: string;
  styleImg?: string;
  positionStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  isSelected?: boolean;
  onSelect?: () => void;
};

const COMPONENT_REGISTRY: Record<string, ComponentType<AssetItemProps>> = {
  "clothes-rack": ClothesRack,
  gallery: Gallery,
  address: Addres,
  rsvp: Rsvp,
  couple: Couple,
  "love-story": LoveStory,
  gift: Gift,
};

const HOVER_ANIMATION =
  "transition-all duration-500 hover:scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] hover:drop-shadow-[0_0_40px_rgba(255,255,255,1)]";

/*
  Posisi tiap komponen ditentukan oleh grid di Fiture.tsx.
  style    → className pada elemen button (mengisi sel grid sepenuhnya)
  styleImg → className pada <Image>; w-full h-full object-contain
             menjaga rasio gambar tanpa distorsi
*/
const GRID_CELL = "relative w-full h-full flex items-center justify-center";
const IMG_FIT   = `w-full h-full object-contain ${HOVER_ANIMATION}`;

const STYLE_MAP: Record<string, { style: string; styleImg: string }> = {
  "clothes-rack": { style: GRID_CELL,           styleImg: IMG_FIT },
  gallery:        { style: GRID_CELL,           styleImg: IMG_FIT },
  address:        { style: GRID_CELL,           styleImg: IMG_FIT },
  rsvp:           { style: GRID_CELL,           styleImg: IMG_FIT },
  couple:         { style: GRID_CELL,           styleImg: `max-w-none ${IMG_FIT}` },
  "love-story":   { style: GRID_CELL,           styleImg: IMG_FIT },
  gift:           { style: `${GRID_CELL} z-12`, styleImg: IMG_FIT },
};

const EDIT_MODE = process.env.NEXT_PUBLIC_EDIT_MODE === "true";

export default function AssetItem({
  name,
  positionStyle,
  imgStyle,
  isSelected,
  onSelect,
}: {
  name: string;
  positionStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  isSelected?: boolean;
  onSelect?: () => void;
}) {
  const Component = COMPONENT_REGISTRY[name];
  if (!Component) return null;

  const { style, styleImg } = STYLE_MAP[name] ?? { style: "absolute", styleImg: "h-auto" };

  return (
    <Component
      style={style}
      styleImg={styleImg}
      positionStyle={positionStyle}
      imgStyle={imgStyle}
      isSelected={EDIT_MODE ? isSelected : false}
      onSelect={onSelect}
    />
  );
}
