"use client";

import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/formate";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartPops {
  data: {
    name: string;
    total: number;
  }[];
}

export const Chart = ({ data }: ChartPops) => {
  return (
    <Card>
      <ResponsiveContainer width={"100%"} height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey={"name"}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${formatPrice(value)}`}
          />
          <Bar dataKey={"total"} radius={[4, 4, 0, 0, 0]} fill="#0369A1" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
