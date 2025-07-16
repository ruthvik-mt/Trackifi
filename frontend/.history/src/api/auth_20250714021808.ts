import api from "../axios";

/* ──────────  Types  ────────── */

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

/* ──────────  API calls  ────────── */

export const login = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data;
};

export const register = async (body: RegisterRequest): Promise<void> => {
  await api.post("/auth/register", body);
};
