// src/api/transaction.ts
import axios from "@/axios";
import { Transaction } from "@/types/Transaction";

export const getTransactions = async (month?: string): Promise<Transaction[]> => {
  const url = month ? `/api/transactions?month=${month}` : "/api/transactions";
  const response = await axios.get(url);
  return response.data;
};

export const createTransaction = async (data: Omit<Transaction, "id">): Promise<void> => {
  await axios.post("/api/transactions", data);
};

export const updateTransaction = async (id: number, data: Omit<Transaction, "id">): Promise<void> => {
  await axios.put(`/api/transactions/${id}`, data);
};

export const deleteTransaction = async (id: number): Promise<void> => {
  await axios.delete(`/api/transactions/${id}`);
};
