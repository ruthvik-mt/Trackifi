import api from "../axios";
import { Category } from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>("/categories");
  return data;
};

export const createCategory = async (
  category: Omit<Category, "id">
): Promise<Category> => {
  const { data } = await api.post<Category>("/categories", category);
  return data;
};

export const updateCategory = async (
  id: number,
  category: Omit<Category, "id">
): Promise<Category> => {
  const { data } = await api.put<Category>(`/categories/${id}`, category);
  return data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
