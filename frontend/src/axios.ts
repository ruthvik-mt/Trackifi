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

import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const instance = axios.create({
  baseURL: "", // Set your API base URL in `.env.local`
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper: Validate if token is a proper JWT with 3 parts (2 dots)
const isValidJwt = (token: string | null): boolean => {
  return !!token && token.split(".").length === 3;
};

// Interceptor to attach Authorization header
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (isValidJwt(token)) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Attached valid token to request");
      } else {
        console.warn("Invalid or missing token. Skipping Authorization header.");
      }
    }

    // Optional debug logs
    console.log(`➡️ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error.message);
    return Promise.reject(error);
  }
);

export default instance;
