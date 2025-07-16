import api from "../axios";
import { Budget } from "../types/Budget";

export const getBudgets = async (): Promise<Budget[]> => {
  const { data } = await api.get<Budget[]>("/budgets");
  return data;
};

export const createBudget = async (
  budget: Omit<Budget, "id">
): Promise<Budget> => {
  const { data } = await api.post<Budget>("/budgets", budget);
  return data;
};

export const updateBudget = async (
  id: number,
  budget: Omit<Budget, "id">
): Promise<Budget> => {
  const { data } = await api.put<Budget>(`/budgets/${id}`, budget);
  return data;
};

export const deleteBudget = async (id: number): Promise<void> => {
  await api.delete(`/budgets/${id}`);
};
