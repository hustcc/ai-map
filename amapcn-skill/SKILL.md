---
name: amapcn
description: This skill should be used when the user asks to "add a map", "create a map", "show a map", "render a map", "display markers on a map", "draw a route on a map", "show clusters on a map", "add a popup to a map", "draw a polygon on a map", "draw a circle on a map", "show a heatmap", "show traffic layer", "show satellite layer", "use AMap", "use Gaode Maps", "use 高德地图", or needs any map-related UI in a React/Next.js project with AMap (Gaode Maps). Also triggers when the user mentions amapcn, amap components, or map markers/popups/routes/clusters/polygons/heatmap in a shadcn/ui project.
---

## Overview

amapcn is a React map component library for AMap (Gaode Maps / 高德地图), following the shadcn/ui pattern. It provides declarative, composable components for maps, markers, popups, routes, clusters, shapes, heatmaps, and tile layers with Tailwind CSS styling and automatic light/dark theme support.

## Installation

**npm:**

```bash
npm install amapcn
```

```tsx
import { Map, MapMarker } from "amapcn";
```

**shadcn/ui:**

```bash
npx shadcn@latest add https://map.ling.pub/r/amap.json
```

```tsx
import { Map, MapMarker } from "@/components/ui/map";
```

### API Key

AMap requires an API key (get one at [lbs.amap.com](https://lbs.amap.com/)). Provide it via: `amapKey` prop: `<Map amapKey="YOUR_KEY" />`.

## Imports

```tsx
import {
  Map, useMap, useMapEvent, useMapBounds,
  MapMarker, MarkerContent, MarkerPopup,
  MarkerTooltip, MarkerLabel, MapPopup, MapControls,
  MapRoute, MapClusterLayer,
  MapPolygon, MapCircle, MapHeatmap,
  MapTrafficLayer, MapSatelliteLayer,
  wgs84ToGcj02, gcj02ToWgs84,
} from "amapcn";
import type { MapRef, HeatmapPoint, MapBounds } from "amapcn";
```

## Component Hierarchy

```
Map (root — provides MapContext)
├── MapControls
├── MapMarker (provides MarkerContext)
│   ├── MarkerContent    — marker visual (any React/Tailwind content)
│   │   └── MarkerLabel  — text label above/below marker
│   ├── MarkerPopup      — click-activated info window
│   └── MarkerTooltip    — hover-activated tooltip
├── MapPopup             — standalone popup at coordinates
├── MapRoute             — polyline route
├── MapClusterLayer      — clustered point data
├── MapPolygon           — filled polygon shape
├── MapCircle            — circle with center + radius
├── MapHeatmap           — density heatmap
├── MapTrafficLayer      — real-time traffic overlay
└── MapSatelliteLayer    — satellite/aerial imagery overlay
```

## Quick Reference

### Map (root)

```tsx
<Map
  amapKey="YOUR_KEY"
  center={[116.397428, 39.90923]}
  zoom={11}
  className="h-[400px]"
  onLoad={() => console.log("ready")}
  onClick={({ lng, lat }) => console.log(lng, lat)}
  onMoveEnd={() => {}}
  onZoomEnd={() => {}}
  onError={(err) => console.error(err)}
  bounds={[[116.3, 39.8], [116.5, 40.1]]}
  viewMode="3D"
>
  {/* children */}
</Map>
```

Key props: `center` ([lng, lat] GCJ-02), `zoom` (3-18), `amapKey`, `styles` ({ light, dark }), `bounds` (fit viewport), `viewMode` ("2D"|"3D", init-only). Ref exposes raw AMap instance for `.flyTo()`, `.setPitch()`, `.setRotation()`.

### MapMarker

```tsx
<MapMarker
  longitude={116.397} latitude={39.909}
  draggable visible
  onDragStart={({ lng, lat }) => {}}
  onDragEnd={({ lng, lat }) => {}}
>
  <MarkerContent>{/* custom marker UI or default blue dot */}</MarkerContent>
  <MarkerTooltip>Hover text</MarkerTooltip>
  <MarkerPopup closeButton>Click content</MarkerPopup>
</MapMarker>
```

Key props: `longitude`, `latitude` (required), `draggable`, `onDragStart`, `onDragEnd`, `onClick`, `visible` (show/hide), `zIndex`.

### MapControls

```tsx
<MapControls showZoom showCompass showLocate showFullscreen showScale position="bottom-right" />
```

`showScale` renders a scale bar at the bottom-left of the map.

### MapRoute

```tsx
<MapRoute
  coordinates={[[lng1, lat1], [lng2, lat2]]}
  color="#4285F4" width={4} opacity={0.8}
  dashed
/>
```

`dashed` — dashed line style.

### MapPolygon

```tsx
<MapPolygon
  coordinates={[[lng1, lat1], [lng2, lat2], [lng3, lat3]]}
  fillColor="#3b82f6" fillOpacity={0.3}
  strokeColor="#3b82f6" strokeWidth={2}
  onClick={() => {}} onMouseEnter={() => {}} onMouseLeave={() => {}}
/>
```

### MapCircle

```tsx
<MapCircle
  center={[116.397, 39.909]} radius={500}
  fillColor="#22c55e" fillOpacity={0.2}
  strokeColor="#22c55e" strokeWidth={2}
  onClick={() => {}}
/>
```

### MapHeatmap

```tsx
<MapHeatmap
  data={[{ lng: 116.397, lat: 39.909, count: 80 }, ...]}
  radius={30} opacity={0.8} max={100}
/>
```

`data` also accepts a GeoJSON `FeatureCollection<Point>` (reads `properties.count` or `properties.weight`).

### MapTrafficLayer / MapSatelliteLayer

```tsx
<MapTrafficLayer visible opacity={1} />
<MapSatelliteLayer visible opacity={1} />
```

### MapClusterLayer

```tsx
<MapClusterLayer data={geoJsonOrUrl} clusterColors={["#51bbd6", "#f1f075", "#f28cb1"]} pointColor="#3b82f6" />
```

`data` accepts a GeoJSON FeatureCollection or URL string.

### MapPopup (standalone)

```tsx
<MapPopup longitude={116.397} latitude={39.909} onClose={fn} closeButton>Content</MapPopup>
```

### useMap() hook

```tsx
const { map, AMap, isLoaded } = useMap();
// Use inside <Map> to access raw AMap instance for custom behavior
```

### useMapEvent() hook

```tsx
// Subscribe to any AMap map event; auto-cleans up on unmount
useMapEvent("click", (e) => console.log(e.lnglat));
useMapEvent("moveend", () => console.log("moved"));
```

### useMapBounds() hook

```tsx
const bounds = useMapBounds();
// { north, south, east, west } | null — updates on every pan/zoom
```

### Coordinate conversion utilities

```tsx
import { wgs84ToGcj02, gcj02ToWgs84 } from "amapcn";

// GPS → AMap
const [gcjLng, gcjLat] = wgs84ToGcj02(121.473, 31.230);

// AMap → GPS
const [wgsLng, wgsLat] = gcj02ToWgs84(gcjLng, gcjLat);
```

## Important Notes

- **Coordinate system:** All coordinates use GCJ-02. Use `wgs84ToGcj02` to convert GPS data.
- **Theme:** Map styles auto-switch light/dark via `next-themes`. Override with `styles` prop.
- **Portal rendering:** MarkerContent, MarkerPopup, MarkerTooltip use `createPortal` — style with Tailwind/shadcn.
- **SSR:** Dynamic import of `@amap/amap-jsapi-loader` avoids SSR issues.
- **Performance:** For 100+ markers, use `useMap()` to create native `AMap.Marker` instances.
- **Security:** Production may require `window._AMapSecurityConfig = { securityJsCode: "CODE" }`.
- **viewMode:** Only takes effect at initial mount; changing it after mount has no effect.

## Additional Resources

- [references/api-reference.md](references/api-reference.md) — Complete props tables for all components
- [references/examples.md](references/examples.md) — Full usage patterns and code examples
