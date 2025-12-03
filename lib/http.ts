import axios from "axios";

export function http() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Get token from localStorage if available (client-side only)
  if (typeof window !== "undefined") {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          headers["Authorization"] = `Bearer ${state.token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth storage:", error);
      }
    }
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers,
  });
}
