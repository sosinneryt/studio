import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { RecommendationsClient } from "./components/recommendations-client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SensoryProfileSummary } from "./components/sensory-profile-summary";
import { ProgressChartClient } from "./components/progress-chart-client";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Welcome Back"
        description="Here's a look at your recent activity and some suggestions for you."
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Your Progress</h2>
              <div className="rounded-lg border bg-card p-4">
                <ProgressChartClient />
              </div>
            </div>
             <div>
              <h2 className="text-2xl font-semibold tracking-tight mb-4">Your Profile</h2>
               <Suspense fallback={<Skeleton className="h-48 w-full" />}>
                <SensoryProfileSummary />
              </Suspense>
            </div>
        </div>
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold tracking-tight mb-4">For You</h2>
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <RecommendationsClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
