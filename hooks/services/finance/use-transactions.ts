import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";
import type {
  PaginatedTransactions,
  GetTransactionsParams,
} from "@/types/entity/finance";

export default function useTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async (): Promise<PaginatedTransactions> => {
      const response = await http().get("/finance/transactions", { params });

      // Check if response has pagination structure
      if (response.data?.items && Array.isArray(response.data.items)) {
        return {
          items: response.data.items,
          total: response.data.total || 0,
          page: response.data.page || 1,
          size: response.data.size || 20,
          pages: response.data.pages || 1,
        };
      }

      // Fallback for array response (backwards compatibility)
      if (Array.isArray(response.data)) {
        return {
          items: response.data,
          total: response.data.length,
          page: 1,
          size: response.data.length,
          pages: 1,
        };
      }

      console.warn(
        "Unexpected API response format for transactions:",
        response.data
      );
      return {
        items: [],
        total: 0,
        page: 1,
        size: 20,
        pages: 0,
      };
    },
  });
}
