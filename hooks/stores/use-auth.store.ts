import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/entity/user";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        console.log("[AUTH_STORE] setAuth called with:", { 
          user: user.email, 
          token: token ? `${token.substring(0, 20)}...` : null 
        });
        set({ user, token });
        console.log("[AUTH_STORE] State after set:", { 
          user: useAuthStore.getState().user?.email,
          token: useAuthStore.getState().token ? `${useAuthStore.getState().token?.substring(0, 20)}...` : null
        });
      },
      clearAuth: () => set({ user: null, token: null }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
