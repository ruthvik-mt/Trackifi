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

export const getMonthlyTotal = async (
  month: string
): Promise<MonthlyTotal> => {
  const res = await axios.get("/api/insights/monthly-total", { params: { month } });
  return res.data;
};

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  const res = await axios.get("/api/insights/budget-comparison", { params: { month } });

  // Transform `category` -> `categoryName`
  const transformed = res.data.map((item: any) => ({
    categoryName: item.category,
    budget: item.budget,
    actual: item.actual,
  }));

  return transformed;
};

export const getCategoryBreakdown = async (
  month: string
): Promise<CategoryBreakdownItem[]> => {
  const res = await axios.get("/api/insights/category-breakdown", { params: { month } });

  // Transform { "Food": 2000, "Rent": 5000 } -> [{ categoryName: "Food", amount: 2000 }, ...]
  const transformed = Object.entries(res.data).map(([categoryName, amount]) => ({
    categoryName,
    amount,
  }));

  return transformed;
};

