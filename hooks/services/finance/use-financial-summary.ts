import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { FinancialSummary, GetSummaryParams } from '@/types/entity/finance';

export default function useFinancialSummary(params?: GetSummaryParams) {
  return useQuery({
    queryKey: ['financial-summary', params],
    queryFn: async (): Promise<FinancialSummary> => {
      const response = await http().get('/finance/summary', { params });
      return response.data;
    },
  });
}
