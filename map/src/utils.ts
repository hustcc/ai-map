import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---- Coordinate conversion: WGS-84 <-> GCJ-02 ----
// GPS devices output WGS-84. AMap uses GCJ-02 (China national standard).

const GCJ02_A = 6378245.0;
const GCJ02_EE = 0.00669342162296594323;

function transformLat(x: number, y: number): number {
  let ret =
    -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  ret +=
    ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2.0) / 3.0;
  ret +=
    ((20 * Math.sin(y * Math.PI) + 40 * Math.sin((y / 3.0) * Math.PI)) * 2.0) / 3.0;
  ret +=
    ((160 * Math.sin((y / 12.0) * Math.PI) +
      320 * Math.sin((y * Math.PI) / 30.0)) *
      2.0) /
    3.0;
  return ret;
}

function transformLng(x: number, y: number): number {
  let ret =
    300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  ret +=
    ((20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2.0) / 3.0;
  ret +=
    ((20 * Math.sin(x * Math.PI) + 40 * Math.sin((x / 3.0) * Math.PI)) * 2.0) / 3.0;
  ret +=
    ((150 * Math.sin((x / 12.0) * Math.PI) +
      300 * Math.sin((x / 30.0) * Math.PI)) *
      2.0) /
    3.0;
  return ret;
}

/**
 * Returns true if the coordinate is within the approximate GCJ-02 offset region
 * (mainland China bounding box). Coordinates outside this region are passed through
 * unchanged by wgs84ToGcj02 / gcj02ToWgs84.
 */
function isInChina(lng: number, lat: number): boolean {
  return lng >= 72.004 && lng <= 137.8347 && lat >= 0.8293 && lat <= 55.8271;
}

/**
 * Convert WGS-84 coordinates (GPS) to GCJ-02 (AMap / China standard).
 * Returns `[lng, lat]` in GCJ-02. Coordinates outside mainland China are
 * returned unchanged.
 */
export function wgs84ToGcj02(lng: number, lat: number): [number, number] {
  if (!isInChina(lng, lat)) return [lng, lat];
  let dLat = transformLat(lng - 105.0, lat - 35.0);
  let dLng = transformLng(lng - 105.0, lat - 35.0);
  const radLat = (lat / 180.0) * Math.PI;
  let magic = Math.sin(radLat);
  magic = 1 - GCJ02_EE * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat =
    (dLat * 180.0) /
    (((GCJ02_A * (1 - GCJ02_EE)) / (magic * sqrtMagic)) * Math.PI);
  dLng = (dLng * 180.0) / ((GCJ02_A / sqrtMagic) * Math.cos(radLat) * Math.PI);
  return [lng + dLng, lat + dLat];
}

/**
 * Convert GCJ-02 coordinates (AMap / China standard) back to WGS-84 (GPS).
 * Uses an iterative approximation. Returns `[lng, lat]` in WGS-84.
 * Coordinates outside mainland China are returned unchanged.
 */
export function gcj02ToWgs84(lng: number, lat: number): [number, number] {
  if (!isInChina(lng, lat)) return [lng, lat];
  let wgsLng = lng;
  let wgsLat = lat;
  for (let i = 0; i < 10; i++) {
    const [gcjLng, gcjLat] = wgs84ToGcj02(wgsLng, wgsLat);
    wgsLng -= gcjLng - lng;
    wgsLat -= gcjLat - lat;
  }
  return [wgsLng, wgsLat];
}