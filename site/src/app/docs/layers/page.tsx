import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsPropTable,
} from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { LayersExample } from "../_components/examples/layers-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layers",
};

export default function LayersPage() {
  const layersSource = getExampleSource("layers-example.tsx");

  return (
    <DocsLayout
      title="Layers"
      description="Add satellite imagery and real-time traffic overlays to your map."
      prev={{ title: "Heatmap", href: "/docs/heatmap" }}
      next={{ title: "Advanced", href: "/docs/advanced-usage" }}
      toc={[
        { title: "Example", slug: "example" },
        { title: "MapSatelliteLayer", slug: "mapsatellitelayer" },
        { title: "MapTrafficLayer", slug: "maptrafficlayer" },
      ]}
    >
      <DocsSection>
        <p>
          <DocsCode>MapSatelliteLayer</DocsCode> overlays satellite/aerial
          imagery on top of the base map.{" "}
          <DocsCode>MapTrafficLayer</DocsCode> overlays real-time traffic
          conditions. Both layers can be toggled with the{" "}
          <DocsCode>visible</DocsCode> prop and combined together.
        </p>
      </DocsSection>

      <DocsSection title="Example">
        <p>
          Switch between normal, satellite, traffic, and combined views using
          the buttons in the top-left corner.
        </p>
      </DocsSection>

      <ComponentPreview code={layersSource}>
        <LayersExample />
      </ComponentPreview>

      <DocsSection title="MapSatelliteLayer">
        <p>
          Adds a satellite/aerial imagery tile layer. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "visible",
              type: "boolean",
              default: "true",
              description: "Show or hide the satellite layer.",
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

      <DocsSection title="MapTrafficLayer">
        <p>
          Adds a real-time traffic conditions overlay. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "visible",
              type: "boolean",
              default: "true",
              description: "Show or hide the traffic layer.",
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
