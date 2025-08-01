export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  message?: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface User {
  id: string;           // UUID as a string
  email: string;
  fullName: string;
  role: string;         // e.g. "USER", "ADMIN", etc.
}
