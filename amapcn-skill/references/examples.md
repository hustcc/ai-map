---
name: amapcn-examples
description: Full usage patterns and code examples for amapcn components
type: reference
---

# amapcn Examples

## Basic Map

```tsx
import { Map, MapControls } from "amapcn";

export function BasicMap() {
  return (
    <div className="h-[400px]">
      <Map amapKey="YOUR_KEY" center={[116.397428, 39.90923]} zoom={11}>
        <MapControls />
      </Map>
    </div>
  );
}
```

## Map with Event Callbacks

```tsx
<Map
  amapKey="YOUR_KEY"
  center={[116.397, 39.909]}
  zoom={13}
  onLoad={() => console.log("map ready")}
  onClick={({ lng, lat }) => console.log("clicked", lng, lat)}
  onMoveEnd={() => console.log("moved")}
  onZoomEnd={() => console.log("zoomed")}
  onError={(err) => console.error("load failed", err)}
/>
```

## Map with fitBounds

```tsx
// Automatically fit to a bounding box [[sw_lng, sw_lat], [ne_lng, ne_lat]]
<Map
  amapKey="YOUR_KEY"
  bounds={[[116.3, 39.8], [116.5, 40.1]]}
/>
```

## Markers with Popups and Tooltips

```tsx
<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={13}>
  <MapMarker longitude={116.397} latitude={39.909}>
    <MarkerContent className="h-6 w-6 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
    <MarkerTooltip>天安门广场</MarkerTooltip>
    <MarkerPopup closeButton>
      <div className="p-3">
        <h3 className="font-semibold">天安门广场</h3>
        <p className="text-sm text-muted-foreground">北京市东城区</p>
      </div>
    </MarkerPopup>
  </MapMarker>
</Map>
```

## Draggable Marker with onDragStart + onDragEnd

```tsx
<MapMarker
  longitude={116.397} latitude={39.909}
  draggable
  onDragStart={({ lng, lat }) => console.log("drag start", lng, lat)}
  onDragEnd={({ lng, lat }) => console.log("new position", lng, lat)}
>
  <MarkerContent />
</MapMarker>
```

## Marker visibility toggle

```tsx
const [visible, setVisible] = useState(true);
<MapMarker longitude={116.397} latitude={39.909} visible={visible}>
  <MarkerContent />
</MapMarker>
```

## Route with Popups and Tooltips

```tsx
<Map amapKey="YOUR_KEY" center={[116.40, 39.91]} zoom={13}>
  <MapRoute
    coordinates={[[116.397, 39.909], [116.407, 39.919], [116.417, 39.929]]}
    color="#3b82f6"
    width={4}
  />
</Map>
```

## Route with Dashed Style and Arrows

```tsx
<MapRoute
  coordinates={[[116.397, 39.909], [116.407, 39.919], [116.417, 39.929]]}
  color="#3b82f6"
  dashed
  arrows
/>
```

## Route with Animation

```tsx
<MapRoute
  coordinates={[[116.397, 39.909], [116.407, 39.919], [116.417, 39.929]]}
  color="#3b82f6"
  animated
/>
```

## Scale Bar in Controls

```tsx
<MapControls showZoom showScale position="bottom-right" />
```

## Polygon (boundary / district)

```tsx
import { MapPolygon } from "amapcn";

<Map amapKey="YOUR_KEY" center={[116.39, 39.91]} zoom={13}>
  <MapPolygon
    coordinates={[
      [116.370, 39.930],
      [116.420, 39.930],
      [116.420, 39.890],
      [116.370, 39.890],
    ]}
    fillColor="#3b82f6"
    fillOpacity={0.2}
    strokeColor="#3b82f6"
    strokeWidth={2}
    onClick={() => console.log("polygon clicked")}
  />
</Map>
```

## Circle (geofence / service radius)

```tsx
import { MapCircle } from "amapcn";

<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={14}>
  <MapCircle
    center={[116.397, 39.909]}
    radius={1000}
    fillColor="#22c55e"
    fillOpacity={0.15}
    strokeColor="#22c55e"
    strokeWidth={2}
    onClick={() => console.log("circle clicked")}
  />
</Map>
```

## Heatmap

```tsx
import { MapHeatmap } from "amapcn";

const data = [
  { lng: 116.397, lat: 39.909, count: 90 },
  { lng: 116.407, lat: 39.919, count: 60 },
  { lng: 116.417, lat: 39.929, count: 30 },
];

<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={12}>
  <MapHeatmap data={data} radius={30} opacity={0.8} max={100} />
</Map>
```

## Heatmap from GeoJSON

```tsx
<MapHeatmap
  data={{
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [116.397, 39.909] },
        properties: { count: 80 },
      },
    ],
  }}
/>
```

## Traffic Layer

```tsx
import { MapTrafficLayer } from "amapcn";

const [showTraffic, setShowTraffic] = useState(true);

<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={12}>
  <MapTrafficLayer visible={showTraffic} />
</Map>
```

## Satellite Layer

```tsx
import { MapSatelliteLayer } from "amapcn";

<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={12}>
  <MapSatelliteLayer visible />
  <MapTrafficLayer visible />  {/* can combine both */}
</Map>
```

## Cluster Layer

```tsx
<Map amapKey="YOUR_KEY" center={[104.0, 35.0]} zoom={4}>
  <MapClusterLayer
    data="/api/cities.json"
    clusterColors={["#51bbd6", "#f1f075", "#f28cb1"]}
    pointColor="#3b82f6"
    onPointClick={(feature, coords) => {
      console.log(feature.properties, coords);
    }}
  />
</Map>
```

## useMap Hook — Custom Behavior

```tsx
function MapWith3D() {
  const { map, AMap, isLoaded } = useMap();

  useEffect(() => {
    if (!isLoaded || !map) return;
    map.setPitch(60);
    map.setRotation(45);
  }, [isLoaded, map]);

  return null;
}

// Usage: place inside <Map>
<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={13}>
  <MapWith3D />
</Map>
```

## useMapEvent Hook

```tsx
function ClickLogger() {
  useMapEvent("click", (e) => {
    console.log("clicked at", e.lnglat.getLng(), e.lnglat.getLat());
  });
  return null;
}

<Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={13}>
  <ClickLogger />
</Map>
```

## useMapBounds Hook

```tsx
function BoundsDisplay() {
  const bounds = useMapBounds();
  if (!bounds) return null;
  return (
    <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur px-3 py-2 text-xs font-mono border rounded-md">
      N: {bounds.north.toFixed(4)} S: {bounds.south.toFixed(4)}<br />
      E: {bounds.east.toFixed(4)} W: {bounds.west.toFixed(4)}
    </div>
  );
}
```

## Coordinate Conversion

```tsx
import { wgs84ToGcj02, gcj02ToWgs84 } from "amapcn";

// Convert GPS coordinates to AMap (GCJ-02)
const [lng, lat] = wgs84ToGcj02(121.473, 31.230);

// Convert back to WGS-84
const [wgsLng, wgsLat] = gcj02ToWgs84(lng, lat);
```

## Map Ref — Fly To

```tsx
function FlyToDemo() {
  const mapRef = useRef<MapRef>(null);

  const flyTo = () => {
    mapRef.current?.setZoomAndCenter(15, [121.473, 31.230]);
  };

  return (
    <>
      <button onClick={flyTo}>Fly to Shanghai</button>
      <Map ref={mapRef} amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={11} />
    </>
  );
}
```

## Standalone Popup (Programmatic)

```tsx
function ControlledPopup() {
  const [show, setShow] = useState(true);

  return (
    <Map amapKey="YOUR_KEY" center={[116.397, 39.909]} zoom={13}>
      {show && (
        <MapPopup longitude={116.397} latitude={39.909} onClose={() => setShow(false)} closeButton>
          <div className="p-3">Controlled popup</div>
        </MapPopup>
      )}
      <button onClick={() => setShow(!show)}>Toggle Popup</button>
    </Map>
  );
}
```

## Performance Pattern — Many Markers

For 100+ markers, use `useMap()` to create native `AMap.Marker` instances directly:

```tsx
function ManyMarkers({ points }: { points: { lng: number; lat: number; name: string }[] }) {
  const { map, AMap, isLoaded } = useMap();

  useEffect(() => {
    if (!isLoaded || !map || !AMap) return;

    const markers = points.map((p) =>
      new AMap.Marker({
        position: [p.lng, p.lat],
        title: p.name,
      })
    );

    map.add(markers);
    return () => {
      map.remove(markers);
    };
  }, [isLoaded, map, AMap, points]);

  return null;
}
```

