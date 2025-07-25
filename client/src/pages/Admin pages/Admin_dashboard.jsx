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
import { useGetdashboardQuery } from "@/redux/ApiController/orderApi";

// Gradient function for cards
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

export default function AdminDashboard() {
  const { data, error, isLoading } = useGetdashboardQuery();

  // Loading or error states
  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error loading dashboard data</div>;

  // Map API data to metrics for cards
 const metrics = [
  { label: "Total Products", value: data?.totalProducts ?? 0, icon: Package },
  { label: "Total Customers", value: data?.totalUsers ?? 0, icon: Users },
  { label: "Total Orders", value: data?.totalOrders ?? 0, icon: ShoppingCart },
  { label: "Total Categories", value: data?.totalCategories ?? 0, icon: Tag },
  { label: "Total Brands", value: data?.totalBrands ?? 0, icon: Store },

  {
    label: "Today's Orders",
    value: data?.todaysOrders ?? 0,
    income: data?.todayIncome,
    icon: ShoppingCart,
  },
  {
    label: "Last 7 Days Orders",
    value: data?.last7DaysOrders ?? 0,
    income: data?.last7DaysIncome,
    icon: ShoppingCart,
  },
  {
    label: "Last 1 Month Orders",
    value: data?.last1MonthOrders ?? 0,
    income: data?.last1MonthIncome,
    icon: ShoppingCart,
  },
  {
    label: "Last 3 Months Orders",
    value: data?.last3MonthsOrders ?? 0,
    income: data?.last3MonthsIncome,
    icon: ShoppingCart,
  },
  {
    label: "Last 6 Months Orders",
    value: data?.last6MonthsOrders ?? 0,
    income: data?.last6MonthsIncome,
    icon: ShoppingCart,
  },
  {
    label: "Last 1 Year Orders",
    value: data?.last1YearOrders ?? 0,
    income: data?.last1YearIncome,
    icon: ShoppingCart,
  },

  { label: "Total Income", value: data?.totalIncome?.toFixed(2) ?? "0.00", icon: Package },
];

  // Prepare data for Area Chart (Order Income Growth)
  const areaChartData = [
    { name: "Today", income: data?.todayIncome ?? 0, orders: data?.todaysOrders ?? 0 },
    { name: "Last 7 Days", income: data?.last7DaysIncome ?? 0, orders: data?.last7DaysOrders ?? 0 },
    { name: "Last 1 Month", income: data?.last1MonthIncome ?? 0, orders: data?.last1MonthOrders ?? 0 },
    { name: "Last 3 Months", income: data?.last3MonthsIncome ?? 0, orders: data?.last3MonthsOrders ?? 0 },
    { name: "Last 6 Months", income: data?.last6MonthsIncome ?? 0, orders: data?.last6MonthsOrders ?? 0 },
    { name: "Last 1 Year", income: data?.last1YearIncome ?? 0, orders: data?.last1YearOrders ?? 0 },
    { name: "Total", income: data?.totalIncome ?? 0, orders: data?.totalOrders ?? 0 },
  ];

  // Pie Chart dummy data for example (you can replace or extend this)
  const pieData = [
    { name: "Orders", value: data?.totalOrders ?? 0 },
    { name: "Users", value: data?.totalUsers ?? 0 },
  ];
  const COLORS = ["#10b981", "#6366f1"];

  return (
    <div className="md:p-6 p-2 space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
  const Icon = metric.icon;
  return (
    <Card
      key={index}
      className="rounded-2xl shadow-sm hover:scale-105 cursor-pointer duration-300 transition-all text-center"
      style={{
        backgroundImage: getRadialGradient(index),
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Icon className="w-5 h-5 text-muted-foreground" />
          {metric.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric.value}</div>
        {/* Show income if exists */}
        {metric.income !== undefined && metric.income !== null && (
          <div className="text-md font-semibold text-white mt-1">
             TK. {typeof metric.income === "number" ? metric.income.toFixed(2) : metric.income}
          </div>
        )}
      </CardContent>
    </Card>
  );
})}

      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Area Chart */}
        <Card className="rounded-2xl shadow-sm w-full md:basis-1/2">
          <CardHeader>
            <CardTitle>Order Income Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaChartData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Area type="monotone" dataKey="income" stroke="#6366f1" fillOpacity={1} fill="url(#colorIncome)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <div className="md:basis-1/2 w-full">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle>Orders vs Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category-wise product chart */}
      <CategoryWiseProductChart />

      {/* You can add other charts or components below */}
    </div>
  );
}



