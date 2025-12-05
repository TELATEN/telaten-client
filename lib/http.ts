import axios from "axios";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { LoginResponse } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function http() {
  let isRefreshing = false;
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getAuthToken(),
  };

  const instance = axios.create({
    baseURL,
    headers,
  });

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = getAuthToken();

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      if (
        err.response.status == 401 &&
        !err.response.request.responseURL.includes("/auth/refresh") &&
        !isRefreshing
      ) {
        isRefreshing = true;
        const result = await http().post("/auth/refresh");
        const newToken = (result.data as LoginResponse).access_token;

        if (!newToken) return;

        useAuthStore((state) => state.updateToken)(newToken);
      }
    }
  );

  return instance;
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
    try {
      const storeToken = useAuthStore.getState().token;
      if (storeToken) {
        return `Bearer ${storeToken}`;
      }
    } catch (error) {
      //
    }

    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        if (state?.token) {
          token = `Bearer ${state.token}`;
        }
      } catch (error) {
        //
      }
    }
  }

  return token;
}
