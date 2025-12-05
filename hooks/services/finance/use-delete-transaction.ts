import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';

export default function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: string): Promise<string> => {
      const response = await http().delete(`/finance/transactions/${transactionId}`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate transactions and summary to refetch
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['financial-summary'] });
    },
  });
}
