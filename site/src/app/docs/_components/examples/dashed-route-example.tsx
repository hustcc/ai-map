"use client";

import { Map, MapRoute, MapMarker, MarkerContent, MarkerTooltip } from "amapcn";

const route: [number, number][] = [
  [116.3972, 39.9075],
  [116.4300, 39.9163],
  [116.4600, 39.9350],
  [116.4800, 39.9600],
];

const stops = [
  { name: "Start: Tiananmen", lng: 116.3972, lat: 39.9075 },
  { name: "End: Chaoyang", lng: 116.4800, lat: 39.9600 },
];

export function DashedRouteExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[116.4400, 39.9350]} zoom={11.5}>
        <MapRoute
          coordinates={route}
          color="#f59e0b"
          width={3}
          opacity={0.9}
          dashed
          arrows
        />
        {stops.map((stop) => (
          <MapMarker key={stop.name} longitude={stop.lng} latitude={stop.lat}>
            <MarkerContent>
              <div className="size-3 rounded-full bg-amber-500 border-2 border-white shadow-lg" />
            </MarkerContent>
            <MarkerTooltip>{stop.name}</MarkerTooltip>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
