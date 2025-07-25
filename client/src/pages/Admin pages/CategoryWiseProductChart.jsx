import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useGetdashboardQuery } from "@/redux/ApiController/orderApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567", "#56FF78", "#7856FF"];

export default function CategoryWiseProductChart() {
  const { data, error, isLoading } = useGetdashboardQuery();

  if (isLoading) return <div>Loading category data...</div>;
  if (error) return <div>Error loading category data</div>;

  // Defensive: ensure Products exists and is array
  const products = data?.Products ?? [];

  // Create a category count object { categoryName: count }
  const categoryCountMap = products.reduce((acc, product) => {
    const category = product.category || "Unknown";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Convert the map to array format for recharts
  const categoryWiseProductData = Object.entries(categoryCountMap).map(([name, value]) => ({
    name,
    value,
  }));

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
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryWiseProductData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
