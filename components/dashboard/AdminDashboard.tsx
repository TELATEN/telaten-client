"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react";

export default function AdminDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data untuk grafik dan summary
  const monthlyData = [
    { month: "Jan", income: 5000000, expense: 3000000 },
    { month: "Feb", income: 6000000, expense: 3500000 },
    { month: "Mar", income: 7500000, expense: 4000000 },
    { month: "Apr", income: 8000000, expense: 4500000 },
    { month: "Mei", income: 9000000, expense: 5000000 },
    { month: "Jun", income: 10000000, expense: 5500000 },
  ];

  // Calculate mock summary from monthly data
  const mockSummary = {
    total_income: monthlyData.reduce((sum, d) => sum + d.income, 0),
    total_expense: monthlyData.reduce((sum, d) => sum + d.expense, 0),
    net_profit: monthlyData.reduce((sum, d) => sum + (d.income - d.expense), 0),
  };

  const chartConfig = {
    income: {
      label: "Pemasukan",
      color: "hsl(142, 76%, 36%)",
    },
    expense: {
      label: "Pengeluaran",
      color: "hsl(0, 84%, 60%)",
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Pemasukan
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(mockSummary.total_income)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Pengeluaran
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(mockSummary.total_expense)}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Laba Bersih
                </p>
                <p
                  className={`text-2xl font-bold ${
                    mockSummary.net_profit >= 0
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrency(mockSummary.net_profit)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Pemasukan vs Pengeluaran Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(value) =>
                    `${(value / 1000000).toFixed(0)}jt`
                  }
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />
                <Bar
                  dataKey="income"
                  fill="var(--color-income)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="var(--color-expense)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trend Laba Bersih</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                profit: {
                  label: "Laba Bersih",
                  color: "hsl(221, 83%, 53%)",
                },
              }}
              className="h-[300px]"
            >
              <LineChart
                data={monthlyData.map((d) => ({
                  month: d.month,
                  profit: d.income - d.expense,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickFormatter={(value) =>
                    `${(value / 1000000).toFixed(0)}jt`
                  }
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="var(--color-profit)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-profit)" }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Periode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Rata-rata Pemasukan
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(
                  monthlyData.reduce((sum, d) => sum + d.income, 0) /
                    monthlyData.length
                )}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Rata-rata Pengeluaran
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(
                  monthlyData.reduce((sum, d) => sum + d.expense, 0) /
                    monthlyData.length
                )}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Bulan Tertinggi
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {
                  monthlyData.reduce((max, d) =>
                    d.income > max.income ? d : max
                  ).month
                }
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Growth Rate
              </p>
              <p className="text-xl font-bold text-green-600">
                +
                {(
                  ((monthlyData[monthlyData.length - 1].income -
                    monthlyData[0].income) /
                    monthlyData[0].income) *
                  100
                ).toFixed(0)}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
