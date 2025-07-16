// // src/types/Insight.ts

// export interface MonthlyTotal {
//   total: number;
// }

// export interface CategoryBreakdown {
//   categoryName: string;
//   total: number;
// }

// export interface BudgetComparison {
//   categoryName: string;
//   budget: number;
//   actual: number;
// }


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
