// // src/api/insights.ts
// import axios from "@/axios";
// import {
//   MonthlyTotal,
//   CategoryBreakdown,
//   BudgetComparison,
// } from "@/types/Insight";

// export const getMonthlyTotal = async (month: string): Promise<MonthlyTotal> => {
//   const response = await axios.get("/api/insights/monthly-total", {
//     params: { month },
//   });
//   return response.data;
// };

// export const getCategoryBreakdown = async (month: string): Promise<CategoryBreakdown[]> => {
//   const response = await axios.get("/api/insights/category-breakdown", {
//     params: { month },
//   });
//   return response.data;
// };

// export const getBudgetComparison = async (month: string): Promise<BudgetComparison[]> => {
//   const response = await axios.get("/api/insights/budget-comparison", {
//     params: { month },
//   });
//   return response.data;
// };


import axios from "../axios";
import {
  MonthlyTotal,
  CategoryBreakdownItem,
  BudgetComparisonItem,
} from "../types/Insight";

/* ── Backend shape for /budget‑comparison ── */
type RawBudgetItem = {
  category: string;
  budget: number;
  actual: number;
};

export const getMonthlyTotal = async (
  month: string
): Promise<MonthlyTotal> => {
  const res = await axios.get("/api/insights/monthly-total", { params: { month } });
  return res.data;
};

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  /* tell Axios the response is RawBudgetItem[] */
  const res = await axios.get<RawBudgetItem[]>(
    "/api/insights/budget-comparison",
    { params: { month } }
  );

  /* map RawBudgetItem → BudgetComparisonItem */
  return res.data.map((item) => ({
    categoryName: item.category,
    budget: item.budget,
    actual: item.actual,
  }));
};

export const getCategoryBreakdown = async (
  month: string
): Promise<CategoryBreakdownItem[]> => {
  const res = await axios.get<Record<string, number>>(
    "/api/insights/category-breakdown",
    { params: { month } }
  );

  /* map { Food: 2000 } → [{ categoryName: "Food", amount: 2000 }] */
  return Object.entries(res.data).map(([categoryName, amount]) => ({
    categoryName,
    amount,
  }));
};
