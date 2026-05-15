"use client";

import { useState } from "react";
import { Map, MapPolygon, MapCircle, MapControls } from "amapcn";

// Approximate boundary of the 2nd Ring Road area in Beijing
const beijingCityCenter: [number, number][] = [
  [116.3522, 39.9612],
  [116.4290, 39.9612],
  [116.4290, 39.8972],
  [116.3522, 39.8972],
];

// Forbidden City (approx)
const forbiddenCity: [number, number][] = [
  [116.3867, 39.9169],
  [116.4026, 39.9169],
  [116.4026, 39.9040],
  [116.3867, 39.9040],
];

export function PolygonExample() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  return (
    <div className="h-[400px] w-full">
      <Map center={[116.3900, 39.9100]} zoom={12.5}>
        <MapPolygon
          coordinates={beijingCityCenter}
          fillColor="#3b82f6"
          fillOpacity={0.15}
          strokeColor="#3b82f6"
          strokeWidth={2}
          onClick={() => setActiveArea("city-center")}
          onMouseEnter={() => setActiveArea("city-center")}
          onMouseLeave={() => setActiveArea(null)}
        />
        <MapPolygon
          coordinates={forbiddenCity}
          fillColor="#ef4444"
          fillOpacity={activeArea === "forbidden-city" ? 0.5 : 0.25}
          strokeColor="#ef4444"
          strokeWidth={2}
          onClick={() => setActiveArea("forbidden-city")}
          onMouseEnter={() => setActiveArea("forbidden-city")}
          onMouseLeave={() => setActiveArea(null)}
        />
        {/* 500m service radius around Tiananmen */}
        <MapCircle
          center={[116.3973, 39.9086]}
          radius={500}
          fillColor="#22c55e"
          fillOpacity={0.15}
          strokeColor="#22c55e"
          strokeWidth={2}
          onClick={() => setActiveArea("tiananmen")}
          onMouseEnter={() => setActiveArea("tiananmen")}
          onMouseLeave={() => setActiveArea(null)}
        />
        <MapControls />
        {activeArea && (
          <div className="absolute top-3 left-3 z-10 rounded-md bg-background/90 backdrop-blur border px-3 py-2 text-sm">
            {activeArea === "city-center" && "2nd Ring Road Area"}
            {activeArea === "forbidden-city" && "Forbidden City"}
            {activeArea === "tiananmen" && "Tiananmen — 500m radius"}
          </div>
        )}
      </Map>
    </div>
  );
}
