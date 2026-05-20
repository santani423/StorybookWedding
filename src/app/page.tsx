"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { useEffect, useState } from "react";

import Navbar from "@/components/layout/NavBar";
import Fiture from "@/components/layout/Fiture";

import { getTema, getBrackPoin, getOrder } from "@/services/api";
import { setEditSize } from "@/redux/slices/counterSlice";
import {
  setKey,
  setMempelai,
  setPosisiMempelai,
  setAlbum,
  setCerita,
  setAdditionalData,
  setAcara,
} from "@/redux/slices/orderSlice";
// 1. Impor interface Response dari types jika diperlukan untuk typing data API
import { DomainDetailsResponse } from "@/types/orderTypes";
import { Skeleton } from "@/components/ui/skeleton";

import Image from "next/image";

export default function Home() {
  const dispatch = useAppDispatch();

  const [tema, setTema] = useState<any[]>([]);
  const [brackPoin, setBrackPoin] = useState<any[]>([]);

  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(true);

  const { editSize } = useAppSelector((state) => state.counter);
  // Redux sekarang sudah mengenali bahwa 'mempelai' tipenya adalah Mempelai | null
  const { key, mempelai, posisiMempelai } = useAppSelector(
    (state) => state.order,
  );

  /* =========================================
      FETCH DATA
  ========================================= */
  useEffect(() => {
    if (!editSize) return;

    const fetchTema = async () => {
      try {
        setLoading(true);
        const data = await getTema();
        const brackPoin = await getBrackPoin();

        // 2. Berikan opsi type-assertion (atau sesuaikan dengan return type getOrder)
        const order = (await getOrder()) as DomainDetailsResponse | undefined;

        console.log("Order:", order?.data);
        console.log("Order kunci:", order?.data?.user?.data?.kunci);
        console.log(
          "Order mempelai:",
          order?.data?.user?.mempelai?.posisi_mempelai,
        );

        if (order?.data?.user) {
          dispatch(setKey(order.data.user.data.kunci));
          // 3. Data ini sekarang aman di-dispatch karena strukturnya cocok dengan interface Mempelai
          dispatch(setMempelai(order.data.user.mempelai));
          dispatch(setPosisiMempelai(order.data.user.mempelai.posisi_mempelai));
          dispatch(setAlbum(order.data.user.album || []));
          dispatch(setCerita(order.data.user.cerita || []));
          dispatch(setAdditionalData(order.data.user.data || []));
          dispatch(setAcara(order.data.user.acara || []));
        }

        setTema(data?.data?.[0]?.assets || []);
        setBrackPoin(brackPoin?.data || []);

        dispatch(setEditSize(false));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTema();
  }, [editSize, dispatch]);

  /* =========================================
      GENERATE STYLE
  ========================================= */
  useEffect(() => {
    let style = "absolute ";

    tema?.forEach((it: any) => {
      if (it?.type === "item") {
        it?.asset_sizes.forEach((as: any) => {
          brackPoin.forEach((itm: any) => {
            if (as?.breakpoint?.name === itm?.name) {
              style += itm?.name + ":" + as?.size_tema?.value + " ";
            }
          });
        });
      }
    });

    console.log("generated style", style);
  }, [tema, brackPoin]);

  useEffect(() => {
    console.log("Redux key:", key);
    console.log("Redux mempelai:", mempelai);
  }, [key, mempelai]);

  /* =========================================
      MAIN STYLE
  ========================================= */
  const style = `
    relative flex w-full h-full
    iphone:max-w-130 mobile:max-w-86 sm:max-w-120
    md:max-w-128 md2:max-w-[550px] md3:max-w-[600px]
    tb:max-w-180
    lg:max-w-[650px] lg2:max-w-80 lg3:max-w-70
    xl:max-w-[350px] 2xl:max-w-[400px] 3xl:max-w-[500px] 5xl:max-w-[560px]
    md:h-[90dvh] lg:h-[100dvh] xl:h-[100dvh]
    items-center justify-center
    md:shadow-2xl md:rounded-[3rem]
    transition-all duration-500 overflow-hidden
  `;

  return (
    <main className="flex justify-center items-center h-dvh w-full bg-black overflow-hidden">
      <div
        className={style}
        style={{
          backgroundImage: `url(/background.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-0" />

        {/* =========================================
            WELCOMA LAYER
        ========================================= */}
        <div
          className={`
            absolute inset-0 z-30 overflow-hidden
            transition-all duration-1000 ease-in-out
            ${showWelcome ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-110"}
          `}
          style={{
            backgroundImage: `url(/welcome2.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/20" />

          {/* IMAGE WELCOME */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center animate-[floatButton_3s_ease-in-out_infinite] z-20">
            <Image
              src="/assets/welcome.webp"
              alt="Welcome"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="w-24 xxs:w-28 xs:w-30 s:w-32 iphone:w-36 mobile:w-40 sm:w-44 md:w-[180px] md2:w-[200px] md3:w-[220px] tb:w-[240px] lg:w-[260px] lg2:w-[180px] lg3:w-[200px] xl:w-[220px] 2xl:w-[240px] 3xl:w-[280px] 5xl:w-[320px] h-auto"
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center text-center mt-28 sm:mt-32 md:mt-36 px-3">
              {/* 4. NAMA PRIA (Aman dari error undefined berkat data Redux yang tersinkron) */}
              {loading ? (
                <Skeleton className="w-32 h-6 mb-2" />
              ) : (
                <h1 className="text-[#4a2d16] font-serif font-semibold leading-none text-2xl sm:text-3xl md:text-4xl lg:text-3xl">
                  {posisiMempelai === "0"
                    ? mempelai?.nama_pria
                    : mempelai?.nama_wanita || " "}
                </h1>
              )}

              <p className="my-1 text-[#c79b57] font-serif text-lg sm:text-xl">
                &
              </p>

              {/* 5. NAMA WANITA */}
              {loading ? (
                <Skeleton className="w-32 h-6 mb-2" />
              ) : (
                <h1 className="text-[#4a2d16] font-serif font-semibold leading-none text-2xl sm:text-3xl md:text-4xl lg:text-3xl">
                  {posisiMempelai === "0"
                    ? mempelai?.nama_wanita
                    : mempelai?.nama_pria || " "}
                </h1>
              )}

              <div className="flex items-center gap-2 mt-2">
                <div className="w-8 h-[1px] bg-[#d8b98d]" />
                <div className="text-[#c79b57] text-xs">♥</div>
                <div className="w-8 h-[1px] bg-[#d8b98d]" />
              </div>

              {/* TAMU */}
              <div className="mt-2 text-center">
                <p className="text-[#5a4330] text-[10px] sm:text-xs">
                  Kepada Yth.
                </p>
                <h2 className="mt-1 text-[#b07a3f] font-serif italic text-base sm:text-lg md:text-xl">
                  Bapak/Ibu Andi Pratama
                </h2>
                <p className="mt-1 text-[#5a4330] text-[9px] sm:text-[10px] max-w-[220px]">
                  Terima kasih telah menjadi bagian dari hari bahagia kami.
                </p>
              </div>

              {/* QR CARD */}
              <div className="mt-3 bg-[#f8f1e7]/80 backdrop-blur-md border border-[#d8b98d] rounded-[1.2rem] px-3 py-2.5 shadow-lg">
                <p className="uppercase tracking-[0.15em] text-[#8b6b3f] text-[8px]">
                  Akses Masuk
                </p>
                <div className="mt-2 bg-white rounded-lg p-1.5">
                  <Image
                    src="/assets/qr.png"
                    alt="QR Code"
                    width={220}
                    height={220}
                    className="w-16 sm:w-20 md:w-24 h-auto"
                  />
                </div>
                <p className="mt-1.5 text-[#5a4330] text-[8px] sm:text-[9px] leading-relaxed">
                  Scan QR code <br /> untuk membuka undangan
                </p>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setShowWelcome(false)}
                className="mt-3 flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#8b4513] text-white text-[10px] sm:text-xs shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span className="text-xs">✉</span>
                Buka Undangan
              </button>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        {!showWelcome ? (
          <div className="relative z-10 w-full h-full">
            <Fiture />
          </div>
        ) : null}
      </div>

      {!showWelcome ? <Navbar /> : null}
    </main>
  );
}
