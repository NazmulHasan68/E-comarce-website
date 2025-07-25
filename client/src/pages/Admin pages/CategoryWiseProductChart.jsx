import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const categoryWiseProductData = [
  { name: "T-shirts", value: 120 },
  { name: "Shoes", value: 80 },
  { name: "Watches", value: 60 },
  { name: "Hats", value: 40 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function CategoryWiseProductChart() {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Category-wise Product Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[320px] flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryWiseProductData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryWiseProductData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
