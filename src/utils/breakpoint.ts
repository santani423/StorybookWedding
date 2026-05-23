import type { CSSProperties } from "react";

export const BREAKPOINTS = [
  { name: "default", minWidth: 0 },
  { name: "xxxs", minWidth: 340 },
  { name: "xxs", minWidth: 360 },
  { name: "xs", minWidth: 375 },
  { name: "s", minWidth: 390 },
  { name: "s2", minWidth: 392 },
  { name: "iphone", minWidth: 412 },
  { name: "mobile", minWidth: 540 },
  { name: "sm", minWidth: 640 },
  { name: "md", minWidth: 768 },
  { name: "md2", minWidth: 810 },
  { name: "md3", minWidth: 850 },
  { name: "tb", minWidth: 900 },
  { name: "lg", minWidth: 1024 },
  { name: "lg2", minWidth: 1090 },
  { name: "lg3", minWidth: 1098 },
  { name: "xl", minWidth: 1270 },
  { name: "2xl", minWidth: 1281 },
  { name: "3xl", minWidth: 1600 },
  { name: "4xl", minWidth: 2200 },
  { name: "5xl", minWidth: 2400 },
] as const;

export const BP_ORDER: string[] = BREAKPOINTS.map((bp) => bp.name);

export function getCurrentBreakpoint(width: number): string {
  for (let i = BREAKPOINTS.length - 1; i >= 0; i--) {
    if (width >= BREAKPOINTS[i].minWidth) return BREAKPOINTS[i].name;
  }
  return "default";
}

export type BpStyle = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  w?: number;
};

export type ComponentBpStyles = Record<string, BpStyle>;

/** Cascade breakpoint styles from smallest up to currentBp */
export function resolveStyle(
  bpStyles: ComponentBpStyles,
  currentBp: string
): BpStyle {
  const idx = BP_ORDER.indexOf(currentBp);
  const limit = idx === -1 ? 0 : idx;
  const result: BpStyle = {};
  for (let i = 0; i <= limit; i++) {
    const data = bpStyles[BP_ORDER[i]];
    if (data) Object.assign(result, data);
  }
  return result;
}

const tw = (n: number) => `${n * 0.25}rem`;

export function toPositionCss(style: BpStyle): CSSProperties {
  const css: CSSProperties = { position: "absolute" };
  if (style.top !== undefined) css.top = tw(style.top);
  if (style.bottom !== undefined) css.bottom = tw(style.bottom);
  if (style.left !== undefined) css.left = tw(style.left);
  if (style.right !== undefined) css.right = tw(style.right);
  return css;
}

export function toImgCss(style: BpStyle): CSSProperties {
  const css: CSSProperties = { height: "auto", maxWidth: "none" };
  if (style.w !== undefined) css.width = tw(style.w);
  return css;
}
