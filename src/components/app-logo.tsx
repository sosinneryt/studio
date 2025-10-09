import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      {...props}
      className={cn(props.className)}
    >
      <title>Sense Oasis Logo</title>
      <defs>
        <linearGradient id="logoGradient" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="hsl(160, 50%, 60%)" />
          <stop offset="100%" stopColor="hsl(40, 70%, 75%)" />
        </linearGradient>
      </defs>
      <path
        d="M 50, 5 
           C 85, 5, 95, 30, 95, 50 
           S 85, 95, 50, 95 
           S 5, 70, 5, 50 
           S 15, 5, 50, 5 Z"
        fill="url(#logoGradient)"
      />
      <g
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.6"
      >
        {/* Wavy lines */}
        <path d="M 25,35 C 30,30, 35,30, 40,35" />
        <path d="M 23,40 C 28,35, 33,35, 38,40" />
        <path d="M 21,45 C 26,40, 31,40, 36,45" />

        {/* Top right arc */}
        <path d="M 78, 30 A 15 15 0 0 0 60, 42" />
        <circle cx="79" cy="28" r="1.5" fill="hsl(var(--foreground))" stroke="none" />

        {/* Eyes-like circles */}
        <circle cx="48" cy="50" r="3" />
        <circle cx="62" cy="50" r="3" />
        
        {/* Bottom-left concentric circles */}
        <circle cx="32" cy="70" r="6" />
        <circle cx="32" cy="70" r="2" />
        
        {/* Bottom-right crescent */}
        <path d="M 75, 65 A 10 10 0 0 1 65, 75" />
        
        {/* Side dots */}
        <circle cx="22" cy="55" r="1.5" fill="hsl(var(--foreground))" stroke="none" />
      </g>
    </svg>
  );
}
