"use client";

import { useState } from "react";
import { Map, MapPolygon, MapCircle } from "amapcn";
import { ExampleCard } from "./example-card";
import { Shield } from "lucide-react";

// Approximate boundary of the 2nd Ring Road core area
const innerCity: [number, number][] = [
  [116.3522, 39.9612],
  [116.4290, 39.9612],
  [116.4290, 39.8972],
  [116.3522, 39.8972],
];

// Forbidden City footprint
const forbiddenCity: [number, number][] = [
  [116.3867, 39.9169],
  [116.4026, 39.9169],
  [116.4026, 39.9040],
  [116.3867, 39.9040],
];

export function ZonesExample() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <ExampleCard label="" className="aspect-square" delay="delay-800">
      <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg px-3 py-2 border border-border/50 shadow-lg space-y-1.5">
        <div className="flex items-center gap-1.5">
          <Shield className="size-3 text-blue-500" />
          <span className="text-[10px] font-medium uppercase tracking-wider">
            Geofencing
          </span>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-[10px]">
          <div className="size-2 rounded-sm bg-blue-500/40 self-center" />
          <span className="text-muted-foreground">City core</span>
          <div className="size-2 rounded-sm bg-rose-500/40 self-center" />
          <span className="text-muted-foreground">Forbidden City</span>
          <div className="size-2 rounded-full bg-emerald-500/40 self-center" />
          <span className="text-muted-foreground">500 m radius</span>
        </div>
      </div>

      <Map center={[116.3900, 39.9100]} zoom={12}>
        <MapPolygon
          coordinates={innerCity}
          fillColor="#3b82f6"
          fillOpacity={hover === "inner" ? 0.25 : 0.12}
          strokeColor="#3b82f6"
          strokeWidth={2}
          onMouseEnter={() => setHover("inner")}
          onMouseLeave={() => setHover(null)}
        />
        <MapPolygon
          coordinates={forbiddenCity}
          fillColor="#ef4444"
          fillOpacity={hover === "fc" ? 0.5 : 0.25}
          strokeColor="#ef4444"
          strokeWidth={2}
          onMouseEnter={() => setHover("fc")}
          onMouseLeave={() => setHover(null)}
        />
        <MapCircle
          center={[116.3973, 39.9086]}
          radius={500}
          fillColor="#22c55e"
          fillOpacity={hover === "circle" ? 0.3 : 0.15}
          strokeColor="#22c55e"
          strokeWidth={2}
          onMouseEnter={() => setHover("circle")}
          onMouseLeave={() => setHover(null)}
        />
      </Map>
    </ExampleCard>
  );
}
