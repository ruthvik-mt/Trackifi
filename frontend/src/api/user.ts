// src/api/user.ts
import axios from "@/axios";
import { User } from "@/types/Auth";

export const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get<User>("/users/me");
  return response.data;
};

export const deleteAccount = async (): Promise<void> => {
  await axios.delete("/users/me");
};
