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
  const { device, indexPy, valuepy } = useAppSelector((state) => state.counter);

  const [selectedSize, setSelectedSize] = useState("default");
  return (
    <div className="p-4 rounded-lg shadow-md relative w-full h-full flex items-center justify-center">
      {/* Gambar utama */}

      <div
        className="absolute 
      top-68 
      xxs:top-46 
      xs:top-30 
      s:top-52 
      iphone:top-60
      mobile:top-42
      sm:top-58
      md:top-44 
      md2:top-74 
      md3:top-60
      tb:top-68
      lg:top-90
      xl:top-44
      3xl:top-66
      
      right-1 
      md:right-3
      xl:-right-2
      "
      >
        <Image
          src="/assets/clothes-rack.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="
    w-32
    xs:w-38
    iphone:w-40
    mobile:w-34
    sm:w-42
    md:w-50
    md2:w-50
    md3:w-60
    lg:w-60
    xl:w-30
    3xl:w-40
    tb:w-60
    h-auto
  "
        />
      </div>
      <div
        className="absolute 
      top-0 
      right-7
      xl:right-3 
      3xl:right-4"
      >
        <Image
          src="/assets/alamat.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="
          w-26 
          sm:w-32 
          md:w-36 
          tb:w-50
          lg:w-52 
          xl:w-22
          3xl:w-26 
          h-auto"
          onClick={() => dispatch(setItemEdit("alamat"))}
        />
      </div>
      <div
        className="absolute 
      left-3 
      xxs:left-12 
      md:left-20
      xl:left-12
      3xl:left-16
      "
      >
        <Image
          src="/assets/rsvp.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="
           
          w-24 
          xxs:min-w-16 
          s:w-28
          iphone:w-28
          mobile:w-20
          sm:w-32 
          md:w-30 
          m2:w-30 
          tb:w-40
          lg:w-48 
          xl:w-20
          3xl:w-24
          h-auto"
        />
      </div>
      <div
        className="absolute 
      xxs:bottom-72 
      xs:bottom-60 
      iphone:bottom-90 
      mobile:bottom-70
      s:bottom-86 
      md:bottom-90 
      md2:top-115 
      md3:top-110
      tb:top-120
      xl:top-65
      3xl:top-[340px]
       
      xxs:right-24 
      xs:right-28 
      iphone:right-34 
      mobile:right-26 
      md:right-38
      md2:right-50
      tb:right-50
      lg:right-48
      xl:right-30
      3xl:right-30
      "
      >
        <Image
          src="/assets/couple.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="
           
          w-32
          xxs:w-36
          xs:w-40
          s:w-34
          iphone:w-38
          mobile:w-30
          sm:w-52
          md:w-46
          md2:w-50
          md3:w-54
          tb:w-60
          lg:w-72
          xl:w-30
          3xl:w-[420px]
          h-auto
  "
        />
      </div>
      <div
        className="absolute 
        bottom-80 
        xxs:bottom-64 
        xs:bottom-56 
        s:bottom-74 
        iphone:bottom-78 
        mobile:bottom-62
        md:bottom-70 
        md2:bottom-100
        tb:bottom-100
        lg:bottom-116
        xl:bottom-56
        3xl:bottom-75  
        
        -right-8 
        xxs:-right-4 
        xs:-right-4 
        s:-right-2 
        iphone:-right-5 
        mobile:-right-2
        sm:-right-5
        md:-right-3
        md2:-right-3
        tb:-right-8
        lg:-right-6
        xl:right-0
        3xl:-right-1
      "
      >
        <Image
          src="/assets/love-story.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="
           
          w-40
          xxs:w-36
          s:w-38
          iphone:w-44
          mobile:w-34
          sm:w-48
          md:w-50 
          md2:w-60
          tb:w-68
          lg:w-66
          xl:w-32
          3xl:w-40
          h-auto
        "
        />
      </div>
      <div
        className="absolute 
      bottom-56 
      xxs:bottom-44 
      xs:bottom-36 
      iphone:bottom-54 
      mobile:bottom-44
      s:bottom-52 
      md:bottom-48 
      md2:bottom-72
      tb:bottom-68 
      lg:bottom-78
      xl:bottom-38
      3xl:bottom-53
      
      right-0 
      xxs:right-4 
      s:right-6 
      iphone:right-3 
      md:right-10
      tb:right-10
      3xl:right-8
      
      "
      >
        <Image
          src="/assets/gift.png"
          alt="Fitur 1"
          width={0}
          height={0}
          sizes="100vw"
          className="w-28 
          xxs:w-24 
          s:w-26 
          iphone:w-30 
          mobile:w-24
          sm:w-32 
          md:w-30 
          md2:w-38
          tb:w-42
          lg:w-46 
          xl:w-20
          3xl:w-24
          
          h-auto"
        />
      </div>

      <div
        className={`absolute top-40 
        xxs:top-32 
        iphone:top-44 
        mobile:top-32
        xs:top-20 
        s:top-40 
        md:top-32 
        md2:top-54 
        md3:top-44 
        tb:top-48 
        lg:top-56 
        xl:top-26
        3xl:top-36

        left-6 
        xxs:left-10 
        iphone:left-12 
        mobile:left-8
        xs:left-12 
        s:left-12 
        md:left-16 
        lg:left-20 
        xl:left-10
        3xl:left-10
        `}
      >
        <Image
          src="/assets/gallery.png"
          alt="Gallery"
          width={0}
          height={0}
          sizes="100vw"
          className="w-32 
          iphone:w-36 
          mobile:w-32
          md:w-40 
          lg:w-60 
          md2:w-48 
          md3:w-56 
          xl:w-30
          3xl:w-36
          h-auto"
        />
      </div>
    </div>
  );
}
