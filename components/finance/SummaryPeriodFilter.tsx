'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarClock } from 'lucide-react';

interface SummaryPeriodFilterProps {
  period: 'day' | 'week' | 'month' | 'year';
  onPeriodChange: (period: 'day' | 'week' | 'month' | 'year') => void;
}

export function SummaryPeriodFilter({ period, onPeriodChange }: SummaryPeriodFilterProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Periode Ringkasan</h3>
        </div>

        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger>
            <SelectValue placeholder="Pilih periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Hari Ini</SelectItem>
            <SelectItem value="week">Minggu Ini</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
            <SelectItem value="year">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
