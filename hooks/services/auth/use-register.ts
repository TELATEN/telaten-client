import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { RegisterParams, RegisterResponse, User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const query = useQueryClient();

  const mutationFn = async (
    params: RegisterParams
  ): Promise<RegisterResponse> => {
    const registerRes = await http().post("/auth/register", params);
    const registerData = registerRes.data;

    try {
      const loginRes = await http().post(
        `/auth/login`,
        {
          email: params.email,
          password: params.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const loginData = loginRes.data;

      if (loginData.access_token) {
        // Convert user data to match User type
        const user: User = {
          id: registerData.id,
          email: registerData.email,
          name: registerData.name,
          role: "user",
          created_at: new Date(registerData.created_at),
        };

        setAuth(user, loginData.access_token);
        await query.invalidateQueries({ queryKey: ["me"] });

        return {
          user: {
            id: registerData.id,
            email: registerData.email,
            name: registerData.name,
            created_at: registerData.created_at,
            updated_at: registerData.created_at,
          },
          access_token: loginData.access_token,
        };
      } else {
        throw new Error("Failed to get authentication token");
      }
    } catch (loginError) {
      throw new Error(
        "Registration successful but auto-login failed. Please login manually."
      );
    }
  };

  return useMutation({
    mutationKey: ["register"],
    mutationFn,
  });
}
