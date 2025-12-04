import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { ActionResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useLogout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const mutationFn = async (): Promise<ActionResponse> => {
    try {
      // Try to call logout API
      const result = await http().post("/auth/logout");
      console.log("[LOGOUT] API call successful");
      return result.data;
    } catch (error) {
      console.log("[LOGOUT] API call failed, but continuing with local logout");
      // Even if API fails, we still want to logout locally
      return { message: "Logged out locally" };
    }
  };

  return useMutation({
    mutationKey: ["logout"],
    mutationFn,
    onSuccess: () => {
      console.log("[LOGOUT] Clearing auth and redirecting to /");
      // Clear auth state
      clearAuth();
      // Use window.location for hard redirect (bypass AuthGuard)
      // This ensures we go directly to landing page without AuthGuard intercepting
      window.location.href = "/";
    },
    onError: () => {
      console.log("[LOGOUT] Error occurred, still clearing auth and redirecting");
      // Even on error, clear auth and redirect
      clearAuth();
      // Use window.location for hard redirect
      window.location.href = "/";
    },
  });
}
