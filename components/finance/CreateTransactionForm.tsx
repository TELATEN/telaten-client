'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, DollarSign, ArrowDownCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import useCategories from '@/hooks/services/finance/use-categories';
import type { CreateTransactionInput, PaymentMethod } from '@/types/entity/finance';

interface CreateTransactionFormProps {
  onSubmit: (data: CreateTransactionInput) => void;
  isLoading?: boolean;
}

const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'CASH', label: '💵 Tunai' },
  { value: 'BANK_TRANSFER', label: '🏦 Transfer Bank' },
  { value: 'E_WALLET', label: '📱 E-Wallet' },
  { value: 'DEBIT_CARD', label: '💳 Kartu Debit' },
  { value: 'CREDIT_CARD', label: '💳 Kartu Kredit' },
];

export function CreateTransactionForm({ onSubmit, isLoading }: CreateTransactionFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('CASH');
  
  const { data: allCategories, isLoading: categoriesLoading } = useCategories();
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CreateTransactionInput>({
    defaultValues: {
      type: 'income',
      transaction_date: new Date().toISOString(),
      payment_method: 'CASH',
    },
  });

  const categories = allCategories?.filter((c) => c.type === transactionType) || [];

  const handleFormSubmit = (data: CreateTransactionInput) => {
    const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
    
    if (!selectedCategory) {
      return;
    }

    const submitData: CreateTransactionInput = {
      amount: Number(data.amount),
      type: transactionType,
      category_id: selectedCategory.id,
      category_name: selectedCategory.name,
      payment_method: selectedPaymentMethod,
      description: data.description,
      transaction_date: date.toISOString(),
    };
    
    onSubmit(submitData);
    reset();
    setDate(new Date());
    setSelectedCategoryId('');
    setSelectedPaymentMethod('CASH');
  };

  const handleTypeChange = (value: 'income' | 'expense') => {
    setTransactionType(value);
    setValue('type', value);
    setSelectedCategoryId(''); // Reset category when type changes
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tambah Transaksi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Tipe Transaksi</Label>
            <Select value={transactionType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih tipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">
                  <span className="text-green-600 font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Pemasukan
                  </span>
                </SelectItem>
                <SelectItem value="expense">
                  <span className="text-red-600 font-medium flex items-center gap-2">
                    <ArrowDownCircle className="w-4 h-4" />
                    Pengeluaran
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Jumlah (Rp)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              {...register('amount', { 
                required: 'Jumlah harus diisi',
                min: { value: 1, message: 'Jumlah harus lebih dari 0' }
              })}
              className={cn(errors.amount && 'border-red-500')}
            />
            {errors.amount && (
              <p className="text-xs text-red-500">{errors.amount.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>
            <Select 
              value={selectedCategoryId} 
              onValueChange={setSelectedCategoryId}
              disabled={categoriesLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder={categoriesLoading ? "Memuat kategori..." : "Pilih kategori"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                  </SelectItem>
                ))}
                {categories.length === 0 && !categoriesLoading && (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    Belum ada kategori
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label htmlFor="payment_method">Metode Pembayaran</Label>
            <Select 
              value={selectedPaymentMethod} 
              onValueChange={(value: PaymentMethod) => setSelectedPaymentMethod(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_METHODS.map((method) => (
                  <SelectItem key={method.value} value={method.value}>
                    {method.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              placeholder="Contoh: Penjualan 10 paket nasi goreng"
              {...register('description', { required: 'Deskripsi harus diisi' })}
              className={cn(errors.description && 'border-red-500')}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Tanggal Transaksi</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: id }) : 'Pilih tanggal'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            disabled={isLoading || categoriesLoading || !selectedCategoryId}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              'Simpan Transaksi'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
