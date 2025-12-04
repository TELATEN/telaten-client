import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Transaction, GetTransactionsParams } from '@/types/entity/finance';

export default function useTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async (): Promise<Transaction[]> => {
      const response = await http().get('/finance/transactions', { params });
      return response.data;
    },
  });
}
