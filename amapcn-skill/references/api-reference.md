---
name: amapcn-api-reference
description: Complete props tables for all amapcn components
type: reference
---

# amapcn API Reference

## Map

Root container. Initializes AMap, creates the map instance, provides context, and handles light/dark theme auto-switching.

| Prop | Type | Default | Description |
|---|---|---|---|
| `center` | `[number, number]` | `[116.397428, 39.90923]` | Map center [lng, lat] in GCJ-02 |
| `zoom` | `number` | `11` | Zoom level (3-18) |
| `amapKey` | `string` | — | AMap JS API key |
| `styles` | `{ light?: string; dark?: string }` | `{ light: "amap://styles/light", dark: "amap://styles/dark" }` | Custom AMap style URLs per theme |
| `bounds` | `[[number, number], [number, number]]` | — | Fit viewport to [SW, NE] corners |
| `viewMode` | `"2D" \| "3D"` | `"3D"` | Map projection (init-only) |
| `className` | `string` | — | CSS class for container div |
| `children` | `ReactNode` | — | Child map components |
| `onLoad` | `() => void` | — | Called once when map finishes loading |
| `onClick` | `(lngLat: { lng: number; lat: number }) => void` | — | Map canvas click callback |
| `onMoveEnd` | `() => void` | — | Called when map pan ends |
| `onZoomEnd` | `() => void` | — | Called when zoom ends |
| `onError` | `(error: Error) => void` | — | Called when AMap fails to load |

**Ref:** `forwardRef<MapRef>` — exposes the raw AMap map instance for calling `.flyTo()`, `.setPitch()`, `.setRotation()`, etc.

## useMap()

Hook to access the AMap instance. Must be called inside `<Map>`.

| Return | Type | Description |
|---|---|---|
| `map` | `AMap.Map \| null` | Map instance (null until loaded) |
| `AMap` | `AMapNS \| null` | AMap namespace (for constructing markers, polygons, etc.) |
| `isLoaded` | `boolean` | Whether the map has finished loading |

## useMapEvent(event, handler)

Subscribe to a map event. Auto-cleans up on unmount. Must be called inside `<Map>`.

```tsx
useMapEvent("click", (e) => console.log(e.lnglat));
```

## useMapBounds()

Returns the current viewport bounds, updated on every pan/zoom. Returns `MapBounds | null`.

```tsx
const bounds = useMapBounds();
// { north: number; south: number; east: number; west: number } | null
```

## Coordinate Utilities

```tsx
import { wgs84ToGcj02, gcj02ToWgs84 } from "amapcn";

const [gcjLng, gcjLat] = wgs84ToGcj02(121.473, 31.230); // GPS → AMap
const [wgsLng, wgsLat] = gcj02ToWgs84(gcjLng, gcjLat);   // AMap → GPS
```

## MapMarker

Places a marker on the map. Acts as context provider for marker sub-components.

| Prop | Type | Default | Description |
|---|---|---|---|
| `longitude` | `number` | (required) | Longitude in GCJ-02 |
| `latitude` | `number` | (required) | Latitude in GCJ-02 |
| `children` | `ReactNode` | (required) | Marker sub-components |
| `onClick` | `() => void` | — | Click callback |
| `onMouseEnter` | `() => void` | — | Mouse enter callback |
| `onMouseLeave` | `() => void` | — | Mouse leave callback |
| `draggable` | `boolean` | `false` | Enable dragging |
| `onDragStart` | `(lngLat: { lng: number; lat: number }) => void` | — | Drag start callback |
| `onDragEnd` | `(lngLat: { lng: number; lat: number }) => void` | — | Drag end callback |
| `visible` | `boolean` | `true` | Show or hide the marker |
| `zIndex` | `number` | `10` | Z-index stacking order |

## MarkerContent

Renders visual content into the marker. Must be inside `MapMarker`. Defaults to a blue dot icon.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | `<DefaultMarkerIcon />` (blue dot) | Marker visual content |
| `className` | `string` | — | CSS classes |

## MarkerPopup

Click-activated info window attached to a marker. Must be inside `MapMarker`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | (required) | Popup content |
| `className` | `string` | — | CSS classes |
| `closeButton` | `boolean` | `false` | Show close button |

## MarkerTooltip

Hover-activated tooltip attached to a marker. Must be inside `MapMarker`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | (required) | Tooltip content |
| `className` | `string` | — | CSS classes |

## MarkerLabel

Text label positioned above or below the marker. Must be inside `MapMarker`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | (required) | Label text |
| `className` | `string` | — | CSS classes |
| `position` | `"top" \| "bottom"` | `"top"` | Position relative to marker |

## MapPopup

Standalone popup at any coordinate, not attached to a marker. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `longitude` | `number` | (required) | Popup longitude |
| `latitude` | `number` | (required) | Popup latitude |
| `onClose` | `() => void` | — | Close callback |
| `children` | `ReactNode` | (required) | Popup content |
| `className` | `string` | — | CSS classes |
| `closeButton` | `boolean` | `false` | Show close button |

## MapControls

Renders zoom, compass, locate, fullscreen, and scale controls. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right"` | `"bottom-right"` | Control position |
| `showZoom` | `boolean` | `true` | Zoom in/out buttons |
| `showCompass` | `boolean` | `false` | Compass (resets bearing/pitch) |
| `showLocate` | `boolean` | `false` | Geolocate button |
| `showFullscreen` | `boolean` | `false` | Fullscreen toggle |
| `showScale` | `boolean` | `false` | Scale bar (bottom-left) |
| `className` | `string` | — | CSS classes |
| `onLocate` | `(coords: { longitude: number; latitude: number }) => void` | — | Callback with user location |

## MapRoute

Draws a polyline on the map connecting coordinates. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `coordinates` | `[number, number][]` | (required) | Array of [lng, lat] pairs |
| `color` | `string` | `"#4285F4"` | Stroke color |
| `width` | `number` | `4` | Stroke width in px |
| `opacity` | `number` | `0.8` | Stroke opacity (0-1) |
| `dashed` | `boolean` | `false` | Dashed line style |
| `arrows` | `boolean` | `false` | Direction arrows along the route |
| `animated` | `boolean` | `false` | Moving marker animation (AMap.MoveAnimation) |
| `onClick` | `() => void` | — | Click callback |

## MapClusterLayer

Renders clustered point data using AMap's native MarkerCluster. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `GeoJSON.FeatureCollection<GeoJSON.Point, P> \| string` | (required) | GeoJSON data or URL to fetch |
| `clusterColors` | `[string, string, string]` | `["#51bbd6", "#f1f075", "#f28cb1"]` | Colors for [small, medium, large] clusters |
| `pointColor` | `string` | `"#3b82f6"` | Color for unclustered points |
| `onPointClick` | `(feature, coordinates: [number, number]) => void` | — | Click callback on unclustered point |

Generic type: `MapClusterLayer<P extends Record<string, unknown> = Record<string, unknown>>`

## MapPolygon

Draws a filled polygon. Must be inside `Map`. Requires ≥ 3 coordinate pairs.

| Prop | Type | Default | Description |
|---|---|---|---|
| `coordinates` | `[number, number][]` | (required) | Array of [lng, lat] pairs |
| `fillColor` | `string` | `"#3b82f6"` | Fill color |
| `fillOpacity` | `number` | `0.3` | Fill opacity (0-1) |
| `strokeColor` | `string` | `"#3b82f6"` | Stroke color |
| `strokeWidth` | `number` | `2` | Stroke width in px |
| `strokeOpacity` | `number` | `0.8` | Stroke opacity (0-1) |
| `onClick` | `() => void` | — | Click callback |
| `onMouseEnter` | `() => void` | — | Mouse enter callback |
| `onMouseLeave` | `() => void` | — | Mouse leave callback |

## MapCircle

Draws a circle with center + radius. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `center` | `[number, number]` | (required) | Center [lng, lat] in GCJ-02 |
| `radius` | `number` | (required) | Radius in meters |
| `fillColor` | `string` | `"#3b82f6"` | Fill color |
| `fillOpacity` | `number` | `0.2` | Fill opacity (0-1) |
| `strokeColor` | `string` | `"#3b82f6"` | Stroke color |
| `strokeWidth` | `number` | `2` | Stroke width in px |
| `strokeOpacity` | `number` | `0.8` | Stroke opacity (0-1) |
| `onClick` | `() => void` | — | Click callback |
| `onMouseEnter` | `() => void` | — | Mouse enter callback |
| `onMouseLeave` | `() => void` | — | Mouse leave callback |

## MapHeatmap

Renders a density heatmap using AMap.HeatMap plugin. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `HeatmapPoint[] \| GeoJSON.FeatureCollection<Point>` | (required) | Points array or GeoJSON |
| `radius` | `number` | `30` | Point radius in px |
| `opacity` | `number` | `0.8` | Maximum opacity (0-1) |
| `gradient` | `Record<string, string>` | blue→red | Color gradient by 0-1 position |
| `max` | `number` | `100` | Max count for normalization |

`HeatmapPoint`: `{ lng: number; lat: number; count?: number }`. GeoJSON reads `properties.count` or `properties.weight`.

## MapTrafficLayer

Real-time traffic overlay. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | `true` | Show or hide the layer |
| `opacity` | `number` | `1` | Layer opacity (0-1) |

## MapSatelliteLayer

Satellite/aerial imagery overlay. Must be inside `Map`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | `true` | Show or hide the layer |
| `opacity` | `number` | `1` | Layer opacity (0-1) |
