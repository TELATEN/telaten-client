import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { LoginParams, LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutationFn = async (params: LoginParams): Promise<LoginResponse> => {
    const res = await http().post("/auth/login", params);
    const result = res.data as LoginResponse;

    setAuth(result.user, result.access_token);

    return result;
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn,
  });
}
