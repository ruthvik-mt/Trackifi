// // src/api/category.ts
// import axios from "@/axios";
// import { Category } from "@/types/Category";

// export const getCategories = async (): Promise<Category[]> => {
//   const response = await axios.get("/api/categories");
//   return response.data;
// };

// export const createCategory = async (data: Omit<Category, "id">): Promise<void> => {
//   await axios.post("/api/categories", data);
// };

// export const updateCategory = async (id: number, data: Omit<Category, "id">): Promise<void> => {
//   await axios.put(`/api/categories/${id}`, data);
// };

// export const deleteCategory = async (id: number): Promise<void> => {
//   await axios.delete(`/api/categories/${id}`);
// };

