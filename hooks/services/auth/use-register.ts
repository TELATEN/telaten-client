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

    console.log("[REGISTER] Register response:", registerData);

    // Step 2: Auto-login to get token
    // Since register doesn't return token, we need to login
    console.log("[REGISTER] Auto-login with credentials...");
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
      console.log("[REGISTER] Login response:", loginData);

      if (loginData.access_token) {
        console.log("[REGISTER] Token received:", loginData.access_token.substring(0, 20) + "...");
        
        // Convert user data to match User type
        const user: User = {
          id: registerData.id,
          email: registerData.email,
          name: registerData.name,
          created_at: new Date(registerData.created_at),
        };

        // Save auth with token
        setAuth(user, loginData.access_token);
        console.log("[REGISTER] Auth saved successfully!");
        
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
        console.error("[REGISTER] No token in login response");
        throw new Error("Failed to get authentication token");
      }
    } catch (loginError) {
      console.error("[REGISTER] Auto-login failed:", loginError);
      throw new Error("Registration successful but auto-login failed. Please login manually.");
    }
  };

  return useMutation({
    mutationKey: ["register"],
    mutationFn,
  });
}
