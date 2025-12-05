"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";

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

      {/* Charts - Simple Bar Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart Alternative */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-pink-600" />
              Pemasukan vs Pengeluaran Bulanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => {
                const maxValue = Math.max(...monthlyData.map(d => Math.max(d.income, d.expense)));
                const incomePercentage = (data.income / maxValue) * 100;
                const expensePercentage = (data.expense / maxValue) * 100;
                
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{data.month}</span>
                      <div className="flex gap-4 text-xs">
                        <span className="text-green-600">
                          {formatCurrency(data.income)}
                        </span>
                        <span className="text-red-600">
                          {formatCurrency(data.expense)}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {/* Income Bar */}
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-green-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${incomePercentage}%` }}
                          />
                        </div>
                      </div>
                      {/* Expense Bar */}
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-red-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${expensePercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4 pt-2 border-t dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Pemasukan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Pengeluaran</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart Alternative - Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Trend Laba Bersih
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => {
                const profit = data.income - data.expense;
                const isPositive = profit >= 0;
                const maxProfit = Math.max(...monthlyData.map(d => d.income - d.expense));
                const percentage = Math.abs((profit / maxProfit) * 100);
                
                return (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                      {data.month}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isPositive ? 'bg-blue-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className={`text-sm font-semibold w-24 text-right ${
                          isPositive ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          {formatCurrency(profit)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
