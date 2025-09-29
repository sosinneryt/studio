"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { activity: "Breathing", time: 18, fill: "var(--color-breathing)" },
  { activity: "Soundscapes", time: 25, fill: "var(--color-soundscapes)" },
  { activity: "Light", time: 12, fill: "var(--color-light)" },
  { activity: "Toys", time: 30, fill: "var(--color-toys)" },
];

const chartConfig = {
  time: {
    label: "Time (minutes)",
  },
  breathing: {
    label: "Breathing",
    color: "hsl(var(--chart-1))",
  },
  soundscapes: {
    label: "Soundscapes",
    color: "hsl(var(--chart-2))",
  },
  light: {
    label: "Light Patterns",
    color: "hsl(var(--chart-3))",
  },
  toys: {
    label: "Sensory Toys",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function ProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="activity"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="time" radius={8} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
