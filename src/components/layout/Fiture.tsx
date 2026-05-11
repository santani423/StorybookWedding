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
import Gallery from "@/components/layout/Gallery"
import Rsvp from "@/components/layout/Rsvp"
import Couple from "@/components/layout/Couple" 
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

      <ClothesRack />
      <Addres style={`absolute 
                top-0 
                right-7
                xl:right-3 
                3xl:right-4`} />
     
        <Rsvp />
        <Couple />
        <LoveStory />
        <Gift />

      
      
      

     

      <Gallery/>
    </div>
  );
}
