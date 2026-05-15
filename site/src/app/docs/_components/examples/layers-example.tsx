"use client";

import { useState } from "react";
import { Map, MapTrafficLayer, MapSatelliteLayer, MapControls } from "amapcn";

type LayerMode = "normal" | "satellite" | "traffic" | "both";

export function LayersExample() {
  const [mode, setMode] = useState<LayerMode>("normal");

  const buttons: { label: string; value: LayerMode }[] = [
    { label: "Normal", value: "normal" },
    { label: "Satellite", value: "satellite" },
    { label: "Traffic", value: "traffic" },
    { label: "Satellite + Traffic", value: "both" },
  ];

  return (
    <div className="h-[400px] w-full">
      <Map center={[116.397428, 39.90923]} zoom={12}>
        <MapSatelliteLayer visible={mode === "satellite" || mode === "both"} />
        <MapTrafficLayer visible={mode === "traffic" || mode === "both"} />
        <MapControls />
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
          {buttons.map((btn) => (
            <button
              key={btn.value}
              type="button"
              onClick={() => setMode(btn.value)}
              className={[
                "rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                mode === btn.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background/90 backdrop-blur hover:bg-accent border-border",
              ].join(" ")}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </Map>
    </div>
  );
}
