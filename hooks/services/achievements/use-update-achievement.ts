import { http } from "@/lib/http";
import { Achievement, UpdateAchievement } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateAchievement() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: UpdateAchievement): Promise<Achievement> => {
    const { id, ...updateData } = data;
    const res = await http().put(
      `/admin/gamification/achievements/${id}`,
      updateData
    );
    return res.data as Achievement;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-achievements"] });
    },
  });
}
