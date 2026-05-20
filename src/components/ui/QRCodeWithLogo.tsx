"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeWithLogoProps {
  readonly text: string;
  readonly logoSrc?: string;
  readonly size?: number;
  readonly logoSize?: number;
  readonly className?: string;
}

function drawLogoOnCanvas(
  ctx: CanvasRenderingContext2D,
  source: HTMLImageElement,
  size: number,
  logoSize: number,
) {
  const x = (size - logoSize) / 2;
  const y = (size - logoSize) / 2;
  const padding = 4;

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2, 8);
  ctx.fill();

  ctx.drawImage(source, x, y, logoSize, logoSize);
}

function loadImage(src: string, crossOrigin?: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new globalThis.Image();
    if (crossOrigin) img.crossOrigin = crossOrigin;
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function QRCodeWithLogo({
  text,
  logoSrc = "https://undesia.com/assets/base/img/logo2.png",
  size = 200,
  logoSize,
  className,
}: QRCodeWithLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const actualLogoSize = logoSize ?? Math.floor(size * 0.22);

  useEffect(() => {
    if (!canvasRef.current || !text) return;

    const canvas = canvasRef.current;

    QRCode.toCanvas(canvas, text, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "H",
      color: { dark: "#000000", light: "#ffffff" },
    })
      .then(async () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let img: HTMLImageElement;
        try {
          img = await loadImage(logoSrc, "anonymous");
        } catch {
          const fallback = logoSrc + (logoSrc.includes("?") ? "&" : "?") + "_t=" + Date.now();
          img = await loadImage(fallback);
        }

        drawLogoOnCanvas(ctx, img, size, actualLogoSize);
      })
      .catch(console.error);
  }, [text, logoSrc, size, actualLogoSize]);

  return <canvas ref={canvasRef} className={className} />;
}
