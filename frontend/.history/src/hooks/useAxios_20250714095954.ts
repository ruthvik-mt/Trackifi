// // src/hooks/useAxios.ts
// import { useEffect } from "react";
// import axios, { AxiosResponse } from "axios"; // ✅ Import Axios types
// import axiosInstance from "@/axios";
// import { useAuth } from "./useAuth";

// /**
//  * Returns the shared Axios instance and
//  * registers a response interceptor that:
//  *   • logs the user out on 401,
//  *   • re-throws any other error untouched.
//  */
// const useAxios = () => {
//   const { logout } = useAuth();

//   useEffect(() => {
//     const onResponse = (response: AxiosResponse): AxiosResponse => response;

//     const onError = (error: unknown) => {
//       if (axios.isAxiosError(error) && error.response?.status === 401) {
//         logout(); // Token expired or invalid
//       }
//       return Promise.reject(error);
//     };

//     const id = axiosInstance.interceptors.response.use(onResponse, onError);
//     return () => axiosInstance.interceptors.response.eject(id);
//   }, [logout]);

//   return axiosInstance;
// };

// export default useAxios;

import { useAuth } from "./useAuth";
import axios from "axios";
import { useEffect, useMemo } from "react";

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
