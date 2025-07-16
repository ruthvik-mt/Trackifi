// src/types/Budget.ts
export interface Budget {
  id: number;
  categoryId: number;
  limitAmount: number;
  month: string; // format "YYYY-MM"
}
