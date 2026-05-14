---
name: amapcn-examples
description: Full usage patterns and code examples for amapcn components
type: reference
---

# amapcn Examples

## Basic Map

```tsx
import { Map, MapControls } from "@/components/ui/map";

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

## Draggable Marker

```tsx
<MapMarker longitude={116.397} latitude={39.909} draggable onDragEnd={({ lng, lat }) => {
  console.log("New position:", lng, lat);
}}>
  <MarkerContent />
</MapMarker>
```

## Route with Markers

```tsx
<Map amapKey="YOUR_KEY" center={[116.40, 39.91]} zoom={13}>
  <MapRoute
    coordinates={[[116.397, 39.909], [116.407, 39.919], [116.417, 39.929]]}
    color="#3b82f6"
    width={4}
  />
  <MapMarker longitude={116.397} latitude={39.909}>
    <MarkerContent>
      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
    </MarkerContent>
  </MapMarker>
  <MapMarker longitude={116.417} latitude={39.929}>
    <MarkerContent>
      <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
    </MarkerContent>
  </MapMarker>
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