'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { TrendingUp, TrendingDown, Calendar, Tag, Trash2, Loader2, Wallet } from 'lucide-react';
import type { Transaction, PaymentMethod } from '@/types/entity/finance';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (transactionId: string) => void;
  isDeleting?: boolean;
}

export function TransactionList({ transactions, onDelete, isDeleting }: TransactionListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPaymentMethodLabel = (method: PaymentMethod): string => {
    const labels: Record<PaymentMethod, string> = {
      CASH: '💵 Tunai',
      BANK_TRANSFER: '🏦 Transfer',
      E_WALLET: '📱 E-Wallet',
      DEBIT_CARD: '💳 Debit',
      CREDIT_CARD: '💳 Kredit',
    };
    return labels[method] || method;
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTransaction && onDelete) {
      onDelete(selectedTransaction.id);
      setDeleteDialogOpen(false);
      setSelectedTransaction(null);
    }
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
    <>
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

                  {/* Category, Payment Method & Date */}
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
                      {transaction.category_name || transaction.category}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Wallet className="w-3 h-3" />
                      {getPaymentMethodLabel(transaction.payment_method)}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(transaction.transaction_date), 'dd MMM yyyy', {
                        locale: id,
                      })}
                    </span>
                  </div>
                </div>

                {/* Amount & Actions */}
                <div className="flex items-start gap-2 flex-shrink-0">
                  <div className="text-right">
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
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteClick(transaction)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-sm sm:max-w-[400px] gap-3 p-4 sm:p-6">
          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-lg">Hapus Transaksi?</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus transaksi ini?
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="p-3 bg-muted rounded-md space-y-1">
              <p className="font-medium text-sm break-words">
                {selectedTransaction.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedTransaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}:{' '}
                {formatCurrency(selectedTransaction.amount)}
              </p>
            </div>
          )}
          
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="flex-1 sm:flex-initial"
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="flex-1 sm:flex-initial"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
