import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Transaction, GetTransactionsParams } from '@/types/entity/finance';

export default function useTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: async (): Promise<Transaction[]> => {
      const response = await http().get('/finance/transactions', { params });
      
      // Handle different response structures
      // Case 1: response.data is already an array
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      // Case 2: response.data.data contains the array
      if (response.data?.data && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      
      // Case 3: response.data.transactions contains the array
      if (response.data?.transactions && Array.isArray(response.data.transactions)) {
        return response.data.transactions;
      }
      
      // Fallback: return empty array if none of the above
      console.warn('Unexpected API response format for transactions:', response.data);
      return [];
    },
  });
}
