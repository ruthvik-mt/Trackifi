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

  const obj = res.data;

  // Convert { "Food": 3000, "Transport": 1500 } → [ { categoryName: "Food", amount: 3000 }, ... ]
  return Object.entries(obj).map(([categoryName, amount]) => ({
    categoryName,
    amount: Number(amount),
  }));
};


export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  const res = await axios.get("/api/insights/budget-comparison", { params: { month } });
  return res.data;
};
