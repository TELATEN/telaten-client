'use client';

import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import type { FinancialSummary } from '@/types/entity/finance';

interface FinancialSummaryCardProps {
  summary: FinancialSummary;
}

export function FinancialSummaryCard({ summary }: FinancialSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border-2 border-cyan-200 dark:border-cyan-800/30">
      <CardContent className="p-5">
        <div className="grid grid-cols-3 gap-4">
          {/* Total Income */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Pemasukan</p>
            </div>
            <p className="text-sm font-bold text-green-700 break-words">
              {formatCurrency(summary.total_income)}
            </p>
          </div>

          {/* Total Expense */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <TrendingDown className="w-4 h-4 text-red-600" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Pengeluaran</p>
            </div>
            <p className="text-sm font-bold text-red-700 break-words">
              {formatCurrency(summary.total_expense)}
            </p>
          </div>

          {/* Net Profit */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <DollarSign className="w-4 h-4 text-blue-600" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Laba/Rugi</p>
            </div>
            <p
              className={`text-sm font-bold break-words ${
                summary.net_profit >= 0 ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {formatCurrency(summary.net_profit)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
