import axios from "../axios";
import {
  MonthlyTotal,
  CategoryBreakdownItem,
  BudgetComparisonItem,
} from "../types/Insight";

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

  const transformed: CategoryBreakdownItem[] = Object.entries(res.data).map(
    ([categoryName, amount]) => ({
      categoryName,
      amount: Number(amount), // ensure correct typing
    })
  );

  return transformed;
};

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  const res = await axios.get("/api/insights/budget-comparison", {
    params: { month },
  });

  const transformed: BudgetComparisonItem[] = res.data
    .filter(
      (item: any) =>
        item &&
        typeof item.category === "string" &&
        typeof item.budget === "number" &&
        typeof item.actual === "number"
    )
    .map((item: any) => ({
      categoryName: item.category,
      budget: item.budget,
      actual: item.actual,
    }));

  return transformed;
};
