"use client";

import { useState } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerTooltip,
  MapRoute,
} from "@/registry/map";
import { Truck } from "lucide-react";
import { ExampleCard } from "./example-card";

const store = { lng: 116.3800, lat: 39.9200 };
const home = { lng: 116.4400, lat: 39.9050 };

// Hardcoded Beijing delivery route
const ROUTE: [number, number][] = [
  [116.3800, 39.9200],
  [116.3850, 39.9180],
  [116.3920, 39.9160],
  [116.3990, 39.9140],
  [116.4060, 39.9120],
  [116.4130, 39.9100],
  [116.4200, 39.9080],
  [116.4280, 39.9065],
  [116.4360, 39.9055],
  [116.4400, 39.9050],
];

const truckIdx = Math.floor(ROUTE.length * 0.6);

export function DeliveryExample() {
  const [truckPosition] = useState<[number, number]>(ROUTE[truckIdx]);

  return (
    <ExampleCard
      label="Delivery"
      className="aspect-square sm:col-span-2 sm:aspect-video lg:aspect-auto"
      delay="delay-900"
    >
      <Map center={[116.4100, 39.9125]} zoom={12.4}>
        <MapRoute coordinates={ROUTE} width={4} color="#4285F4" />
        <MapMarker longitude={store.lng} latitude={store.lat}>
          <MarkerContent>
            <div className="size-3.5 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
            <MarkerLabel>Store</MarkerLabel>
          </MarkerContent>
        </MapMarker>
        {truckPosition && (
          <MapMarker longitude={truckPosition[0]} latitude={truckPosition[1]}>
            <MarkerContent>
              <div className="bg-blue-500 rounded-full p-1.5 shadow-lg">
                <Truck className="size-3 text-white" />
              </div>
            </MarkerContent>
            <MarkerTooltip>On the way</MarkerTooltip>
          </MapMarker>
        )}
        <MapMarker longitude={home.lng} latitude={home.lat}>
          <MarkerContent>
            <div className="size-3.5 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
            <MarkerLabel>Home</MarkerLabel>
          </MarkerContent>
        </MapMarker>
      </Map>
    </ExampleCard>
  );
}

