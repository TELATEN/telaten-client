import { http } from "@/lib/http";
import { ActionResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteAchievement() {
  const queryClient = useQueryClient();

  const mutationFn = async (id: string): Promise<ActionResponse> => {
    const res = await http().delete(`/admin/gamification/achievements/${id}`);
    return res.data as ActionResponse;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-achievements"] });
    },
  });
}
