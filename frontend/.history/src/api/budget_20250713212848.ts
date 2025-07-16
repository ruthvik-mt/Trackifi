import axios from "../axios";
import { Budget } from "../types/Budget";

export const getAllBudgets = async (): Promise<Budget[]> => {
  const res = await axios.get("/api/budgets/all");
  return res.data;
};

export const createBudget = async (budget: Omit<Budget, "id" | "categoryName">): Promise<Budget> => {
  const res = await axios.post("/api/budgets", budget);
  return res.data;
};

export const updateBudget = async (id: number, budget: Omit<Budget, "id" | "categoryName">): Promise<Budget> => {
  const res = await axios.put(`/api/budgets/${id}`, budget);
  return res.data;
};

export const deleteBudget = async (id: number): Promise<void> => {
  await axios.delete(`/api/budgets/${id}`);
};
