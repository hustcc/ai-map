"use client";

import { useState } from "react";
import { Map, MapRoute, MapMarker, MarkerContent } from "@/registry/map";
import { Button } from "@/components/ui/button";

// Hardcoded routes between Beijing landmarks
const routeOptions = [
  {
    id: "highway",
    label: "高速路线",
    color: "#3b82f6",
    coordinates: [
      [116.397428, 39.90923], // Tiananmen
      [116.41, 39.91],
      [116.45, 39.92],
      [116.48, 39.97],
      [116.5, 40.02],
    ] as [number, number][],
    duration: "32 分钟",
    distance: "18.4 公里",
  },
  {
    id: "city",
    label: "城区路线",
    color: "#10b981",
    coordinates: [
      [116.397428, 39.90923], // Tiananmen
      [116.415, 39.915],
      [116.43, 39.93],
      [116.45, 39.96],
      [116.5, 40.02],
    ] as [number, number][],
    duration: "48 分钟",
    distance: "16.1 公里",
  },
  {
    id: "scenic",
    label: "景观路线",
    color: "#f59e0b",
    coordinates: [
      [116.397428, 39.90923], // Tiananmen
      [116.38, 39.92],
      [116.37, 39.95],
      [116.4, 40.0],
      [116.5, 40.02],
    ] as [number, number][],
    duration: "55 分钟",
    distance: "20.7 公里",
  },
];

const origin = { lng: 116.397428, lat: 39.90923, name: "天安门" };
const destination = { lng: 116.5, lat: 40.02, name: "北京东站" };

export function OsrmRouteExample() {
  const [activeRoute, setActiveRoute] = useState(routeOptions[0].id);
  const selected = routeOptions.find((r) => r.id === activeRoute)!;

  return (
    <div className="h-full w-full relative">
      <Map center={[116.44, 39.96]} zoom={10}>
        {routeOptions.map((route) => (
          <MapRoute
            key={route.id}
            coordinates={route.coordinates}
            color={route.id === activeRoute ? route.color : "#9ca3af"}
            width={route.id === activeRoute ? 5 : 3}
            opacity={route.id === activeRoute ? 0.9 : 0.4}
          />
        ))}

        <MapMarker longitude={origin.lng} latitude={origin.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-green-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </MarkerContent>
        </MapMarker>

        <MapMarker longitude={destination.lng} latitude={destination.lat}>
          <MarkerContent>
            <div className="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold">
              B
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/90 backdrop-blur-sm border rounded-lg p-2 shadow-lg">
        {routeOptions.map((route) => (
          <Button
            key={route.id}
            variant={activeRoute === route.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveRoute(route.id)}
            className="gap-1"
          >
            <span
              className="inline-block size-2 rounded-full"
              style={{ backgroundColor: route.color }}
            />
            {route.label}
            <span className="text-xs text-muted-foreground ml-1">
              {route.duration}
            </span>
          </Button>
        ))}
      </div>

      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm border rounded-lg p-3 shadow-lg text-sm">
        <p className="font-medium" style={{ color: selected.color }}>
          {selected.label}
        </p>
        <p className="text-muted-foreground">{selected.distance}</p>
        <p className="text-muted-foreground">{selected.duration}</p>
      </div>
    </div>
  );
}
