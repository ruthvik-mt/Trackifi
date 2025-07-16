export interface MonthlyTotal {
  month: string;      // "2025‑07"
  total: number;      // total spent
}

export interface CategoryBreakdownItem {
  categoryName: string;
  amount: number;
}

export interface BudgetComparisonItem {
  categoryName: string;
  budget: number;
  actual: number;
}
