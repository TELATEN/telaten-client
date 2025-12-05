import { http } from "@/lib/http";
import { Leaderboard } from "@/types/entity/leaderboard";
import { useQuery } from "@tanstack/react-query";

export default function useLeaderboard() {
  const queryFn = async (): Promise<Leaderboard[]> => {
    const res = await http().get("/gamification/leaderboard");
    return res.data as Leaderboard[];
  };

  return useQuery({
    queryKey: ["get-leaderboards"],
    queryFn,
  });
}
