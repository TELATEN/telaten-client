import { useQuery } from "@tanstack/react-query";
import { http } from "@/lib/http";
import type {
  Transaction,
  GetTransactionsParams,
} from "@/types/entity/finance";

export default function useTransactions(params?: GetTransactionsParams) {
  return useQuery({
    queryKey: ["transactions", params],
    queryFn: async (): Promise<Transaction[]> => {
      const response = await http().get("/finance/transactions", { params });

      if (Array.isArray(response.data)) {
        return response.data;
      }

      if (response.data?.items && Array.isArray(response.data.items)) {
        return response.data.items;
      }

      if (
        response.data?.transactions &&
        Array.isArray(response.data.transactions)
      ) {
        return response.data.transactions;
      }

      console.warn(
        "Unexpected API response format for transactions:",
        response.data
      );
      return [];
    },
  });
}
