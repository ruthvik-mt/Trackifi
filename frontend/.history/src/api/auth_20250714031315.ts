import axios from "@/axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/types/Auth";

export const register = async (data: RegisterRequest): Promise<void> => {
  await axios.post("/api/auth/register", data);
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post("/api/auth/login", data);
  return response.data;
};
