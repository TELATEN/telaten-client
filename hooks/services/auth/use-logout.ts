import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { ActionResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const mutationFn = async (): Promise<ActionResponse> => {
    const result = await http().post("/auth/logout");
    clearAuth();

    return result.data;
  };

  return useMutation({
    mutationKey: ["logout"],
    mutationFn,
  });
}
