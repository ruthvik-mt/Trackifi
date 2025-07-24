// import axios from "axios";

// const instance = axios.create({
//   baseURL: "", // <-- frontend sends /api/... and Vite handles the proxy
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

// export default instance;

// src/api/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// ✅ Base URL from Vite env
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ JWT validation helper
const isValidJwt = (token: string | null): boolean => {
  return !!token && token.split(".").length === 3;
};

// ✅ Utility to check if URL is public (e.g., login/register)
const isPublicRoute = (url?: string): boolean => {
  if (!url) return false;
  return url.includes("/auth/login") || url.includes("/auth/register");
};

// ✅ Request interceptor to attach token
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (isValidJwt(token)) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("[Auth] ✔ Token attached to request");
      } else if (!isPublicRoute(config.url)) {
        // Only warn if it's a protected route
        console.warn("[Auth] ⚠ No valid token found");
      }
    }

    console.log(`[Request] ➡ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error("[Axios Request Error]:", error.message);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor (optional)
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("[Axios Response Error]:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
