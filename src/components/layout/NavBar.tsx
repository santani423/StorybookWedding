"use client";

import { Headphones, HeadphoneOff, Power, PowerOff } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Massage = dynamic(() => import("./nav/Message"), {
  ssr: false,
});

const AddMessage = dynamic(() => import("./nav/AddMessage"), {
  ssr: false,
});

const BrachPoint = dynamic(() => import("./nav/BrachPoint"), {
  ssr: false,
});

const InfoSection = dynamic(() => import("./nav/InfoSection"), {
  ssr: false,
});

const QrCode = dynamic(() => import("./nav/QrCodeItem"), {
  ssr: false,
});

export default function NavBar() {
  const dispatch = useAppDispatch();

  const { device } = useAppSelector((state) => state.counter);

  const [musicStatus, setMusicStatus] = useState(true);
  const [powerStatus, setPowerStatus] = useState(true);

  const iconClass = `
    w-11 h-11
    md:w-12 md:h-12
    flex items-center justify-center
    rounded-full
    bg-black/40
    hover:bg-black/60
    active:scale-95
    transition-all duration-300
    backdrop-blur-md
    shadow-lg
    cursor-pointer
  `;

  useEffect(() => {
    console.log("Device changed:", device);
  }, [device]);

  return (
    <div
      className="
      fixed
      left-1/2
      bottom-5
      sm:left-auto
      sm:-right-2
      md:left-auto
      md:right-6
      md2:right-8
      lg:right-14
      lg2:right-74
      xl:right-94
      5xl:right-200

      sm:bottom-20
      md:top-1/2
      md:bottom-auto
      z-50

      flex
      flex-row
      sm:flex-col
      md:flex-col
      tb:flex-col
      lg2:flex-col

      items-center
      justify-center

      gap-2
      md:gap-3

      rounded-2xl
      border border-white/10

      bg-white/10
      p-2 

      shadow-2xl
      backdrop-blur-xl

      -translate-x-1/2
      md:translate-x-0
      md:-translate-y-1/2
    "
    >
      {/* Info */}
      <InfoSection />

      {/* Message */}
      <Massage />

      {/* QR */}
      <div className={iconClass}>
        <QrCode />
      </div>

      {/* Music */}
      <button
        type="button"
        className={iconClass}
        onClick={() => setMusicStatus((prev) => !prev)}
      >
        {musicStatus ? (
          <Headphones className="h-5 w-5 text-white" />
        ) : (
          <HeadphoneOff className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Power */}
      <button
        type="button"
        className={iconClass}
        onClick={() => setPowerStatus((prev) => !prev)}
      >
        {powerStatus ? (
          <Power className="h-5 w-5 text-white" />
        ) : (
          <PowerOff className="h-5 w-5 text-white" />
        )}
      </button>
      {/* <button className={iconClass}>
        <BrachPoint />
      </button> */}
      <button className={` ${iconClass}`}>
         <h3 className="block xxs:hidden text-white">default</h3>

      <h3 className="hidden xxs:block xs:hidden text-white">xxs</h3>

      <h3 className="hidden xs:block s:hidden text-white">xs</h3>

      <h3 className="hidden s:block s2:hidden text-white">s</h3>
      <h3 className="hidden s2:block iphone:hidden text-white">s2</h3>

      <h3 className="hidden iphone:block mobile:hidden text-white">iphone</h3>
      <h3 className="hidden mobile:block sm:hidden text-white">mobile</h3>
      <h3 className="hidden sm:block md:hidden text-white">sm</h3>

      <h3 className="hidden md:block md2:hidden text-white">md</h3>

      <h3 className="hidden md2:block md3:hidden text-white">md2</h3>

      <h3 className="hidden md3:block tb:hidden text-white">md3</h3>

      <h3 className="hidden tb:block lg:hidden text-white">tb</h3>

      <h3 className="hidden lg:block lg2:hidden text-white">lg</h3>
      <h3 className="hidden lg2:block lg3:hidden text-white">lg2</h3>
      <h3 className="hidden lg3:block xl:hidden text-white">lg3</h3>

      <h3 className="hidden xl:block 2xl:hidden  text-white">xl</h3>

      <h3 className="hidden 2xl:block 3xl:hidden  text-white">2xl</h3>
      <h3 className="hidden  3xl:block 4xl:hidden  text-white">3xl</h3>
      <h3 className="hidden  4xl:block 5xl:hidden  text-white">4xl</h3>
      <h3 className="hidden  5xl:block 4xl:hidden  text-white">5xl</h3>
      </button>
      
    </div>
  );
}
