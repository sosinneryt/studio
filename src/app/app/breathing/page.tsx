import { PageHeader } from "@/components/page-header";
import { BreathingExercise } from "./components/breathing-exercise";

export default function BreathingPage() {
  return (
    <div className="flex flex-col items-center text-center">
      <PageHeader
        title="Guided Breathing"
        description="Follow the visual guide to regulate your breathing and find calm."
      />
      <div className="w-full max-w-md aspect-square mt-2">
        <BreathingExercise />
      </div>
    </div>
  );
}
