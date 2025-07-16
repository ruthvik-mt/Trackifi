import api from "../axios";
import { Transaction } from "../types/Transaction";

export const getTransactions = async (
  month?: string /* format YYYY‑MM */
): Promise<Transaction[]> => {
  const { data } = await api.get<Transaction[]>("/transactions", {
    params: month ? { month } : {},
  });
  return data;
};

export const createTransaction = async (
  txn: Omit<Transaction, "id">
): Promise<Transaction> => {
  const { data } = await api.post<Transaction>("/transactions", txn);
  return data;
};

export const updateTransaction = async (
  id: number,
  txn: Omit<Transaction, "id">
): Promise<Transaction> => {
  const { data } = await api.put<Transaction>(`/transactions/${id}`, txn);
  return data;
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};
