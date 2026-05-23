"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSelectedComponent } from "@/redux/slices/counterSlice";
import Gallery from "@/components/layout/Gallery";
import Rsvp from "@/components/layout/Rsvp";
import Couple from "@/components/layout/Couple";
import LoveStory from "@/components/layout/LoveStory";
import ClothesRack from "@/components/layout/ClothesRack";
import Addres from "@/components/layout/Addres";
import Gift from "@/components/layout/Gift";
import { resolveStyle, toPositionCss, toImgCss } from "@/utils/breakpoint";
import { useEffect } from "react";

export default function Fiture() {
  const dispatch = useAppDispatch();
  const { device, selectedComponent, componentStyles } = useAppSelector(
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
  useEffect(()=>{
    console.log("rolus", rolus);
  },[rolus])
  return (
    <div
      className="p-4 rounded-lg shadow-md relative w-full h-full flex items-center justify-center"
      onClick={(e) => {
        // Deselect when clicking on the container background
        if (e.target === e.currentTarget) dispatch(setSelectedComponent(null));
      }}
    >
      <ClothesRack
        style="absolute"
        styleImg="h-auto"
        positionStyle={posStyle("clothesRack")}
        imgStyle={imgStyle("clothesRack")}
        isSelected={selectedComponent === "clothesRack"}
        onSelect={selectHandler("clothesRack")}
      />

      <Addres
        style={` ${rolus?.lokasi ? "absolute" : "hidden"}`}
        styleImg="h-auto"
        positionStyle={rolus?.lokasi ? posStyle("addres") : undefined}
        imgStyle={imgStyle("addres")}
        isSelected={selectedComponent === "addres"}
        onSelect={selectHandler("addres")}
      />

      <Rsvp
        style={` ${rolus?.komen ? "absolute" : "hidden"}`}
        styleImg="h-auto"
        positionStyle={rolus?.komen ? posStyle("rsvp") : undefined}
        imgStyle={imgStyle("rsvp")}
        isSelected={selectedComponent === "rsvp"}
        onSelect={selectHandler("rsvp")}
      />

      <Couple
        style=""
        styleImg="h-auto max-w-none"
        positionStyle={posStyle("couple")}
        imgStyle={imgStyle("couple")}
        isSelected={selectedComponent === "couple"}
        onSelect={selectHandler("couple")}
      />

      <LoveStory
        style="absolute"
        styleImg="h-auto"
        positionStyle={posStyle("loveStory")}
        imgStyle={imgStyle("loveStory")}
        isSelected={selectedComponent === "loveStory"}
        onSelect={selectHandler("loveStory")}
      />

      {rolus?.hadiah == 1 ? (
        <Gift
          style="absolute z-12"
          styleImg="h-auto"
          positionStyle={posStyle("gift")}
          imgStyle={imgStyle("gift")}
          isSelected={selectedComponent === "gift"}
          onSelect={selectHandler("gift")}
        />
      ) : (
        <><p>{rolus?.hadiah}</p></>
      )}

      <Gallery
        style="absolute"
        styleImg="h-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] hover:drop-shadow-[0_0_40px_rgba(255,255,255,1)] transition-all duration-500 hover:scale-110"
        positionStyle={posStyle("gallery")}
        imgStyle={imgStyle("gallery")}
        isSelected={selectedComponent === "gallery"}
        onSelect={selectHandler("gallery")}
      />
    </div>
  );
}
