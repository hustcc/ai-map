"use client";

import { Map, MapHeatmap, MapControls } from "amapcn";

// Simulated activity density data around Beijing landmarks
const activityData = [
  // Tiananmen / Wangfujing area — high density
  { lng: 116.3973, lat: 39.9086, count: 95 },
  { lng: 116.3990, lat: 39.9120, count: 80 },
  { lng: 116.4070, lat: 39.9108, count: 70 },
  { lng: 116.4140, lat: 39.9130, count: 60 },
  { lng: 116.3940, lat: 39.9050, count: 55 },
  // Sanlitun / Chaoyang — medium density
  { lng: 116.4551, lat: 39.9334, count: 75 },
  { lng: 116.4600, lat: 39.9280, count: 65 },
  { lng: 116.4480, lat: 39.9380, count: 50 },
  { lng: 116.4620, lat: 39.9350, count: 45 },
  // Zhongguancun — medium density
  { lng: 116.3105, lat: 39.9899, count: 70 },
  { lng: 116.3050, lat: 39.9850, count: 60 },
  { lng: 116.3170, lat: 39.9920, count: 55 },
  // Haidian / universities
  { lng: 116.3224, lat: 40.0028, count: 50 },
  { lng: 116.2973, lat: 40.0088, count: 45 },
  { lng: 116.3350, lat: 39.9780, count: 40 },
  // Shuangjing / South — lower density
  { lng: 116.4572, lat: 39.8780, count: 35 },
  { lng: 116.4650, lat: 39.8700, count: 30 },
  { lng: 116.4400, lat: 39.8850, count: 25 },
  // Scattered points
  { lng: 116.3750, lat: 39.9450, count: 40 },
  { lng: 116.3600, lat: 39.9350, count: 30 },
  { lng: 116.4200, lat: 39.9600, count: 35 },
  { lng: 116.4350, lat: 39.9500, count: 28 },
  { lng: 116.3850, lat: 39.8900, count: 22 },
  { lng: 116.3300, lat: 39.9200, count: 20 },
  { lng: 116.4800, lat: 39.9600, count: 18 },
];

export function HeatmapExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[116.3973, 39.9350]} zoom={11.5}>
        <MapHeatmap
          data={activityData}
          radius={35}
          opacity={0.85}
          max={100}
        />
        <MapControls />
      </Map>
    </div>
  );
}
