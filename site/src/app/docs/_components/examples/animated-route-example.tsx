"use client";

import { Map, MapRoute, MapMarker, MarkerContent, MarkerTooltip } from "amapcn";

// Beijing sightseeing route: Tiananmen → Forbidden City → Bird's Nest
const route: [number, number][] = [
  [116.3972, 39.9075],
  [116.3974, 39.9163],
  [116.3950, 39.9350],
  [116.3940, 39.9600],
  [116.3930, 39.9800],
  [116.3914, 40.0089],
];

const stops = [
  { name: "Tiananmen", lng: 116.3972, lat: 39.9075 },
  { name: "Bird's Nest", lng: 116.3914, lat: 40.0089 },
];

export function AnimatedRouteExample() {
  return (
    <div className="h-[400px] w-full relative">
      <Map center={[116.3950, 39.9600]} zoom={10.5}>
        <MapRoute
          coordinates={route}
          color="#3b82f6"
          width={4}
          opacity={0.8}
          arrows
          animated
        />
        {stops.map((stop) => (
          <MapMarker key={stop.name} longitude={stop.lng} latitude={stop.lat}>
            <MarkerContent>
              <div className="size-3 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>{stop.name}</MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
      <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur border rounded-md px-3 py-2 text-xs text-muted-foreground">
        White dot animates along the route
      </div>
    </div>
  );
}
