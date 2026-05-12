"use client";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/NavBar";
import Fiture from "@/components/layout/Fiture";
import { getTema, getBrackPoin } from "@/services/api";
import { log } from "node:console";
import {setEditSize} from "@/redux/slices/counterSlice"

export default function Home() {
  const dispatch = useAppDispatch();
  const [tema, setTema] = useState<any[]>([]);
  const [brackPoin, setBrackPoin] = useState<any[]>([]);
  const { device, indexPy, editSize } = useAppSelector(
    (state) => state.counter,
  );
  useEffect(() => {
    console.log("editSize",editSize);
    
    if (!editSize) return;

    const fetchTema = async () => {
      try {
        const data = await getTema();
        const brackPoin = await getBrackPoin();

        console.log(data);

        data?.data?.forEach((item: any) => {
          console.log("itemitem", item);

          item?.assets?.forEach((asset: any) => {
            console.log("asset", asset);
          });
        });

        setTema(data?.data?.[0]?.assets || []);
        setBrackPoin(brackPoin?.data || []);
        dispatch(setEditSize(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchTema();
  }, [editSize]);

  useEffect(() => {
    let style = "absolute ";
    console.log("brackPoin", brackPoin);
    console.log("brackPoin tema", tema);
    tema?.map((it: any, index: number) => {
      if (it?.type == "item") {
        console.log("brackPoin asset_sizes", it?.asset_sizes);
        it?.asset_sizes.map((as: any, ias: number) => {
          brackPoin.map((itm: any, i: number) => {
            as?.breakpoint?.name == itm?.name
              ? (style += itm?.name + ":" + as?.size_tema?.value + " ")
              : "";
          });
        });
      }
    });

    console.log("brackPoin style", style);
  }, [tema, brackPoin]);

  return (
    <main className="flex h-dvh w-full items-center justify-center bg-black overflow-hidden">
      <div
        className="relative flex w-full h-full 
        iphone:max-w-130
        mobile:max-w-86
        md:max-w-128 
        md2:max-w-[550px] 
        md3:max-w-[600px] 
        tb:max-w-180 
        lg:max-w-[650px]  
        lg2:max-w-80 
        lg3:max-w-70 
        sm:max-w-120 
        xl:max-w-[350px]
        2xl:max-w-[400px] 
        5xl:max-w-140 

        md:h-[90dvh] 
        lg:h-[100dvh] 
        xl:h-[100dvh]

        items-center justify-center md:shadow-2xl md:rounded-[3rem] transition-all duration-500 overflow-hidden"
        style={{
          backgroundImage: `url(/background.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Cinematic (Opsional, agar mirip prompt Storytelling Room Anda) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

        {/* Konten Utama */}
        <Fiture />
      </div>
      <Navbar />
    </main>
  );
}
