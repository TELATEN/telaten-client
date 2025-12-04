import { http } from "@/lib/http";
import { Achievement, CreateAchievement } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateAchievement() {
  const queryClient = useQueryClient();

  const mutationFn = async (data: CreateAchievement): Promise<Achievement> => {
    const res = await http().post("/admin/gamification/achievements", data);
    return res.data as Achievement;
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-achievements"] });
    },
  });
}
