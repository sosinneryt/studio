import { PageHeader } from "@/components/page-header";
import { CalmCanvas } from "./components/calm-canvas";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SensoryToysPage() {
  return (
    <div>
      <PageHeader
        title="Interactive Sensory Toys"
        description="Engage your senses with these simple digital toys."
      />
      <div className="grid grid-cols-1 gap-8 mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Calm Canvas</CardTitle>
                <CardDescription>Click or tap on the canvas to create calming ripples.</CardDescription>
            </CardHeader>
            <CardContent>
                <CalmCanvas />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
