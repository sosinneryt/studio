
import { PageHeader } from "@/components/page-header";
import { BubblePop } from "./components/bubble-pop";
import { ColorMatch } from "./components/color-match";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function StressReliefGamesPage() {
  return (
    <div>
      <PageHeader
        title="Stress Relief Games"
        description="Engage in calming activities designed to soothe your mind."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Bubble Pop</CardTitle>
            <CardDescription>A classic way to relax. Tap or click to pop the bubbles.</CardDescription>
          </CardHeader>
          <CardContent>
            <BubblePop />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Color Match</CardTitle>
            <CardDescription>Find all the matching pairs of colors.</CardDescription>
          </CardHeader>
          <CardContent>
            <ColorMatch />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
