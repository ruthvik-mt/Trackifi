import axios from "../axios";
import { Category } from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axios.get("/api/categories");
  return res.data;
};

export const createCategory = async (name: string): Promise<Category> => {
  const res = await axios.post("/api/categories", { name });
  return res.data;
};

export const updateCategory = async (id: number, name: string): Promise<Category> => {
  const res = await axios.put(`/api/categories/${id}`, { name });
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`/api/categories/${id}`);
};
