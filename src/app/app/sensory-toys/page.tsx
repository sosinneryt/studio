import { PageHeader } from "@/components/page-header";
import { CalmCanvas } from "./components/calm-canvas";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StressBall } from "./components/stress-ball";
import { VirtualSand } from "./components/virtual-sand";

export default function SensoryToysPage() {
  return (
    <div>
      <PageHeader
        title="Interactive Sensory Toys"
        description="Engage your senses with these simple digital toys."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Calm Canvas</CardTitle>
                <CardDescription>Click or tap on the canvas to create calming ripples.</CardDescription>
            </CardHeader>
            <CardContent>
                <CalmCanvas />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Stress Ball</CardTitle>
                <CardDescription>Click and hold to squeeze the virtual stress ball.</CardDescription>
            </CardHeader>
            <CardContent>
                <StressBall />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Virtual Sand</CardTitle>
                <CardDescription>Drag your finger or mouse to draw in the sand.</CardDescription>
            </CardHeader>
            <CardContent>
                <VirtualSand />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
