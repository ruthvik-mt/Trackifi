// // src/types/Budget.ts
// export interface Budget {
//   id: number;
//   categoryId: number;
//   limitAmount: number;
//   month: string; // format "YYYY-MM"
// }

export interface Budget {
  id: number;
  categoryId: number;
  categoryName?: string;
  limitAmount: number;
  month: string; // Format: "YYYY-MM"
}
