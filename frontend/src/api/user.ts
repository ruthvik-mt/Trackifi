// src/api/user.ts
import axios from "@/axios";
import { User } from "@/types/Auth";

export const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get<User>("/api/users/me");
  return response.data;
};
