import axios from "../axios";
import { Transaction } from "../types/Transaction";

export const getTransactions = async (month?: string): Promise<Transaction[]> => {
  const res = await axios.get("/api/transactions", {
    params: month ? { month } : {},
  });
  return res.data;
};

export const createTransaction = async (tx: Omit<Transaction, "id">) => {
  const res = await axios.post("/api/transactions", tx);
  return res.data;
};

export const updateTransaction = async (id: number, tx: Omit<Transaction, "id">) => {
  const res = await axios.put(`/api/transactions/${id}`, tx);
  return res.data;
};

export const deleteTransaction = async (id: number) => {
  await axios.delete(`/api/transactions/${id}`);
};
