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
import Gallery from "@/components/layout/Gallery";
import Rsvp from "@/components/layout/Rsvp";
import Couple from "@/components/layout/Couple";
import LoveStory from "@/components/layout/LoveStory";
import ClothesRack from "@/components/layout/ClothesRack";
import Addres from "@/components/layout/Addres";
import Gift from "@/components/layout/Gift";

export default function Fiture() {
  const dispatch = useDispatch();
  const assets = useAppSelector((state) => state.counter.assets);
  const { device, indexPy, valuepy } = useAppSelector((state) => state.counter);

  const [selectedSize, setSelectedSize] = useState("default");
  return (
    <div className="p-4 rounded-lg shadow-md relative w-full h-full flex items-center justify-center">
      {/* Gambar utama */}

      <ClothesRack
        style="absolute 
                    top-68 
                    xxs:top-46 
                    xs:top-30 
                    s:top-52 
                    s2:top-42 
                    iphone:top-60
                    mobile:top-42
                    sm:top-66
                    md:top-44 
                    md2:top-64 
                    md3:top-60
                    tb:top-72
                    lg:top-88
                    lg2:top-34
                    lg3:top-40
                    xl:top-44
                    3xl:top-58
                    5xl:top-82
                    right-1 
                    md:right-3
                    xl:-right-2"
        styleImg=" w-32
                xs:w-38
                iphone:w-40
                mobile:w-34
                sm:w-42
                md:w-50
                md2:w-50
                md3:w-60
                lg:w-60
                lg2:w-28
                xl:w-30
                3xl:w-40
                tb:w-60
                5xl:w-50
                h-auto"
      />
      <Addres
        style={`absolute 
                top-0 
                right-7
                xl:right-3 
                3xl:right-4`}
        styleImg=" w-26 
                sm:w-32 
                md:w-36  
                lg:w-52 
                lg2:w-20
                tb:w-40
                xl:w-22
                3xl:w-26 
                5xl:w-40 
                h-auto"
      />

      <Rsvp
        style="absolute 
                    left-3 
                    xxs:left-12 
                    md:left-20
                    lg2:left-10
                    xl:left-12
                    3xl:left-16"
        styleImg=" w-24 
                xxs:min-w-16 
                s:w-26
                s2:w-20
                iphone:w-28
                mobile:w-20
                sm:w-28 
                md:w-30 
                md2:w-32 
                tb:w-40
                lg:w-40 
                lg2:w-18 
                xl:w-20
                3xl:w-24
                5xl:w-32
                h-auto"
      />
      <Couple
        style=" xxs:bottom-72
                    xs:bottom-60
                    s:bottom-86
                    s2:bottom-72
                    iphone:bottom-90
                    mobile:bottom-70
                    sm:bottom-96
                    md:bottom-90
                    md2:top-100
                    md3:top-[110px]
                    tb:top-115
                    lg:top-130
                    lg2:top-56
                    lg3:top-62
                    xl:top-66
                    3xl:top-[340px]
                    5xl:top-118
                
                    xxs:right-24
                    xs:right-28
                    s2:right-38
                    iphone:right-34
                    mobile:right-26
                    sm:right-44
                    md:right-38
                    md2:right-40
                    tb:right-68
                    lg:right-48
                    lg2:right-28
                    lg3:right-18
                    xl:right-30
                    3xl:right-30
                    5xl:right-46"
        styleImg="h-auto
                max-w-none
          
                w-32
                xxs:w-36
                xs:w-40
                s:w-34
                s2:w-30
                iphone:w-38
                mobile:w-30
                sm:w-42
                md:w-46
                md2:w-50
                md3:w-54
                tb:w-60
                lg:w-60
                lg2:w-28
                xl:w-[120px]
                3xl:w-34
                5xl:w-50"
      />
      <LoveStory
        style=" absolute 
              bottom-80 
              xxs:bottom-64 
              xs:bottom-56 
              s:bottom-74 
              s2:bottom-58 
              iphone:bottom-78 
              mobile:bottom-62
              sm:bottom-80 
              md:bottom-70 
              md2:bottom-90
              tb:bottom-90
              lg:bottom-116 
              lg2:bottom-42
              lg3:bottom-52
              xl:bottom-56
              3xl:bottom-70  
              5xl:bottom-100  
              
              -right-8 
              xxs:-right-4 
              xs:-right-4 
              s:-right-2 
              s2:right-2 
              iphone:-right-5 
              mobile:-right-2
              sm:-right-0
              md:-right-3
              md2:-right-6
              tb:-right-8
              lg:-right-6
              lg2:-right-1
              xl:right-0
              3xl:-right-1"
        styleImg=" w-40
                xxs:w-36
                s:w-38
                s2:w-36
                iphone:w-44
                mobile:w-34
                sm:w-42
                md:w-50 
                md2:w-58
                tb:w-78
                lg:w-66
                lg2:w-30
                lg3:w-26
                xl:w-32
                3xl:w-40
                5xl:w-54
                h-auto"
      />
      <Gift style=" absolute 
                    bottom-56 
                    xxs:bottom-44 
                    xs:bottom-36 
                    iphone:bottom-54 
                    mobile:bottom-44
                    s:bottom-40 
                    sm:bottom-56 
                    md:bottom-48 
                    md2:bottom-62
                    tb:bottom-58 
                    lg:bottom-82
                    lg2:bottom-28
                    lg3:bottom-40
                    xl:bottom-38
                    3xl:bottom-53
                    5xl:bottom-74
                    
                    right-0 
                    xxs:right-4 
                    s:right-6 
                    iphone:right-3 
                    sm:right-12
                    md:right-10
                    tb:right-10
                    lg2:right-6
                    3xl:right-8
                    5xl:right-10
                    z-12" 
                    
                    styleImg=" w-28 
                xxs:w-24 
                s:w-24 
                iphone:w-30 
                mobile:w-24
                s2:w-24 
                sm:w-30 
                md:w-30 
                md2:w-35
                tb:w-42
                lg:w-40 
                lg2:w-16 
                xl:w-20
                3xl:w-24
                5xl:w-32
                h-auto"/>

      <Gallery
        style="absolute top-40 
                  xxs:top-32 
                  iphone:top-44 
                  mobile:top-32
                  xs:top-20 
                  s:top-40 
                  s2:top-28 
                  sm:top-42 
                  md:top-32 
                  md2:top-44 
                  md3:top-44 
                  tb:top-36 
                  lg:top-62 
                  lg2:top-20 
                  lg3:top-30 
                  xl:top-26
                  3xl:top-36
                  5xl:top-58
      
                  left-6 
                  xxs:left-10 
                  iphone:left-12 
                  mobile:left-8
                  xs:left-12 
                  s:left-12 
                  sm:left-14 
                  md:left-16 
                  tb:left-26 
                  lg:left-20 
                  lg2:left-10 
                  lg3:left-6 
                  xl:left-10
                  3xl:left-10
                  5xl:left-22"
        styleImg="  w-32 
                iphone:w-36 
                mobile:w-32
                sm:w-42 
                md:w-40 
                lg:w-56 
                lg2:w-26 
                md2:w-48 
                md3:w-56 
                xl:w-30
                3xl:w-36
                5xl:w-42
                h-auto

                drop-shadow-[0_0_25px_rgba(255,255,255,0.9)]
                hover:drop-shadow-[0_0_40px_rgba(255,255,255,1)]

                transition-all
                duration-500
                hover:scale-110"
      />
    </div>
  );
}
