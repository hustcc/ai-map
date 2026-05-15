import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsPropTable,
} from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { PolygonExample } from "../_components/examples/polygon-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shapes",
};

export default function ShapesPage() {
  const polygonSource = getExampleSource("polygon-example.tsx");

  return (
    <DocsLayout
      title="Shapes"
      description="Draw polygons and circles on the map for boundaries, zones, and service areas."
      prev={{ title: "Clusters", href: "/docs/clusters" }}
      next={{ title: "Heatmap", href: "/docs/heatmap" }}
      toc={[
        { title: "Example", slug: "example" },
        { title: "MapPolygon", slug: "mappolygon" },
        { title: "MapCircle", slug: "mapcircle" },
      ]}
    >
      <DocsSection>
        <p>
          Use <DocsCode>MapPolygon</DocsCode> to draw filled areas defined by a
          list of coordinates, and <DocsCode>MapCircle</DocsCode> to draw a
          circle with a given center and radius. Both support hover and click
          interactions and reactive style updates.
        </p>
      </DocsSection>

      <DocsSection title="Example">
        <p>
          The blue rectangle outlines a central Beijing area, the red polygon
          marks the Forbidden City, and the green circle shows a 500 m radius
          around Tiananmen. Hover or click each shape to identify it.
        </p>
      </DocsSection>

      <ComponentPreview code={polygonSource}>
        <PolygonExample />
      </ComponentPreview>

      <DocsSection title="MapPolygon">
        <p>
          Draws a filled polygon on the map. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Requires at least 3 coordinate pairs.
        </p>
        <DocsPropTable
          props={[
            {
              name: "coordinates",
              type: "[number, number][]",
              description:
                "Array of [longitude, latitude] pairs defining the polygon (min 3 points).",
            },
            {
              name: "fillColor",
              type: "string",
              default: '"#3b82f6"',
              description: "Fill color (CSS color value).",
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
              description: "Stroke/border color.",
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
              description: "Callback when the polygon is clicked.",
            },
            {
              name: "onMouseEnter",
              type: "() => void",
              description: "Callback when the mouse enters the polygon.",
            },
            {
              name: "onMouseLeave",
              type: "() => void",
              description: "Callback when the mouse leaves the polygon.",
            },
          ]}
        />
      </DocsSection>

      <DocsSection title="MapCircle">
        <p>
          Draws a circle with a given center and radius. Must be used inside{" "}
          <DocsCode>Map</DocsCode>. Useful for service radius, geofencing, and
          proximity visualization.
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
              description: "Callback when the circle is clicked.",
            },
            {
              name: "onMouseEnter",
              type: "() => void",
              description: "Callback when the mouse enters the circle.",
            },
            {
              name: "onMouseLeave",
              type: "() => void",
              description: "Callback when the mouse leaves the circle.",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
