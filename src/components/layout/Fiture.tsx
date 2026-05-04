"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { increment, setItemEdit } from "@/redux/slices/counterSlice";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Fiture() {
  const dispatch = useDispatch();
  const assets = useAppSelector((state) => state.counter.assets);

  const [selectedSize, setSelectedSize] = useState("default");
  return (
    <div className="p-4 rounded-lg shadow-md relative w-full h-full flex items-center justify-center">
      {/* Gambar utama */}
      {/* <div className="absolute top-72 xxs:top-52 xs:top-44 s:top-64 md:top-80 md2:top-100 right-1 md:right-3">
        <Image
          src="/assets/dres-code.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 sm:w-32 md:w-40 lg:w-52 h-auto"
          onClick={() => dispatch(setItemEdit("dres-code"))}
        />
      </div>
      <div className="absolute top-0 right-7">
        <Image
          src="/assets/alamat.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-26 sm:w-32 md:w-40 lg:w-52 h-auto"
          onClick={() => dispatch(setItemEdit("alamat"))}
        />
      </div>
      <div className="absolute left-3 xxs:left-12 md:left-20">
        <Image
          src="/assets/rsvp.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-24 xxs:min-w-16 s:w-28 sm:w-32 md:w-40 lg:w-52 h-auto"
        />
      </div>
      <div className="absolute xxs:bottom-72 xs:bottom-60 s:bottom-80 md:bottom-80 md2:top-110 md3:top-130 xxs:right-20 xs:right-28 iphone:bottom-96 iphone:right-24  md:right-32">
        <Image
          src="/assets/couple.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="min-w-40 xxs:min-w-36 s:min-w-44 sm:w-32 md:w-48 md3:w-[10000px] lg:w-52 md2:60 h-auto"
        />
      </div>
      <div className="absolute bottom-80 xxs:bottom-64 xs:bottom-56 s:bottom-72 iphone:bottom-92 md:bottom-80 md2:bottom-96 -right-8 xxs:-right-8 xs:-right-4 s:-right-12 iphone:-right-14 md:right-1">
        <Image
          src="/assets/love-story.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-40 xxs:w-36 s:w-44 iphone:w-48 sm:w-32 md:w-48 md2:w-96 lg:w-52 h-auto"
        />
      </div>
      <div className="absolute bottom-56 xxs:bottom-44 xs:bottom-36 iphone:bottom-60 s:bottom-52 md:bottom-48 md2:bottom-60 right-0 xxs:right-4 s:right-6 iphone:right-3 md:right-5">
        <Image
          src="/assets/gift.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-28 xxs:w-24 s:w-28 iphone:w-32 sm:w-32 md:w-40 lg:w-52 h-auto"
        />
      </div>

      
      <div className="absolute top-40 xxs:top-32 iphone:top-44 xs:top-20 s:top-40 md:top-32 md2:top-40 md3:top-44 tb:top-48 lg:top-56 xl:top-26  left-6 xxs:left-10 iphone:left-12 xs:left-12 s:left-12 md:left-16 lg:left-20 xl:left-12">
        <Image
          src="/assets/gallery.png"
          alt="Gallery"
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 iphone:w-36 md:w-40 lg:w-60 md2:w-48 md3:w-56 xl:w-28   h-auto"
        />
      </div>  */}

      {assets.map((asset) => {
        const pc = asset?.style?.position || "";
        const sc = asset?.style?.size || "";
        const xMedia = asset?.style?.xMedia || [];

        return (
          // <div key={asset.name} className={`absolute ${pc}-40 xxs:${pc}-32 iphone:${pc}-44 xs:${pc}-20 s:${pc}-40 md:${pc}-32 md2:${pc}-40 md3:${pc}-44 tb:${pc}-48 lg:${pc}-56 xl:${pc}-26  ${sc}-6 xxs:${sc}-10 iphone:${sc}-12 xs:${sc}-12 s:${sc}-12 md:${sc}-16 lg:${sc}-20 xl:${sc}-12`}>
          <div
            key={asset.name}
            className={`absolute ${xMedia.map((item) => {
              return `${item.device}:${pc}-${item.py}`;
            })}  ${sc}-6 xxs:${sc}-10 iphone:${sc}-12 xs:${sc}-12 s:${sc}-12 md:${sc}-16 lg:${sc}-20 xl:${sc}-12`}
          >
            <Image
              src={asset.src}
              alt={asset.name}
              width={300}
              height={300}
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 240px"
              className={`h-auto w-32 iphone:w-36 md:w-40 lg:w-60 md2:w-48 md3:w-56 xl:w-28`}
            />
          </div>
        );
      })}
    </div>
  );
}
