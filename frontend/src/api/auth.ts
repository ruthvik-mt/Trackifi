// import axios from "../axios"; // your configured axios instance
// import { AxiosError } from "axios"; // import from Axios library
// import { LoginRequest, LoginResponse, RegisterRequest } from "../types/Auth";

// /**
//  * Login user with credentials
//  */
// export const login = async (data: LoginRequest): Promise<LoginResponse> => {
//   try {
//     const res = await axios.post<LoginResponse>("/auth/login", data);
//     return res.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;
//     console.error("Login failed:", err.response?.data?.message || err.message);
//     throw new Error(err.response?.data?.message || "Login failed. Please try again.");
//   }
// };

// /**
//  * Register a new user
//  */
// export const register = async (
//   data: RegisterRequest
// ): Promise<LoginResponse> => {
//   try {
//     const res = await axios.post<LoginResponse>("/auth/register", data);
//     return res.data;
//   } catch (error) {
//     const err = error as AxiosError<{ message: string }>;
//     console.error("Registration failed:", err.response?.data?.message || err.message);
//     throw new Error(err.response?.data?.message || "Registration failed. Please try again.");
//   }
// };

// src/api/auth.ts
import axios from "../axios"; // your configured axios instance
import { AxiosError } from "axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/Auth";

/**
 * Login user with credentials
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>("/auth/login", data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Login failed:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Login failed. Please try again.");
  }
};

/**
 * Register a new user
 */
export const register = async (
  data: RegisterRequest
): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>("/auth/register", data);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Registration failed:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Registration failed. Please try again.");
  }
};
