// import { useAuth } from "./useAuth";
// import axios from "axios";
// import { useMemo } from "react";

// export const useAxios = () => {
//   const { token, logout } = useAuth();

//   const instance = useMemo(() => {
//     const ax = axios.create({
//       baseURL: import.meta.env.VITE_API_URL,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // Optional: only if using cookies (e.g., refresh token)
//       withCredentials: true,
//     });

//     // Attach token unless it's a public route
//     ax.interceptors.request.use((config) => {
//       const isPublic =
//         config.url?.includes("/auth/login") || config.url?.includes("/auth/register");

//       if (token && !isPublic) {
//         config.headers.Authorization = `Bearer ${token}`;
//         console.log("[Axios] ✅ Token attached");
//       } else {
//         console.log("[Axios] ⏭ Public or missing token");
//       }

//       return config;
//     });

//     // Handle 401/403 responses
//     ax.interceptors.response.use(
//       (res) => res,
//       (err) => {
//         const status = err.response?.status;
//         if (status === 401) {
//           console.warn("🔐 Unauthorized. Logging out.");
//           logout();
//         } else if (status === 403) {
//           console.warn("🚫 Forbidden. Access denied.");
//         }

//         return Promise.reject(err);
//       }
//     );

//     return ax;
//   }, [token, logout]);

//   return instance;
// };

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

    // ✅ Request interceptor with correct header structure
    ax.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const isPublic =
        config.url?.includes("/auth/login") || config.url?.includes("/auth/register");

      if (token && !isPublic) {
        // Use AxiosHeaders to create a valid header object
        config.headers = AxiosHeaders.from({
          ...config.headers?.toJSON?.(), // convert existing headers safely
          Authorization: `Bearer ${token}`,
        });
      }

      return config;
    });

    // ✅ Response interceptor
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
