import { http } from "@/lib/http";
import { Achievement } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetAchievements() {
  const queryFn = async (): Promise<Achievement[]> => {
    const res = await http().get("/gamification/achievements");
    return res.data as Achievement[];
  };

  return useQuery({
    queryKey: ["get-achievements"],
    queryFn,
  });
}
