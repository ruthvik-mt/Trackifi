import { useMemo } from "react";
import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import { useAuth } from "./useAuth";

export const useAxios = (): AxiosInstance => {
  const { token, logout } = useAuth();

  const instance = useMemo(() => {
    const ax = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    ax.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const isPublic =
        config.url?.includes("/auth/login") || config.url?.includes("/auth/register");

      if (token && !isPublic) {
        config.headers = AxiosHeaders.from({
          ...config.headers?.toJSON?.(), 
          Authorization: `Bearer ${token}`,
        });
      }

      return config;
    });

    ax.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
          console.warn("Unauthorized. Logging out.");
          logout();
        } else if (status === 403) {
          console.warn("Forbidden. Access denied.");
        }
        return Promise.reject(error);
      }
    );

    return ax;
  }, [token, logout]);

  return instance;
};
