import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("text-primary", props.className)}
    >
      <title>Sense Oasis Logo</title>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M5 12c3.5-3 6.5-3 10 0" opacity="0.7" />
      <path d="M9 12c1.5-1.5 3.5-1.5 5 0" opacity="0.9" />
    </svg>
  );
}
