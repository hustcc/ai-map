"use client";

import { useState } from "react";
import { Map, MapMarker, MarkerContent, useMapEvent } from "amapcn";

function ClickListener({
  onMapClick,
}: {
  onMapClick: (point: { lng: number; lat: number }) => void;
}) {
  useMapEvent("click", (e: { lnglat: { getLng: () => number; getLat: () => number } }) => {
    onMapClick({ lng: e.lnglat.getLng(), lat: e.lnglat.getLat() });
  });
  return null;
}

export function UseMapEventExample() {
  const [lastClick, setLastClick] = useState<{
    lng: number;
    lat: number;
  } | null>(null);

  return (
    <div className="h-[400px] w-full relative">
      <Map center={[116.397428, 39.90923]} zoom={11}>
        <ClickListener onMapClick={setLastClick} />
        {lastClick && (
          <MapMarker longitude={lastClick.lng} latitude={lastClick.lat}>
            <MarkerContent>
              <div className="size-3 rounded-full bg-rose-500 border-2 border-white shadow-lg" />
            </MarkerContent>
          </MapMarker>
        )}
      </Map>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-background/90 backdrop-blur border rounded-md px-4 py-2 text-xs text-center">
        {lastClick
          ? `Clicked: ${lastClick.lat.toFixed(4)}, ${lastClick.lng.toFixed(4)}`
          : "Click anywhere on the map"}
      </div>
    </div>
  );
}
