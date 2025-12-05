import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categoryId: string): Promise<string> => {
      const response = await http().delete(`/finance/categories/${categoryId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-categories'] });
    },
  });
}
