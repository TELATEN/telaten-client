import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { LoginParams, LoginResponse, User } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutationFn = async (params: LoginParams): Promise<LoginResponse> => {
    const res = await http().post("/auth/login", params);
    const result = res.data as LoginResponse;

    // Convert user data to match User type (created_at: string → Date)
    const user: User = {
      ...result.user,
      created_at: new Date(result.user.created_at),
    };

    setAuth(user, result.access_token);

    return result;
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn,
  });
}
