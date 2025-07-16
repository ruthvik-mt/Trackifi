import api from "../axios";
import {
  MonthlyTotal,
  CategoryBreakdownItem,
  BudgetComparison,
} from "../types/Insight";

/* All calls accept `month` in YYYY‑MM format */

export const getMonthlyTotal = async (
  month: string
): Promise<MonthlyTotal> => {
  const { data } = await api.get<MonthlyTotal>("/insights/monthly-total", {
    params: { month },
  });
  return data;
};

export const getCategoryBreakdown = async (
  month: string
): Promise<CategoryBreakdown[]> => {
  const { data } = await api.get<CategoryBreakdown[]>(
    "/insights/category-breakdown",
    { params: { month } }
  );
  return data;
};

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparison[]> => {
  const { data } = await api.get<BudgetComparison[]>(
    "/insights/budget-comparison",
    { params: { month } }
  );
  return data;
};
