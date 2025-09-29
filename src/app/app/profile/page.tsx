import { PageHeader } from "@/components/page-header";
import { SensoryProfileForm } from "./components/sensory-profile-form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  return (
    <div>
      <PageHeader
        title="Your Sensory Profile"
        description="Answer a few questions to help us understand your preferences and tailor your experience."
      />
      <div className="mt-8 max-w-2xl mx-auto">
        <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
          <SensoryProfileForm />
        </Suspense>
      </div>
    </div>
  );
}
