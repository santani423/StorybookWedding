"use client";
import { Info, Headphones, Power } from "lucide-react";
import dynamic from "next/dynamic";
import { Plus, Minus } from "lucide-react";
import { increment, decrement, setDevice } from "@/redux/slices/counterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Massage = dynamic(() => import("./nav/Message"), { ssr: false });
const AddMessage = dynamic(() => import("./nav/AddMessage"), { ssr: false });

export default function NavBar() {
  const dispatch = useAppDispatch();
  const device = useAppSelector((state) => state.counter.device);
  const iconClass =
    "w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm";


    useEffect(() => {
      console.log("Device changed:", device);
    }, [device]);

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
        <h3
          className={`block xxs:hidden ${device === "default" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("default"))}
        >
          default
        </h3>

        <h3
          className={`hidden xxs:block xs:hidden ${device === "xxs" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("xxs"))}
        >
          xxs
        </h3>

        <h3
          className={`hidden xs:block s:hidden ${device === "xs" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("xs"))}
        >
          xs
        </h3>

        <h3
          className={`hidden s:block iphone:hidden ${device === "s" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("s"))}
        >
          s
        </h3>

        <h3
          className={`hidden iphone:block md:hidden ${device === "iphone" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("iphone"))}
        >
          iphone
        </h3>

        <h3
          className={`hidden md:block md2:hidden ${device === "md" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("md"))}
        >
          md
        </h3>

        <h3
          className={`hidden md2:block md3:hidden ${device === "md2" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("md2"))}
        >
          md2
        </h3>

        <h3
          className={`hidden md3:block tb:hidden ${device === "md3" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("md3"))}
        >
          md3
        </h3>

        <h3
          className={`hidden tb:block lg:hidden ${device === "tb" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("tb"))}
        >
          tb
        </h3>

        <h3
          className={`hidden lg:block xl:hidden ${device === "lg" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("lg"))}
        >
          lg
        </h3>

        <h3
          className={`hidden xl:block 2xl:hidden ${device === "xl" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("xl"))}
        >
          xl
        </h3>

        <h3
          className={`hidden 2xl:block ${device === "2xl" ? "text-white" : ""}`}
          onClick={() => dispatch(setDevice("2xl"))}
        >
          2xl
        </h3>
      </div>
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
        <h5 className="text-white">W</h5>
      </div>
      <div className={iconClass}>
        <h5 className="text-white">H</h5>
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
