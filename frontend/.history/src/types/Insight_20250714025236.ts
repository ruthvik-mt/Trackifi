// src/types/Insight.ts

export interface MonthlyTotal {
  total: number;
}

export interface CategoryBreakdown {
  categoryName: string;
  total: number;
}

export interface BudgetComparison {
  categoryName: string;
  budget: number;
  actual: number;
}
