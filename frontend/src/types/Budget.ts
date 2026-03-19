// // src/types/Budget.ts
export interface Budget {
  id: number;
  categoryId: number;
  categoryName?: string;
  limitAmount: number;
  month: string;
}
