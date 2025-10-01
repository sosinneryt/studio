"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const ProgressChart = dynamic(
  () => import("./progress-chart").then((mod) => mod.ProgressChart),
  {
    loading: () => <Skeleton className="w-full h-[300px]" />,
    ssr: false,
  }
);

export function ProgressChartClient() {
  return <ProgressChart />;
}
