'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, X } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';

interface TransactionFilterProps {
  onFilterChange: (startDate?: string, endDate?: string) => void;
}

export function TransactionFilter({ onFilterChange }: TransactionFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from && range?.to) {
      onFilterChange(
        range.from.toISOString(),
        range.to.toISOString()
      );
    } else if (!range) {
      onFilterChange(undefined, undefined);
    }
  };

  const handleClearFilter = () => {
    setDateRange(undefined);
    onFilterChange(undefined, undefined);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Filter Tanggal Transaksi</h3>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {/* Date Range Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'flex-1 justify-start text-left font-normal',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, 'dd MMM', { locale: id })} -{' '}
                      {format(dateRange.to, 'dd MMM yyyy', { locale: id })}
                    </>
                  ) : (
                    format(dateRange.from, 'dd MMM yyyy', { locale: id })
                  )
                ) : (
                  'Pilih rentang tanggal'
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeChange}
                initialFocus
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Clear Filter Button */}
          {dateRange && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilter}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
