"use client";

import { Map, MapControls } from "amapcn";

export function ScaleControlExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[121.4737, 31.2304]} zoom={12}>
        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showScale
        />
      </Map>
    </div>
  );
}
