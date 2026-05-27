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

const STYLE_MAP: Record<string, { style: string; styleImg: string }> = {
  "clothes-rack": { style: "absolute", styleImg: `h-auto ${HOVER_ANIMATION}` },
  gallery: { style: "absolute", styleImg: `h-auto ${HOVER_ANIMATION}` },
  address: { style: "absolute", styleImg: `h-auto ${HOVER_ANIMATION}` },
  rsvp: { style: "absolute", styleImg: `h-auto ${HOVER_ANIMATION}` },
  couple: { style: "", styleImg: `h-auto max-w-none ${HOVER_ANIMATION}` },
  "love-story": { style: "absolute", styleImg: `h-auto ${HOVER_ANIMATION}` },
  gift: { style: "absolute z-12", styleImg: `h-auto ${HOVER_ANIMATION}` },
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
