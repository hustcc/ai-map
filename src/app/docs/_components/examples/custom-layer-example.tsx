"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Map, MapControls, useMap } from "@/registry/map";
import { Button } from "@/components/ui/button";
import { Layers, X } from "lucide-react";

// Beijing parks as polygon paths
const parks = [
  {
    name: "Chaoyang Park",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    path: [
      [116.4600, 39.9370],
      [116.4750, 39.9370],
      [116.4750, 39.9480],
      [116.4600, 39.9480],
      [116.4600, 39.9370],
    ] as [number, number][],
  },
  {
    name: "Olympic Forest Park",
    path: [
      [116.3750, 40.0000],
      [116.4050, 40.0000],
      [116.4050, 40.0220],
      [116.3750, 40.0220],
      [116.3750, 40.0000],
    ] as [number, number][],
  },
];

function CustomLayer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polygonsRef = useRef<any[]>([]);
  const { map, AMap, isLoaded } = useMap();
  const [isLayerVisible, setIsLayerVisible] = useState(false);
  const [hoveredPark, setHoveredPark] = useState<string | null>(null);

  const removeLayers = useCallback(() => {
    polygonsRef.current.forEach((p) => p.setMap(null));
    polygonsRef.current = [];
  }, []);

  const addLayers = useCallback(() => {
    if (!map || !AMap) return;
    removeLayers();
    parks.forEach((park) => {
      const polygon = new AMap.Polygon({
        path: park.path,
        fillColor: "#22c55e",
        fillOpacity: 0.4,
        strokeColor: "#16a34a",
        strokeWeight: 2,
        strokeOpacity: 1,
      });
      polygon.setMap(map);
      polygon.on("mouseover", () => setHoveredPark(park.name));
      polygon.on("mouseout", () => setHoveredPark(null));
      polygonsRef.current.push(polygon);
    });
  }, [map, AMap, removeLayers]);

  useEffect(() => {
    if (!isLoaded) return;
    return () => removeLayers();
  }, [isLoaded, removeLayers]);

  const toggleLayer = () => {
    if (isLayerVisible) {
      removeLayers();
      setIsLayerVisible(false);
    } else {
      addLayers();
      setIsLayerVisible(true);
    }
  };

  return (
    <>
      <div className="absolute top-3 left-3 z-10">
        <Button
          size="sm"
          variant={isLayerVisible ? "default" : "secondary"}
          onClick={toggleLayer}
        >
          {isLayerVisible ? (
            <X className="size-4 mr-1.5" />
          ) : (
            <Layers className="size-4 mr-1.5" />
          )}
          {isLayerVisible ? "Hide Parks" : "Show Parks"}
        </Button>
      </div>

      {hoveredPark && (
        <div className="absolute bottom-3 left-3 z-10 rounded-md bg-background/90 backdrop-blur px-3 py-2 text-sm font-medium border">
          {hoveredPark}
        </div>
      )}
    </>
  );
}

export function CustomLayerExample() {
  return (
    <div className="h-[400px] w-full">
      <Map center={[116.430, 39.980]} zoom={11}>
        <MapControls />
        <CustomLayer />
      </Map>
    </div>
  );
}
