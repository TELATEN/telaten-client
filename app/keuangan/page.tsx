'use client';

import { useState } from 'react';
import { mockTransactions, calculateFinanceSummary } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export default function KeuanganPage() {
  const [transactions] = useState(mockTransactions);
  const summary = calculateFinanceSummary(transactions);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Keuangan Curhat</h1>
              <p className="text-gray-600">Ceritakan transaksi seperti chat</p>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
            <CardContent className="p-5">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Pemasukan</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-bold text-green-700">
                      {formatCurrency(summary.totalIncome)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Pengeluaran</p>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="w-4 h-4 text-red-600" />
                    <p className="text-sm font-bold text-red-700">
                      {formatCurrency(summary.totalExpense)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Laba/Rugi</p>
                  <p
                    className={`text-sm font-bold ${
                      summary.profit >= 0 ? 'text-green-700' : 'text-red-700'
                    }`}
                  >
                    {formatCurrency(summary.profit)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </header>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Riwayat Transaksi</h2>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card
                key={transaction.id}
                className={`border-l-4 ${
                  transaction.type === 'income'
                    ? 'border-l-green-500 bg-green-50/50'
                    : 'border-l-red-500 bg-red-50/50'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-1">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-white rounded">
                          {transaction.category}
                        </span>
                        <span>
                          {format(new Date(transaction.timestamp), 'dd MMM yyyy, HH:mm', {
                            locale: id,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
