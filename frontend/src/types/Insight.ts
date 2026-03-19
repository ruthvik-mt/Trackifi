export interface MonthlyTotal {
  month: string;      
  total: number;      
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
