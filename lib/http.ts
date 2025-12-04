import axios from "axios";
import { useAuthStore } from "@/hooks/stores/use-auth.store";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function http() {
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getAuthToken(),
  };

  return axios.create({
    baseURL,
    headers,
  });
}

export function httpStream(url: string, opts?: RequestInit | undefined) {
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    ...opts?.headers,
    Authorization: getAuthToken(),
  };

  const init = {
    ...opts,
    headers,
  };

  return fetch(baseURL + url, init);
}

function getAuthToken() {
  let token: string | undefined = undefined;

  if (typeof window !== "undefined") {
    // Try to get token from Zustand store first (most up-to-date)
    try {
      const storeToken = useAuthStore.getState().token;
      if (storeToken) {
        return `Bearer ${storeToken}`;
      }
    } catch (error) {
      console.error("[HTTP] Failed to get token from store:", error);
    }
    
    // Fallback to localStorage
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          token = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error("[HTTP] Failed to parse auth storage:", error);
      }
    }
  }

  return token;
}
