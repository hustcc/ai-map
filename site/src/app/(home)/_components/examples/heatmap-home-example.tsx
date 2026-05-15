"use client";

import { Map, MapHeatmap } from "amapcn";
import { ExampleCard } from "./example-card";

const densityData = [
  { lng: 116.3973, lat: 39.9086, count: 98 },
  { lng: 116.3990, lat: 39.9120, count: 82 },
  { lng: 116.4070, lat: 39.9108, count: 70 },
  { lng: 116.4551, lat: 39.9334, count: 75 },
  { lng: 116.4600, lat: 39.9280, count: 64 },
  { lng: 116.3105, lat: 39.9899, count: 68 },
  { lng: 116.3050, lat: 39.9850, count: 58 },
  { lng: 116.3750, lat: 39.9450, count: 42 },
  { lng: 116.3600, lat: 39.9350, count: 33 },
  { lng: 116.4200, lat: 39.9600, count: 36 },
  { lng: 116.4350, lat: 39.9500, count: 28 },
  { lng: 116.3850, lat: 39.8900, count: 22 },
  { lng: 116.4800, lat: 39.9600, count: 18 },
];

export function HeatmapHomeExample() {
  return (
    <ExampleCard label="Heatmap" className="aspect-square" delay="delay-900">
      <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg px-3 py-2 border border-border/50 shadow-lg">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
          Activity density
        </div>
        <div className="flex items-center gap-1 text-[10px]">
          <div className="h-2 w-16 rounded-full bg-linear-to-r from-blue-500 via-green-400 to-red-500" />
          <span className="text-muted-foreground">Low → High</span>
        </div>
      </div>
      <Map center={[116.3973, 39.9350]} zoom={11}>
        <MapHeatmap data={densityData} radius={35} opacity={0.85} max={100} />
      </Map>
    </ExampleCard>
  );
}
