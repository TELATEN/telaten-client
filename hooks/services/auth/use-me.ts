import { http } from "@/lib/http";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export interface MeResponse {
  email: string;
  name: string;
  id: string;
  created_at: string;
}

export default function useMe() {
  const queryFn = async (): Promise<MeResponse> => {
    const res = await http().get("/auth/me");
    return res.data as MeResponse;
  };

  return useQuery({
    queryKey: ["me"],
    queryFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
