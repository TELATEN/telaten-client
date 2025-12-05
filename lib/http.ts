import axios from "axios";
import { useAuthStore } from "@/hooks/stores/use-auth.store";
import { LoginResponse } from "@/types";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
let isRefreshing = false;

export function http() {
  const headers: Record<string, any> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: getAuthToken(),
  };

  const instance = axios.create({
    baseURL,
    headers,
  });

  // instance.defaults.withCredentials = true;

  instance.interceptors.request.use((config) => {
    config.headers.Authorization = getAuthToken();

    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (
        err.response?.status === 401 &&
        !originalRequest._retry &&
        !err.response.request.responseURL.includes("/auth/refresh") &&
        !err.response.request.responseURL.includes("/auth/logout") &&
        !isRefreshing
      ) {
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const result = await http().post("/auth/refresh");
          const newToken = (result.data as LoginResponse).access_token;

          if (newToken) {
            useAuthStore.getState().updateToken(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            isRefreshing = false;
            return instance(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          useAuthStore.getState().clearAuth();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(err);
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
