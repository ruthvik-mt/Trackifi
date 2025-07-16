import axios from "../axios";
import { BudgetComparisonItem } from "../types/Insight";

export const getBudgetComparison = async (
  month: string
): Promise<BudgetComparisonItem[]> => {
  const res = await axios.get("/api/insights/budget-comparison", {
    params: { month },
  });

  const transformed: BudgetComparisonItem[] = (res.data as unknown[]).flatMap((item): BudgetComparisonItem[] => {
    if (
      typeof item === "object" &&
      item !== null &&
      "category" in item &&
      "budget" in item &&
      "actual" in item &&
      typeof (item as any).category === "string" &&
      typeof (item as any).budget === "number" &&
      typeof (item as any).actual === "number"
    ) {
      return [
        {
          categoryName: (item as any).category,
          budget: (item as any).budget,
          actual: (item as any).actual,
        },
      ];
    }
    return [];
  });

  return transformed;
};
