'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { TrendingUp, TrendingDown, Calendar, Tag } from 'lucide-react';
import type { Transaction } from '@/types/entity/finance';
import { cn } from '@/lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Safety check: ensure transactions is an array
  if (!Array.isArray(transactions)) {
    console.error('TransactionList: transactions prop is not an array', transactions);
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Terjadi kesalahan dalam memuat data transaksi.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada transaksi. Mulai tambahkan transaksi pertama Anda!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <Card
          key={transaction.id}
          className={cn(
            'border-l-4 transition-all hover:shadow-md',
            transaction.type === 'income'
              ? 'border-l-green-500 bg-green-50/50 dark:bg-green-900/10'
              : 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10'
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Type Icon & Description */}
                <div className="flex items-start gap-2 mb-2">
                  {transaction.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {transaction.description}
                    </p>
                  </div>
                </div>

                {/* Category & Date */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <Badge
                    variant="secondary"
                    className={cn(
                      'flex items-center gap-1',
                      transaction.type === 'income'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    )}
                  >
                    <Tag className="w-3 h-3" />
                    {transaction.category}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(transaction.transaction_date), 'dd MMM yyyy, HH:mm', {
                      locale: id,
                    })}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right flex-shrink-0">
                <p
                  className={cn(
                    'text-lg font-bold',
                    transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                  )}
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
  );
}
