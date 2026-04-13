import { Info, Headphones, Power, MessageSquareText } from "lucide-react";
import Massage from "./nav/Message";
import AddMessage from "./nav/AddMessage";

export default function NavBar() {
  const iconClass =
    "w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition backdrop-blur-sm";

  return (
    <div className="fixed bottom-10 right-2 z-50 flex flex-col gap-4 items-center justify-center p-3 rounded-2xl backdrop-blur-md bg-black/30 border border-white/10 shadow-lg">
      <div className={iconClass}>
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
      </div>
      <div className={iconClass}>
        <AddMessage />
      </div>
    </div>
  );
}
