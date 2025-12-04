import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { RegisterParams, RegisterResponse, User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function useRegister() {
  const setAuth = useAuthStore((state) => state.setAuth);

  const mutationFn = async (params: RegisterParams): Promise<RegisterResponse> => {
    // Step 1: Register the user
    const registerRes = await http().post("/auth/register", params);
    const registerData = registerRes.data;

    // Step 2: Auto-login to get token
    // Since register doesn't return token, we need to login
    try {
      const loginRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
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
          created_at: new Date(registerData.created_at),
        };

        // Save auth with token
        setAuth(user, loginData.access_token);
        
        // Return combined data in RegisterResponse format
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
      throw new Error("Registration successful but auto-login failed. Please login manually.");
    }
  };

  return useMutation({
    mutationKey: ["register"],
    mutationFn,
  });
}
