import axios from "../axios";
import {
  MonthlyTotal,
  CategoryBreakdownItem,
  BudgetComparisonItem,
} from "../types/Insight";

export const getMonthlyTotal = async (
  month: string
): Promise<MonthlyTotal> => {
  const res = await axios.get("/api/insights/monthly-total", { params: { month } });
  return res.data;
};

export const getCategoryBreakdown = async (
  month: string
): Promise<CategoryBreakdownItem[]> => {
  const res = await axios.get("/api/insights/category-breakdown", {
    params: { month },
  });

  return Object.entries(res.data).map(([categoryName, amount]) => ({
    categoryName,
    amount: Number(amount),
  }));
};

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  const res = await axios.get("/api/insights/budget-comparison", {
    params: { month },
  });

  return res.data.map((item: any) => ({
    categoryName: item.category,
    actual: Number(item.actual),
    budget: Number(item.budget),
  }));
};
