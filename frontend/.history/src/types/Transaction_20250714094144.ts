// // src/types/Transaction.ts
// export interface Transaction {
//   id: number;
//   amount: number;
//   description: string;
//   date: string; // ISO string (e.g. "2025-07-13")
//   categoryId: number;
// }

export interface Transaction {
  id: number;
  categoryId: number;
  categoryName?: string; // optional display from backend
  amount: number;
  description: string;
  date: string; // ISO format: "2025-07-13"
}
