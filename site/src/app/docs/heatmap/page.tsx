import {
  DocsLayout,
  DocsSection,
  DocsCode,
  DocsNote,
  DocsPropTable,
} from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { HeatmapExample } from "../_components/examples/heatmap-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heatmap",
};

export default function HeatmapPage() {
  const heatmapSource = getExampleSource("heatmap-example.tsx");

  return (
    <DocsLayout
      title="Heatmap"
      description="Visualize data density and intensity with a smooth color gradient heatmap."
      prev={{ title: "Shapes", href: "/docs/shapes" }}
      next={{ title: "Layers", href: "/docs/layers" }}
      toc={[
        { title: "Example", slug: "example" },
        { title: "MapHeatmap", slug: "mapheatmap" },
      ]}
    >
      <DocsSection>
        <p>
          Use <DocsCode>MapHeatmap</DocsCode> to render a density heatmap from
          an array of weighted points or a GeoJSON{" "}
          <DocsCode>FeatureCollection&lt;Point&gt;</DocsCode>. It uses
          AMap&apos;s built-in{" "}
          <DocsCode>AMap.HeatMap</DocsCode> plugin.
        </p>
      </DocsSection>

      <DocsNote>
        <strong>Performance:</strong> The heatmap is rendered natively by AMap
        and handles large datasets efficiently. For best results keep the{" "}
        <DocsCode>data</DocsCode> array stable (memoized) to avoid unnecessary
        re-renders.
      </DocsNote>

      <DocsSection title="Example">
        <p>
          Simulated activity density across Beijing. Warmer colors indicate
          higher density.
        </p>
      </DocsSection>

      <ComponentPreview code={heatmapSource}>
        <HeatmapExample />
      </ComponentPreview>

      <DocsSection title="MapHeatmap">
        <p>
          Renders a heatmap overlay. Must be used inside{" "}
          <DocsCode>Map</DocsCode>.
        </p>
        <DocsPropTable
          props={[
            {
              name: "data",
              type: "HeatmapPoint[] | GeoJSON.FeatureCollection<Point>",
              description:
                "Array of { lng, lat, count? } points, or a GeoJSON FeatureCollection<Point> (reads properties.count or properties.weight).",
            },
            {
              name: "radius",
              type: "number",
              default: "30",
              description: "Influence radius per point in pixels.",
            },
            {
              name: "opacity",
              type: "number",
              default: "0.8",
              description: "Maximum opacity of the heatmap (0 to 1).",
            },
            {
              name: "gradient",
              type: 'Record<string, string>',
              description:
                'Color gradient where keys are 0-1 positions. Defaults to blue → cyan → green → yellow → red.',
            },
            {
              name: "max",
              type: "number",
              default: "100",
              description: "Maximum count value used to normalize intensity.",
            },
          ]}
        />
      </DocsSection>
    </DocsLayout>
  );
}
