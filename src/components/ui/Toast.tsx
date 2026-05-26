"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger enter animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 3000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-[200]
        flex items-center gap-2.5
        px-4 py-3 rounded-2xl
        backdrop-blur-md border shadow-xl
        text-[12px] sm:text-sm whitespace-nowrap
        transition-all duration-400 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        ${
          type === "success"
            ? "bg-[#f0faf4]/90 border-[#4caf7d] text-[#1a5c38] shadow-[#4caf7d]/20"
            : "bg-[#fff0f0]/90 border-[#e05252] text-[#7a1a1a] shadow-[#e05252]/20"
        }
      `}
    >
      <span className="text-base">
        {type === "success" ? "✦" : "✕"}
      </span>
      <span>{message}</span>
    </div>
  );
}

export type ToastData = { message: string; type: "success" | "error" } | null;
