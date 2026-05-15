"use client";

import { Map } from "amapcn";
import { useMapBounds } from "amapcn";

function BoundsDisplay() {
  const bounds = useMapBounds();

  if (!bounds) {
    return null;
  }

  return (
    <div className="absolute bottom-3 left-3 right-3 z-10 bg-background/90 backdrop-blur border rounded-md px-3 py-2 font-mono text-[10px] grid grid-cols-2 gap-x-4 gap-y-0.5">
      <span className="text-muted-foreground">North:</span>
      <span>{bounds.north.toFixed(4)}</span>
      <span className="text-muted-foreground">South:</span>
      <span>{bounds.south.toFixed(4)}</span>
      <span className="text-muted-foreground">East:</span>
      <span>{bounds.east.toFixed(4)}</span>
      <span className="text-muted-foreground">West:</span>
      <span>{bounds.west.toFixed(4)}</span>
    </div>
  );
}

export function UseMapBoundsExample() {
  return (
    <div className="h-[400px] w-full relative">
      <Map center={[116.397428, 39.90923]} zoom={11}>
        <BoundsDisplay />
      </Map>
      <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur border rounded-md px-3 py-2 text-xs text-muted-foreground">
        Pan or zoom to update bounds
      </div>
    </div>
  );
}
