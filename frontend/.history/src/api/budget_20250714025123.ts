// src/api/budget.ts
import axios from "@/axios";
import { Budget } from "@/types/Budget";

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await axios.get("/api/budgets/all");
  return response.data;
};

export const getBudgetByCategoryAndMonth = async (
  categoryId: number,
  month: string
): Promise<Budget | null> => {
  const response = await axios.get("/api/budgets", {
    params: { categoryId, month },
  });
  return response.data || null;
};

export const createBudget = async (data: Omit<Budget, "id">): Promise<void> => {
  await axios.post("/api/budgets", data);
};

export const updateBudget = async (id: number, data: Omit<Budget, "id">): Promise<void> => {
  await axios.put(`/api/budgets/${id}`, data);
};

export const deleteBudget = async (id: number): Promise<void> => {
  await axios.delete(`/api/budgets/${id}`);
};
