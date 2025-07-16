import axios from "@/axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/Auth";

// Register user with fullName, email, password
export const register = async (data: RegisterRequest): Promise<void> => {
  await axios.post("/api/auth/register", data);
};

// Login user and get JWT token
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/api/auth/login", data);
  return response.data;
};
