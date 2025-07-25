import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, Tag, Store } from "lucide-react";
import CategoryWiseProductChart from "./CategoryWiseProductChart";

// Chart data
const chartData = [
  { name: "Jan", orders: 300, newCustomer: 100, returnCustomer: 50 },
  { name: "Feb", orders: 400, newCustomer: 120, returnCustomer: 60 },
  { name: "Mar", orders: 600, newCustomer: 180, returnCustomer: 90 },
  { name: "Apr", orders: 500, newCustomer: 160, returnCustomer: 70 },
  { name: "May", orders: 700, newCustomer: 200, returnCustomer: 110 },
  { name: "Jun", orders: 800, newCustomer: 240, returnCustomer: 120 },
  { name: "Jul", orders: 650, newCustomer: 190, returnCustomer: 100 },
];

// Pie chart data
const pieData = [
  {
    name: "New Customers",
    value: chartData.reduce((acc, d) => acc + d.newCustomer, 0),
  },
  {
    name: "Returning Customers",
    value: chartData.reduce((acc, d) => acc + d.returnCustomer, 0),
  },
];

const COLORS = ["#10b981", "#f59e0b"];

const metrics = [
  { label: "Total Products", value: 320, icon: Package },
  { label: "Total Customers", value: 900, icon: Users },
  { label: "Total Orders", value: 1200, icon: ShoppingCart },
  { label: "Total Categories", value: 10, icon: Tag },
  { label: "Total Brands", value: 15, icon: Store },
  { label: "Today's Orders", value: 25, icon: ShoppingCart },
  { label: "Last 7 Days", value: 180, icon: ShoppingCart },
  { label: "Last 1 Month", value: 600, icon: ShoppingCart },
  { label: "Last 3 Months", value: 1600, icon: ShoppingCart },
  { label: "Last 1 Year", value: 7200, icon: ShoppingCart },
  { label: "Total Reviews", value: 1450, icon: Users },
];

export default function AdminDashboard() {
  return (
    <div className="md:p-6 p-2 space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card
              key={index}
              className="rounded-2xl shadow-sm hover:scale-105 cursor-pointer duration-300 transition-all"
              style={{
      bottom: "-40px",
      right: "-40px",
                backgroundImage: getRadialGradient(index),
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.label}
                </CardTitle>
                <Icon className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Area Chart */}
        <Card className="rounded-2xl shadow-sm w-full md:basis-1/2">
          <CardHeader>
            <CardTitle>Overall Order Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className=" md:basis-1/2">
          {/* Pie Chart */}
          <CategoryWiseProductChart />
        </div>
      </div>

      {/* Line Chart */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Order Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="newCustomer"
                  stroke="#10b981"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="returnCustomer"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const getRadialGradient = (index) => {
  const gradients = [
    "radial-gradient(circle, #4f46e5, #3b82f6)", // Indigo → Blue
    "radial-gradient(circle, #10b981, #34d399)", // Green shades
    "radial-gradient(circle, #ec4899, #f472b6)", // Pink shades
    "radial-gradient(circle, #f59e0b, #fbbf24)", // Orange shades
    "radial-gradient(circle, #8b5cf6, #a78bfa)", // Violet shades
    "radial-gradient(circle, #14b8a6, #2dd4bf)", // Teal shades
  ];
  return gradients[index % gradients.length];
};
