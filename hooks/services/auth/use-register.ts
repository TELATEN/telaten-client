import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { RegisterParams, RegisterResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutationFn = async (params: RegisterParams): Promise<RegisterResponse> => {
    const res = await http().post("/auth/register", params);
    const result = res.data as RegisterResponse;

    // Auto-login: Save user and token after successful registration
    setAuth(result.user, result.access_token);

    return result;
  };

  return useMutation({
    mutationKey: ["register"],
    mutationFn,
  });
}
