// src/components/Transactions/TransactionList.tsx
import { useCallback, useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "@/api/transaction";
import { getCategories } from "@/api/category";
import { Transaction } from "@/types/Transaction";
import TransactionForm from "./TransactionForm";

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({});
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [monthFilter, setMonthFilter] = useState<string>("");

  // ⚡ Stable function: depends on monthFilter
  const loadTransactions = useCallback(async () => {
    const data = await getTransactions(monthFilter);
    setTransactions(data);
  }, [monthFilter]);

  // ⚡ Stable function: no dependencies
  const loadCategories = useCallback(async () => {
    const cats = await getCategories();
    const map: Record<number, string> = {};
    cats.forEach((c) => {
      map[c.id] = c.name;
    });
    setCategories(map);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    loadTransactions();
  };

  useEffect(() => {
    loadTransactions();
    loadCategories();
  }, [loadTransactions, loadCategories]); // ✅ no ESLint warning

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>

      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Month:</label>
        <input
          type="month"
          value={monthFilter}
          onChange={(e) => setMonthFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <TransactionForm
        onSuccess={loadTransactions}
        initialData={editing || undefined}
      />

      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="border rounded p-2 flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{tx.description}</div>
              <div className="text-sm text-gray-600">
                ₹{tx.amount.toFixed(2)} •{" "}
                {new Date(tx.date).toLocaleDateString()} •{" "}
                {categories[tx.categoryId]}
              </div>
            </div>
            <div className="space-x-2">
              <button onClick={() => setEditing(tx)} className="text-blue-500">
                Edit
              </button>
              <button
                onClick={() => handleDelete(tx.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
