"use client";

import { useState } from "react";
import { Map, MapSatelliteLayer, MapTrafficLayer } from "amapcn";
import { ExampleCard } from "./example-card";

type LayerMode = "normal" | "satellite" | "traffic";

export function LayersHomeExample() {
  const [mode, setMode] = useState<LayerMode>("satellite");

  return (
    <ExampleCard label="Layers" className="aspect-[2/1]" delay="delay-1000">
      <div className="absolute top-3 left-3 z-10 bg-background/95 backdrop-blur-md rounded-lg px-3 py-2 border border-border/50 shadow-lg">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
          Tile layers
        </div>
        <div className="flex gap-1">
          {(["normal", "satellite", "traffic"] as LayerMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={[
                "rounded px-2 py-0.5 text-[10px] font-medium transition-colors capitalize",
                mode === m
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              ].join(" ")}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <Map center={[116.397428, 39.90923]} zoom={13}>
        <MapSatelliteLayer visible={mode === "satellite"} />
        <MapTrafficLayer visible={mode === "traffic"} />
      </Map>
    </ExampleCard>
  );
}
