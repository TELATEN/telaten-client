import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { Category } from '@/types/entity/finance';

export default function useCategories() {
  return useQuery({
    queryKey: ['finance-categories'],
    queryFn: async (): Promise<Category[]> => {
      const response = await http().get('/finance/categories');
      return response.data;
    },
  });
}
