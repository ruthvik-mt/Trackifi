import { useEffect, useState, useCallback } from "react";
import Layout from "../Dashboard/Layout";
import TransactionForm from "./TransactionForm";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/transaction";
import { Transaction } from "../../types/Transaction";
import { MonthPicker } from "@/components/MonthPicker";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [editing, setEditing] = useState<Transaction | null>(null);

  const month = selectedMonth.toISOString().slice(0, 7); // format: yyyy-MM

  const loadTransactions = useCallback(async () => {
    const data = await getTransactions(month);
    setTransactions(data);
  }, [month]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleCreate = async (tx: Omit<Transaction, "id">) => {
    await createTransaction(tx);
    loadTransactions();
  };

  const handleUpdate = async (tx: Omit<Transaction, "id">) => {
    if (editing) {
      await updateTransaction(editing.id, tx);
      setEditing(null);
      loadTransactions();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    loadTransactions();
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto px-4 md:px-0">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold">Transactions</h1>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium flex items-center gap-1">
              📅 Filter by Month:
            </label>
            <div className="bg-background text-foreground rounded">
              <MonthPicker
                selected={selectedMonth}
                onChange={(date) => date && setSelectedMonth(date)}
              />
            </div>
          </div>
        </div>

        <TransactionForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initial={editing || undefined}
          onCancel={() => setEditing(null)}
        />

        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className="bg-card text-card-foreground border shadow p-4 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{tx.description}</div>
                <div className="text-sm text-muted-foreground">
                  ₹{tx.amount.toFixed(2)} • {tx.categoryName || "Uncategorized"} •{" "}
                  {new Date(tx.date).toLocaleDateString()}
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => setEditing(tx)}
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}
