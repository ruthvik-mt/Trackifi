import { useAuth } from "./useAuth";
import axios from "axios";
import { useMemo } from "react";

export const useAxios = () => {
  const { token, logout } = useAuth();

  const instance = useMemo(() => {
    const ax = axios.create({
      baseURL: "/api",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add Authorization header
    ax.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle token expiry globally
    ax.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return ax;
  }, [token, logout]);

  return instance;
};
