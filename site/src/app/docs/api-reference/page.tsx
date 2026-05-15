import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsLink,
  DocsNote,
  DocsPropTable,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference",
};

const anatomyCode = `<Map>
  <MapMarker longitude={...} latitude={...}>
    <MarkerContent>
      <MarkerLabel />
    </MarkerContent>
    <MarkerPopup />
    <MarkerTooltip />
  </MapMarker>

  <MapPopup longitude={...} latitude={...} />
  <MapControls />
  <MapRoute coordinates={...} />
  <MapClusterLayer data={...} />
  <MapPolygon coordinates={...} />
  <MapCircle center={...} radius={...} />
  <MapHeatmap data={...} />
  <MapTrafficLayer />
  <MapSatelliteLayer />
</Map>`;

const useMapCode = `const { map, isLoaded } = useMap();`;
const useMapEventCode = `useMapEvent("click", (e) => console.log(e.lnglat));`;
const useMapBoundsCode = `const bounds = useMapBounds();
// { north, south, east, west } | null`;
const coordCode = `import { wgs84ToGcj02, gcj02ToWgs84 } from "amapcn";

// Convert GPS coordinates to AMap (GCJ-02)
const [lng, lat] = wgs84ToGcj02(121.473, 31.230);

// Convert back to WGS-84
const [wgsLng, wgsLat] = gcj02ToWgs84(lng, lat);`;

export default function ApiReferencePage() {
  return (
    <DocsLayout
      title="API Reference"
      description="Complete reference for all map components and their props."
      prev={{ title: "Installation", href: "/docs/installation" }}
      next={{ title: "Map", href: "/docs/basic-map" }}
      toc={[
        { title: "Component Anatomy", slug: "component-anatomy" },
        { title: "Map", slug: "map" },
        { title: "useMap", slug: "usemap" },
        { title: "useMapEvent", slug: "usemapevent" },
        { title: "useMapBounds", slug: "usemapbounds" },
        { title: "Coordinate Utilities", slug: "coordinate-utilities" },
        { title: "MapControls", slug: "mapcontrols" },
        { title: "MapMarker", slug: "mapmarker" },
        { title: "MarkerContent", slug: "markercontent" },
        { title: "MarkerPopup", slug: "markerpopup" },
        { title: "MarkerTooltip", slug: "markertooltip" },
        { title: "MarkerLabel", slug: "markerlabel" },
        { title: "MapPopup", slug: "mappopup" },
        { title: "MapRoute", slug: "maproute" },
        { title: "MapClusterLayer", slug: "mapclusterlayer" },
        { title: "MapPolygon", slug: "mappolygon" },
        { title: "MapCircle", slug: "mapcircle" },
        { title: "MapHeatmap", slug: "mapheatmap" },
        { title: "MapTrafficLayer", slug: "maptrafficlayer" },
        { title: "MapSatelliteLayer", slug: "mapsatellitelayer" },
      ]}
    >
      <DocsNote>
        <strong>Note:</strong> This library is built on top of{" "}
        <DocsLink href="https://lbs.amap.com/api/jsapi-v2/summary/" external>
          AMap JS API
        </DocsLink>
        . Most components extend the native AMap options. Refer to the{" "}
        <DocsLink
          href="https://lbs.amap.com/api/jsapi-v2/summary/classes/Map/"
          external
        >
          AMap Map API
        </DocsLink>{" "}
        for additional options not listed here.
      </DocsNote>

      <DocsSection title="Component Anatomy">
        <p>
          All parts of the component that you can use and combine to build your
          map.
        </p>
        <CodeBlock code={anatomyCode} showCopyButton={false} />
      </DocsSection>

      {/* Map */}
      <DocsSection title="Map">
        <p>
          The root container component that initializes AMap JS API and provides
          context to child components. Automatically handles theme switching
          between light and dark modes.
        </p>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description:
                "Child components (markers, popups, controls, routes, etc.).",
            },
            {
              name: "styles",
              type: "{ light?: string; dark?: string }",
              description:
                "Custom AMap style URLs for light and dark themes.",
            },
            {
              name: "bounds",
              type: "[[number, number], [number, number]]",
              description:
                "Fit the viewport to [SW corner, NE corner] bounds. Reacts to prop changes.",
            },
            {
              name: "viewMode",
              type: '"2D" | "3D"',
              default: '"3D"',
              description:
                "Map projection mode. Only takes effect on initial mount.",
            },
            {
              name: "onLoad",
              type: "() => void",
              description: "Called once when the map finishes loading.",
            },
            {
              name: "onClick",
              type: "(lngLat: { lng: number; lat: number }) => void",
              description: "Called when the map canvas is clicked.",
            },
            {
              name: "onMoveEnd",
              type: "() => void",
              description: "Called when the map finishes panning.",
            },
            {
              name: "onZoomEnd",
              type: "() => void",
              description: "Called when the map finishes zooming.",
            },
            {
              name: "onError",
              type: "(error: Error) => void",
              description: "Called when AMap JS API fails to load.",
            },
          ]}
        />
      </DocsSection>

      {/* useMap */}
      <DocsSection title="useMap">
        <p>
          A hook that provides access to the AMap map instance and loading
          state. Must be used within a <DocsCode>Map</DocsCode> component.
        </p>
        <CodeBlock code={useMapCode} language="tsx" showCopyButton={false} />
        <p>
          Returns <DocsCode>map</DocsCode> (
          <DocsLink
            href="https://lbs.amap.com/api/jsapi-v2/summary/classes/Map/"
            external
          >
            AMap.Map
          </DocsLink>
          ) and <DocsCode>isLoaded</DocsCode> (boolean) tells you if the map is
          loaded and ready to use.
        </p>
      </DocsSection>

      {/* useMapEvent */}
      <DocsSection title="useMapEvent">
        <p>
          Subscribes to a map event and cleans up automatically on unmount. Must
          be called inside a <DocsCode>Map</DocsCode> component.
        </p>
        <CodeBlock
          code={useMapEventCode}
          language="tsx"
          showCopyButton={false}
        />
        <p>
          Accepts any AMap map event name such as{" "}
          <DocsCode>click</DocsCode>, <DocsCode>moveend</DocsCode>,{" "}
          <DocsCode>zoomend</DocsCode>, <DocsCode>pitchchange</DocsCode>, etc.
        </p>
      </DocsSection>

      {/* useMapBounds */}
      <DocsSection title="useMapBounds">
        <p>
          Returns the current viewport bounds, updating automatically on every
          pan/zoom. Must be called inside a <DocsCode>Map</DocsCode> component.
        </p>
        <CodeBlock
          code={useMapBoundsCode}
          language="tsx"
          showCopyButton={false}
        />
      </DocsSection>

      {/* Coordinate Utilities */}
      <DocsSection title="Coordinate Utilities">
        <p>
          AMap uses the GCJ-02 coordinate system (China national standard).
          GPS devices output WGS-84. Use these utilities to convert between
          them.
        </p>
        <CodeBlock code={coordCode} language="tsx" showCopyButton={false} />
        <DocsPropTable
          props={[
            {
              name: "wgs84ToGcj02(lng, lat)",
              type: "[number, number]",
              description:
                "Converts WGS-84 GPS coordinates to GCJ-02 (AMap). Returns [lng, lat].",
            },
            {
              name: "gcj02ToWgs84(lng, lat)",
              type: "[number, number]",
              description:
                "Converts GCJ-02 (AMap) coordinates back to WGS-84 GPS via iterative approximation. Returns [lng, lat].",
            },
          ]}
        />
      </DocsSection>

      {/* MapControls */}
      <DocsSection title="MapControls">
        <p>
          Renders map control buttons (zoom, compass, locate, fullscreen, scale). Must
          be used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "position",
              type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
              default: '"bottom-right"',
              description: "Position of the controls on the map.",
            },
            {
              name: "showZoom",
              type: "boolean",
              default: "true",
              description: "Show zoom in/out buttons.",
            },
            {
              name: "showCompass",
              type: "boolean",
              default: "false",
              description: "Show compass button to reset bearing.",
            },
            {
              name: "showLocate",
              type: "boolean",
              default: "false",
              description: "Show locate button to find user's location.",
            },
            {
              name: "showFullscreen",
              type: "boolean",
              default: "false",
              description: "Show fullscreen toggle button.",
            },
            {
              name: "showScale",
              type: "boolean",
              default: "false",
              description: "Show a scale bar at the bottom-left of the map.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the controls container.",
            },
            {
              name: "onLocate",
              type: "(coords: { longitude: number; latitude: number }) => void",
              description: "Callback with user coordinates when located.",
            },
          ]}
        />
      </DocsSection>

      {/* MapMarker */}
      <DocsSection title="MapMarker">
        <p>
          A container for marker-related components. Provides context for its
          children and handles marker positioning.
        </p>
        <p>
          Extends{" "}
          <DocsLink
            href="https://lbs.amap.com/api/jsapi-v2/summary/type-aliases/MarkerOptions/"
            external
          >
            MarkerOptions
          </DocsLink>{" "}
          from AMap JS API (excluding <DocsCode>element</DocsCode>).
        </p>
        <DocsPropTable
          props={[
            {
              name: "longitude",
              type: "number",
              description: "Longitude coordinate for marker position.",
            },
            {
              name: "latitude",
              type: "number",
              description: "Latitude coordinate for marker position.",
            },
            {
              name: "children",
              type: "ReactNode",
              description:
                "Marker subcomponents (MarkerContent, MarkerPopup, etc).",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Callback when marker is clicked.",
            },
            {
              name: "onMouseEnter",
              type: "() => void",
              description: "Callback when mouse enters marker.",
            },
            {
              name: "onMouseLeave",
              type: "() => void",
              description: "Callback when mouse leaves marker.",
            },
            {
              name: "onDragStart",
              type: "(lngLat: { lng: number; lat: number }) => void",
              description:
                "Callback when marker drag starts (requires draggable: true).",
            },
            {
              name: "onDragEnd",
              type: "(lngLat: { lng: number; lat: number }) => void",
              description:
                "Callback when marker drag ends (requires draggable: true).",
            },
            {
              name: "visible",
              type: "boolean",
              default: "true",
              description: "Show or hide the marker.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerContent */}
      <DocsSection title="MarkerContent">
        <p>
          Renders the visual content of a marker. Must be used inside{" "}
          <DocsCode>MapMarker</DocsCode>. If no children provided, renders a
          default blue dot marker.
        </p>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Custom marker content. Defaults to a blue dot.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the marker container.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerPopup */}
      <DocsSection title="MarkerPopup">
        <p>
          Renders a popup attached to the marker that opens on click. Must be
          used inside <DocsCode>MapMarker</DocsCode>.
        </p>
        <p>
          Extends{" "}
          <DocsLink
            href="https://lbs.amap.com/api/jsapi-v2/summary/type-aliases/PopupOptions/"
            external
          >
            PopupOptions
          </DocsLink>{" "}
          from AMap JS API (excluding <DocsCode>className</DocsCode> and{" "}
          <DocsCode>closeButton</DocsCode>).
        </p>
        <DocsNote>
          The <DocsCode>className</DocsCode> and{" "}
          <DocsCode>closeButton</DocsCode> from AMap&apos;s PopupOptions are
          excluded to prevent style conflicts. Use the component&apos;s own
          props to style the popup. AMap&apos;s default popup styles are
          reset via CSS.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Popup content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the popup container.",
            },
            {
              name: "closeButton",
              type: "boolean",
              default: "false",
              description: "Show a close button in the popup.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerTooltip */}
      <DocsSection title="MarkerTooltip">
        <p>
          Renders a tooltip that appears on hover. Must be used inside{" "}
          <DocsCode>MapMarker</DocsCode>.
        </p>
        <p>
          Extends{" "}
          <DocsLink
            href="https://lbs.amap.com/api/jsapi-v2/summary/type-aliases/PopupOptions/"
            external
          >
            PopupOptions
          </DocsLink>{" "}
          from AMap JS API (excluding <DocsCode>className</DocsCode>,{" "}
          <DocsCode>closeButton</DocsCode>, and{" "}
          <DocsCode>closeOnClick</DocsCode> as tooltips auto-dismiss on hover
          out).
        </p>
        <DocsNote>
          The <DocsCode>className</DocsCode> from AMap&apos;s PopupOptions
          is excluded to prevent style conflicts. Use the component&apos;s own{" "}
          <DocsCode>className</DocsCode> prop to style the tooltip content.
          AMap&apos;s default popup styles are reset via CSS.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Tooltip content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the tooltip container.",
            },
          ]}
        />
      </DocsSection>

      {/* MarkerLabel */}
      <DocsSection title="MarkerLabel">
        <p>
          Renders a text label above or below the marker. Must be used inside{" "}
          <DocsCode>MarkerContent</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "children",
              type: "ReactNode",
              description: "Label text content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the label.",
            },
            {
              name: "position",
              type: '"top" | "bottom"',
              default: '"top"',
              description: "Position of the label relative to the marker.",
            },
          ]}
        />
      </DocsSection>

      {/* MapPopup */}
      <DocsSection title="MapPopup">
        <p>
          A standalone popup component that can be placed anywhere on the map
          without a marker. Must be used inside <DocsCode>Map</DocsCode>.
        </p>
        <p>
          Extends{" "}
          <DocsLink
            href="https://lbs.amap.com/api/jsapi-v2/summary/type-aliases/PopupOptions/"
            external
          >
            PopupOptions
          </DocsLink>{" "}
          from AMap JS API (excluding <DocsCode>className</DocsCode> and{" "}
          <DocsCode>closeButton</DocsCode>).
        </p>
        <DocsNote>
          The <DocsCode>className</DocsCode> and{" "}
          <DocsCode>closeButton</DocsCode> from AMap&apos;s PopupOptions are
          excluded to prevent style conflicts. Use the component&apos;s own
          props to style the popup. AMap&apos;s default popup styles are
          reset via CSS.
        </DocsNote>
        <DocsPropTable
          props={[
            {
              name: "longitude",
              type: "number",
              description: "Longitude coordinate for popup position.",
            },
            {
              name: "latitude",
              type: "number",
              description: "Latitude coordinate for popup position.",
            },
            {
              name: "onClose",
              type: "() => void",
              description: "Callback when popup is closed.",
            },
            {
              name: "children",
              type: "ReactNode",
              description: "Popup content.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional CSS classes for the popup container.",
            },
            {
              name: "closeButton",
              type: "boolean",
              default: "false",
              description: "Show a close button in the popup.",
            },
          ]}
        />
      </DocsSection>

      {/* MapRoute */}
      <DocsSection title="MapRoute">
        <p>
          Renders a line/route on the map connecting coordinate points. Must be
          used inside <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [longitude, latitude] coordinate pairs.",
            },
            {
              name: "color",
              type: "string",
              default: '"#4285F4"',
              description: "Line color (CSS color value).",
            },
            {
              name: "width",
              type: "number",
              default: "4",
              description: "Line width in pixels.",
            },
            {
              name: "opacity",
              type: "number",
              default: "0.8",
              description: "Line opacity (0 to 1).",
            },
            {
              name: "dashed",
              type: "boolean",
              default: "false",
              description: "Render the route as a dashed line.",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Callback when the route line is clicked.",
            },
          ]}
        />
      </DocsSection>

      {/* MapClusterLayer */}
      <DocsSection title="MapClusterLayer">
        <p>
          Renders clustered point data using AMap JS API&apos;s native
          clustering. Automatically groups nearby points into clusters that
          expand on click. Must be used inside <DocsCode>Map</DocsCode>.
          Supports a generic type parameter for typed feature properties:{" "}
          <DocsCode>{"MapClusterLayer<MyProperties>"}</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "data",
              type: "string | GeoJSON.FeatureCollection",
              description:
                "GeoJSON FeatureCollection data or URL to fetch GeoJSON from.",
            },
            {
              name: "clusterColors",
              type: "[string, string, string]",
              default: '["#51bbd6", "#f1f075", "#f28cb1"]',
              description:
                "Colors for cluster circles: [small, medium, large] based on point count.",
            },
            {
              name: "pointColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Color for unclustered individual points.",
            },
            {
              name: "onPointClick",
              type: "(feature: GeoJSON.Feature, coordinates: [number, number]) => void",
              description: "Callback when an unclustered point is clicked.",
            },
          ]}
        />
      </DocsSection>

      {/* MapPolygon */}
      <DocsSection title="MapPolygon">
        <p>
          Draws a filled polygon. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Requires at least 3 coordinate pairs. See{" "}
          <DocsLink href="/docs/shapes">Shapes</DocsLink> for a full example.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description: "Array of [lng, lat] pairs (min 3 points).",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Fill color.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0.3",
              description: "Fill opacity (0 to 1).",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Stroke color.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Stroke width in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "0.8",
              description: "Stroke opacity (0 to 1).",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Click callback.",
            },
            {
              name: "onMouseEnter",
              type: "() => void",
              description: "Mouse enter callback.",
            },
            {
              name: "onMouseLeave",
              type: "() => void",
              description: "Mouse leave callback.",
            },
          ]}
        />
      </DocsSection>

      {/* MapCircle */}
      <DocsSection title="MapCircle">
        <p>
          Draws a circle with a given center and radius in meters. Must be used
          inside <DocsCode>Map</DocsCode>. See{" "}
          <DocsLink href="/docs/shapes">Shapes</DocsLink> for a full example.
        </p>
        <DocsPropTable
          props={[
            {
              name: "center",
              type: "[number, number]",
              description: "Circle center [longitude, latitude] in GCJ-02.",
            },
            {
              name: "radius",
              type: "number",
              description: "Radius in meters.",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Fill color.",
            },
            {
              name: "fillOpacity",
              type: "number",
              default: "0.2",
              description: "Fill opacity (0 to 1).",
            },
            {
              name: "strokeColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Stroke color.",
            },
            {
              name: "strokeWidth",
              type: "number",
              default: "2",
              description: "Stroke width in pixels.",
            },
            {
              name: "strokeOpacity",
              type: "number",
              default: "0.8",
              description: "Stroke opacity (0 to 1).",
            },
            {
              name: "onClick",
              type: "() => void",
              description: "Click callback.",
            },
            {
              name: "onMouseEnter",
              type: "() => void",
              description: "Mouse enter callback.",
            },
            {
              name: "onMouseLeave",
              type: "() => void",
              description: "Mouse leave callback.",
            },
          ]}
        />
      </DocsSection>

      {/* MapHeatmap */}
      <DocsSection title="MapHeatmap">
        <p>
          Renders a density heatmap. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Uses AMap&apos;s{" "}
          <DocsCode>AMap.HeatMap</DocsCode> plugin. See{" "}
          <DocsLink href="/docs/heatmap">Heatmap</DocsLink> for a full example.
        </p>
        <DocsPropTable
          props={[
            {
              name: "data",
              type: "HeatmapPoint[] | GeoJSON.FeatureCollection<Point>",
              description:
                "Array of { lng, lat, count? } or GeoJSON FeatureCollection<Point>.",
            },
            {
              name: "radius",
              type: "number",
              default: "30",
              description: "Point influence radius in pixels.",
            },
            {
              name: "opacity",
              type: "number",
              default: "0.8",
              description: "Maximum opacity (0 to 1).",
            },
            {
              name: "gradient",
              type: "Record<string, string>",
              description:
                'Color gradient. Keys are 0-1 positions. Defaults to blue → cyan → green → yellow → red.',
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "Maximum count value for normalization.",
            },
          ]}
        />
      </DocsSection>

      {/* MapTrafficLayer */}
      <DocsSection title="MapTrafficLayer">
        <p>
          Overlays real-time traffic conditions. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. See{" "}
          <DocsLink href="/docs/layers">Layers</DocsLink> for a full example.
        </p>
        <DocsPropTable
          props={[
            {
              name: "visible",
              type: "boolean",
              default: "true",
              description: "Show or hide the layer.",
            },
            {
              name: "opacity",
              type: "number",
              default: "1",
              description: "Layer opacity (0 to 1).",
            },
          ]}
        />
      </DocsSection>

      {/* MapSatelliteLayer */}
      <DocsSection title="MapSatelliteLayer">
        <p>
          Overlays satellite/aerial imagery. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. See{" "}
          <DocsLink href="/docs/layers">Layers</DocsLink> for a full example.
        </p>
        <DocsPropTable
          props={[
            {
              name: "visible",
              type: "boolean",
              default: "true",
              description: "Show or hide the layer.",
            },
            {
              name: "opacity",
              type: "number",
              default: "1",
              description: "Layer opacity (0 to 1).",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
