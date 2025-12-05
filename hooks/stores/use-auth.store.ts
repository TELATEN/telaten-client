import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/entity/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggingOut: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
  updateToken: (token: string) => void;
  setLoggingOut: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggingOut: false,
      setAuth: (user, token) => {
        set({ user, token, isLoggingOut: false });
      },
      clearAuth: () => set({ user: null, token: null, isLoggingOut: false }),
      updateUser: (user) => set({ user }),
      updateToken: (token) => set({ token }),
      setLoggingOut: (status) => set({ isLoggingOut: status }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
