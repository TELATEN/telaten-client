import { useQuery } from '@tanstack/react-query';
import { http } from '@/lib/http';
import type { FinancialSummary, GetSummaryParams } from '@/types/entity/finance';

export default function useFinancialSummary(params?: GetSummaryParams) {
  return useQuery({
    queryKey: ['financial-summary', params],
    queryFn: async (): Promise<FinancialSummary> => {
      const response = await http().get('/finance/summary', { params });
      
      // Handle different response structures
      // Case 1: response.data is already the summary object
      if (response.data?.total_income !== undefined) {
        return response.data;
      }
      
      // Case 2: response.data.data contains the summary
      if (response.data?.data?.total_income !== undefined) {
        return response.data.data;
      }
      
      // Case 3: response.data.summary contains the summary
      if (response.data?.summary?.total_income !== undefined) {
        return response.data.summary;
      }
      
      // Fallback: return default structure if API returns unexpected format
      console.warn('Unexpected API response format for summary:', response.data);
      return {
        total_income: 0,
        total_expense: 0,
        net_profit: 0,
        period_start: new Date().toISOString(),
        period_end: new Date().toISOString(),
        income_breakdown: [],
        expense_breakdown: [],
      };
    },
  });
}
