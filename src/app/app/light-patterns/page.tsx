import { PageHeader } from "@/components/page-header";
import { LightPatternCustomizer } from "./components/light-pattern-customizer";
import { Card, CardContent } from "@/components/ui/card";

export default function LightPatternsPage() {
  return (
    <div>
      <PageHeader
        title="Light Patterns"
        description="Create and display your own soothing light patterns."
      />
      <div className="mt-8">
        <LightPatternCustomizer />
      </div>
    </div>
  );
}
