"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSelectedComponent } from "@/redux/slices/counterSlice";
import { resolveStyle, toPositionCss, toImgCss } from "@/utils/breakpoint";
import AssetItem from "@/components/layout/AssetItem";

const ROLUS_GUARD: Record<string, (rolus: any) => boolean> = {
  address: (rolus) => !!rolus?.lokasi,
  rsvp: (rolus) => !!rolus?.komen,
  gift: (rolus) => rolus?.hadiah === 1,
};

export default function Fiture() {
  const dispatch = useAppDispatch();
  const { device, selectedComponent, componentStyles, apiAssets } = useAppSelector(
    (state) => state.counter,
  );
  const { rolus } = useAppSelector((state) => state.order);

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
        if (guard && !guard(rolus)) return null; 
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
