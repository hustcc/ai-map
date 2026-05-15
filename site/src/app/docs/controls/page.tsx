import { DocsLayout, DocsSection, DocsCode } from "../_components/docs";
import { ComponentPreview } from "../_components/component-preview";
import { MapControlsExample } from "../_components/examples/map-controls-example";
import { ScaleControlExample } from "../_components/examples/scale-control-example";
import { getExampleSource } from "@/lib/get-example-source";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controls",
};

export default function ControlsPage() {
  const controlsSource = getExampleSource("map-controls-example.tsx");
  const scaleSource = getExampleSource("scale-control-example.tsx");

  return (
    <DocsLayout
      title="Controls"
      description="Add interactive controls to your map for zoom, compass, location, and fullscreen."
      prev={{ title: "Map", href: "/docs/basic-map" }}
      next={{ title: "Markers", href: "/docs/markers" }}
      toc={[
        { title: "Basic Controls", slug: "basic-controls" },
        { title: "Scale Bar", slug: "scale-bar" },
      ]}
    >
      <DocsSection>
        <p>
          The <DocsCode>MapControls</DocsCode> component provides a set of
          interactive controls that can be positioned on any corner of the map.
        </p>
      </DocsSection>

      <DocsSection title="Basic Controls">
        <p>
          Show zoom, compass, geolocation, and fullscreen buttons using the{" "}
          <DocsCode>showZoom</DocsCode>, <DocsCode>showCompass</DocsCode>,{" "}
          <DocsCode>showLocate</DocsCode>, and{" "}
          <DocsCode>showFullscreen</DocsCode> props.
        </p>
      </DocsSection>

      <ComponentPreview code={controlsSource}>
        <MapControlsExample />
      </ComponentPreview>

      <DocsSection title="Scale Bar">
        <p>
          Add a real-world scale indicator with{" "}
          <DocsCode>showScale</DocsCode>. The scale bar updates as you zoom in
          and out and is always rendered at the bottom-left of the map.
        </p>
      </DocsSection>

      <ComponentPreview code={scaleSource}>
        <ScaleControlExample />
      </ComponentPreview>
    </DocsLayout>
  );
}
