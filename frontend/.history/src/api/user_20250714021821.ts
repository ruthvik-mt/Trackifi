import api from "../axios";
import { User } from "../context/AuthContext";

/* Current logged‑in user */
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};
