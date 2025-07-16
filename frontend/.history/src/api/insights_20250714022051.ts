import axios from "../axios";
import {
  MonthlyTotal,
  CategoryBreakdownItem,
  BudgetComparisonItem,
} from "../types/Insight";

// ✅ Define the shape of backend response (raw)
type RawBudgetItem = {
  category: string;
  budget: number;
  actual: number;
};

export const getMonthlyTotal = async (
  month: string
): Promise<MonthlyTotal> => {
  const res = await axios.get("/api/insights/monthly-total", {
    params: { month },
  });
  return res.data;
};

export const getCategoryBreakdown = async (
  month: string
): Promise<CategoryBreakdownItem[]> => {
  const res = await axios.get("/api/insights/category-breakdown", {
    params: { month },
  });
  return res.data;
};

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  const res = await axios.get<RawBudgetItem[]>("/api/insights/budget-comparison", {
    params: { month },
  });

  return res.data.map((item) => ({
    categoryName: item.category,
    actual: item.actual,
    budget: item.budget,
  }));
};
