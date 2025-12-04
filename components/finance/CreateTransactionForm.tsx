'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus, DollarSign, ArrowDownCircle } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { CreateTransactionInput } from '@/types/entity/finance';

interface CreateTransactionFormProps {
  onSubmit: (data: CreateTransactionInput) => void;
  isLoading?: boolean;
}

const INCOME_CATEGORIES = [
  'Penjualan',
  'Jasa',
  'Investasi',
  'Lainnya',
];

const EXPENSE_CATEGORIES = [
  'Bahan Baku',
  'Operasional',
  'Gaji',
  'Sewa',
  'Utilitas',
  'Pemasaran',
  'Transport',
  'Lainnya',
];

export function CreateTransactionForm({ onSubmit, isLoading }: CreateTransactionFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CreateTransactionInput>({
    defaultValues: {
      type: 'income',
      transaction_date: new Date().toISOString(),
    },
  });

  const categories = transactionType === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleFormSubmit = (data: CreateTransactionInput) => {
    const submitData = {
      ...data,
      amount: Number(data.amount),
      transaction_date: date.toISOString(),
    };
    onSubmit(submitData);
    reset();
    setDate(new Date());
  };

  const handleTypeChange = (value: 'income' | 'expense') => {
    setTransactionType(value);
    setValue('type', value);
    setValue('category', ''); // Reset category when type changes
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
            <Select onValueChange={(value) => setValue('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-xs text-red-500">{errors.category.message}</p>
            )}
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
            disabled={isLoading}
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Transaksi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
