import { http } from "@/lib/http";
import { ActionResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteBusinessLevel() {
  const mutationFn = async (id: string): Promise<ActionResponse> => {
    const res = await http().delete(`/admin/business/levels/${id}`);
    return res.data as ActionResponse;
  };

  return useMutation({
    mutationKey: ["delete-business-level"],
    mutationFn,
  });
}
