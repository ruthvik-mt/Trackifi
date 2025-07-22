import { useEffect, useState } from "react";
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

// ✅ Format Date to YYYY-MM for backend API filtering
function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

// ✅ Convert UTC date string to IST and format to DD/MM/YYYY
function formatToIST(dateStr: string): string {
  const utcDate = new Date(dateStr);
  const istOffset = 330; // +5:30 in minutes
  const istDate = new Date(utcDate.getTime() + istOffset * 60000);
  return istDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editing, setEditing] = useState<Transaction | null>(null);

  const selectedMonth = formatMonth(selectedDate); // e.g., "2025-07"

  useEffect(() => {
    async function loadTransactions() {
      try {
        const allTx = await getTransactions(selectedMonth);

        // Filter on frontend as a safeguard (if backend doesn't filter)
        const filtered = allTx.filter((tx: Transaction) => {
          const txDate = new Date(tx.date);
          const istOffset = 330;
          const istDate = new Date(txDate.getTime() + istOffset * 60000);
          return formatMonth(istDate) === selectedMonth;
        });

        setTransactions(filtered);
      } catch (err) {
        console.error("Failed to load transactions", err);
      }
    }

    loadTransactions();
  }, [selectedMonth]);

  const handleCreate = async (tx: Omit<Transaction, "id">) => {
    await createTransaction(tx);
    const updatedTx = await getTransactions(selectedMonth);
    setTransactions(updatedTx);
  };

  const handleUpdate = async (tx: Omit<Transaction, "id">) => {
    if (!editing) return;
    await updateTransaction(editing.id, tx);
    setEditing(null);
    const updatedTx = await getTransactions(selectedMonth);
    setTransactions(updatedTx);
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    const updatedTx = await getTransactions(selectedMonth);
    setTransactions(updatedTx);
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
            <MonthPicker
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
            />
          </div>
        </div>

        <TransactionForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initial={editing || undefined}
          onCancel={() => setEditing(null)}
        />

        <ul className="space-y-2">
          {transactions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No transactions found for this month.
            </p>
          ) : (
            transactions.map((tx) => (
              <li
                key={tx.id}
                className="bg-card text-card-foreground border shadow p-4 rounded flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{tx.description}</div>
                  <div className="text-sm text-muted-foreground">
                    ₹{tx.amount.toFixed(2)} • {tx.categoryName || "Uncategorized"} •{" "}
                    {formatToIST(tx.date)}
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
            ))
          )}
        </ul>
      </div>
    </Layout>
  );
}
