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

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [editing, setEditing] = useState<Transaction | null>(null);

  /** wrapped in useCallback so identity changes only when `month` changes */
  const load = useCallback(async () => {
    const data = await getTransactions(month);
    setTransactions(data);
  }, [month]);

  useEffect(() => {
    load();
  }, [load]);        // ✅ include load in dependency array

  const handleCreate = async (tx: Omit<Transaction, "id">) => {
    await createTransaction(tx);
    load();
  };

  const handleUpdate = async (tx: Omit<Transaction, "id">) => {
    if (editing) {
      await updateTransaction(editing.id, tx);
      setEditing(null);
      load();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    load();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <label className="block mb-4">
        <span className="text-sm text-gray-600">Filter by Month:</span>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="ml-2 p-2 border rounded"
        />
      </label>

      <TransactionForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initial={editing || undefined}
        onCancel={() => setEditing(null)}
      />

      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{tx.description}</div>
              <div className="text-sm text-gray-600">
                ₹{tx.amount} • {tx.categoryName || "Unknown"} • {tx.date}
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
    </Layout>
  );
}
