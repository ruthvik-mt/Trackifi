// src/types/Transaction.ts
export interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string; // ISO string (e.g. "2025-07-13")
  categoryId: number;
}
