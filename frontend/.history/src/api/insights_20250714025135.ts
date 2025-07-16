// src/api/insights.ts
import axios from "@/axios";
import {
  MonthlyTotal,
  CategoryBreakdown,
  BudgetComparison,
} from "@/types/Insight";

export const getMonthlyTotal = async (month: string): Promise<MonthlyTotal> => {
  const response = await axios.get("/api/insights/monthly-total", {
    params: { month },
  });
  return response.data;
};

export const getCategoryBreakdown = async (month: string): Promise<CategoryBreakdown[]> => {
  const response = await axios.get("/api/insights/category-breakdown", {
    params: { month },
  });
  return response.data;
};

export const getBudgetComparison = async (month: string): Promise<BudgetComparison[]> => {
  const response = await axios.get("/api/insights/budget-comparison", {
    params: { month },
  });
  return response.data;
};
