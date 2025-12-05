import { http } from "@/lib/http";
import { LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useRefreshToken() {
  const mutationFn = async (_: any): Promise<LoginResponse> => {
    const res = await http().post("/auth/refresh");
    return res.data;
  };

  return useMutation({
    mutationKey: ["refresh-token"],
    mutationFn,
  });
}
