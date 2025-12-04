import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Transaction, CreateTransactionInput } from '@/types/entity/finance';

export default function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTransactionInput): Promise<Transaction> => {
      const response = await http().post('/finance/transactions', input);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate transactions and summary to refetch
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['financial-summary'] });
    },
  });
}
