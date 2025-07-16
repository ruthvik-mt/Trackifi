import axios from "../axios";
import { LoginRequest, LoginResponse, RegisterRequest } from "../types/Auth";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const res = await axios.post("/api/auth/login", data);
  return res.data;
};

export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  const res = await axios.post("/api/auth/register", data);
  return res.data;
};
