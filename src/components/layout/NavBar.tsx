"use client";
import { Info, Headphones, Power } from "lucide-react";
import dynamic from "next/dynamic";
import { Plus,Minus } from "lucide-react";

const Massage = dynamic(() => import("./nav/Message"), { ssr: false });
const AddMessage = dynamic(() => import("./nav/AddMessage"), { ssr: false });

export default function NavBar() {
  const iconClass =
    "w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm";

  return (
    <div className="fixed bottom-10 md:bottom-80 xl:bottom-32 right-2 md:right-16 xl:right-80  z-50 flex flex-col gap-4 items-center justify-center p-3 rounded-2xl  bg-black/30  md:bg-white/30 border border-black/10 md:border-white/10 shadow-lg">
      {/* <div className={iconClass}>
        <Info className="w-5 h-5 text-white" />
      </div>
      <div className={iconClass}>
        <Headphones className="w-5 h-5 text-white" />
      </div>
      <div className={iconClass}>
        <Power className="w-5 h-5 text-white" />
      </div>
      <div className={iconClass}>
        <Massage />
      </div> */}
      {/* <div className={iconClass}>
        <AddMessage />
      </div> */}
      <div className={iconClass}>
        <h5 className="text-white">Top</h5>
      </div>
      <div className={iconClass}>
        <h5 className="text-white">BTN</h5>
      </div>
      <div className={iconClass}>
        <h5 className="text-white">R</h5>
      </div>
      <div className={iconClass}>
        <h5 className="text-white">L</h5>
      </div>
      <div className={iconClass}>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className={iconClass}>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
        >
          <Minus className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
