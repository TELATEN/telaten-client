import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Category, CreateCategoryInput } from '@/types/entity/finance';

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateCategoryInput): Promise<Category> => {
      const response = await http().post('/finance/categories', input);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance-categories'] });
    },
  });
}
