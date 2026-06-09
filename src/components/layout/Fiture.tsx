"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";
import { setSelectedComponent } from "@/redux/slices/counterSlice";
import { resolveStyle, toPositionCss, toImgCss } from "@/utils/breakpoint";
import AssetItem from "@/components/layout/AssetItem";

const ROLUS_GUARD: Record<string, (rolus: any, hasSlug: boolean) => boolean> = {
  address: (rolus) => rolus?.lokasi === 1,
  rsvp: (rolus, hasSlug) => rolus?.komen === 1 || hasSlug,
  gift: (rolus) => rolus?.hadiah === 1,
  gallery: (rolus) => rolus?.gallery === 1,
  couple: (rolus) => rolus?.mempelai === 1,
  "clothes-rack": (rolus) => rolus?.dress_code === 1,
};

export default function Fiture() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { device, selectedComponent, componentStyles, apiAssets } = useAppSelector(
    (state) => state.counter,
  );
  const { rolus } = useAppSelector((state) => state.order);
  const hasSlug = !!searchParams.get("tamu");

  const bp = device ?? "default";
  const allStyles = componentStyles as Record<string, Record<string, any>> | undefined;

  function posStyle(key: string) {
    const styles = allStyles?.[key];
    if (!styles) return {};
    return toPositionCss(resolveStyle(styles, bp));
  }

  function imgStyle(key: string) {
    const styles = allStyles?.[key];
    if (!styles) return {};
    return toImgCss(resolveStyle(styles, bp));
  }

  function selectHandler(key: string) {
    return () => dispatch(setSelectedComponent(selectedComponent === key ? null : key));
  }


  return (
    <div
      className="p-4 pt-20 md:pt-4 rounded-lg shadow-md relative w-full h-full flex items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) dispatch(setSelectedComponent(null));
      }}
    >
      {apiAssets.map((asset) => {
        const guard = ROLUS_GUARD[asset.name];
        if (guard && !guard(rolus, hasSlug)) return null;
        return (
          <AssetItem
            key={asset.name}
            name={asset.name}
            positionStyle={posStyle(asset.name)}
            imgStyle={imgStyle(asset.name)}
            isSelected={selectedComponent === asset.name}
            onSelect={selectHandler(asset.name)}
          />
        );
      })}
    </div>
  );
}
