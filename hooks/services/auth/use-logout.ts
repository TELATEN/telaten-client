import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { http } from "@/lib/http";
import { ActionResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useLogout() {
  const queryClient = useQueryClient();
  const setLoggingOut = useAuthStore((state) => state.setLoggingOut);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const mutationFn = async (): Promise<ActionResponse> => {
    // Set logging out flag first
    setLoggingOut(true);
    
    try {
      // Try to call logout API with timeout
      const result = await http().post("/auth/logout", {}, {
        timeout: 3000, // 3 second timeout
      });
      return result.data;
    } catch (error) {
      // Even if API fails, we still want to logout locally
      return { message: "Logged out locally" };
    }
  };

  return useMutation({
    mutationKey: ["logout"],
    mutationFn,
    onSuccess: () => {
      // Cancel all queries and clear cache
      queryClient.cancelQueries();
      queryClient.clear();
      
      // Clear auth state
      clearAuth();
      
      // Redirect to landing page
      window.location.href = "/";
    },
    onError: () => {
      // Even on error, clear everything and redirect
      queryClient.cancelQueries();
      queryClient.clear();
      clearAuth();
      window.location.href = "/";
    },
  });
}
