import {
  AnalyticsExample,
  DeliveryExample,
  TrendingExample,
  EVChargingExample,
  TrailExample,
  ZonesExample,
  HeatmapHomeExample,
} from "./examples/index";
import { FlyToExample } from "./examples/flyto-example";

export function ExamplesGrid() {
  return (
    <div className="space-y-5 animate-fade-in delay-400">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AnalyticsExample />
        <TrailExample />
        <FlyToExample />
        <EVChargingExample />
        <TrendingExample />
        <DeliveryExample />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ZonesExample />
        <HeatmapHomeExample />
      </div>
    </div>
  );
}
