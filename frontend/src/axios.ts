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

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g., https://trackifi.onrender.com
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Required for cookies to be sent (e.g., refresh token)
});

// ✅ Basic token format check
const isValidJwt = (token: string | null): boolean => {
  return !!token && token.split(".").length === 3;
};

// ✅ Check if the route is public (no auth header needed)
const isPublicRoute = (url?: string): boolean => {
  if (!url) return false;
  return url.includes("/auth/login") || url.includes("/auth/register");
};

// ✅ Prefix all internal calls with `/api` (backend expects it)
const withApiPrefix = (url?: string): string => {
  if (!url) return "";
  return url.startsWith("/api") ? url : `/api${url}`;
};

// ✅ Request Interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!isPublicRoute(config.url) && isValidJwt(token)) {
        config.headers["Authorization"] = `Bearer ${token}`;
        console.log("[Auth] ✔ Token attached");
      } else {
        console.log("[Auth] ⏭ Public route or invalid token");
      }
    }

    config.url = withApiPrefix(config.url);
    console.log(`[Request] ➡ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error("[Axios Request Error]:", error.message);
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      console.warn("[Auth] Unauthorized - token invalid/expired");
    } else if (status === 403) {
      console.warn("[Auth] Forbidden - access denied");
    }

    console.error("[Axios Response Error]:", data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
